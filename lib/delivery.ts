/**
 * Free delivery when the cart / order subtotal (before delivery) reaches this
 * amount in USD. Matches Stripe line items priced in USD.
 */
export const FREE_DELIVERY_THRESHOLD_USD = 50;

export function qualifiesForFreeDeliverySubtotal(subtotalUsd: number): boolean {
  return subtotalUsd >= FREE_DELIVERY_THRESHOLD_USD - 1e-9;
}
