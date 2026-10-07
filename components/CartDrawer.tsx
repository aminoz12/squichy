"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { redirectToCheckout } from "@/lib/checkout-client";
import { fireEcomEvent, fireGtagConversion } from "@/lib/gtag";
import {
  estimateCartDeliveryUsd,
  resolveStripeCheckoutParams,
} from "@/lib/cart-helpers";
import {
  FREE_DELIVERY_THRESHOLD_USD,
  qualifiesForFreeDeliverySubtotal,
} from "@/lib/delivery";
import { products, type ProductOffer } from "@/lib/data";
import { useCartStore, type CartLine } from "@/lib/store/use-cart-store";

function formatUsd(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

/* ── Reference cart workflow: product lookup + smart recommendations ── */

const productByOptionId = new Map<string, ProductOffer>();
for (const p of products) {
  for (const o of p.options) productByOptionId.set(o.id, p);
}

const GIFT_CATEGORIES = new Set(["Boxes & Gift Sets", "Advent Calendars"]);

const isGiftProduct = (p: ProductOffer) => GIFT_CATEGORIES.has(p.categoryName);
const basePrice = (p: ProductOffer) => p.options[0]?.priceUsd ?? 0;
const feelOf = (p: ProductOffer) =>
  p.specs.find((s) => s.label === "Feel")?.value;
/** Short display name, as the reference does: drop a trailing " Squishy". */
const shortName = (p: ProductOffer) => p.name.replace(/ Squishy(?!\w)/, "");

/** Pieces per bundle, parsed from the option label ("BUY 2, GET 1 FREE" → 3). */
function bundlePieces(label: string): number {
  const m = label.match(/BUY (\d+), GET (\d+)/i);
  if (m) return Number(m[1]) + Number(m[2]);
  return 1;
}

/**
 * Reference `recs()` scoring: top sellers +2, matching feel +1, a collection
 * not yet in the bag +1.5, a price that closes the free-delivery gap +3,
 * cheap add-ons +1. Sorted by score, then price.
 */
function recommend(lines: readonly CartLine[], gift: boolean, gapUsd: number) {
  const inBag = new Set(
    lines
      .map((l) => productByOptionId.get(l.id))
      .filter((p): p is ProductOffer => p != null)
      .map((p) => p.id),
  );
  const bagProducts = [...inBag].map(
    (id) => products.find((p) => p.id === id)!,
  );
  const feels = new Set(bagProducts.map(feelOf).filter(Boolean));
  const cats = new Set(bagProducts.map((p) => p.categoryName));

  const score = (p: ProductOffer) => {
    const price = basePrice(p);
    return (
      (p.badge ? 2 : 0) +
      (feels.has(feelOf(p)) ? 1 : 0) +
      (cats.has(p.categoryName) ? 0 : 1.5) +
      (gapUsd > 0 && price >= gapUsd * 0.6 && price <= gapUsd + 5 ? 3 : 0) +
      (price <= 22 ? 1 : 0)
    );
  };

  return products
    .filter(
      (p) =>
        !inBag.has(p.id) &&
        isGiftProduct(p) === gift &&
        (!gift || basePrice(p) <= 70),
    )
    .sort((a, b) => score(b) - score(a) || basePrice(a) - basePrice(b));
}

/**
 * Slide-over cart. Checkout always uses POST /api/checkout (Stripe Checkout
 * Session) so amount and currency match the cart line — no static Payment Links.
 */
export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeLine = useCartStore((s) => s.removeLine);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const putLine = useCartStore((s) => s.putLine);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showLastChance, setShowLastChance] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const lcContinueRef = useRef<HTMLButtonElement>(null);

  // Keyboard users land inside the dialog when it opens (C19).
  useEffect(() => {
    if (isOpen) closeBtnRef.current?.focus();
  }, [isOpen]);
  useEffect(() => {
    if (showLastChance) lcContinueRef.current?.focus();
  }, [showLastChance]);

  const subtotalUsd = items.reduce(
    (acc, line) => acc + line.unitPriceUsd * line.quantity,
    0,
  );
  const freeDelivery = qualifiesForFreeDeliverySubtotal(subtotalUsd);
  const deliveryUsd = estimateCartDeliveryUsd(items);
  const deliveryIncluded = items.length > 0 && deliveryUsd === 0;
  const estimatedTotalUsd = subtotalUsd + deliveryUsd;

  const shipProgressPct = deliveryIncluded
    ? 100
    : Math.min(100, Math.round((subtotalUsd / FREE_DELIVERY_THRESHOLD_USD) * 100));
  const shipRemainingUsd = Math.max(0, FREE_DELIVERY_THRESHOLD_USD - subtotalUsd);
  const gapUsd = deliveryIncluded ? 0 : shipRemainingUsd;

  const upsells = recommend(items, false, gapUsd).slice(0, 6);
  const giftUpsells = recommend(items, true, gapUsd).slice(0, 5);
  const lastChancePicks = [
    ...recommend(items, false, gapUsd).slice(0, 3),
    ...recommend(items, true, gapUsd).slice(0, 1),
  ];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setShowLastChance((open) => {
        if (!open) closeCart();
        return false;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const quietAdd = useCallback(
    (p: ProductOffer) => {
      const buyOne = p.options[0];
      if (!buyOne) return;
      const existing = useCartStore
        .getState()
        .items.find((l) => l.id === buyOne.id);
      putLine({
        id: buyOne.id,
        name: `${p.name} (${buyOne.label})`,
        unitPriceUsd: buyOne.priceUsd,
        quantity: (existing?.quantity ?? 0) + 1,
      });
      fireEcomEvent("add_to_cart", buyOne.priceUsd, [
        {
          item_id: buyOne.id,
          item_name: `${p.name} (${buyOne.label})`,
          price: buyOne.priceUsd,
          quantity: 1,
        },
      ]);
      setToast("Added to your bag ✨");
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
      toastTimer.current = window.setTimeout(() => setToast(null), 2400);
    },
    [putLine],
  );

  const startCheckout = useCallback(async () => {
    const items = useCartStore.getState().items;
    if (items.length === 0) return;

    // Validate all items can be checked out
    for (const item of items) {
      const resolved = resolveStripeCheckoutParams(item);
      if (!resolved) {
        setShowLastChance(false);
        setCheckoutError(
          `“${item.name}” can’t be checked out. Remove it and add the product again from the shop.`,
        );
        return;
      }
    }

    setCheckoutError(null);
    setCheckoutLoading(true);
    fireGtagConversion();
    fireEcomEvent(
      "begin_checkout",
      items.reduce((acc, l) => acc + l.unitPriceUsd * l.quantity, 0),
      items.map((l) => ({
        item_id: l.id,
        item_name: l.name,
        price: l.unitPriceUsd,
        quantity: l.quantity,
      })),
    );
    try {
      // Send all items to checkout
      const cartItems = items.map((item) => {
        const resolved = resolveStripeCheckoutParams(item)!;
        return {
          id: resolved.sizeId,
          quantity: resolved.quantity,
        };
      });
      await redirectToCheckout(cartItems);
    } catch (e) {
      setShowLastChance(false);
      setCheckoutError(
        e instanceof Error ? e.message : "Checkout could not start",
      );
      setCheckoutLoading(false);
    }
  }, []);

  /**
   * "Last chance" upsell step before payment — only when one small add-on
   * would unlock free delivery (gap ≤ $10), and only once per session.
   * Everyone else goes straight to payment.
   */
  const showLastChanceWorthIt = gapUsd > 0 && gapUsd <= 10;

  const onCheckoutClick = useCallback(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("sb-lc-seen") === "1";
    } catch {
      /* storage unavailable — treat as seen to avoid blocking checkout */
      seen = true;
    }
    if (!seen && showLastChanceWorthIt && lastChancePicks.length > 0) {
      try {
        sessionStorage.setItem("sb-lc-seen", "1");
      } catch {
        /* ignore */
      }
      setShowLastChance(true);
    } else {
      void startCheckout();
    }
  }, [lastChancePicks.length, showLastChanceWorthIt, startCheckout]);

  if (!isOpen) return null;

  return (
        <>
          <button
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-[70] bg-ink/55"
            onClick={closeCart}
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-y-0 right-0 z-[75] flex w-full max-w-md flex-col border-l-[3px] border-ink bg-cream"
          >
            <div className="flex items-center justify-between border-b-[2.5px] border-ink bg-sun px-5 py-4">
              <h2
                id="cart-title"
                className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink"
              >
                Your bag 🥟
              </h2>
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-10 w-10 place-items-center rounded-full border-[2.5px] border-ink bg-white text-base font-bold text-ink transition active:translate-x-[1px] active:translate-y-[1px]"
              >
                ✕
              </button>
            </div>

            {items.length > 0 && (
              <div className="border-b-[2.5px] border-ink bg-white px-5 py-3">
                <p className="text-sm font-bold text-ink">
                  {deliveryIncluded || freeDelivery
                    ? "🎉 You’ve unlocked free delivery!"
                    : `You’re ${formatUsd(shipRemainingUsd)} away from free delivery`}
                </p>
                <div className="mt-2 h-4 overflow-hidden rounded-full border-2 border-ink bg-pink-soft">
                  <div
                    className="h-full rounded-full bg-mint transition-[width] duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)]"
                    style={{ width: `${shipProgressPct}%` }}
                  />
                </div>
              </div>
            )}

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="px-5 py-4">
                {items.length === 0 ? (
                  <p className="text-sm font-semibold text-ink-2">
                    Your bag is empty — pick a bundle on a product page, or add
                    a favorite below. 🥟
                  </p>
                ) : (
                  <ul className="space-y-3">
                    {items.map((line) => {
                      const product = productByOptionId.get(line.id);
                      const pieces = bundlePieces(line.name);
                      return (
                        <li
                          key={line.id}
                          className="grid grid-cols-[64px_1fr] gap-3 rounded-[16px] border-[2.5px] border-ink bg-white p-3"
                        >
                          <div className="relative aspect-square overflow-hidden rounded-[10px] border-2 border-ink bg-white">
                            {product && (
                              <Image
                                src={product.images[0]}
                                alt=""
                                fill
                                sizes="64px"
                                loading="eager"
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold leading-tight text-ink">
                                {line.name}
                              </p>
                              <p className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink">
                                {formatUsd(line.unitPriceUsd * line.quantity)}
                              </p>
                            </div>
                            {pieces > 1 && (
                              <p className="mt-0.5 text-xs font-bold text-ink-2">
                                {line.quantity} bundle{line.quantity > 1 ? "s" : ""} ·{" "}
                                {pieces * line.quantity} squishies total
                              </p>
                            )}
                            <div className="mt-2 flex items-center justify-between">
                              <span className="inline-flex items-center rounded-full border-2 border-ink bg-white">
                                <button
                                  type="button"
                                  aria-label={`Decrease quantity of ${line.name}`}
                                  onClick={() =>
                                    setLineQuantity(line.id, line.quantity - 1)
                                  }
                                  className="h-9 w-9 font-bold text-ink"
                                >
                                  −
                                </button>
                                <span className="min-w-6 text-center text-sm font-extrabold text-ink">
                                  {line.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label={`Increase quantity of ${line.name}`}
                                  onClick={() =>
                                    setLineQuantity(
                                      line.id,
                                      Math.min(99, line.quantity + 1),
                                    )
                                  }
                                  className="h-9 w-9 font-bold text-ink"
                                >
                                  +
                                </button>
                              </span>
                              <button
                                type="button"
                                onClick={() => removeLine(line.id)}
                                className="px-1 py-2 text-xs font-bold text-ink-2 underline underline-offset-2 hover:text-pink-pop"
                              >
                                Remove
                              </button>
                            </div>
                            {!resolveStripeCheckoutParams(line) && (
                              <p className="mt-2 text-xs font-bold text-pink-pop">
                                Remove this line — it uses an old cart format.
                                Add the item again from the product page.
                              </p>
                            )}
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {items.length > 0 && upsells.length > 0 && (
                <UpsellRow
                  title={
                    gapUsd > 0 ? (
                      <>
                        Add <b>{formatUsd(gapUsd)}</b> more for free delivery 🚚
                      </>
                    ) : (
                      <>Squishies people add next 💛</>
                    )
                  }
                  products={upsells}
                  onAdd={quietAdd}
                />
              )}
              {items.length > 0 && giftUpsells.length > 0 && (
                <UpsellRow
                  title={<>Make it a gift 🎁</>}
                  products={giftUpsells}
                  onAdd={quietAdd}
                />
              )}
            </div>

            <div className="border-t-[2.5px] border-ink bg-white p-5">
              <div className="space-y-1 text-sm font-extrabold text-ink">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatUsd(subtotalUsd)}</span>
                </div>
                <div className="flex items-center justify-between text-ink-2">
                  <span>Delivery</span>
                  <span>
                    {deliveryIncluded ? (
                      <span className="font-extrabold text-mint">
                        Free
                      </span>
                    ) : (
                      formatUsd(deliveryUsd)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t-2 border-ink/15 pt-2 font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
                  <span>Estimated total</span>
                  <span>{formatUsd(estimatedTotalUsd)}</span>
                </div>
              </div>
              {checkoutError && (
                <p className="mt-2 text-sm font-bold text-pink-pop" role="alert">
                  {checkoutError}
                </p>
              )}
              <button
                type="button"
                disabled={items.length === 0 || checkoutLoading}
                onClick={onCheckoutClick}
                className="btn-squish mt-4 w-full text-sm"
              >
                {checkoutLoading
                  ? "Redirecting…"
                  : items.length > 0
                    ? `Checkout · ${formatUsd(estimatedTotalUsd)}`
                    : "Checkout"}
              </button>
              <Link
                href="/products"
                onClick={closeCart}
                className="btn-squish btn-white mt-3 w-full text-sm"
              >
                Add more products
              </Link>
            </div>
          </aside>

          {showLastChance && (
            <div
              className="fixed inset-0 z-[85] grid place-items-center bg-ink/60 p-4"
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowLastChance(false);
              }}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="last-chance-title"
                className="modal-pop relative w-full max-w-lg rounded-[30px] border-[3px] border-ink bg-cream p-6 text-center shadow-[8px_8px_0_var(--ink)] sm:p-8"
              >
                <button
                  type="button"
                  onClick={() => setShowLastChance(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border-[2.5px] border-ink bg-white text-base font-bold text-ink"
                >
                  ✕
                </button>
                <span className="eyebrow-pill text-xs uppercase tracking-wide">
                  Wait, last chance!
                </span>
                <h2
                  id="last-chance-title"
                  className="mt-3 font-[family-name:var(--font-fredoka)] text-3xl font-semibold text-ink"
                >
                  Add a little <span className="marker-word text-pink-pop">extra</span>?
                </h2>
                <p className="mt-2 text-sm font-semibold text-ink-2">
                  {gapUsd > 0 ? (
                    <>
                      You’re <b className="text-ink">{formatUsd(gapUsd)}</b> from{" "}
                      <b className="text-ink">free delivery</b>.
                    </>
                  ) : (
                    <>✅ Free delivery unlocked!</>
                  )}{" "}
                  Total: <b className="text-ink">{formatUsd(estimatedTotalUsd)}</b>
                </p>
                <div className="hscroll mt-5 gap-2.5 pb-2">
                  {lastChancePicks.map((p) => (
                    <UpsellCard key={p.id} product={p} onAdd={quietAdd} />
                  ))}
                </div>
                <button
                  ref={lcContinueRef}
                  type="button"
                  onClick={() => void startCheckout()}
                  disabled={checkoutLoading}
                  className="btn-squish mt-5 w-full text-sm"
                >
                  {checkoutLoading ? "Redirecting…" : "Continue to checkout →"}
                </button>
              </div>
            </div>
          )}

          {toast && (
            <div
              role="status"
              className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-full border-[2.5px] border-ink bg-ink px-5 py-2.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-white shadow-[3px_3px_0_rgba(42,20,66,0.35)]"
            >
              {toast}
            </div>
          )}
        </>
  );
}

/* ── Upsell UI ── */

function UpsellRow({
  title,
  products: recs,
  onAdd,
}: {
  title: React.ReactNode;
  products: ProductOffer[];
  onAdd: (p: ProductOffer) => void;
}) {
  return (
    <div className="px-5 pb-4">
      <h3 className="mb-2.5 font-[family-name:var(--font-fredoka)] text-base font-semibold text-ink">
        {title}
      </h3>
      <div className="hscroll gap-2.5 pb-2">
        {recs.map((p) => (
          <UpsellCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
    </div>
  );
}

function UpsellCard({
  product,
  onAdd,
}: {
  product: ProductOffer;
  onAdd: (p: ProductOffer) => void;
}) {
  return (
    <div className="w-[118px] flex-none rounded-[14px] border-[2.5px] border-ink bg-white p-2 text-center">
      <div className="relative aspect-square overflow-hidden rounded-[9px] border-2 border-ink bg-white">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="118px"
          loading="eager"
          className="object-cover"
        />
      </div>
      <p className="mt-1.5 line-clamp-2 min-h-[2em] text-[11px] font-bold leading-tight text-ink">
        {shortName(product)}
      </p>
      <p className="text-xs font-extrabold text-ink">
        {formatUsd(basePrice(product))}
      </p>
      <button
        type="button"
        onClick={() => onAdd(product)}
        className="mt-1.5 w-full rounded-full border-2 border-ink bg-sun py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold text-ink transition hover:bg-pink-pop hover:text-white active:translate-y-[1px]"
      >
        + Add
      </button>
    </div>
  );
}
