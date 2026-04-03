import type { CartLine } from "@/lib/store/use-cart-store";
import { singleProductOffer } from "@/lib/data";

/**
 * Maps a cart line to Stripe Checkout Session params (dynamic amount in USD on the server).
 * Legacy tier ids (single / triple / five) map to the default 17 cm SKU × bundle count.
 */
export function resolveStripeCheckoutParams(
  line: Pick<CartLine, "id" | "quantity">,
): { sizeId: string; quantity: number } | null {
  const qty = Math.min(99, Math.max(1, line.quantity));

  if (singleProductOffer.options.some((o) => o.id === line.id)) {
    return { sizeId: line.id, quantity: qty };
  }

  const legacyMult: Record<string, number> = {
    single: 1,
    triple: 3,
    five: 5,
  };
  const mult = legacyMult[line.id];
  if (mult != null) {
    const defaultSize = singleProductOffer.options[0];
    if (!defaultSize) return null;
    return {
      sizeId: defaultSize.id,
      quantity: Math.min(99, Math.max(1, mult * qty)),
    };
  }

  return null;
}
