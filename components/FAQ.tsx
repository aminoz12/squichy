"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { faqItems } from "@/lib/data";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <SectionReveal
      id="faq"
      className="scroll-mt-24 mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="text-center">
        <p className="text-sm font-extrabold uppercase tracking-widest text-accent">
          FAQ
        </p>
        <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
          Questions? We’ve got answers.
        </h2>
      </div>

      <div className="mt-10 space-y-3">
        {faqItems.map((item, i) => {
          const isOpen = open === i;
          return (
            <div
              key={item.q}
              className="overflow-hidden rounded-2xl border border-pink-100 bg-card shadow-md"
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="text-sm font-extrabold text-foreground sm:text-base">
                  {item.q}
                </span>
                <span
                  className="text-lg font-bold text-accent"
                  aria-hidden
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="overflow-hidden"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduce ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                  >
                    <p className="border-t border-pink-100 px-5 pb-4 pt-3 text-sm font-semibold leading-relaxed text-muted">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </SectionReveal>
  );
}
