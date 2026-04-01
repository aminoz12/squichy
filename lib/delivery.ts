/**
 * Free-delivery rule (customer-facing USD). Orders are charged in EUR in Stripe;
 * we compare using a fixed approximate EUR→USD rate so the banner and checkout stay aligned.
 */
export const FREE_DELIVERY_THRESHOLD_USD = 50;

/** Approximate EUR→USD for threshold checks only (not for FX settlement). */
export const EUR_TO_USD_APPROX = 1.08;

export function subtotalEurToUsdApprox(subtotalEur: number): number {
  return subtotalEur * EUR_TO_USD_APPROX;
}

export function qualifiesForFreeDeliverySubtotalEur(subtotalEur: number): boolean {
  return subtotalEurToUsdApprox(subtotalEur) >= FREE_DELIVERY_THRESHOLD_USD - 1e-9;
}
