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

function moneyWhole(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export function BundleTierSelector({ tiers, selectedId, onSelect }: Props) {
  return (
    <fieldset className="space-y-0">
      <legend className="mx-auto mb-5 flex items-center justify-center gap-3 rounded-full bg-red-600 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.1em] text-white shadow-[0_4px_12px_rgba(220,38,38,0.25)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
        Low Stock ~ Selling Fast
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
        </span>
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
              className={`relative w-full rounded-xl border-2 px-4 py-3.5 text-left transition-all duration-200 ${isOn
                  ? "border-slate-900 bg-white shadow-[0_2px_12px_rgba(0,0,0,0.1)]"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
            >
              {/* Badge */}
              {tier.badge && (
                <span
                  className={`absolute -top-2.5 right-3 rounded px-2 py-0.5 text-[10px] font-black uppercase tracking-wide text-white ${tier.badge === "Best Value"
                      ? "bg-emerald-600"
                      : "bg-amber-500"
                    }`}
                >
                  {tier.badge}
                </span>
              )}

              <div className="flex items-center gap-3">
                {/* Radio circle */}
                <div
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition ${isOn
                      ? "border-slate-900 bg-slate-900"
                      : "border-slate-300 bg-white"
                    }`}
                >
                  {isOn && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-bold text-slate-900 sm:text-base">
                      {tier.title}
                    </p>
                    {tier.freeShipping && (
                      <p className="text-xs text-emerald-600 font-bold">
                        + FREE SHIPPING
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="flex items-baseline justify-end gap-1.5">
                      <p className="text-base font-black tabular-nums text-slate-900 sm:text-lg">
                        {moneyWhole(tier.totalPriceUsd)}
                      </p>
                      {tier.compareAtTotalUsd && (
                        <p className="text-xs tabular-nums text-slate-400 line-through">
                          {moneyWhole(tier.compareAtTotalUsd)}
                        </p>
                      )}
                    </div>
                    {totalItems > 1 && (
                      <p className="text-[11px] font-semibold text-emerald-600">
                        Only {moneyUsd(tier.perBoxUsd)} per box
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Bonus product */}
              {tier.bonusProduct && tier.bonusQty && (
                <div className="mt-2 ml-8 flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2">
                  <Image
                    src="/needoh1.png"
                    alt={tier.bonusProduct}
                    width={28}
                    height={28}
                    className="rounded object-contain"
                  />
                  <span className="text-xs font-bold text-white">
                    Guaranteed: {tier.bonusQty} {tier.bonusProduct}
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
