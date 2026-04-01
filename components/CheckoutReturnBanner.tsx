"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useCartStore } from "@/lib/store/use-cart-store";

type SessionPayload = {
  payment_status: string | null;
  status: string | null;
  amount_total: number | null;
  currency: string | null;
  customer_email: string | null;
  error?: string;
};

function formatPaidTotal(cents: number | null, currency: string | null) {
  if (cents == null) return null;
  const amount = cents / 100;
  const cur = (currency ?? "eur").toLowerCase();
  if (cur === "eur") return `${amount.toFixed(2)} €`;
  try {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: cur.toUpperCase(),
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${cur.toUpperCase()}`;
  }
}

/**
 * Handles return from Stripe Checkout: verify session, show result, clear cart on success.
 */
export function CheckoutReturnBanner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const clearCart = useCartStore((s) => s.clearCart);

  const checkout = searchParams.get("checkout");
  const sessionId = searchParams.get("session_id");

  const [state, setState] = useState<
    "idle" | "loading" | "success" | "cancel" | "pending" | "error"
  >("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [detail, setDetail] = useState<string | null>(null);

  const dismiss = useCallback(() => {
    router.replace("/products");
  }, [router]);

  useEffect(() => {
    if (!checkout) {
      setState("idle");
      return;
    }

    if (checkout === "cancel") {
      setState("cancel");
      setMessage("Checkout canceled");
      setDetail("You can change size or quantity and try again.");
      return;
    }

    if (checkout !== "success") {
      setState("idle");
      return;
    }

    if (!sessionId) {
      setState("pending");
      setMessage("Return from checkout");
      setDetail(
        "We couldn’t read your session id. Check your email for Stripe’s receipt, or open the order link from your inbox.",
      );
      return;
    }

    let cancelled = false;
    setState("loading");
    setMessage(null);
    setDetail(null);

    fetch(`/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`)
      .then(async (res) => {
        const data = (await res.json()) as SessionPayload;
        if (!res.ok) {
          throw new Error(data.error || "Could not verify payment");
        }
        if (cancelled) return;

        if (data.payment_status === "paid") {
          setState("success");
          setMessage("Payment successful");
          const total = formatPaidTotal(data.amount_total, data.currency);
          setDetail(
            [
              total ? `Total paid: ${total}` : null,
              data.customer_email
                ? `Confirmation sent to ${data.customer_email}`
                : null,
            ]
              .filter(Boolean)
              .join(" · ") || "Thank you for your order.",
          );
          clearCart();
          return;
        }

        if (data.payment_status === "unpaid" || data.status === "open") {
          setState("pending");
          setMessage("Payment not completed");
          setDetail("This session is still open or unpaid. You can return to checkout from Stripe if needed.");
          return;
        }

        setState("error");
        setMessage("Payment status unclear");
        setDetail(`Status: ${data.payment_status ?? data.status ?? "unknown"}`);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setState("error");
        setMessage("Could not verify payment");
        setDetail(e instanceof Error ? e.message : "Try again or check your Stripe Dashboard.");
      });

    return () => {
      cancelled = true;
    };
  }, [checkout, sessionId, clearCart]);

  if (!checkout || state === "idle") return null;

  const styles =
    state === "success"
      ? "border-emerald-200 bg-emerald-50 text-emerald-950"
      : state === "cancel"
        ? "border-amber-200 bg-amber-50 text-amber-950"
        : state === "pending"
          ? "border-sky-200 bg-sky-50 text-sky-950"
          : state === "loading"
            ? "border-pink-200 bg-white text-foreground"
            : "border-red-200 bg-red-50 text-red-950";

  return (
    <div
      className={`mx-auto max-w-6xl px-4 pt-4 sm:px-6 ${state === "loading" ? "animate-pulse" : ""}`}
      role="status"
    >
      <div
        className={`rounded-2xl border-2 p-4 shadow-md sm:flex sm:items-start sm:justify-between sm:gap-4 ${styles}`}
      >
        <div>
          <p className="font-[family-name:var(--font-fredoka)] text-lg font-bold">
            {state === "loading" ? "Verifying payment…" : message}
          </p>
          {detail && state !== "loading" && (
            <p className="mt-1 text-sm font-semibold opacity-90">{detail}</p>
          )}
        </div>
        {state !== "loading" && (
          <button
            type="button"
            onClick={dismiss}
            className="mt-3 shrink-0 rounded-xl border border-current/20 bg-white/80 px-4 py-2 text-sm font-extrabold transition hover:bg-white sm:mt-0"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}
