import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutReturnBanner } from "@/components/CheckoutReturnBanner";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { ProductPageOffer } from "@/components/ProductPageOffer";
import { HappyClients } from "@/components/HappyClients";
import { DiscoverSquishies } from "@/components/DiscoverSquishies";
import { products, siteIconPath } from "@/lib/data";
import {
  getMetadataBase,
  productBreadcrumbJsonLd,
  productJsonLd,
  SITE_NAME,
} from "@/lib/seo";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};

  const productDesc = `${product.description} Prices in USD. Secure Stripe checkout — we ship across the United States and Canada.`;

  return {
    title: `Buy ${product.name}`,
    description: productDesc,
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      type: "website",
      url: `/products/${slug}`,
      title: `${product.name} | ${SITE_NAME}`,
      description: productDesc,
      images: [
        {
          url: new URL(product.images[0] ?? "/big1.png", getMetadataBase()),
          alt: product.name,
        },
      ],
    },
    twitter: {
      title: `${product.name} | ${SITE_NAME}`,
      description: productDesc,
    },
    icons: {
      icon: siteIconPath,
      shortcut: siteIconPath,
      apple: siteIconPath,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <JsonLd data={[productJsonLd(), productBreadcrumbJsonLd()]} />
      <Navbar />
      <Suspense fallback={null}>
        <CheckoutReturnBanner />
      </Suspense>
      <main className="flex-1 pb-20 md:pb-0">
        <ProductPageOffer
          id="offer"
          className="mx-auto max-w-6xl px-4 pb-8 pt-5 sm:px-6 sm:pb-10 sm:pt-7"
          offer={product}
        />
        <DiscoverSquishies />
        <HappyClients />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

export async function generateStaticParams() {
  return products.map((p) => ({
    slug: p.slug,
  }));
}
