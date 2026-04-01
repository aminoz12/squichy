import { BuzzEverywhere } from "@/components/BuzzEverywhere";
import { CartDrawer } from "@/components/CartDrawer";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Navbar } from "@/components/Navbar";
import { Reviews } from "@/components/Reviews";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { UrgencyBar } from "@/components/UrgencyBar";
import { buzzReelVideos } from "@/lib/data";

/** Single-page storefront: Zustand cart + Stripe Checkout Sessions via /api/checkout. */
export default function Home() {
  return (
    <>
      <Navbar />
      <UrgencyBar />
      <main className="flex-1 pb-24 md:pb-0">
        <Hero />
        <Reviews />
        <BuzzEverywhere videos={buzzReelVideos} />
        <HowItWorks />
        <FAQ />
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCTA />
    </>
  );
}
