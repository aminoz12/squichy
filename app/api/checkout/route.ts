import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { products } from "@/lib/data";
import { qualifiesForFreeDeliverySubtotal } from "@/lib/delivery";
import { getStripe, getStripeErrorMessage } from "@/lib/stripe-server";

type CartItem = {
  id: string;
  quantity: number;
};

function clampQuantity(quantity: unknown): number {
  const numericQuantity = Number(quantity);
  if (!Number.isFinite(numericQuantity)) return 1;
  return Math.min(99, Math.max(1, Math.trunc(numericQuantity)));
}

function parseCartItem(item: unknown): CartItem | null {
  if (typeof item !== "object" || item === null) return null;

  const id = "id" in item ? String((item as { id: unknown }).id).trim() : "";
  if (!id) return null;

  return {
    id,
    quantity: clampQuantity(
      "quantity" in item ? (item as { quantity: unknown }).quantity : 1,
    ),
  };
}

/**
 * Creates a Stripe Checkout Session (payment) for multiple products:
 * each product line with unit price × quantity; optional delivery line (waived when
 * subtotal meets FREE_DELIVERY_THRESHOLD_USD via lib/delivery).
 */
export async function POST(request: Request) {
  const secret = process.env.STRIPE_SECRET_KEY?.trim();
  if (!secret) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY is not set. Add it to .env.local" },
      { status: 500 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  // Support both old format (sizeId + quantity) and new format (items array)
  let cartItems: CartItem[] = [];
  
  if (typeof body === "object" && body !== null && "items" in body && Array.isArray((body as { items: unknown }).items)) {
    // New format: array of items
    cartItems = (body as { items: unknown[] }).items
      .map(parseCartItem)
      .filter((item): item is CartItem => item !== null);
  } else if (typeof body === "object" && body !== null && "sizeId" in body) {
    // Legacy format: single item
    const sizeId = String((body as { sizeId: unknown }).sizeId);
    const quantity = clampQuantity(
      typeof body === "object" && body !== null && "quantity" in body
        ? (body as { quantity: unknown }).quantity
        : 1,
    );
    cartItems = [{ id: sizeId, quantity }];
  }

  if (cartItems.length === 0) {
    return NextResponse.json({ error: "No items in cart" }, { status: 400 });
  }

  const origin =
    request.headers.get("origin")?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "http://localhost:3000";

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
  let subtotalUsd = 0;
  let maxDeliveryUsd = 0;
  let includesFreeShippingBundle = false;

  // Build line items for each cart item
  for (const cartItem of cartItems) {
    let option: typeof products[number]["options"][number] | undefined;
    let product: typeof products[number] | undefined;
    
    // Legacy ID mapping for Mystery Dumpling bundles
    let searchId = cartItem.id;
    if (searchId === "bundle-1") searchId = "mystery-b1";
    if (searchId === "bundle-2-get-1") searchId = "mystery-b21";
    if (searchId === "bundle-4-get-2") searchId = "mystery-b42";
    if (searchId === "bundle-6-get-3") searchId = "mystery-b63";
    if (searchId === "bundle-8-get-4") searchId = "mystery-b84";

    for (const p of products) {
      const opt = p.options.find((o) => o.id === searchId);
      if (opt) {
        option = opt;
        product = p;
        break;
      }
    }

    if (!option || !product) {
      return NextResponse.json({ error: `Invalid product option: ${cartItem.id}` }, { status: 400 });
    }

    const unitAmount = Math.round(option.priceUsd * 100);
    const itemSubtotal = option.priceUsd * cartItem.quantity;
    subtotalUsd += itemSubtotal;
    maxDeliveryUsd = Math.max(maxDeliveryUsd, product.deliveryUsd);
    includesFreeShippingBundle ||= option.freeShipping === true;

    lineItems.push({
      quantity: cartItem.quantity,
      price_data: {
        currency: "usd",
        unit_amount: unitAmount,
        product_data: {
          name: `${product.name} (${option.label})`,
          description: `${option.sizeCm} cm`,
        },
      },
    });
  }

  // Add delivery line if applicable (use max delivery cost from all products)
  const deliveryFree =
    includesFreeShippingBundle || qualifiesForFreeDeliverySubtotal(subtotalUsd);
  if (!deliveryFree && maxDeliveryUsd > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(maxDeliveryUsd * 100),
        product_data: {
          name: "Delivery",
        },
      },
    });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: [
          "US", "CA", "AL", "AD", "AT", "BE", "BA", "BG", "HR", "CY", "CZ", "DK",
          "EE", "FI", "FR", "DE", "GR", "HU", "IS", "IE", "IT", "LV", "LI", "LT",
          "LU", "MT", "MD", "MC", "ME", "NL", "MK", "NO", "PL", "PT", "RO", "SM",
          "RS", "SK", "SI", "ES", "SE", "CH", "UA", "GB", "VA",
        ],
      },
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${origin}/products?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/products?checkout=cancel`,
      metadata: {
        items: JSON.stringify(cartItems.map(i => ({ id: i.id, qty: i.quantity }))),
      },
    });

    if (!session.url) {
      return NextResponse.json(
        { error: "Stripe did not return a checkout URL" },
        { status: 500 },
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[checkout]", err);
    return NextResponse.json({ error: getStripeErrorMessage(err) }, { status: 500 });
  }
}
