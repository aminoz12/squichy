import type { CartLine } from "@/lib/store/use-cart-store";
import { products } from "@/lib/data";

/**
 * Maps a cart line to Stripe Checkout Session params (dynamic amount in USD on the server).
 * Checks against ALL product options (not just singleProductOffer).
 * Legacy tier ids (single / triple / five) map to the first product's first option × bundle count.
 */
export function resolveStripeCheckoutParams(
  line: Pick<CartLine, "id" | "quantity">,
): { sizeId: string; quantity: number } | null {
  const qty = Math.min(99, Math.max(1, line.quantity));

  // Check if the cart line ID matches any option from ANY product
  for (const product of products) {
    if (product.options.some((o) => o.id === line.id)) {
      return { sizeId: line.id, quantity: qty };
    }
  }

  // Legacy tier support (for backwards compatibility)
  const legacyMult: Record<string, number> = {
    single: 1,
    triple: 3,
    five: 5,
  };
  const mult = legacyMult[line.id];
  if (mult != null) {
    const firstProduct = products[0];
    if (!firstProduct?.options[0]) return null;
    return {
      sizeId: firstProduct.options[0].id,
      quantity: Math.min(99, Math.max(1, mult * qty)),
    };
  }

  return null;
}
