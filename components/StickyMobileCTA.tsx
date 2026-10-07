"use client";

import Link from "next/link";

/**
 * Mobile-only sticky bar: keeps conversion CTA visible while scrolling.
 */
export function StickyMobileCTA() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 border-t-[2.5px] border-ink bg-[rgba(255,246,234,0.95)] p-3 backdrop-blur-md md:hidden"
    >
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <Link
          href="/products/rainbow-unicorn-mystery-dumpling"
          className="btn-squish flex-1 text-sm uppercase tracking-wide"
        >
          Buy 2 get 1 now
        </Link>
        <Link href="/#faq" className="btn-squish btn-white text-sm">
          FAQ
        </Link>
      </div>
    </div>
  );
}
