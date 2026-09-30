"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { benefits, showcaseSlides } from "@/lib/data";

const ROTATE_MS = 3000;

export function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const slide = showcaseSlides[index] ?? showcaseSlides[0];

  // Cycle slides every 3s; users can still choose a slide with the dots.
  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % showcaseSlides.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <SectionReveal
      id="showcase"
      className="scroll-mt-24 bg-cream py-14 sm:py-16"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow-pill text-sm uppercase tracking-wide">
              Product showcase
            </p>
            <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Soft. Squishy. Unserious.
            </h2>
            <ul className="mt-6 space-y-3 text-base font-semibold text-ink">
              {benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    className="mt-0.5 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-ink bg-mint text-sm font-black text-ink"
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
              className="relative aspect-[4/3] overflow-hidden rounded-[28px] border-[3px] border-ink bg-pink-soft shadow-[6px_6px_0_var(--ink)]"
              aria-roledescription="carousel"
              aria-label="Product images"
            >
              <div key={slide.src} className="absolute inset-0">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  priority={index === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-sm font-bold text-ink-2">
              {slide.caption}
            </p>

            <div
              className="mt-4 flex justify-center gap-2"
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
                  className={`h-3 w-3 rounded-full border-2 border-ink transition ${
                    i === index ? "bg-pink-pop" : "bg-white"
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
