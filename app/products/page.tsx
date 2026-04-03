import type { Metadata } from "next";
import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutReturnBanner } from "@/components/CheckoutReturnBanner";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { ProductPageOffer } from "@/components/ProductPageOffer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { singleProductOffer } from "@/lib/data";
import {
  getMetadataBase,
  productBreadcrumbJsonLd,
  productJsonLd,
  SITE_NAME,
} from "@/lib/seo";

const productDesc = `${singleProductOffer.description} Prices in USD. Secure Stripe checkout — we ship across the United States and Canada.`;

export const metadata: Metadata = {
  title: `Buy ${singleProductOffer.name}`,
  description: productDesc,
  alternates: {
    canonical: "/products",
    languages: {
      "x-default": "/products",
      "en-US": "/products",
      "en-CA": "/products",
    },
  },
  openGraph: {
    type: "website",
    url: "/products",
    title: `${singleProductOffer.name} | ${SITE_NAME}`,
    description: productDesc,
    images: [
      {
        url: new URL(singleProductOffer.images[0] ?? "/big1.png", getMetadataBase()),
        alt: singleProductOffer.name,
      },
    ],
  },
  twitter: {
    title: `${singleProductOffer.name} | ${SITE_NAME}`,
    description: productDesc,
  },
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={[productJsonLd(), productBreadcrumbJsonLd()]} />
      <Navbar />
      <Suspense fallback={null}>
        <CheckoutReturnBanner />
      </Suspense>
      <main className="flex-1 pb-24 md:pb-0">
        <ProductPageOffer
          id="offer"
          className="mx-auto max-w-6xl px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-14"
          offer={singleProductOffer}
        />
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCTA />
    </>
  );
}
