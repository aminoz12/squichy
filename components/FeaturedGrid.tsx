"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { products } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

/** Reference homepage picks: four fan favorites, mystery dumpling first. */
const FEATURED_IDS = [
  "squishybun-mystery-dumpling",
  "sq-001",
  "sq-022",
  "sq-017",
];


export function FeaturedGrid() {
  const featured = FEATURED_IDS.map((id) =>
    products.find((p) => p.id === id),
  ).filter((p): p is (typeof products)[number] => p != null);

  return (
    <section className="bg-cream pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-ink md:text-5xl">
              Pick your little <span className="marker-word text-pink-pop">happy</span>
            </h2>
            <p className="mt-3 max-w-2xl text-lg font-semibold text-ink-2">
              Four little favorites to start your collection.
            </p>
          </div>
          <Link
            href="/products"
            className="font-[family-name:var(--font-fredoka)] font-semibold text-ink underline decoration-pink-pop decoration-2 underline-offset-4 transition hover:text-pink-pop"
          >
            Explore the collection →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {featured.map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/products" className="btn-squish btn-sun text-base">
            View more →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ product }: { product: (typeof products)[number] }) {
  const putLine = useCartStore((s) => s.putLine);
  const [added, setAdded] = useState(false);
  const buyOne = product.options[0]!;
  const feel = product.specs.find((s) => s.label === "Feel")?.value;

  const addToBag = () => {
    putLine({
      id: buyOne.id,
      name: `${product.name} (${buyOne.label})`,
      unitPriceUsd: buyOne.priceUsd,
      quantity: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <article className="sticker-card sticker-lift relative flex flex-col overflow-hidden">
      <Link
        href={`/products/${product.slug}`}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-square overflow-hidden border-b-[2.5px] border-ink bg-white"
      >
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 -rotate-3 rounded-full border-2 border-ink bg-sun px-3 py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold text-ink">
            {product.badge}
          </span>
        )}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)] hover:-rotate-2 hover:scale-108"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-ink-2">
          {feel ?? product.categoryName}
        </span>
        <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold leading-tight text-ink">
          <Link
            href={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:z-[1]"
          >
            {product.name}
          </Link>
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
            ${buyOne.priceUsd}
          </span>
          <button
            type="button"
            onClick={addToBag}
            aria-label={`Add ${product.name} to bag`}
            className={`relative z-[2] rounded-full border-[2.5px] border-ink px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink shadow-[2px_2px_0_var(--ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
              added ? "bg-mint" : "bg-sun hover:bg-pink-pop hover:text-white"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
