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
