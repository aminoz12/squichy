import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";

export function PromoMarquee() {
  const messages = [
    { text: `FREE DELIVERY FOR ORDERS ABOVE $${FREE_DELIVERY_THRESHOLD_USD}`, icon: "🚚" },
    { text: "BUY 2 GET 2", icon: "✨" },
  ];

  const chunk = (
    <span className="inline-flex shrink-0 items-center gap-10 px-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex gap-10">
          {messages.map((m, idx) => (
            <span
              key={`${i}-${idx}`}
              className="inline-flex items-center gap-2 whitespace-nowrap font-black uppercase tracking-wide"
            >
              <span aria-hidden className="font-normal text-base">
                {m.icon}
              </span>
              {m.text}
            </span>
          ))}
        </div>
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
