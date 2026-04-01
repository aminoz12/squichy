"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import type { ProductSizeOption } from "@/lib/data";
import { qualifiesForFreeDeliverySubtotalEur } from "@/lib/delivery";
import { useCartStore } from "@/lib/store/use-cart-store";

export type ProductPageOfferData = {
  id: string;
  name: string;
  description: string;
  images: readonly string[];
  deliveryEuro: number;
  details: readonly string[];
  specs: readonly { label: string; value: string }[];
  options: readonly ProductSizeOption[];
};

type ProductPageOfferProps = {
  id?: string;
  className?: string;
  offer: ProductPageOfferData;
};

function moneyEuro(n: number) {
  return `${n.toFixed(2)} €`;
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

  const subtotalEur = selected.priceEuro * quantity;
  const deliveryFree = qualifiesForFreeDeliverySubtotalEur(subtotalEur);
  const deliveryLineEur = deliveryFree ? 0 : offer.deliveryEuro;

  function addToCart() {
    setCheckoutError(null);
    const opt =
      offer.options.find((o) => o.id === selected.id) ?? offer.options[0];
    if (!opt) return;
    putLine({
      id: opt.id,
      name: `${offer.name} (${opt.label})`,
      unitPriceEuro: opt.priceEuro,
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
    <section id={id} className={className}>
      <div className="grid gap-8 rounded-3xl border border-pink-100 bg-white p-5 shadow-xl shadow-pink-200/25 lg:grid-cols-2 lg:gap-10 lg:p-8">
        <div className="flex flex-col gap-3">
          {primaryImage && (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-pink-100 bg-pink-50 shadow-lg">
              <Image
                src={primaryImage}
                alt={`${offer.name} — main`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          )}
          {secondaryImages.length > 0 && (
            <div className="grid grid-cols-2 gap-3">
              {secondaryImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-2xl border border-pink-100 bg-pink-50 shadow-md"
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

        <div className="flex flex-col">
          <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-foreground sm:text-3xl">
            {offer.name}
          </h2>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-muted sm:text-base">
            {offer.description}
          </p>

          <h3 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-foreground">
            Details
          </h3>
          <ul className="mt-2 space-y-2">
            {offer.details.map((line) => (
              <li key={line} className="flex gap-2 text-sm font-semibold text-muted">
                <span className="mt-0.5 shrink-0 text-primary-dark">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-foreground">
            Specs
          </h3>
          <ul className="mt-2 space-y-2">
            {offer.specs.map((row) => (
              <li
                key={row.label}
                className="flex justify-between gap-4 border-b border-pink-100/80 py-1.5 text-sm last:border-0"
              >
                <span className="font-bold text-muted">{row.label}</span>
                <span className="text-right font-semibold text-foreground">{row.value}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              Size
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {offer.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedSizeId(opt.id)}
                  className={`rounded-xl border px-4 py-2 text-sm font-extrabold transition ${
                    selected.id === opt.id
                      ? "border-accent bg-accent text-white shadow-md"
                      : "border-pink-200 bg-white text-foreground hover:border-accent/40"
                  }`}
                >
                  {opt.label} — {moneyEuro(opt.priceEuro)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <p className="text-xs font-extrabold uppercase tracking-wider text-foreground">
              Quantity
            </p>
            <div className="mt-2 flex max-w-xs items-center gap-2">
              <button
                type="button"
                onClick={() => bumpQty(-1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-200 bg-white text-lg font-bold text-foreground hover:bg-pink-50"
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
                className="h-11 w-20 rounded-xl border border-pink-200 text-center text-base font-extrabold"
              />
              <button
                type="button"
                onClick={() => bumpQty(1)}
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-pink-200 bg-white text-lg font-bold text-foreground hover:bg-pink-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <p className="text-sm font-semibold text-muted">
              {deliveryFree ? (
                <span className="text-emerald-700">
                  This order qualifies for free delivery.
                </span>
              ) : (
                <>
                  Delivery {moneyEuro(offer.deliveryEuro)} — free when your
                  subtotal reaches the equivalent of $50 USD (see banner above).
                </>
              )}
              {" "}
              Estimated total:{" "}
              <span className="font-extrabold text-foreground">
                {moneyEuro(subtotalEur + deliveryLineEur)}
              </span>
            </p>
            {checkoutError && (
              <p className="text-sm font-semibold text-red-600" role="alert">
                {checkoutError}
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={addToCart}
                className="inline-flex w-full min-h-[3.25rem] items-center justify-center rounded-2xl border-2 border-pink-200 bg-white px-8 py-3.5 text-center text-base font-extrabold text-foreground shadow-sm transition hover:border-accent/40 enabled:active:scale-[0.99] sm:w-auto sm:min-w-[14rem]"
              >
                Add to cart
              </button>
              <button
                type="button"
                onClick={startStripeCheckout}
                disabled={checkoutLoading}
                className="inline-flex w-full min-h-[3.25rem] items-center justify-center rounded-2xl bg-accent px-8 py-3.5 text-center text-base font-extrabold text-white shadow-lg shadow-accent/30 transition hover:opacity-95 enabled:active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-[14rem]"
              >
                {checkoutLoading ? "Redirecting…" : "Buy now"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
