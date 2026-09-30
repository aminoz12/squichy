"use client";

import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { faqItems } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SectionReveal
      id="faq"
      className="scroll-mt-24 mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="text-center">
        <span className="eyebrow-pill text-xs uppercase tracking-wide sm:text-sm">
          FAQ
        </span>
        <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Good questions
        </h2>
      </div>

      <div className="mt-10 space-y-4">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-[18px] border-[2.5px] border-ink bg-white shadow-[3px_3px_0_var(--ink)]"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink sm:text-base">
                  {item.q}
                </span>
                <span
                  className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-pink-pop"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen && (
                <div className="overflow-hidden">
                  <p className="border-t-2 border-ink/10 px-5 pb-4 pt-3 text-sm font-semibold leading-relaxed text-ink-2">
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </SectionReveal>
  );
}
