import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";

const MESSAGE = `FREE DELIVERY FOR ORDERS ABOVE ${FREE_DELIVERY_THRESHOLD_USD} USD`;

/**
 * Full-width scrolling promo strip at the very top of the site (above the nav).
 */
export function PromoMarquee() {
  const chunk = (
    <span className="inline-flex shrink-0 items-center gap-10 px-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="whitespace-nowrap">
          {MESSAGE}
        </span>
      ))}
    </span>
  );

  return (
    <div
      className="relative z-[60] overflow-hidden border-b border-pink-900/20 bg-[#1a1022] py-2.5 text-white shadow-md"
      role="presentation"
    >
      <div className="promo-marquee-track flex w-max">
        {chunk}
        {chunk}
      </div>
    </div>
  );
}
