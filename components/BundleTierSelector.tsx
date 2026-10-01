"use client";

import Image from "next/image";
import type { BundleTier } from "@/lib/data";

type Props = {
  tiers: readonly BundleTier[];
  selectedId: string;
  onSelect: (id: string) => void;
};

function moneyUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}


export function BundleTierSelector({ tiers, selectedId, onSelect }: Props) {
  return (
    <fieldset className="space-y-0">
      <legend className="mx-auto mb-5 flex -rotate-1 items-center justify-center gap-3 rounded-full border-2 border-ink bg-pink-pop px-5 py-2.5 font-[family-name:var(--font-fredoka)] text-[11px] font-semibold uppercase tracking-[0.1em] text-white shadow-[3px_3px_0_var(--ink)]">
        <span className="h-2 w-2 rounded-full bg-white"></span>
        Bundle & save — pick your pack
        <span className="h-2 w-2 rounded-full bg-white"></span>
      </legend>

      <div className="space-y-2.5">
        {tiers.map((tier) => {
          const isOn = selectedId === tier.id;
          const totalItems = tier.payQty + tier.freeQty;

          return (
            <button
              key={tier.id}
              type="button"
              role="radio"
              aria-checked={isOn}
              onClick={() => onSelect(tier.id)}
              className={`relative w-full rounded-[18px] border-[2.5px] border-ink px-4 py-3.5 text-left transition-all duration-200 ${isOn
                  ? "bg-sun-soft shadow-[3px_3px_0_var(--ink)]"
                  : "bg-white hover:shadow-[2px_2px_0_var(--ink)]"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <span
                  className={`absolute -top-2.5 right-3 -rotate-3 rounded-full border-2 border-ink px-2 py-0.5 font-[family-name:var(--font-fredoka)] text-[10px] font-semibold uppercase tracking-wide text-white ${tier.badge === "Best Value"
                      ? "bg-ink"
                      : "bg-pink-pop"
                    }`}
                >
                  {tier.badge}
                </span>
              )}

              <div className="flex items-center gap-3">
                {/* Radio circle */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink transition ${isOn
                      ? "bg-ink"
                      : "bg-white"
                    }`}
                >
                  {isOn && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-ink sm:text-base">
                      {tier.title}
                    </p>
                    {tier.freeShipping && (
                      <p className="text-xs font-bold text-pink-pop">
                        + FREE SHIPPING
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <p className="font-[family-name:var(--font-fredoka)] text-base font-semibold tabular-nums text-ink sm:text-lg">
                        {moneyUsd(tier.totalPriceUsd)}
                      </p>
                      {tier.compareAtTotalUsd && (
                        <p className="text-xs tabular-nums text-ink-2 line-through">
                          {moneyUsd(tier.compareAtTotalUsd)}
                        </p>
                      )}
                    </div>
                    {totalItems > 1 && (
                      <p className="text-[11px] font-bold text-ink-2">
                        Only {moneyUsd(tier.perBoxUsd)} per box
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bonus product */}
              {tier.bonusProduct && tier.bonusQty && (
                <div className="mt-2 ml-8 flex items-center gap-2 rounded-[12px] border-2 border-ink bg-ink px-3 py-2">
                  <Image
                    src="/needoh1.png"
                    alt={tier.bonusProduct}
                    width={28}
                    height={28}
                    className="rounded object-contain"
                    style={{ width: "auto", height: "auto" }}
                  />
                  <span className="text-xs font-bold text-white">
                    Guaranteed: {tier.bonusQty} {tier.bonusProduct}
                    {tier.bonusQty > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
