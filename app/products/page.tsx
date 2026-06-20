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
  title: "Squishy Toys",
  description:
    "Shop mystery dumpling squishies, apple squishies, cheese squares, butter squishies, and sensory fidget toys for the USA, Canada, UK, and Europe.",
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
        <ProductsGrid />
        <HappyClients />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
