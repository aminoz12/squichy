/**
 * Google Ads conversion tracking helper.
 * Fires the "Achat (1)" conversion event when a user initiates checkout.
 */

type GtagFn = (...args: unknown[]) => void;

function getGtag(): GtagFn | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as Window & { gtag?: GtagFn };
  return typeof w.gtag === "function" ? w.gtag : undefined;
}

/**
 * Reports a purchase conversion to Google Ads.
 * Call this on checkout button click — before redirecting to Stripe.
 *
 * @param value      Order value in USD (defaults to 18.0 per Google snippet)
 * @param currency   ISO 4217 currency code (default: "USD")
 * @param transactionId  Optional order/session ID to deduplicate conversions
 */
/* ── GA4 e-commerce events (consumed by GTM / GA4 via gtag) ── */

export type EcomItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
};

/** view_item / add_to_cart / begin_checkout with a consistent USD payload. */
export function fireEcomEvent(
  name: "view_item" | "add_to_cart" | "begin_checkout",
  valueUsd: number,
  items: EcomItem[],
) {
  const gtag = getGtag();
  if (!gtag) return;
  gtag("event", name, {
    currency: "USD",
    value: Math.round(valueUsd * 100) / 100,
    items,
  });
}

/**
 * GA4 purchase, deduplicated per Stripe session id: the success page can be
 * reloaded or revisited, but each order must be counted exactly once.
 */
export function firePurchase(sessionId: string, valueUsd: number | null) {
  const gtag = getGtag();
  if (!gtag || !sessionId) return;
  try {
    const key = `sb-purchase-${sessionId}`;
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, "1");
  } catch {
    /* storage unavailable — fire anyway rather than lose the conversion */
  }
  gtag("event", "purchase", {
    transaction_id: sessionId,
    currency: "USD",
    ...(valueUsd != null ? { value: valueUsd } : {}),
  });
}

export function fireGtagConversion({
  value = 18.0,
  currency = "USD",
  transactionId = "",
}: {
  value?: number;
  currency?: string;
  transactionId?: string;
} = {}) {
  const gtag = getGtag();
  if (!gtag) return;

  gtag("event", "conversion", {
    send_to: "AW-18147745818/qAZmCPea2qkcEJrAws1D",
    value,
    currency,
    transaction_id: transactionId,
  });
}
