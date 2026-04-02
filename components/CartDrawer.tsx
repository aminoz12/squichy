"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { redirectToStripeCheckout } from "@/lib/checkout-client";
import { resolveStripeCheckoutParams } from "@/lib/cart-helpers";
import {
  FREE_DELIVERY_THRESHOLD_EUR,
  qualifiesForFreeDeliverySubtotalEur,
} from "@/lib/delivery";
import { singleProductOffer } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

function formatEuro(n: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(n);
}

/**
 * Slide-over cart. Checkout always uses POST /api/checkout (Stripe Checkout
 * Session) so amount and currency match the cart line — no static Payment Links.
 */
export function CartDrawer() {
  const reduce = useReducedMotion();
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeLine = useCartStore((s) => s.removeLine);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);

  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const subtotalEur = items.reduce(
    (acc, line) => acc + line.unitPriceEuro * line.quantity,
    0,
  );
  const freeDelivery = qualifiesForFreeDeliverySubtotalEur(subtotalEur);
  const deliveryEur = freeDelivery ? 0 : singleProductOffer.deliveryEuro;
  const estimatedTotalEur = subtotalEur + deliveryEur;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
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

  const startCheckout = useCallback(async () => {
    const first = useCartStore.getState().items[0];
    if (!first) return;
    setCheckoutError(null);
    setCheckoutLoading(true);
    try {
      const resolved = resolveStripeCheckoutParams(first);
      if (!resolved) {
        throw new Error(
          "This cart line can’t be checked out. Remove it and add the product again from the shop.",
        );
      }
      await redirectToStripeCheckout(resolved.sizeId, resolved.quantity);
    } catch (e) {
      setCheckoutError(
        e instanceof Error ? e.message : "Checkout could not start",
      );
      setCheckoutLoading(false);
    }
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.button
            type="button"
            aria-label="Close cart overlay"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-title"
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-pink-200 bg-card shadow-2xl"
            initial={reduce ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduce ? undefined : { x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center justify-between border-b border-pink-100 px-5 py-4">
              <h2
                id="cart-title"
                className="font-[family-name:var(--font-fredoka)] text-xl font-bold"
              >
                Your cart
              </h2>
              <button
                type="button"
                onClick={closeCart}
                className="rounded-xl border border-pink-200 px-3 py-1.5 text-sm font-bold hover:bg-pink-50"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <p className="text-sm font-semibold text-muted">
                  Your cart is empty — pick a size on the product page and add
                  it here, or tap Buy now.
                </p>
              ) : (
                <ul className="space-y-4">
                  {items.map((line) => (
                    <li
                      key={line.id}
                      className="rounded-2xl border border-pink-100 bg-pink-50/50 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-extrabold text-foreground">
                            {line.name}
                          </p>
                          <p className="text-sm font-bold text-muted">
                            {formatEuro(line.unitPriceEuro)} each
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeLine(line.id)}
                          className="text-xs font-extrabold uppercase tracking-wide text-primary-dark hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <label className="text-xs font-extrabold text-muted">
                          Qty
                          <input
                            type="number"
                            min={1}
                            max={99}
                            value={line.quantity}
                            onChange={(e) =>
                              setLineQuantity(
                                line.id,
                                Number.parseInt(e.target.value, 10) || 0,
                              )
                            }
                            className="ml-2 w-16 rounded-lg border border-pink-200 px-2 py-1 text-sm font-bold"
                          />
                        </label>
                        <p className="text-sm font-extrabold">
                          {formatEuro(line.unitPriceEuro * line.quantity)}
                        </p>
                      </div>
                      {!resolveStripeCheckoutParams(line) && (
                        <p className="mt-2 text-xs font-bold text-amber-800">
                          Remove this line — it uses an old cart format. Add the
                          item again from the product page.
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-pink-100 bg-white/90 p-5 backdrop-blur-sm">
              <div className="space-y-1 text-sm font-extrabold">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span>{formatEuro(subtotalEur)}</span>
                </div>
                <div className="flex items-center justify-between text-muted">
                  <span>Delivery</span>
                  <span>
                    {freeDelivery ? (
                      <span className="font-extrabold text-emerald-600">
                        Free
                      </span>
                    ) : (
                      formatEuro(singleProductOffer.deliveryEuro)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-pink-100 pt-2 text-base text-foreground">
                  <span>Estimated total</span>
                  <span>{formatEuro(estimatedTotalEur)}</span>
                </div>
              </div>
              {items.length > 0 && (
                <p className="mt-2 text-xs font-semibold text-muted">
                  Subtotals of {FREE_DELIVERY_THRESHOLD_EUR}€ or more qualify for
                  free delivery (see top banner). Your subtotal is{" "}
                  {formatEuro(subtotalEur)}.
                </p>
              )}
              {checkoutError && (
                <p className="mt-2 text-sm font-semibold text-red-600" role="alert">
                  {checkoutError}
                </p>
              )}
              <button
                type="button"
                disabled={items.length === 0 || checkoutLoading}
                onClick={startCheckout}
                className="mt-4 w-full rounded-2xl bg-accent py-3.5 text-sm font-extrabold text-white shadow-lg shadow-accent/25 transition enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {checkoutLoading ? "Redirecting…" : "Checkout"}
              </button>
              <p className="mt-2 text-xs font-semibold text-muted">
                One Stripe checkout per visit for the first line. Change qty
                above, or remove lines to pick another item.
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
