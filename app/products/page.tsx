import { Suspense } from "react";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutReturnBanner } from "@/components/CheckoutReturnBanner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { ProductPageOffer } from "@/components/ProductPageOffer";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { singleProductOffer } from "@/lib/data";

export default function ProductsPage() {
  return (
    <>
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
