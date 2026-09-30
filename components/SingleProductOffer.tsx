"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import { fireGtagConversion } from "@/lib/gtag";
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
    fireGtagConversion();
    try {
      await redirectToStripeCheckout(selected.id, 1);
    } catch {
      setCheckoutLoading(false);
    }
  }

  const pickerPanel = showPicker && (
    <div className="sticker-card mt-5 p-4">
      <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold uppercase tracking-wider text-ink">
        Choose size
      </p>
      <div className="mt-3 grid gap-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`flex cursor-pointer items-center justify-between rounded-[14px] border-2 border-ink px-3 py-2 text-sm font-bold ${
              selected.id === opt.id
                ? "bg-sun-soft text-ink shadow-[2px_2px_0_var(--ink)]"
                : "bg-white text-ink-2"
            }`}
          >
            <span>
              {opt.label} - {moneyUsd(opt.priceUsd)}
            </span>
            <input
              className="h-4 w-4 accent-pink-pop"
              type="radio"
              name="size"
              checked={selected.id === opt.id}
              onChange={() => setSelectedSizeId(opt.id)}
            />
          </label>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-sm font-semibold text-ink">
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
          className="btn-squish w-full text-sm"
        >
          Add to cart
        </button>
        <button
          type="button"
          disabled={checkoutLoading}
          onClick={buyNow}
          className="btn-squish btn-white w-full text-sm"
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
          <div className="sticker-card p-6 sm:p-8">
            <div className="flex flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-10">
              <div className="relative mx-auto aspect-square w-full max-w-[min(100%,420px)] overflow-hidden rounded-[28px] border-[3px] border-ink bg-pink-soft shadow-[4px_4px_0_var(--ink)] md:mx-0 md:max-w-[420px] md:shrink-0 lg:max-w-[460px]">
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
                  className="btn-squish w-full text-lg uppercase tracking-wide md:min-h-[4.5rem] md:text-xl"
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
      <div className="sticker-card p-5 sm:p-7">
        <p className="eyebrow-pill text-xs uppercase tracking-widest">
          Product
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink sm:text-4xl">
          {name}
        </h2>
        <p className="mt-3 max-w-3xl text-sm font-semibold text-ink-2 sm:text-base">
          {description}
        </p>

        {images.length > 1 && (
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {images.map((src, i) => (
              <button
                type="button"
                key={src}
                onClick={() => setImageIndex(i)}
                className={`relative aspect-square overflow-hidden rounded-[16px] border-2 ${
                  imageIndex === i ? "border-ink" : "border-transparent"
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
          className={`relative aspect-[4/3] overflow-hidden rounded-[28px] border-[3px] border-ink bg-pink-soft shadow-[4px_4px_0_var(--ink)] ${
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
            className="btn-squish w-full text-sm"
          >
            Buy now
          </button>
        </div>

        {pickerPanel}
      </div>
    </section>
  );
}
