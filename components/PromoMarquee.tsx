import Link from "next/link";
import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";

/** Reference-style announce bar: ink background, sun accents, single line. */
export function PromoMarquee() {
  return (
    <div className="relative z-[60] bg-ink px-4 py-2 text-center text-[13px] font-bold tracking-wide text-white sm:text-sm">
      🚚 Free delivery over{" "}
      <b className="text-sun">${FREE_DELIVERY_THRESHOLD_USD}</b>
      {" · "}
      <b className="text-sun">BUY 2 GET 1 FREE</b>
      <span className="hidden sm:inline">
        {" · "}
        <Link
          href="/collections/advent-calendars"
          className="text-sun underline-offset-2 hover:underline"
        >
          Advent calendars are here →
        </Link>
      </span>
    </div>
  );
}
