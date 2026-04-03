"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import type { ProductSizeOption } from "@/lib/data";
import { qualifiesForFreeDeliverySubtotal } from "@/lib/delivery";
import { useCartStore } from "@/lib/store/use-cart-store";

type SingleProductOfferProps = {
  id?: string;
  className?: string;
  /** Index: small card + Buy now only. Product page: full layout. */
  variant?: "full" | "compact";
  name: string;
  description: string;
  images: readonly string[];
  deliveryUsd: number;
  options: readonly ProductSizeOption[];
};

function moneyUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export function SingleProductOffer({
  id,
  className = "",
  variant = "full",
  name,
  description,
  images,
  deliveryUsd,
  options,
}: SingleProductOfferProps) {
  const addTier = useCartStore((s) => s.addTier);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState(options[0]?.id ?? "");
  const [imageIndex, setImageIndex] = useState(0);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const selected = useMemo(
    () => options.find((o) => o.id === selectedSizeId) ?? options[0],
    [options, selectedSizeId],
  );

  if (!selected) return null;
  const subtotalUsd = selected.priceUsd;
  const deliveryFree = qualifiesForFreeDeliverySubtotal(subtotalUsd);
  const deliveryCharge = deliveryFree ? 0 : deliveryUsd;
  const total = subtotalUsd + deliveryCharge;
  const heroSrc = images[imageIndex] ?? images[0];

  async function buyNow() {
    setCheckoutLoading(true);
    try {
      await redirectToStripeCheckout(selected.id, 1);
    } catch {
      setCheckoutLoading(false);
    }
  }

  const pickerPanel = showPicker && (
    <div className="mt-5 rounded-2xl border border-pink-100 bg-pink-50/40 p-4">
      <p className="text-sm font-extrabold uppercase tracking-wider text-foreground">
        Choose size
      </p>
      <div className="mt-3 grid gap-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center justify-between rounded-xl border px-3 py-2 text-sm font-bold ${
              selected.id === opt.id
                ? "border-accent bg-white text-foreground"
                : "border-pink-100 bg-white text-muted"
            }`}
          >
            <span>
              {opt.label} - {moneyUsd(opt.priceUsd)}
            </span>
            <input
              className="h-4 w-4 accent-violet-600"
              type="radio"
              name="size"
              checked={selected.id === opt.id}
              onChange={() => setSelectedSizeId(opt.id)}
            />
          </label>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-sm font-semibold text-foreground">
        <p>
          Product: <strong>{moneyUsd(selected.priceUsd)}</strong>
        </p>
        <p>
          Delivery:{" "}
          <strong>
            {deliveryFree ? "FREE" : moneyUsd(deliveryUsd)}
          </strong>
        </p>
        <p className="text-base">
          Total: <strong>{moneyUsd(total)}</strong>
        </p>
      </div>

      <div className="mt-4 grid gap-2 sm:max-w-sm">
        <button
          type="button"
          onClick={() =>
            addTier({
              id: selected.id,
              name: `${name} (${selected.label})`,
              unitPriceUsd: selected.priceUsd,
            })
          }
          className="w-full rounded-2xl bg-foreground py-3.5 text-center text-sm font-extrabold text-white shadow-lg transition hover:opacity-95 active:scale-[0.99]"
        >
          Add to cart
        </button>
        <button
          type="button"
          disabled={checkoutLoading}
          onClick={buyNow}
          className="w-full rounded-2xl border-2 border-pink-200 py-3 text-center text-sm font-extrabold text-foreground transition hover:border-accent/50 disabled:opacity-60"
        >
          {checkoutLoading ? "Redirecting…" : "Buy now"}
        </button>
      </div>
    </div>
  );

  if (variant === "compact") {
    return (
      <section id={id} className={className}>
        <div className="mx-auto w-full max-w-xl md:max-w-2xl">
          <div className="rounded-[2rem] border border-pink-100/90 bg-gradient-to-br from-white via-white to-primary/15 p-6 shadow-[0_24px_70px_-20px_rgba(236,72,153,0.45)] ring-1 ring-pink-100/70 sm:p-8">
            <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-10">
              <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-3xl border-[3px] border-white shadow-2xl shadow-pink-300/45 ring-2 ring-pink-100/90 md:mx-0 md:max-w-[420px] md:shrink-0 lg:max-w-[460px]">
                <Image
                  src={heroSrc}
                  alt={name}
                  fill
                  sizes="(max-width: 768px) 92vw, 460px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowPicker((v) => !v)}
                  className="w-full rounded-2xl bg-accent px-8 py-5 text-center text-lg font-extrabold text-white shadow-xl shadow-accent/40 transition hover:scale-[1.02] hover:opacity-95 active:scale-[0.98] md:min-h-[4.5rem] md:text-xl"
                >
                  Buy now
                </button>
              </div>
            </div>
          </div>
          {pickerPanel}
        </div>
      </section>
    );
  }

  return (
    <section id={id} className={className}>
      <div className="rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-pink-200/30 sm:p-7">
        <p className="text-sm font-extrabold uppercase tracking-widest text-accent">
          Product
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
          {name}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-muted sm:text-base">
          {description}
        </p>

        {images.length > 1 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {images.map((src, i) => (
              <button
                type="button"
                key={src}
                onClick={() => setImageIndex(i)}
                className={`relative aspect-square overflow-hidden rounded-2xl border ${
                  imageIndex === i ? "border-accent" : "border-pink-100"
                }`}
              >
                <Image
                  src={src}
                  alt={`${name} image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}

        <div
          className={`relative aspect-[4/3] overflow-hidden rounded-2xl border border-pink-100 bg-pink-50 ${
            images.length > 1 ? "mt-4" : "mt-6"
          }`}
        >
          <Image
            src={heroSrc}
            alt={`${name} preview`}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover"
          />
        </div>

        <div className="mt-6 grid gap-2 sm:max-w-sm">
          <button
            type="button"
            onClick={() => setShowPicker((v) => !v)}
            className="w-full rounded-2xl bg-accent py-3.5 text-center text-sm font-extrabold text-white shadow-lg shadow-accent/25 transition hover:opacity-95"
          >
            Buy now
          </button>
        </div>

        {pickerPanel}
      </div>
    </section>
  );
}
