import Link from "next/link";

/**
 * Offer bar under the header. Links straight to the campaign product.
 * Copy states the real, always-on bundle deal — no fabricated countdowns
 * or stock counts (EU consumer rules + ad-platform policies).
 */
export function UrgencyBar() {
  return (
    <Link
      href="/products/mystery-dumpling"
      className="block border-b-[2.5px] border-ink bg-sun-soft px-4 py-2.5 text-center text-xs font-semibold text-ink transition-colors hover:bg-sun sm:text-sm"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        <span className="rounded-full border-2 border-ink bg-pink-pop px-3 py-1 font-[family-name:var(--font-fredoka)] font-semibold uppercase tracking-wide text-white">
          🔥 Hot right now
        </span>
        <span className="font-bold">
          BUY 2, GET 1 FREE on the TikTok-viral Mystery Dumpling
        </span>
        <span className="font-[family-name:var(--font-fredoka)] font-semibold text-pink-pop underline decoration-2 underline-offset-2">
          Claim the deal →
        </span>
      </span>
    </Link>
  );
}
