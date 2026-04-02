"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { product } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

export function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-40 border-b border-violet-200/60 bg-white/85 shadow-[0_8px_30px_-18px_rgba(124,58,237,0.55)] backdrop-blur-xl"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-fredoka)] text-lg font-black tracking-tight text-foreground sm:text-2xl"
        >
          {product.name.split(" ").slice(0, 2).join(" ")}
          <span className="text-primary-dark">.</span>
        </Link>

        <nav className="hidden items-center gap-2 rounded-full border border-pink-100 bg-white/90 px-2 py-1 text-sm font-semibold text-muted shadow-sm md:flex">
          <Link
            href="/products"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-pink-50 hover:text-accent"
          >
            Product
          </Link>
          <a
            href="/products#offer"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-pink-50 hover:text-accent"
          >
            Buy
          </a>
          <a
            href="/#faq"
            className="rounded-full px-3 py-1.5 transition-colors hover:bg-pink-50 hover:text-accent"
          >
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/products#offer"
            className="hidden rounded-xl bg-[#ffd500] px-4 py-2 text-sm font-black text-[#2d2384] shadow-md shadow-amber-400/40 transition-transform hover:scale-[1.03] hover:brightness-105 active:scale-[0.98] sm:inline-flex"
          >
            BUY NOW
          </a>
          <button
            type="button"
            onClick={toggleCart}
            className="relative rounded-xl border border-pink-200 bg-white px-3 py-2 text-sm font-extrabold text-foreground shadow-sm transition hover:border-accent/40 hover:shadow-md"
            aria-label="Open cart"
          >
            CART
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary-dark px-1 text-[10px] font-extrabold text-white">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>
        </div>
      </div>
    </motion.header>
  );
}
