import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "About SquishyBun";
const description =
  "Learn about SquishyBun Dumplings, a small online shop for mystery squishy dumpling toys, sensory fidgets, and giftable desk toys.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function AboutPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "AboutPage",
            "@id": `${url}/about#webpage`,
            url: `${url}/about`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ],
            "/about#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            About
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
            Mystery squishy toys, shipped with clear support.
          </h1>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-foreground/80">
            <p>
              SquishyBun Dumplings is a focused toy storefront built around mystery
              dumpling squishies, sensory fidgets, and small gifts that are easy to
              collect, squeeze, and share.
            </p>
            <p>
              Every product page is designed to show the current bundle options,
              checkout price, age guidance, delivery notes, and support route before
              you place an order.
            </p>
            <p>
              The shop serves customers in the United States, Canada, the United
              Kingdom, and select European destinations where checkout confirms
              availability.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
            >
              Shop products
            </Link>
            <Link
              href="/contact"
              className="rounded-xl border border-pink-200 bg-white px-5 py-3 text-sm font-black uppercase tracking-wide text-foreground transition hover:border-accent/40"
            >
              Contact support
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
