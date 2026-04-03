"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "done" | "error">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("idle");
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
    setEmail("");
  }

  return (
    <SectionReveal
      id="newsletter"
      className="scroll-mt-24 border-t border-pink-100/90 bg-gradient-to-b from-white via-[#fff8fc] to-[#fff0f7] py-12 sm:py-16"
    >
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-dark sm:text-sm">
          Stay in the loop
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Newsletter
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-foreground/65 sm:text-[0.9375rem]">
          Occasional updates on restocks and new drops. Unsubscribe anytime.
        </p>

        <div className="mt-7 rounded-2xl border border-pink-100/90 bg-white/90 p-5 shadow-[0_12px_40px_-24px_rgba(236,72,153,0.35)] ring-1 ring-pink-50/80 backdrop-blur-sm sm:p-6">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-2"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              className="min-h-[2.875rem] w-full flex-1 rounded-xl border border-slate-200/90 bg-slate-50/60 px-4 text-sm font-semibold text-foreground outline-none transition placeholder:text-foreground/38 focus:border-violet-400 focus:bg-white focus:ring-2 focus:ring-violet-200/80"
            />
            <button
              type="submit"
              className="min-h-[2.875rem] shrink-0 rounded-xl bg-[#ffd500] px-7 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/30 transition hover:brightness-[1.03] active:scale-[0.99] sm:min-w-[8.5rem]"
            >
              Subscribe
            </button>
          </form>

          {status === "done" && (
            <p
              className="mt-4 rounded-lg bg-emerald-50/90 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-100"
              role="status"
            >
              Thanks — you&apos;re on the list.
            </p>
          )}
          {status === "error" && (
            <p
              className="mt-4 rounded-lg bg-red-50/90 py-2.5 text-sm font-semibold text-red-700 ring-1 ring-red-100"
              role="alert"
            >
              Please enter a valid email.
            </p>
          )}

          <p className="mt-4 text-[11px] font-medium text-foreground/45 sm:text-xs">
            No spam — we only email when it matters.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
