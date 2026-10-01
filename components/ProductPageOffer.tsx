"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { christmasCutoffNotice } from "@/lib/campaigns";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import { fireEcomEvent, fireGtagConversion } from "@/lib/gtag";
import type { ProductSizeOption } from "@/lib/data";
import { mysteryDumplingBundles, getProductBundles } from "@/lib/data";
import {
  FREE_DELIVERY_THRESHOLD_USD,
  qualifiesForFreeDeliverySubtotal,
} from "@/lib/delivery";
import { useCartStore } from "@/lib/store/use-cart-store";
import { BundleTierSelector } from "@/components/BundleTierSelector";

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

const emptySubscribe = () => () => {};

/**
 * "Order today → arrives Oct 8–12" (US estimate: 1–2 days packing + 3–7 days
 * transit). Pages are statically generated, so the dates are computed on the
 * client after hydration — never baked stale into the build.
 */
function ArrivalEstimate() {
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  if (!hydrated) return null;

  const fmt = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  const start = new Date();
  start.setDate(start.getDate() + 4);
  const end = new Date();
  end.setDate(end.getDate() + 9);
  const cutoff = christmasCutoffNotice();

  return (
    <>
      <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-tight text-ink">
        <span aria-hidden className="text-sm">📦</span>
        Order today → arrives {fmt(start)}–{fmt(end)} (US)
      </p>
      {cutoff && (
        <p className="flex items-center gap-1.5 text-xs font-black uppercase tracking-tight text-pink-pop">
          <span aria-hidden className="text-sm">🎄</span>
          {cutoff}
        </p>
      )}
    </>
  );
}

function moneyUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function isVideoAsset(src: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(src);
}

export function ProductPageOffer({ id, className = "", offer }: ProductPageOfferProps) {
  const putLine = useCartStore((s) => s.putLine);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const isMysteryDumpling = offer.id === "squishybun-mystery-dumpling";

  /* ── Bundle tier state ── */
  const bundles = useMemo(() => {
    if (isMysteryDumpling) return mysteryDumplingBundles;
    return getProductBundles(offer.id, offer.options[0]?.priceUsd || 0);
  }, [isMysteryDumpling, offer.id, offer.options]);

  const defaultBundle = bundles.find((b) => b.defaultSelected) ?? bundles[0];
  const [selectedBundleId, setSelectedBundleId] = useState(defaultBundle.id);

  const selectedBundle = useMemo(
    () => bundles.find((b) => b.id === selectedBundleId) ?? defaultBundle,
    [selectedBundleId, bundles, defaultBundle],
  );

  const primaryImage = offer.images[0];
  const secondaryImages = offer.images.slice(1);

  // GA4: one view_item per product page view (external system — no state).
  useEffect(() => {
    const base = bundles[0];
    if (!base) return;
    fireEcomEvent("view_item", base.totalPriceUsd, [
      {
        item_id: offer.id,
        item_name: offer.name,
        price: base.totalPriceUsd,
        quantity: 1,
      },
    ]);
  }, [offer.id, offer.name, bundles]);

  /* ── Pricing logic ── */
  const subtotalUsd = selectedBundle.totalPriceUsd;
  const deliveryFree = !!selectedBundle.freeShipping || qualifiesForFreeDeliverySubtotal(subtotalUsd);
  const deliveryLineUsd = deliveryFree ? 0 : offer.deliveryUsd;
  const estimatedTotalUsd = subtotalUsd + deliveryLineUsd;
  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD_USD - subtotalUsd);

  function addToCart() {
    setCheckoutError(null);
    putLine({
      id: selectedBundle.id,
      name: `${offer.name} (${selectedBundle.title})`,
      unitPriceUsd: subtotalUsd,
      quantity: 1,
    });
    fireEcomEvent("add_to_cart", subtotalUsd, [
      {
        item_id: selectedBundle.id,
        item_name: `${offer.name} (${selectedBundle.title})`,
        price: subtotalUsd,
        quantity: 1,
      },
    ]);
  }

  async function startStripeCheckout() {
    setCheckoutError(null);
    setCheckoutLoading(true);
    fireGtagConversion();
    fireEcomEvent("begin_checkout", subtotalUsd, [
      {
        item_id: selectedBundle.id,
        item_name: `${offer.name} (${selectedBundle.title})`,
        price: subtotalUsd,
        quantity: 1,
      },
    ]);
    try {
      const checkoutId = selectedBundle.id;
      await redirectToStripeCheckout(checkoutId, 1);
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : "Something went wrong");
      setCheckoutLoading(false);
    }
  }

  return (
    <section
      id={id}
      className={`bg-cream ${className}`.trim()}
    >
      <div className="sticker-card grid gap-5 p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:p-8">
        <div className="flex flex-col gap-2 lg:sticky lg:top-24 lg:self-start">
          {primaryImage && (
            <div className="group relative aspect-square w-full overflow-hidden rounded-[28px] border-[3px] border-ink bg-white shadow-[4px_4px_0_var(--ink)]">
              <Image
                src={primaryImage}
                alt={`${offer.name} — main`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
                preload
              />
            </div>
          )}
          {secondaryImages.length > 0 && (
            <div className="mt-1 grid grid-cols-2 gap-2.5 sm:gap-3">
              {secondaryImages.map((src, i) => (
                <div
                  key={src}
                  className="relative aspect-square overflow-hidden rounded-[18px] border-[2.5px] border-ink bg-white shadow-[3px_3px_0_var(--ink)]"
                >
                  {isVideoAsset(src) ? (
                    <video
                      src={src}
                      className="absolute inset-0 h-full w-full object-cover"
                      muted
                      playsInline
                      loop
                      autoPlay
                      preload="metadata"
                      aria-label={`${offer.name} — ${i + 2}`}
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={`${offer.name} — ${i + 2}`}
                      fill
                      sizes="(max-width: 1024px) 45vw, 240px"
                      className="object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-col">
          <header className="space-y-2 border-b-2 border-ink/10 pb-4">
            <span className="inline-flex w-fit -rotate-3 rounded-full border-2 border-ink bg-mint px-2.5 py-0.5 font-[family-name:var(--font-fredoka)] text-[10px] font-semibold uppercase tracking-wider text-ink">
              In stock
            </span>
            <h1 className="font-[family-name:var(--font-fredoka)] text-2xl font-semibold leading-[1.15] tracking-tight text-ink sm:text-3xl">
              {offer.name}
            </h1>
            <p className="max-w-xl text-sm font-semibold leading-relaxed text-ink-2 sm:text-[0.9375rem]">
              {offer.description}
            </p>
          </header>

          <div className="mt-4 rounded-[18px] border-2 border-ink bg-cream p-4 sm:p-5">
            <div className="space-y-4">

              {/* ── Bundle Tiers (All Products) ── */}
              <BundleTierSelector
                tiers={bundles}
                selectedId={selectedBundle.id}
                onSelect={setSelectedBundleId}
              />

              <div className="overflow-hidden rounded-[18px] border-[2.5px] border-ink bg-white shadow-[3px_3px_0_var(--ink)]">
                <div className="border-b-2 border-ink bg-sun-soft px-4 py-2 text-center">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-ink-2">
                    Taxes included where applicable
                  </p>
                </div>
                <div className="p-4 space-y-5">
                  {/* Subtotal */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-ink-2">Subtotal</span>
                      <span className="h-px flex-1 mx-3 border-t-2 border-dashed border-ink/20"></span>
                      <span className="text-sm font-black text-ink tabular-nums">
                        {moneyUsd(subtotalUsd)}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-ink-2">
                      {selectedBundle.title}
                    </p>
                  </div>

                  {/* Delivery */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm" aria-hidden>🚚</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-ink-2">Delivery</span>
                      </div>
                      <span className="h-px flex-1 mx-3 border-t-2 border-dashed border-ink/20"></span>
                      {deliveryFree ? (
                        <span className="rounded-full border-2 border-ink bg-mint px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-ink">Free</span>
                      ) : (
                        <span className="text-sm font-black text-ink tabular-nums">
                          {moneyUsd(offer.deliveryUsd)}
                        </span>
                      )}
                    </div>
                    {!deliveryFree && amountToFreeDelivery > 0 && (
                      <p className="flex items-center gap-1.5 text-xs font-black text-ink uppercase tracking-tight">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink bg-sun text-[10px] font-black text-ink">!</span>
                        Only {moneyUsd(amountToFreeDelivery)} for free delivery
                      </p>
                    )}
                    {deliveryFree && (
                      <p className="flex items-center gap-1.5 text-xs font-black text-ink uppercase tracking-tight">
                        <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-ink bg-mint text-[10px] font-black text-ink">✓</span>
                        Free delivery applied to this order.
                      </p>
                    )}
                    <ArrivalEstimate />
                  </div>

                  {/* Total Section */}
                  <div className="mt-2 border-t-2 border-ink/10 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <span className="block font-[family-name:var(--font-fredoka)] text-base font-semibold uppercase tracking-tight text-ink">Total</span>
                        <span className="block text-[10px] font-bold text-ink-2 uppercase tracking-widest">No hidden fees</span>
                      </div>
                      <div className="text-right">
                        <span className="font-[family-name:var(--font-fredoka)] text-3xl font-semibold tabular-nums tracking-tight text-ink">
                          {moneyUsd(estimatedTotalUsd)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {checkoutError && (
                <p className="text-sm font-bold text-pink-pop" role="alert">
                  {checkoutError}
                </p>
              )}

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={addToCart}
                  className="btn-squish btn-white min-h-[3rem] w-full text-sm uppercase tracking-wide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={startStripeCheckout}
                  disabled={checkoutLoading}
                  className="btn-squish min-h-[3rem] w-full text-sm uppercase tracking-wide"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                  {checkoutLoading ? "Redirecting…" : "Buy now"}
                </button>
              </div>

              {/* Payment method icons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
                <span className="text-[10px] font-bold text-ink-2 uppercase tracking-wider">Secure checkout</span>
                <div className="flex items-center gap-2">
                  {/* Google Pay */}
                  <div className="flex items-center justify-center h-7 w-11 rounded-lg border-2 border-ink bg-white">
                    <Image
                      src="/google-pay.png"
                      alt="Google Pay"
                      width={28}
                      height={18}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  {/* Apple Pay */}
                  <div className="flex items-center justify-center h-7 w-11 rounded-lg border-2 border-ink bg-white">
                    <Image
                      src="/apple-pay.png"
                      alt="Apple Pay"
                      width={28}
                      height={18}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  {/* Visa */}
                  <div className="flex items-center justify-center h-7 w-11 rounded-lg border-2 border-ink bg-white">
                    <Image
                      src="/visa.png"
                      alt="Visa"
                      width={28}
                      height={18}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  {/* Mastercard */}
                  <div className="flex items-center justify-center h-7 w-11 rounded-lg border-2 border-ink bg-white">
                    <Image
                      src="/mastercard.png"
                      alt="Mastercard"
                      width={28}
                      height={18}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                  {/* American Express */}
                  <div className="flex items-center justify-center h-7 w-11 rounded-lg border-2 border-ink bg-white">
                    <Image
                      src="/american-express.png"
                      alt="American Express"
                      width={28}
                      height={18}
                      className="object-contain"
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-5 border-t-2 border-ink/10 pt-5">
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-fredoka)] text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                Details
              </h3>
              <ul className="mt-3 space-y-2">
                {offer.details.map((line) => (
                  <li key={line} className="flex gap-2.5 text-sm font-semibold text-ink-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pink-pop" />
                    <span className="leading-relaxed">{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <h3 className="font-[family-name:var(--font-fredoka)] text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-2">
                Specs
              </h3>
              <dl className="mt-3 divide-y-2 divide-ink/10 overflow-hidden rounded-[16px] border-2 border-ink bg-cream">
                {offer.specs.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-x-4 gap-y-1 px-3 py-2.5 text-sm sm:grid-cols-[minmax(0,8.5rem)_minmax(0,1fr)] sm:items-start sm:px-4"
                  >
                    <dt className="font-semibold text-ink-2 sm:pt-0.5">{row.label}</dt>
                    <dd className="min-w-0 font-bold leading-snug text-ink sm:text-right">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky buy bar — synced to the selected bundle (audit C09) */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t-[2.5px] border-ink bg-[rgba(255,246,234,0.96)] p-3 backdrop-blur-md md:hidden">
        <div className="mx-auto flex max-w-lg items-center gap-3">
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[11px] font-bold uppercase tracking-wide text-ink-2">
              {selectedBundle.title}
            </p>
            <p className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
              {moneyUsd(estimatedTotalUsd)}
            </p>
          </div>
          <button
            type="button"
            onClick={addToCart}
            className="btn-squish shrink-0 text-sm uppercase tracking-wide"
          >
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
