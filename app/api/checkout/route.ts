import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { products } from "@/lib/data";
import { qualifiesForFreeDeliverySubtotal } from "@/lib/delivery";
import { getStripe } from "@/lib/stripe-server";

/**
 * Creates a Stripe Checkout Session (payment) for the single product:
 * line 1 = unit price × quantity; optional line 2 = delivery (waived when
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

  const sizeId =
    typeof body === "object" && body !== null && "sizeId" in body
      ? String((body as { sizeId: unknown }).sizeId)
      : "";
  const rawQty =
    typeof body === "object" && body !== null && "quantity" in body
      ? Number((body as { quantity: unknown }).quantity)
      : 1;
  const quantity = Math.min(99, Math.max(1, Number.isFinite(rawQty) ? rawQty : 1));

  let option: typeof products[number]["options"][number] | undefined;
  let product: typeof products[number] | undefined;
  
  for (const p of products) {
    const opt = p.options.find((o) => o.id === sizeId);
    if (opt) {
      option = opt;
      product = p;
      break;
    }
  }

  if (!option || !product) {
    return NextResponse.json({ error: "Invalid size" }, { status: 400 });
  }

  const origin =
    request.headers.get("origin")?.trim() ||
    process.env.NEXT_PUBLIC_APP_URL?.trim() ||
    "http://localhost:3000";

  const unitAmount = Math.round(option.priceUsd * 100);
  const subtotalUsd = option.priceUsd * quantity;
  const deliveryFree = qualifiesForFreeDeliverySubtotal(subtotalUsd);
  const deliveryAmount = deliveryFree
    ? 0
    : Math.round(product.deliveryUsd * 100);

  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      quantity,
      price_data: {
        currency: "usd",
        unit_amount: unitAmount,
        product_data: {
          name: `${product.name} (${option.label})`,
          description: `${option.sizeCm} cm`,
        },
      },
    },
  ];

  if (deliveryAmount > 0) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: deliveryAmount,
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
        size_id: sizeId,
        quantity: String(quantity),
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
    const message =
      err instanceof Error ? err.message : "Stripe checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
