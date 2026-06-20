import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "Shipping Info";
const description =
  "Shipping information for SquishyBun Dumplings: USA, Canada, UK, and select Europe delivery notes, tracking, checkout currency, and returns guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/shipping",
  },
  openGraph: {
    type: "website",
    url: "/shipping",
    title,
    description,
  },
};

const regions = [
  {
    name: "United States",
    copy: "US shoppers can order in USD with secure Stripe checkout. Most orders are packed quickly, with tracking sent by email after dispatch.",
  },
  {
    name: "Canada",
    copy: "Canadian orders use the same product catalog and checkout flow. Delivery times can vary by province, carrier volume, and customs handling.",
  },
  {
    name: "United Kingdom",
    copy: "UK buyers can use the product pages to confirm live availability and checkout options. Watch carrier updates for any import or VAT notices.",
  },
  {
    name: "Europe",
    copy: "For Europe, availability can vary by destination. The checkout flow is the source of truth for whether your address is currently supported.",
  },
] as const;

export default function ShippingPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}/shipping#webpage`,
            url: `${url}/shipping`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Shipping", path: "/shipping" },
            ],
            "/shipping#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            Shipping
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
            Shipping Squishy Toys to the USA, Canada, UK & Europe
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            {description}
          </p>

          <section className="mt-10 grid gap-4 sm:grid-cols-2">
            {regions.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_18px_45px_-28px_rgba(236,72,153,0.45)]"
              >
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
                  {region.name}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {region.copy}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-10 rounded-2xl border border-[#ff8a12]/40 bg-white p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-[#2d2384]">
              Tracking, currency, and returns
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-foreground/80">
              <p>
                Product prices are shown in USD before checkout. Taxes, delivery options,
                and final destination availability are confirmed during the secure checkout
                step.
              </p>
              <p>
                If your order arrives damaged or not as described, email support within 14
                days so the team can help review the issue.
              </p>
            </div>
            <Link
              href="/products"
              className="mt-6 inline-flex rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
            >
              Shop squishy toys
            </Link>
          </section>

          <p className="mt-10 text-center text-sm text-foreground/55">
            <span>{SITE_NAME}</span>
          </p>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
