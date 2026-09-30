import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";

/** Reference trust strip: four quick reassurances on white between sections. */
export function TrustStrip() {
  const items = [
    { icon: "🚚", title: "Free delivery", sub: `on orders over $${FREE_DELIVERY_THRESHOLD_USD}` },
    { icon: "💛", title: "BUY 2 GET 1 FREE", sub: "bundle deals on every squishy" },
    { icon: "🎁", title: "Gift-ready sets", sub: "boxes & advent calendars" },
    { icon: "↩️", title: "Easy returns", sub: "14-day happy promise" },
  ];

  return (
    <div className="border-y-[2.5px] border-ink bg-white py-5">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 sm:px-6 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-center gap-3 text-sm font-bold leading-tight text-ink">
            <span aria-hidden className="text-2xl">{item.icon}</span>
            <span>
              {item.title}
              <small className="block font-semibold text-ink-2">{item.sub}</small>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
