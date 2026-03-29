"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { benefits, showcaseSlides } from "@/lib/data";

const ROTATE_MS = 3000;

export function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const slide = showcaseSlides[index] ?? showcaseSlides[0];

  // Cycle slides every 3s (skip when user prefers reduced motion — use dots instead).
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % showcaseSlides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [reduce]);

  return (
    <SectionReveal
      id="showcase"
      className="scroll-mt-24 border-y border-pink-100 bg-white/60 py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
              Product showcase
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-bold text-foreground sm:text-4xl">
              Soft. Squishy. Unserious.
            </h2>
            <ul className="mt-6 space-y-3 text-base font-semibold text-foreground">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm text-foreground"
                    aria-hidden
                  >
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div
              className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-pink-200 bg-pink-50 shadow-xl"
              aria-roledescription="carousel"
              aria-label="Product images"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.src}
                  initial={reduce ? false : { opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduce ? undefined : { opacity: 0, x: -24 }}
                  transition={{ duration: 0.35 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    loading={index === 0 ? "eager" : "lazy"}
                    priority={index === 0}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <p className="mt-3 text-center text-sm font-bold text-muted">
              {slide.caption}
            </p>

            <div
              className="mt-4 flex justify-center gap-1.5"
              role="tablist"
              aria-label="Choose slide"
            >
              {showcaseSlides.map((s, i) => (
                <button
                  key={s.src}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Image ${i + 1} of ${showcaseSlides.length}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === index ? "bg-accent" : "bg-pink-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}
