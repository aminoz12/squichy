"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { products, type ProductOffer } from "@/lib/data";

function matches(product: ProductOffer, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;
  const haystack = `${product.name} ${product.categoryName} ${product.description}`.toLowerCase();
  return q.split(/\s+/).every((word) => haystack.includes(word));
}

export function SearchResults() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");

  const results = useMemo(
    () => products.filter((p) => matches(p, query)),
    [query],
  );
  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <form
        role="search"
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto flex max-w-xl items-center gap-3"
      >
        <label htmlFor="site-search" className="sr-only">
          Search squishies
        </label>
        <input
          id="site-search"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try “dumpling”, “advent”, “crunchy”…"
          className="w-full rounded-full border-[2.5px] border-ink bg-white px-5 py-3 font-semibold text-ink placeholder:text-ink-2/70"
        />
      </form>

      {hasQuery && (
        <p className="mt-6 text-center text-sm font-bold text-ink-2" role="status">
          {results.length === 0
            ? "No squishies match that — try a shorter word."
            : `${results.length} squish${results.length === 1 ? "y" : "ies"} found`}
        </p>
      )}

      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {(hasQuery ? results : []).map((product) => {
          const minPrice = Math.min(...product.options.map((o) => o.priceUsd));
          return (
            <article key={product.id} className="sticker-card sticker-lift group overflow-hidden">
              <Link href={`/products/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden border-b-[2.5px] border-ink bg-white">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, 25vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[11px] font-extrabold uppercase tracking-wider text-pink-pop">
                    {product.categoryName}
                  </p>
                  <h2 className="mt-1 line-clamp-2 font-[family-name:var(--font-fredoka)] text-base font-semibold leading-tight text-ink">
                    {product.name}
                  </h2>
                  <p className="mt-2 font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
                    {product.options.length === 1
                      ? `$${minPrice.toFixed(2)}`
                      : `From $${minPrice.toFixed(2)}`}
                  </p>
                </div>
              </Link>
            </article>
          );
        })}
      </div>

      {!hasQuery && (
        <p className="mt-8 text-center text-sm font-semibold text-ink-2">
          Start typing to search all {products.length} squishies, or{" "}
          <Link href="/products" className="font-bold text-ink underline decoration-pink-pop decoration-2 underline-offset-2 hover:text-pink-pop">
            browse the whole shop →
          </Link>
        </p>
      )}
    </div>
  );
}
