"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { reviews } from "@/lib/data";

function Stars({ value }: { value: number }) {
  return (
    <span className="text-sun" aria-label={`${value} out of 5 stars`}>
      {"★".repeat(value)}
      <span className="text-pink-soft">{"★".repeat(5 - value)}</span>
    </span>
  );
}

export function Reviews() {
  return (
    <SectionReveal className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
      <div className="mb-10 text-center">
        <span className="eyebrow-pill text-xs uppercase tracking-wide sm:text-sm">
          Social proof
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          People are <span className="marker-word text-pink-pop">obsessed</span>
        </h2>
      </div>

      <ul className="grid gap-6 sm:grid-cols-3">
        {reviews.map((r, i) => (
          <li
            key={r.name}
            className={`sticker-card p-6 ${i % 2 === 0 ? "rotate-1" : "-rotate-1"}`}
          >
            <Stars value={r.rating} />
            <p className="mt-3 text-sm font-semibold leading-relaxed text-ink">
              “{r.text}”
            </p>
            <p className="mt-4 text-xs font-bold text-ink-2">
              {r.name} · {r.location}
            </p>
          </li>
        ))}
      </ul>
    </SectionReveal>
  );
}
