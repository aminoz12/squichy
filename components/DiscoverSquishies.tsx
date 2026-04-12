"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/data";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export function DiscoverSquishies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories = Array.from(new Set(products.map((p) => p.categoryName))).map(name => {
    const p = products.find(prod => prod.categoryName === name);
    return { name, slug: p?.slug || "", image: p?.categoryImage || (p?.images[0] ? p.images[0] : "") };
  });

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      return () => el.removeEventListener("scroll", checkScroll);
    }
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Vibrant animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-violet-50 to-cyan-50" />
      <div className="absolute inset-0 bg-gradient-to-tr from-rose-100/40 via-transparent to-sky-100/40" />
      
      {/* Animated floating orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-pink-400/30 to-rose-400/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-violet-400/30 to-purple-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-br from-cyan-300/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(139, 92, 246, 0.15) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-6 font-[family-name:var(--font-fredoka)] tracking-tight"
          >
            Discover Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-violet-500 to-cyan-500">Squishies</span>
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

        {/* Scrollable Categories with Navigation */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-violet-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl ${
              canScrollLeft ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-violet-100 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl ${
              canScrollRight ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            }`}
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Container */}
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat, idx) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 snap-start"
              >
                <Link
                  href={`/products/${cat.slug}`}
                  className="group/card block w-44 sm:w-52 lg:w-60 transition-all duration-500"
                >
                  <div 
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden transition-all duration-500 bg-white/60 backdrop-blur-sm border border-white/50 shadow-lg hover:shadow-2xl hover:scale-[1.03] ring-2 ring-transparent hover:ring-violet-300"
                  >
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-contain p-4 drop-shadow-lg group-hover/card:rotate-2 group-hover/card:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Glossy overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-white/20 pointer-events-none" />
                  </div>
                  
                  <p className="mt-4 text-xs sm:text-sm text-center font-black tracking-widest uppercase transition-all duration-300 text-slate-600 group-hover/card:text-violet-600 group-hover/card:scale-105">
                    {cat.name}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Gradient masks for edges */}
          <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-pink-50/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-violet-50/80 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}
