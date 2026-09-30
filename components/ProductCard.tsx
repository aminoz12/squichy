"use client";

import Link from "next/link";
import type { PricingTier } from "@/lib/data";
import { singleProductOffer } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

type ProductCardProps = {
  tier: PricingTier;
  index: number;
};

/**
 * Single pricing tier: add-to-cart (Zustand); checkout uses /api/checkout sessions.
 */
export function ProductCard({ tier }: ProductCardProps) {
  const putLine = useCartStore((s) => s.putLine);
  const defaultSize = singleProductOffer.options[0]!;

  return (
    <article
      className={`sticker-card relative flex flex-col p-6 ${
        tier.highlight
          ? "bg-sun-soft md:-translate-y-2 md:rotate-1"
          : "bg-card"
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-3 whitespace-nowrap rounded-full border-2 border-ink bg-ink px-3 py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-wide text-white">
          {tier.badge}
        </span>
      )}
      <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
        {tier.count} dumpling{tier.count > 1 ? "s" : ""}
      </h3>
      <p className="text-sm font-bold uppercase tracking-wide text-ink-2">
        {tier.label}
      </p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-[family-name:var(--font-fredoka)] text-4xl font-semibold text-ink">
          {formatMoney(tier.price)}
        </span>
        {tier.compareAt != null && (
          <span className="text-sm font-bold text-ink-2 line-through">
            {formatMoney(tier.compareAt)}
          </span>
        )}
      </div>

      <ul className="mt-4 flex-1 space-y-2.5 text-sm font-semibold text-ink">
        {["Mystery styles & colors", "Slow-rise squish", "Gift-ready packaging"].map(
          (perk) => (
            <li key={perk} className="flex items-center gap-2.5">
              <span className="grid h-5 w-5 flex-none place-items-center rounded-full border-2 border-ink bg-mint text-[10px] font-black text-ink">
                ✓
              </span>
              {perk}
            </li>
          ),
        )}
      </ul>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="button"
          onClick={() =>
            putLine({
              id: defaultSize.id,
              name: `${tier.count}× ${singleProductOffer.name} (${defaultSize.label})`,
              unitPriceUsd: defaultSize.priceUsd,
              quantity: tier.count,
            })
          }
          className="btn-squish w-full text-sm"
        >
          Add to cart
        </button>
        <Link href="/products#offer" className="btn-squish btn-white w-full text-sm">
          Buy now
        </Link>
      </div>
    </article>
  );
}
