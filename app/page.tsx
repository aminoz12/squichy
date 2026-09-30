import type { Metadata } from "next";
import { AdventPromo } from "@/components/AdventPromo";
import { BuzzEverywhere } from "@/components/BuzzEverywhere";
import { CartDrawer } from "@/components/CartDrawer";
import { FAQ } from "@/components/FAQ";
import { FeaturedGrid } from "@/components/FeaturedGrid";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { DiscoverSquishies } from "@/components/DiscoverSquishies";
import { JsonLd } from "@/components/JsonLd";
import { NewsletterSection } from "@/components/NewsletterSection";
import { Navbar } from "@/components/Navbar";
import { Reviews } from "@/components/Reviews";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { TrustStrip } from "@/components/TrustStrip";
import { UrgencyBar } from "@/components/UrgencyBar";
import { buzzReelVideos } from "@/lib/data";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  SITE_TAGLINE,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: "Mystery Squishy Toys | SquishyBun",
    description: SITE_TAGLINE,
  },
};

/** Single-page storefront: Zustand cart + Stripe Checkout Sessions via /api/checkout. */
export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(),
          faqPageJsonLd(),
          breadcrumbJsonLd([{ name: "Home", path: "/" }]),
        ]}
      />
      <Navbar />
      <UrgencyBar />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <DiscoverSquishies />
        <FeaturedGrid />
        <AdventPromo />
        <TrustStrip />
        <Reviews />
        <BuzzEverywhere videos={buzzReelVideos} />
        <FAQ />
        <NewsletterSection />
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCTA />
    </>
  );
}
