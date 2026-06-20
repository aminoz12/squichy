"use client";

import Link from "next/link";

/**
 * Mobile-only sticky bar: keeps conversion CTA visible while scrolling.
 */
export function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-pink-200 bg-card/95 p-3 shadow-[0_-8px_30px_rgba(236,72,153,0.15)] backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-2">
        <Link
          href="/products/mystery-dumpling"
          className="flex-1 rounded-2xl bg-accent py-3.5 text-center text-sm font-extrabold text-white shadow-md shadow-accent/30"
        >
          BUY 2 GET 1 NOW
        </Link>
        <Link
          href="/#faq"
          className="rounded-2xl border-2 border-pink-200 px-4 py-3.5 text-sm font-extrabold text-foreground"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}
