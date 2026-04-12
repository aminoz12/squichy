"use client";

import Image from "next/image";
import Link from "next/link";
import { products, type ProductOffer } from "@/lib/data";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";

const categories = ["All", ...Array.from(new Set(products.map((p) => p.categoryName)))];

export function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"price-low" | "price-high" | "name">("name");

  const filteredProducts = useMemo(() => {
    let result = selectedCategory === "All" 
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
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 mb-4 font-[family-name:var(--font-fredoka)] tracking-tight"
          >
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-pink-500">Collection</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto"
          >
            Discover our full range of premium squishy toys. Find your perfect dopamine hit!
          </motion.p>
        </div>

        {/* Filters & Sort */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-10"
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-violet-300 hover:text-violet-600"
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
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 outline-none cursor-pointer"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} index={idx} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-500 text-lg">No products found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: ProductOffer; index: number }) {
  const mainImage = product.images[0];
  const minPrice = Math.min(...product.options.map((o) => o.priceUsd));
  const maxPrice = Math.max(...product.options.map((o) => o.priceUsd));
  const priceDisplay = minPrice === maxPrice 
    ? `$${minPrice}` 
    : `$${minPrice} - $${maxPrice}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-pink-500 text-white text-xs font-black uppercase tracking-wide shadow-lg">
              {product.badge}
            </span>
          )}

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-violet-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-wider mb-2">
            {product.categoryName}
          </p>
          <h3 className="font-[family-name:var(--font-fredoka)] text-lg font-bold text-slate-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          <p className="text-sm text-slate-600 line-clamp-2 mb-4">
            {product.description}
          </p>
          
          {/* Price & CTA */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-black text-slate-900">
              {priceDisplay}
            </span>
            <span className="text-sm font-bold text-violet-600 group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
