import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

export function AdventPromo() {
  /** Staggered advent tiles on ink — first three calendars in the catalog. */
  const PROMO_ITEMS = products
    .filter((p) => p.categoryName === "Advent Calendars")
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, image: p.images[0], alt: p.name }));
  return (
    <section className="bg-ink py-16 text-white sm:py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="eyebrow-pill text-xs uppercase tracking-wide text-ink sm:text-sm">
            A little more to unwrap
          </span>
          <h2 className="mt-5 font-[family-name:var(--font-fredoka)] text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
            Big smiles.
            <br />
            <span className="text-sun">Little surprises.</span>
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg font-semibold text-white/90">
            Discover gift sets and advent calendars, all in one happy place.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/collections/advent-calendars"
              className="btn-squish btn-sun text-base"
            >
              Explore calendars →
            </Link>
            <Link
              href="/collections/boxes-gift-sets"
              className="font-[family-name:var(--font-fredoka)] font-semibold underline decoration-sun decoration-2 underline-offset-4 transition hover:text-sun"
            >
              Shop gift sets →
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 pt-4">
          {PROMO_ITEMS.map((item, i) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className={`block aspect-square overflow-hidden rounded-[18px] border-[2.5px] border-white bg-white transition-transform duration-200 hover:-rotate-2 hover:scale-105 ${
                i === 1 ? "-translate-y-3.5" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
