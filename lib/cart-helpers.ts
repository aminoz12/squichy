import type { CartLine } from "@/lib/store/use-cart-store";
import { products } from "@/lib/data";
import { qualifiesForFreeDeliverySubtotal } from "@/lib/delivery";

type ResolvedProductOption = {
  product: (typeof products)[number];
  option: (typeof products)[number]["options"][number];
};

function clampQuantity(quantity: unknown): number {
  const numericQuantity = Number(quantity);
  if (!Number.isFinite(numericQuantity)) return 1;
  return Math.min(99, Math.max(1, Math.trunc(numericQuantity)));
}

function findProductOption(optionId: string): ResolvedProductOption | null {
  for (const product of products) {
    const option = product.options.find((o) => o.id === optionId);
    if (option) return { product, option };
  }

  return null;
}

/**
 * Maps a cart line to Stripe Checkout Session params (dynamic amount in USD on the server).
 * Checks against ALL product options (not just singleProductOffer).
 * Legacy tier ids (single / triple / five) map to the first product's first option × bundle count.
 */
export function resolveStripeCheckoutParams(
  line: Pick<CartLine, "id" | "quantity">,
): {
  sizeId: string;
  quantity: number;
  deliveryUsd: number;
  freeShipping: boolean;
} | null {
  const qty = clampQuantity(line.quantity);

  // Check if the cart line ID matches any option from ANY product
  const resolved = findProductOption(line.id);
  if (resolved) {
    return {
      sizeId: line.id,
      quantity: qty,
      deliveryUsd: resolved.product.deliveryUsd,
      freeShipping: resolved.option.freeShipping === true,
    };
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
      quantity: Math.min(99, mult * qty),
      deliveryUsd: firstProduct.deliveryUsd,
      freeShipping: firstProduct.options[0].freeShipping === true,
    };
  }

  return null;
}

export function estimateCartDeliveryUsd(
  lines: readonly Pick<CartLine, "id" | "quantity" | "unitPriceUsd">[],
): number {
  if (lines.length === 0) return 0;

  const subtotalUsd = lines.reduce(
    (acc, line) => acc + line.unitPriceUsd * clampQuantity(line.quantity),
    0,
  );
  if (qualifiesForFreeDeliverySubtotal(subtotalUsd)) return 0;

  let maxDeliveryUsd = 0;
  let includesFreeShippingBundle = false;

  for (const line of lines) {
    const resolved = resolveStripeCheckoutParams(line);
    if (!resolved) continue;

    maxDeliveryUsd = Math.max(maxDeliveryUsd, resolved.deliveryUsd);
    includesFreeShippingBundle ||= resolved.freeShipping;
  }

  return includesFreeShippingBundle ? 0 : maxDeliveryUsd;
}
