"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { activeCampaign } from "@/lib/campaigns";

const emptySubscribe = () => () => {};

/**
 * One offer bar under the header (audit C20: a single campaign at a time).
 * The static HTML carries the evergreen BUY 2 GET 1 offer; after hydration
 * the bar swaps to the active seasonal campaign from lib/campaigns.ts, so a
 * statically built page can never show an expired seasonal promise.
 */
export function UrgencyBar() {
  const hydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const campaign = hydrated ? activeCampaign() : null;

  const pill = campaign ? `${campaign.icon} ${campaign.pill}` : "🔥 Hot right now";
  const title = campaign
    ? campaign.title
    : "BUY 2, GET 1 FREE on the TikTok-viral Mystery Dumpling";
  const ctaLabel = campaign ? campaign.cta.label : "Claim the deal →";
  const href = campaign ? campaign.cta.href : "/products/mystery-dumpling";

  return (
    <Link
      href={href}
      className="block border-b-[2.5px] border-ink bg-sun-soft px-4 py-2.5 text-center text-xs font-semibold text-ink transition-colors hover:bg-sun sm:text-sm"
    >
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-2">
        <span className="rounded-full border-2 border-ink bg-pink-pop px-3 py-1 font-[family-name:var(--font-fredoka)] font-semibold uppercase tracking-wide text-white">
          {pill}
        </span>
        <span className="font-bold">{title}</span>
        <span className="font-[family-name:var(--font-fredoka)] font-semibold text-pink-pop underline decoration-2 underline-offset-2">
          {ctaLabel}
        </span>
      </span>
    </Link>
  );
}
