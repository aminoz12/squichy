import type { Metadata } from "next";
import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SearchResults } from "@/components/SearchResults";

export const metadata: Metadata = {
  title: "Search",
  description: "Search all SquishyBun squishies by name, category, or feel.",
  alternates: { canonical: "/search" },
  // Thin, query-driven page — keep it out of the index.
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 bg-cream pb-16">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          <h1 className="mb-8 text-center font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Find your <span className="marker-word text-pink-pop">squishy</span>
          </h1>
          <Suspense fallback={null}>
            <SearchResults />
          </Suspense>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
