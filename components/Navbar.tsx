"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { product, siteIconPath } from "@/lib/data";
import { useCartStore } from "@/lib/store/use-cart-store";

const NAV_LINKS: { label: string; href: string; hot?: boolean }[] = [
  { label: "Shop all", href: "/products" },
  { label: "Dumplings", href: "/collections/dumpling-squishies" },
  { label: "🔥 Crunchy", href: "/collections/crispy-crunchy", hot: true },
  { label: "Gift sets", href: "/collections/squishy-sets" },
  { label: "🎄 Advent", href: "/collections/advent-calendars" },
];

/** Full list for the mobile panel — every collection plus help links. */
const MOBILE_LINKS: { label: string; href: string }[] = [
  { label: "🔍 Search", href: "/search" },
  { label: "Shop all", href: "/products" },
  { label: "Dumpling Squishies", href: "/collections/dumpling-squishies" },
  { label: "Glitter Squishies", href: "/collections/glitter-squishies" },
  { label: "Mystery Squishies", href: "/collections/mystery-squishies" },
  { label: "Giant Squishies", href: "/collections/giant-squishies" },
  { label: "Crispy & Crunchy 🔥", href: "/collections/crispy-crunchy" },
  { label: "Animal Squishies", href: "/collections/animal-squishies" },
  { label: "Party Packs", href: "/collections/party-packs" },
  { label: "Squishy Sets 🎁", href: "/collections/squishy-sets" },
  { label: "Advent calendars 🎄", href: "/collections/advent-calendars" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const toggleCart = useCartStore((s) => s.toggleCart);
  const count = useCartStore((s) =>
    s.items.reduce((acc, i) => acc + i.quantity, 0),
  );
  const [menuOpen, setMenuOpen] = useState(false);

  // Restore the persisted cart after hydration (skipHydration in the store).
  useEffect(() => {
    void useCartStore.persist.rehydrate();
  }, []);

  return (
    <header
      className="sticky top-0 z-40 border-b-[2.5px] border-ink bg-[rgba(255,246,234,0.92)] backdrop-blur-md"
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink bg-white text-lg text-ink md:hidden"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 font-[family-name:var(--font-fredoka)] text-lg font-semibold tracking-tight text-ink sm:gap-2.5 sm:text-2xl"
          >
            <span className="relative shrink-0">
              <Image
                src={siteIconPath}
                alt=""
                width={48}
                height={48}
                loading="eager"
                className="h-10 w-10 -rotate-6 object-contain sm:h-11 sm:w-11"
              />
            </span>
            <span className="truncate whitespace-nowrap">
              {product.name.split(" ").slice(0, 2).join(" ")}
              <span className="text-pink-pop">.</span>
            </span>
          </Link>
        </div>

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
          className="flex shrink-0 items-center gap-2 rounded-full border-[2.5px] border-ink bg-sun px-4 py-1.5 font-[family-name:var(--font-fredoka)] text-sm font-semibold text-ink shadow-[3px_3px_0_var(--ink)] transition active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0_var(--ink)] sm:px-5 sm:py-2"
          aria-label={count > 0 ? `Open bag, ${count} items` : "Open bag"}
        >
          <span aria-hidden>🛍️</span>
          Bag
          <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] font-bold text-white">
            {count > 9 ? "9+" : count}
          </span>
        </button>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full max-h-[calc(100vh-3.5rem)] overflow-y-auto border-b-[3px] border-ink bg-cream shadow-[0_8px_0_rgba(42,20,66,0.15)] md:hidden"
        >
          <div className="mx-auto grid max-w-6xl gap-1 px-4 py-4">
            {MOBILE_LINKS.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="rounded-[14px] border-2 border-transparent px-3 py-2.5 font-[family-name:var(--font-fredoka)] text-base font-semibold text-ink transition hover:border-ink hover:bg-white"
              >
                {label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
