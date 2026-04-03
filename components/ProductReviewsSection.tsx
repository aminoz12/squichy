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

function BlackStars({ value }: { value: number }) {
  const n = Math.min(5, Math.max(0, Math.round(value)));
  return (
    <span
      className="select-none text-[1.05rem] leading-none tracking-[-0.06em] text-black"
      aria-hidden
    >
      {"★".repeat(n)}
      <span className="text-neutral-300">{"★".repeat(5 - n)}</span>
    </span>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-semibold text-teal-600">
      <svg
        className="h-3.5 w-3.5 shrink-0"
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden
      >
        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 10.2 L8.6 13 L14 7.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified review
    </span>
  );
}

function ReviewSlide({ review }: { review: ProductPageReview }) {
  const posted = formatReviewDate(review.reviewPosted);
  const purchased = formatReviewDate(review.purchaseDate);

  return (
    <div className="flex gap-4 sm:gap-5">
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-sm sm:h-24 sm:w-24">
        <Image
          src={review.image}
          alt={`Photo shared by ${review.author}`}
          fill
          sizes="(max-width: 640px) 80px, 96px"
          className="object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center justify-between gap-3 gap-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <BlackStars value={review.rating} />
            <span
              className="text-sm font-bold text-black"
              aria-label={`${review.rating} out of 5`}
            >
              {review.rating}/5
            </span>
          </div>
          <VerifiedBadge />
        </div>

        <h3 className="mt-2 text-base font-bold leading-snug text-black sm:mt-3 sm:text-[1.05rem]">
          {review.title}
        </h3>
        {review.body ? (
          <>
            <p className="mt-2 hidden text-sm font-normal leading-relaxed text-neutral-800 sm:block">
              {review.body}
            </p>
            <p className="sr-only sm:hidden">{review.body}</p>
          </>
        ) : null}

        <p className="mt-3 hidden text-xs font-normal leading-relaxed text-neutral-500 sm:block">
          Review on {posted}, following an order placed on {purchased} by {review.author}
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

  const goTo = useCallback((i: number) => {
    setIndex(((i % n) + n) % n);
  }, [n]);

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
      className={`border-t border-neutral-200 bg-white ${className}`.trim()}
    >
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <h2 className="text-center text-lg font-bold tracking-tight text-black sm:text-xl">
          Customer reviews
        </h2>

        <div
          className="relative mt-5"
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-stretch gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-neutral-200 bg-white text-lg font-bold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
              aria-label="Previous review"
            >
              ‹
            </button>

            <div className="min-w-0 flex-1 rounded-2xl border border-neutral-200 bg-neutral-50/50 p-4 shadow-sm sm:p-5">
              <ReviewSlide key={review.reviewPosted + review.author} review={review} />
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-neutral-200 bg-white text-lg font-bold text-neutral-700 shadow-sm transition hover:border-neutral-300 hover:bg-neutral-50"
              aria-label="Next review"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Choose review">
            {productPageReviews.map((r, i) => (
              <button
                key={`${r.author}-${r.reviewPosted}`}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Review ${i + 1} of ${n}, ${r.author}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === index
                    ? "w-8 bg-neutral-800"
                    : "w-2.5 bg-neutral-300 hover:bg-neutral-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
