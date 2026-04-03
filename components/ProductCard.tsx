"use client";

import { motion, useReducedMotion } from "framer-motion";
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
export function ProductCard({ tier, index }: ProductCardProps) {
  const putLine = useCartStore((s) => s.putLine);
  const defaultSize = singleProductOffer.options[0]!;
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className={`relative flex flex-col rounded-3xl border bg-card p-6 shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl ${
        tier.highlight
          ? "border-accent/50 ring-2 ring-accent/20 md:scale-[1.02]"
          : "border-pink-100"
      }`}
    >
      {tier.badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-white shadow-md">
          {tier.badge}
        </span>
      )}
      <h3 className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
        {tier.count} dumpling{tier.count > 1 ? "s" : ""}
      </h3>
      <p className="text-sm font-semibold text-muted">{tier.label}</p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="text-4xl font-extrabold text-foreground">
          {formatMoney(tier.price)}
        </span>
        {tier.compareAt != null && (
          <span className="text-sm font-bold text-muted line-through">
            {formatMoney(tier.compareAt)}
          </span>
        )}
      </div>

      <ul className="mt-4 flex-1 space-y-2 text-sm font-semibold text-foreground/90">
        <li>✓ Mystery styles &amp; colors</li>
        <li>✓ Slow-rise squish</li>
        <li>✓ Gift-ready packaging</li>
      </ul>

      <div className="mt-6 flex flex-col gap-2">
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
          className="w-full rounded-2xl bg-foreground py-3.5 text-center text-sm font-extrabold text-white shadow-lg transition hover:opacity-95 active:scale-[0.99]"
        >
          Add to cart
        </button>
        <a
          href="/products#offer"
          className="w-full rounded-2xl border-2 border-pink-200 py-3 text-center text-sm font-extrabold text-foreground transition hover:border-accent/50"
        >
          Buy now
        </a>
      </div>
    </motion.article>
  );
}
