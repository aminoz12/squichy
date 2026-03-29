"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { howItWorks } from "@/lib/data";

export function HowItWorks() {
  return (
    <SectionReveal className="border-t border-pink-100 bg-gradient-to-b from-white/80 to-primary/20 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            How it works
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
            Three steps. One plot twist.
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((step) => (
            <li
              key={step.step}
              className="relative rounded-3xl border border-pink-100 bg-card p-6 shadow-lg"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-accent text-lg font-extrabold text-white">
                {step.step}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-muted">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
