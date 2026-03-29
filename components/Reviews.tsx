"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { reviews } from "@/lib/data";

function Stars({ value }: { value: number }) {
  return (
    <span className="text-amber-400" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-pink-200">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export function Reviews() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
      <div className="mb-10 text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-accent">
          Social proof
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
          People are obsessed
        </h2>
      </div>

      <ul className="grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <li
            key={r.name}
            className="rounded-3xl border border-pink-100 bg-card p-6 shadow-lg shadow-pink-200/30"
          >
            <Stars value={r.rating} />
            <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
              “{r.text}”
            </p>
            <p className="mt-4 text-xs font-bold text-muted">
              {r.name} · {r.location}
            </p>
          </li>
        ))}
      </ul>
    </SectionReveal>
  );
}
