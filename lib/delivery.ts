/**
 * Free delivery when the cart / order subtotal (before delivery) reaches this
 * amount in EUR. Matches Stripe line items priced in EUR.
 */
export const FREE_DELIVERY_THRESHOLD_EUR = 50;

export function qualifiesForFreeDeliverySubtotalEur(subtotalEur: number): boolean {
  return subtotalEur >= FREE_DELIVERY_THRESHOLD_EUR - 1e-9;
}
