"use client";

import Image from "next/image";
import Link from "next/link";
import { product, siteIconPath } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

const NAV_LINKS: { label: string; href: string; hot?: boolean }[] = [
  { label: "Shop all", href: "/products" },
  { label: "Dumplings", href: "/collections/dumplings" },
  { label: "🔥 Crunchy", href: "/collections/sensory-asmr", hot: true },
  { label: "Gift sets", href: "/collections/boxes-gift-sets" },
  { label: "🎄 Advent", href: "/collections/advent-calendars" },
];

export function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );

  return (
    <header
      className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-[rgba(255,246,234,0.92)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 font-[family-name:var(--font-fredoka)] text-lg font-semibold tracking-tight text-ink sm:text-2xl"
        >
          <span className="relative shrink-0">
            <Image
              src={siteIconPath}
              alt=""
              width={48}
              height={48}
              className="h-10 w-10 -rotate-6 rounded-xl border-2 border-ink object-cover sm:h-11 sm:w-11"
            />
          </span>
          <span className="whitespace-nowrap">
            {product.name.split(" ").slice(0, 2).join(" ")}
            <span className="text-pink-pop">.</span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 font-[family-name:var(--font-fredoka)] text-[15px] font-semibold text-ink md:flex"
        >
          {NAV_LINKS.map(({ label, href, hot }) => (
            <Link
              key={label}
              href={href}
              className={`whitespace-nowrap px-3 py-2 underline-offset-8 transition-colors hover:underline hover:decoration-pink-pop hover:decoration-4 ${
                hot ? "text-pink-pop" : "hover:text-pink-pop"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={toggleCart}
          className="flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-sun px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink shadow-[3px_3px_0_var(--ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)] sm:px-5 sm:py-2"
          aria-label={count > 0 ? `Open bag, ${count} items` : "Open bag"}
        >
          <span aria-hidden>🛍️</span>
          Bag
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        </button>
      </div>
    </header>
  );
}
