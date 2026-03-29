"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";
import { useCartStore } from "@/lib/store/use-cart-store";

function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(n);
}

/**
 * Slide-over cart: pure client state. Checkout uses Stripe Payment Links (no backend).
 * Multiple bundles = complete Stripe checkout per line (first line used by primary CTA).
 */
export function CartDrawer() {
  const reduce = useReducedMotion();
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const removeLine = useCartStore((s) => s.removeLine);
  const setLineQuantity = useCartStore((s) => s.setLineQuantity);
  const checkoutFirstLine = useCartStore((s) => s.checkoutFirstLine);

  const subtotal = items.reduce(
    (acc, line) => acc + line.unitPrice * line.quantity,
    0,
  );

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
                  Your cart is empty — add a bundle and let fate choose your
                  dumpling.
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
                            {formatMoney(line.unitPrice)} each
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
                          {formatMoney(line.unitPrice * line.quantity)}
                        </p>
                      </div>
                      <a
                        href={line.stripeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 block w-full rounded-xl border-2 border-accent/30 py-2 text-center text-xs font-extrabold text-accent hover:bg-accent/5"
                      >
                        Pay this line on Stripe
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="border-t border-pink-100 bg-white/90 p-5 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm font-extrabold">
                <span>Subtotal (display only)</span>
                <span>{formatMoney(subtotal)}</span>
              </div>
              <p className="mt-2 text-xs font-semibold text-muted">
                Stripe Payment Links cover one bundle purchase per checkout. For
                multiple bundles, use “Pay this line” or checkout again after
                paying.
              </p>
              <button
                type="button"
                disabled={items.length === 0}
                onClick={checkoutFirstLine}
                className="mt-4 w-full rounded-2xl bg-accent py-3.5 text-sm font-extrabold text-white shadow-lg shadow-accent/25 transition enabled:hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Checkout (first item)
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
