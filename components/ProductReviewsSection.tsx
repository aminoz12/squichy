"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductPageReview } from "@/lib/data";
import { productPageReviews } from "@/lib/data";

const AUTO_MS = 5000;
const SWIPE_PX = 48;

function formatReviewDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function Stars({ value }: { value: number }) {
  const n = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <span className="flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`text-[0.95rem] leading-none ${i < n ? "text-sun" : "text-ink/15"}`}
        >
          ★
        </span>
      ))}
    </span>
  );
}

function ChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M15 6l-6 6 6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex -rotate-2 items-center gap-1 rounded-full border-2 border-ink bg-mint px-2 py-0.5 font-[family-name:var(--font-fredoka)] text-[10px] font-semibold uppercase tracking-wider text-ink">
      <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden>
        <path
          d="M6 10.2 8.6 13 14 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

function ReviewSlide({ review }: { review: ProductPageReview }) {
  const posted = formatReviewDate(review.reviewPosted);
  const purchased = formatReviewDate(review.purchaseDate);

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
      <div className="relative mx-auto h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-[16px] border-2 border-ink bg-cream sm:mx-0 sm:h-[5.25rem] sm:w-[5.25rem]">
        <Image
          src={review.image}
          alt={`Photo shared by ${review.author}`}
          fill
          sizes="(max-width: 640px) 72px, 84px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1 text-center sm:text-left">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
          <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
            <Stars value={review.rating} />
            <span className="text-sm font-semibold tabular-nums text-ink-2" aria-label={`${review.rating} out of 5`}>
              {review.rating}.0
            </span>
          </div>
          <VerifiedBadge />
        </div>

        <h3 className="mt-3 font-[family-name:var(--font-fredoka)] text-lg font-semibold leading-snug tracking-tight text-ink sm:text-xl">
          {review.title}
        </h3>
        {review.body ? (
          <>
            <p className="mt-2.5 hidden text-[0.9375rem] font-semibold leading-relaxed text-ink-2 sm:block">
              {review.body}
            </p>
            <p className="sr-only sm:hidden">{review.body}</p>
          </>
        ) : null}

        <p className="mt-3 hidden text-xs font-semibold leading-relaxed text-ink-2 sm:block">
          {posted} · Order {purchased} · {review.author}
        </p>
        <p className="sr-only sm:hidden">
          Review on {posted}, following an order placed on {purchased} by {review.author}
        </p>
      </div>
    </div>
  );
}

type ProductReviewsSectionProps = {
  className?: string;
};

export function ProductReviewsSection({ className = "" }: ProductReviewsSectionProps) {
  const n = productPageReviews.length;
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % n) + n) % n);
    },
    [n],
  );

  useEffect(() => {
    if (n <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % n);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [index, n]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > SWIPE_PX) go(-1);
    else if (dx < -SWIPE_PX) go(1);
  }

  const review = productPageReviews[index];

  return (
    <section
      id="reviews"
      className={`bg-cream ${className}`.trim()}
    >
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="text-center">
          <p className="eyebrow-pill text-[11px] uppercase tracking-wide">
            Reviews
          </p>
          <h2 className="mt-4 font-[family-name:var(--font-fredoka)] text-2xl font-semibold tracking-tight text-ink sm:text-[1.65rem]">
            What buyers say
          </h2>
        </div>

        <div
          className="relative mt-8"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)]"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="sticker-card min-w-0 flex-1 p-5 sm:p-7">
              <ReviewSlide key={review.reviewPosted + review.author} review={review} />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white text-ink shadow-[3px_3px_0_var(--ink)] transition hover:-translate-y-0.5 active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)]"
              aria-label="Next review"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div
            className="mt-6 flex justify-center gap-1.5"
            role="tablist"
            aria-label="Choose review"
          >
            {productPageReviews.map((r, i) => (
              <button
                key={`${r.author}-${r.reviewPosted}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1} of ${n}, ${r.author}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                  i === index ? "w-7 bg-ink" : "w-1.5 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
