import type { Metadata } from "next";
import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutReturnBanner } from "@/components/CheckoutReturnBanner";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { ProductsGrid } from "@/components/ProductsGrid";
import { HappyClients } from "@/components/HappyClients";
import { breadcrumbJsonLd, productsCollectionJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Squishy Toys — 58+ Slow-Rise Squishies",
  description:
    "Shop 58+ squishy toys from $10.99: mystery dumplings, crunchy ASMR fidgets, animal squishies, gift boxes and advent calendars. BUY 2 GET 1 FREE, free delivery over $50.",
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    type: "website",
    url: "/products",
    title: "Squishy Toys | SquishyBun Dumplings",
    description:
      "Shop mystery dumpling squishies, fruit squishies, and sensory fidget toys with secure checkout.",
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          productsCollectionJsonLd(),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Shop", path: "/products" },
            ],
            "/products#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <Suspense fallback={null}>
        <CheckoutReturnBanner />
      </Suspense>
      <main className="flex-1">
        {/* Server-rendered header so H1 + intro are in the initial HTML (C14) */}
        <div className="bg-cream pt-14 sm:pt-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
            <h1 className="mb-4 font-[family-name:var(--font-fredoka)] text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Squishy Toys <span className="marker-word text-pink-pop">Collection</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg font-semibold text-ink-2 sm:text-xl">
              Discover our full range of premium squishy toys. Find your perfect dopamine hit!
            </p>
          </div>
        </div>
        <Suspense fallback={null}>
          <ProductsGrid />
        </Suspense>
        <HappyClients />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
