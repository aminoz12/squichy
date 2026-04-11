import type { Metadata } from "next";
import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutReturnBanner } from "@/components/CheckoutReturnBanner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { DiscoverSquishies } from "@/components/DiscoverSquishies";
import { HappyClients } from "@/components/HappyClients";
import { SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Our Collection | ${SITE_NAME}`,
  description: "Explore our premium collection of mystery dumplings, apple squishies, cheese squares, and more.",
  alternates: {
    canonical: "/products",
  },
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={null}>
        <CheckoutReturnBanner />
      </Suspense>
      <main className="flex-1">
        <DiscoverSquishies />
        <HappyClients />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
