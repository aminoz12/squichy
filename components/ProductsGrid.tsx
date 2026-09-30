"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { products, type ProductOffer } from "@/lib/data";
import { useState, useMemo } from "react";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.categoryName)))];

export function ProductsGrid() {
  const searchParams = useSearchParams();
  const urlCategory = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState(
    urlCategory && categories.includes(urlCategory) ? urlCategory : "All",
  );
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">("name");

  // Deep links (?category=...) from the nav, footer, and homepage tiles:
  // adjust state during render when the URL param changes.
  const [lastUrlCategory, setLastUrlCategory] = useState(urlCategory);
  if (urlCategory !== lastUrlCategory) {
    setLastUrlCategory(urlCategory);
    if (urlCategory && categories.includes(urlCategory)) {
      setSelectedCategory(urlCategory);
    }
  }

  const filteredProducts = useMemo(() => {
    const result = selectedCategory === "All"
      ? [...products]
      : products.filter((p) => p.categoryName === selectedCategory);

    // Always put mystery dumpling first
    const mysteryIndex = result.findIndex(p => p.id === "squishybun-mystery-dumpling");
    if (mysteryIndex > 0) {
      const [mystery] = result.splice(mysteryIndex, 1);
      result.unshift(mystery);
    }

    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => {
          if (a.id === "squishybun-mystery-dumpling") return -1;
          if (b.id === "squishybun-mystery-dumpling") return 1;
          return Math.min(...a.options.map(o => o.priceUsd)) - Math.min(...b.options.map(o => o.priceUsd));
        });
        break;
      case "price-high":
        result.sort((a, b) => {
          if (a.id === "squishybun-mystery-dumpling") return -1;
          if (b.id === "squishybun-mystery-dumpling") return 1;
          return Math.max(...b.options.map(o => o.priceUsd)) - Math.max(...a.options.map(o => o.priceUsd));
        });
        break;
      case "name":
        result.sort((a, b) => {
          if (a.id === "squishybun-mystery-dumpling") return -1;
          if (b.id === "squishybun-mystery-dumpling") return 1;
          return a.name.localeCompare(b.name);
        });
        break;
    }

    return result;
  }, [selectedCategory, sortBy]);

  return (
    <section className="bg-cream py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="mb-4 font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Squishy Toys <span className="marker-word text-pink-pop">Collection</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-semibold text-ink-2 sm:text-xl">
            Discover our full range of premium squishy toys. Find your perfect dopamine hit!
          </p>
        </div>

        {/* Filters & Sort */}
        <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full border-[2.5px] border-ink px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  selectedCategory === cat
                    ? "bg-ink text-white"
                    : "bg-white text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="cursor-pointer rounded-full border-[2.5px] border-ink bg-white px-4 py-2 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink outline-none focus-visible:outline-[3px] focus-visible:outline-accent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink-2">
              No products found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: ProductOffer; index: number }) {
  const mainImage = product.images[0];
  const minPrice = Math.min(...product.options.map((o) => o.priceUsd));
  const priceDisplay =
    product.options.length === 1 ? `$${minPrice}` : `From $${minPrice}`;

  return (
    <article className="sticker-card sticker-lift group overflow-hidden">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Photos carry their own studio backdrop — no tint behind them */}
        <div className="relative aspect-square overflow-hidden border-b-[2.5px] border-ink bg-white">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            loading={index < 4 ? "eager" : undefined}
            className="object-cover transition-transform duration-300 ease-[cubic-bezier(0.3,1.6,0.5,1)] group-hover:-rotate-2 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute left-4 top-4 -rotate-3 rounded-full border-2 border-ink bg-sun px-3 py-1 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-wide text-ink">
              {product.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="mb-1.5 text-xs font-extrabold uppercase tracking-wider text-pink-pop">
            {product.categoryName}
          </p>
          <h3 className="mb-2 line-clamp-1 font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
            {product.name}
          </h3>
          <p className="mb-4 line-clamp-2 text-sm font-semibold text-ink-2">
            {product.description}
          </p>

          {/* Price & CTA */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
              {priceDisplay}
            </span>
            <span className="inline-flex items-center justify-center rounded-full border-2 border-ink bg-sun px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-xs font-semibold uppercase tracking-wide text-ink shadow-[2px_2px_0_var(--ink)] transition-colors group-hover:bg-pink-pop group-hover:text-white">
              Buy now
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
