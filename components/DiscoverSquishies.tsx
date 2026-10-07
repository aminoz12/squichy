import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";

/** Homepage tiles: flagship categories; image = first product of each. */
const TILES = [
  { category: "Dumpling Squishies", href: "/collections/dumpling-squishies", tint: "bg-pink-soft" },
  { category: "Crispy & Crunchy", href: "/collections/crispy-crunchy", tint: "bg-mint-soft" },
  { category: "Squishy Sets", href: "/collections/squishy-sets", tint: "bg-sun-soft" },
  { category: "Advent Calendars", href: "/collections/advent-calendars", tint: "bg-lilac" },
];

export function DiscoverSquishies() {
  const counts = new Map<string, number>();
  for (const p of products) {
    counts.set(p.categoryName, (counts.get(p.categoryName) ?? 0) + 1);
  }

  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Shop by <span className="marker-word text-pink-pop">squish</span>
            </h2>
            <p className="mt-3 max-w-2xl text-lg font-semibold text-ink-2">
              Find your favorite. Or collect them all.
            </p>
          </div>
          <Link
            href="/products"
            className="font-[family-name:var(--font-fredoka)] font-semibold text-ink underline decoration-pink-pop decoration-2 underline-offset-4 transition hover:text-pink-pop"
          >
            See all {products.length} →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {TILES.map((rawTile) => {
            const first = products.find((p) => p.categoryName === rawTile.category);
            const tile = { ...rawTile, image: first?.images[0] ?? "/hero-squish.jpg" };
            return (
            <Link
              key={tile.category}
              href={tile.href}
              className={`group relative flex min-h-[200px] flex-col overflow-hidden rounded-[22px] border-[2.5px] border-ink p-4 shadow-[4px_4px_0_var(--ink)] transition-transform duration-200 ease-[cubic-bezier(0.3,1.6,0.5,1)] hover:-translate-y-1.5 hover:-rotate-1 sm:min-h-[260px] ${tile.tint}`}
            >
              <h3 className="relative z-10 font-[family-name:var(--font-fredoka)] text-lg font-semibold leading-tight text-ink sm:text-2xl">
                {tile.category}
              </h3>
              <small className="relative z-10 text-sm font-bold text-ink/75">
                {counts.get(tile.category) ?? 0} styles
              </small>
              <div className="absolute bottom-[7%] right-[7%] aspect-square w-[64%] overflow-hidden rounded-full border-[2.5px] border-ink bg-white transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)] group-hover:rotate-6 group-hover:scale-110">
                <Image
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 640px) 45vw, (max-width: 1024px) 40vw, 300px"
                  className="object-cover"
                />
              </div>
            </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
