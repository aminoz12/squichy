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
      className="scroll-mt-24 border-y-[3px] border-ink bg-pink-pop py-16 text-white sm:py-20"
    >
      <div className="mx-auto max-w-lg px-4 text-center sm:px-6">
        <span className="eyebrow-pill text-xs uppercase tracking-wide sm:text-sm">
          Stay in the loop
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Newsletter
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm font-semibold leading-relaxed text-white/90 sm:text-[0.9375rem]">
          Occasional updates on restocks and new drops. Unsubscribe anytime.
        </p>

        <div className="sticker-card mt-7 p-5 text-ink sm:p-6">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-2.5 sm:flex-row sm:items-stretch sm:gap-3"
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
              className="min-h-[2.875rem] w-full flex-1 rounded-full border-[2.5px] border-ink bg-white px-5 text-sm font-semibold text-ink outline-none transition placeholder:text-ink-2/50 focus:bg-sun-soft"
            />
            <button
              type="submit"
              className="btn-squish btn-sun min-h-[2.875rem] shrink-0 text-sm uppercase tracking-wide sm:min-w-[8.5rem]"
            >
              Subscribe
            </button>
          </form>

          {status === "done" && (
            <p
              className="mt-4 rounded-full border-2 border-ink bg-mint-soft py-2.5 text-sm font-bold text-ink"
              role="status"
            >
              Thanks — you&apos;re on the list.
            </p>
          )}
          {status === "error" && (
            <p
              className="mt-4 rounded-full border-2 border-ink bg-sun-soft py-2.5 text-sm font-bold text-ink"
              role="alert"
            >
              Please enter a valid email.
            </p>
          )}

          <p className="mt-4 text-[11px] font-semibold text-ink-2 sm:text-xs">
            No spam — we only email when it matters.
          </p>
        </div>
      </div>
    </SectionReveal>
  );
}
