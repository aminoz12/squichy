/**
 * Seasonal campaign config (audit C20–C21). One campaign at a time drives the
 * offer bar; dates are evaluated client-side so a statically built page never
 * shows an expired promise. Dates are inclusive start / exclusive end, local
 * to the shopper. Edit this file to plan future seasons — no other code
 * changes needed.
 */

export type Campaign = {
  id: string;
  /** ISO date (YYYY-MM-DD), campaign becomes visible at local midnight. */
  start: string;
  /** ISO date (YYYY-MM-DD), campaign disappears at local midnight. */
  end: string;
  icon: string;
  pill: string;
  title: string;
  cta: { label: string; href: string };
};

export const campaigns: Campaign[] = [
  {
    id: "halloween-2026",
    start: "2026-10-01",
    end: "2026-10-27",
    icon: "🎃",
    pill: "Spooky season",
    title: "The Halloween Bun Gift Box is here — trick-or-treat ready",
    cta: { label: "Shop Halloween →", href: "/products/halloween-bun-squishy-gift-box" },
  },
  {
    id: "advent-2026",
    start: "2026-10-27",
    end: "2026-11-21",
    icon: "🎄",
    pill: "Advent is coming",
    title: "Order your advent calendar by Nov 20 to open Day 1 on time",
    cta: { label: "Shop calendars →", href: "/collections/advent-calendars" },
  },
  {
    id: "advent-late-2026",
    start: "2026-11-21",
    end: "2026-12-01",
    icon: "🎄",
    pill: "Late start",
    title: "Advent calendars — start late, catch up a few doors at once",
    cta: { label: "Shop calendars →", href: "/collections/advent-calendars" },
  },
  {
    id: "christmas-2026",
    start: "2026-12-01",
    end: "2026-12-18",
    icon: "🎁",
    pill: "Holiday gifts",
    title: "Order by Dec 17 for estimated delivery by Christmas (US)",
    cta: { label: "Shop gifts →", href: "/collections/boxes-gift-sets" },
  },
  {
    id: "last-minute-2026",
    start: "2026-12-18",
    end: "2026-12-27",
    icon: "✨",
    pill: "Little gifts",
    title: "Little gifts. Big squish energy.",
    cta: { label: "Shop gift sets →", href: "/collections/boxes-gift-sets" },
  },
];

export function activeCampaign(now: Date = new Date()): Campaign | null {
  const t = now.getTime();
  return (
    campaigns.find((c) => {
      const start = new Date(`${c.start}T00:00:00`).getTime();
      const end = new Date(`${c.end}T00:00:00`).getTime();
      return t >= start && t < end;
    }) ?? null
  );
}

/**
 * Estimated US Christmas order cutoff (not a guarantee — packing 1–2 days +
 * 3–7 day transit against Dec 24/25). Shown on product pages during December.
 */
export const US_CHRISTMAS_CUTOFF_2026 = "2026-12-17";

export function christmasCutoffNotice(now: Date = new Date()): string | null {
  const windowStart = new Date("2026-12-01T00:00:00").getTime();
  const cutoffEnd = new Date(`${US_CHRISTMAS_CUTOFF_2026}T23:59:59`).getTime();
  const t = now.getTime();
  if (t < windowStart || t > cutoffEnd) return null;
  return "Order by Dec 17 for estimated delivery by Christmas (US)";
}
