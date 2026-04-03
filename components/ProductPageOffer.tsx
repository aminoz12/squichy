"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import type { ProductSizeOption } from "@/lib/data";
import {
  FREE_DELIVERY_THRESHOLD_USD,
  qualifiesForFreeDeliverySubtotal,
} from "@/lib/delivery";
import { useCartStore } from "@/lib/store/use-cart-store";

export type ProductPageOfferData = {
  id: string;
  name: string;
  description: string;
  images: readonly string[];
  deliveryUsd: number;
  details: readonly string[];
  specs: readonly { label: string; value: string }[];
  options: readonly ProductSizeOption[];
};

type ProductPageOfferProps = {
  id?: string;
  className?: string;
  offer: ProductPageOfferData;
};

function moneyUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

/** Fixed order: hero is always big1; row below is big2 + big3 (not `images[0]`, so data order can’t flip them). */
const GALLERY_PRIMARY = "/big1.png";
const GALLERY_THUMBNAILS = ["/big2.png", "/big3.png"] as const;

export function ProductPageOffer({ id, className = "", offer }: ProductPageOfferProps) {
  const putLine = useCartStore((s) => s.putLine);
  const [selectedSizeId, setSelectedSizeId] = useState(offer.options[0]?.id ?? "");
  const [quantity, setQuantity] = useState(1);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const selected = useMemo(
    () => offer.options.find((o) => o.id === selectedSizeId) ?? offer.options[0],
    [offer.options, selectedSizeId],
  );

  if (!selected) return null;

  const primaryImage = offer.images.includes(GALLERY_PRIMARY)
    ? GALLERY_PRIMARY
    : (offer.images[0] ?? GALLERY_PRIMARY);
  const secondaryImages = GALLERY_THUMBNAILS.filter((src) => offer.images.includes(src));

  const bumpQty = (delta: number) => {
    setQuantity((q) => Math.min(99, Math.max(1, q + delta)));
  };

  const subtotalUsd = selected.priceUsd * quantity;
  const deliveryFree = qualifiesForFreeDeliverySubtotal(subtotalUsd);
  const deliveryLineUsd = deliveryFree ? 0 : offer.deliveryUsd;
  const estimatedTotalUsd = subtotalUsd + deliveryLineUsd;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD_USD - subtotalUsd);

  function addToCart() {
    setCheckoutError(null);
    const opt =
      offer.options.find((o) => o.id === selected.id) ?? offer.options[0];
    if (!opt) return;
    putLine({
      id: opt.id,
      name: `${offer.name} (${opt.label})`,
      unitPriceUsd: opt.priceUsd,
      quantity,
    });
  }

  async function startStripeCheckout() {
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      await redirectToStripeCheckout(selected.id, quantity);
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Something went wrong");
      setCheckoutLoading(false);
    }
  }

  return (
    <section
      id={id}
      className={`bg-gradient-to-b from-violet-50/35 via-white to-amber-50/25 ${className}`.trim()}
    >
      <div className="grid gap-8 rounded-[1.75rem] border border-white/90 bg-white/95 p-5 shadow-[0_28px_90px_-40px_rgba(76,29,149,0.35)] ring-1 ring-violet-100/60 backdrop-blur-sm sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 lg:p-10">
        <div className="flex flex-col gap-3 lg:sticky lg:top-28 lg:self-start">
          {primaryImage && (
            <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-slate-100 to-violet-50/40 shadow-md ring-1 ring-slate-200/70">
              <Image
                src={primaryImage}
                alt={`${offer.name} — main`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                priority
              />
            </div>
          )}
          {secondaryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {secondaryImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/70"
                >
                  <Image
                    src={src}
                    alt={`${offer.name} — ${i + 2}`}
                    fill
                    sizes="(max-width: 1024px) 45vw, 240px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <header className="space-y-2 border-b border-slate-100/90 pb-6">
            <span className="inline-flex w-fit rounded-full bg-violet-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-violet-800">
              In stock
            </span>
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold leading-[1.15] tracking-tight text-slate-900 sm:text-3xl">
              {offer.name}
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
              {offer.description}
            </p>
          </header>

          <div className="mt-6 rounded-2xl border border-slate-200/70 bg-gradient-to-b from-slate-50/50 to-white p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-5">
            <div className="space-y-5">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Size
                </p>
                <div
                  className="mt-2 flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Choose size"
                >
                  {offer.options.map((opt) => {
                    const isOn = selected.id === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="radio"
                        aria-checked={isOn}
                        onClick={() => setSelectedSizeId(opt.id)}
                        className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition ${
                          isOn
                            ? "border-violet-600 bg-violet-600 text-white shadow-md shadow-violet-600/20"
                            : "border-slate-200 bg-white text-slate-800 hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <span>{opt.label}</span>
                        <span
                          className={`tabular-nums text-xs font-bold ${
                            isOn ? "text-white/90" : "text-slate-500"
                          }`}
                        >
                          {moneyUsd(opt.priceUsd)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                  Quantity
                </p>
                <div className="inline-flex w-fit items-center rounded-full border border-slate-200 bg-white p-0.5 shadow-sm">
                  <button
                    type="button"
                    onClick={() => bumpQty(-1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-slate-600 transition hover:bg-slate-100"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    value={quantity}
                    onChange={(e) => {
                      const n = Number.parseInt(e.target.value, 10);
                      if (Number.isNaN(n)) setQuantity(1);
                      else setQuantity(Math.min(99, Math.max(1, n)));
                    }}
                    className="h-9 w-12 border-0 bg-transparent text-center text-sm font-black tabular-nums text-slate-900 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => bumpQty(1)}
                    className="flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold text-slate-600 transition hover:bg-slate-100"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-xl border border-slate-200/80 bg-white">
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-3 py-2.5 sm:px-4">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                    Summary
                  </p>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Taxes included where applicable
                  </span>
                </div>
                <div className="space-y-2.5 px-3 py-3 sm:px-4 sm:py-4">
                  <div className="flex items-start justify-between gap-3 text-sm">
                    <span className="text-slate-600">
                      Subtotal
                      <span className="mt-0.5 block text-xs text-slate-400">
                        {quantity} × {selected.label}
                      </span>
                    </span>
                    <span className="font-semibold tabular-nums text-slate-900">
                      {moneyUsd(subtotalUsd)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span
                        className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50 text-sm"
                        aria-hidden
                      >
                        🚚
                      </span>
                      Delivery
                    </span>
                    {deliveryFree ? (
                      <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-emerald-800 ring-1 ring-emerald-100">
                        Free
                      </span>
                    ) : (
                      <span className="font-semibold tabular-nums text-slate-900">
                        {moneyUsd(offer.deliveryUsd)}
                      </span>
                    )}
                  </div>
                  {!deliveryFree && amountToFreeDelivery > 0 && (
                    <p className="rounded-lg bg-violet-50/90 px-2.5 py-2 text-[11px] leading-snug text-violet-950 ring-1 ring-violet-100">
                      <span className="font-semibold">Free delivery</span> from{" "}
                      {moneyUsd(FREE_DELIVERY_THRESHOLD_USD)} subtotal — add{" "}
                      <span className="font-bold tabular-nums">
                        {moneyUsd(amountToFreeDelivery)}
                      </span>{" "}
                      more.
                    </p>
                  )}
                  {deliveryFree && (
                    <p className="flex items-center gap-2 rounded-lg bg-emerald-50/90 px-2.5 py-2 text-[11px] font-medium text-emerald-900 ring-1 ring-emerald-100">
                      <span aria-hidden>✓</span>
                      Free delivery applied to this order.
                    </p>
                  )}
                  <div className="flex items-baseline justify-between border-t border-dashed border-slate-200 pt-3">
                    <span className="text-sm font-bold text-slate-800">Total</span>
                    <span className="text-xl font-black tabular-nums text-slate-900 sm:text-2xl">
                      {moneyUsd(estimatedTotalUsd)}
                    </span>
                  </div>
                </div>
              </div>

              {checkoutError && (
                <p className="text-sm font-semibold text-red-600" role="alert">
                  {checkoutError}
                </p>
              )}

              <div className="grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                <button
                  type="button"
                  onClick={addToCart}
                  className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-slate-800 shadow-sm transition hover:bg-slate-50 enabled:active:scale-[0.99]"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={startStripeCheckout}
                  disabled={checkoutLoading}
                  className="inline-flex min-h-[2.875rem] w-full items-center justify-center rounded-xl bg-[#ffd500] px-4 py-2.5 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/30 transition hover:brightness-105 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {checkoutLoading ? "Redirecting…" : "Buy now"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-8 border-t border-slate-100 pt-8">
            <div className="min-w-0">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Details
              </h3>
              <ul className="mt-3 space-y-2">
                {offer.details.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm text-slate-600">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-violet-400" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
                Specs
              </h3>
              <dl className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-100 bg-white">
                {offer.specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-x-4 gap-y-1 px-3 py-2.5 text-sm sm:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] sm:items-start sm:px-4"
                  >
                    <dt className="font-medium text-slate-500 sm:pt-0.5">{row.label}</dt>
                    <dd className="min-w-0 font-semibold leading-snug text-slate-900 sm:text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
