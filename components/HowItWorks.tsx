"use client";

import { SectionReveal } from "@/components/SectionReveal";
import { howItWorks } from "@/lib/data";

const STEP_CIRCLES = [
  "bg-pink-pop text-white",
  "bg-sun text-ink",
  "bg-mint text-ink",
];

export function HowItWorks() {
  return (
    <SectionReveal className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <span className="eyebrow-pill text-xs uppercase tracking-wide sm:text-sm">
            How it works
          </span>
          <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Three steps. One{" "}
            <span className="marker-word text-pink-pop">plot twist.</span>
          </h2>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {howItWorks.map((step, i) => (
            <li
              key={step.step}
              className={`sticker-card relative p-6 ${
                i % 2 === 0 ? "md:rotate-1" : "md:-rotate-1"
              }`}
            >
              <span
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink font-[family-name:var(--font-fredoka)] text-lg font-semibold ${STEP_CIRCLES[i % STEP_CIRCLES.length]}`}
              >
                {step.step}
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-2">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </SectionReveal>
  );
}
