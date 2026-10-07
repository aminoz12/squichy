"use client";

import { canCheckoutWithShopify, createShopifyCheckoutUrl } from "./shopify";

type CartItem = {
  id: string;
  quantity: number;
};

/**
 * Single checkout entry point. When the Shopify store is connected and every
 * line maps to a Shopify variant, payment goes through Shopify's hosted
 * checkout; otherwise it falls back to the existing Stripe session flow.
 */
export async function redirectToCheckout(items: CartItem[]): Promise<void> {
  if (canCheckoutWithShopify(items)) {
    const url = await createShopifyCheckoutUrl(items);
    window.location.href = url;
    return;
  }
  return redirectToStripeCheckout(items);
}

/**
 * Creates a Stripe Checkout Session via our API and redirects the browser.
 * Supports both single item (legacy) and multiple items.
 */
export async function redirectToStripeCheckout(
  sizeId: string,
  quantity: number,
): Promise<void>;
export async function redirectToStripeCheckout(
  items: CartItem[],
): Promise<void>;
export async function redirectToStripeCheckout(
  sizeIdOrItems: string | CartItem[],
  quantity?: number,
): Promise<void> {
  let body: object;
  
  if (Array.isArray(sizeIdOrItems)) {
    // New format: multiple items
    body = { items: sizeIdOrItems };
  } else {
    // Legacy format: single item
    body = { sizeId: sizeIdOrItems, quantity: quantity ?? 1 };
  }
  
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok) {
    throw new Error(data.error || "Payment could not start");
  }
  if (!data.url) {
    throw new Error("No checkout URL returned");
  }
  window.location.href = data.url;
}
