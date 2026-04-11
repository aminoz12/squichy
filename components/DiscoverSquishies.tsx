"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { motion } from "framer-motion";

export function DiscoverSquishies() {
  const categories = Array.from(new Set(products.map((p) => p.categoryName))).map(name => {
    const p = products.find(prod => prod.categoryName === name);
    return { name, slug: p?.slug || "", image: p?.categoryImage || (p?.images[0] ? p.images[0] : "") };
  });

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background elements for a premium feel */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-pink-50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 font-[family-name:var(--font-fredoka)] tracking-tight"
          >
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-600">Squishies</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-slate-600 font-medium max-w-2xl mx-auto"
          >
            Find your new favorite dopamine hit. Each one is a pocket-sized bundle of joy.
          </motion.p>
        </div>

        {/* Category Marquee */}
        <div className="mb-16 w-full overflow-hidden relative">
            {/* Soft gradient masks for the edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            <div 
              className="flex w-max items-center py-4 category-marquee-track"
            >
              {[...categories, ...categories, ...categories, ...categories].map((cat, idx) => (
                <Link
                  key={`${cat.name}-${idx}`}
                  href={`/products/${cat.slug}`}
                  className="flex-shrink-0 w-40 sm:w-48 lg:w-[220px] mr-6 lg:mr-8 group/card transition-all duration-500 block"
                >
                  <div 
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden transition-all duration-500 opacity-80 hover:opacity-100 hover:scale-[1.02] bg-slate-50 border border-slate-100 ring-2 ring-transparent hover:ring-violet-200 hover:shadow-xl"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 drop-shadow-lg group-hover/card:rotate-3 group-hover/card:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <p className="mt-4 text-xs sm:text-sm text-center font-black tracking-widest uppercase transition-colors text-slate-500 group-hover/card:text-violet-600">
                    {cat.name}
                  </p>
                </Link>
              ))}
            </div>
        </div>

        {/* Removed dynamic products grid as per requirement to navigate directly to product page */}
      </div>
    </section>
  );
}
