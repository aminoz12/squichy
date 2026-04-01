"use client";

/**
 * Creates a Stripe Checkout Session via our API and redirects the browser.
 */
export async function redirectToStripeCheckout(
  sizeId: string,
  quantity: number,
): Promise<void> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sizeId, quantity }),
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
