import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";

const MESSAGE = `FREE DELIVERY FOR ORDERS ABOVE $${FREE_DELIVERY_THRESHOLD_USD}`;

/**
 * Full-width scrolling promo strip at the very top of the site (above the nav).
 */
export function PromoMarquee() {
  const chunk = (
    <span className="inline-flex shrink-0 items-center gap-10 px-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="inline-flex items-center gap-2 whitespace-nowrap font-black uppercase tracking-wide"
        >
          <span aria-hidden className="font-normal">
            🚚
          </span>
          {MESSAGE}
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-amber-400/60 bg-[#ffd500] py-2.5 text-[#2d2384] shadow-md"
      role="presentation"
    >
      <div className="promo-marquee-track flex w-max">
        {chunk}
        {chunk}
      </div>
    </div>
  );
}
