import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { social } from "@/lib/data";
import { breadcrumbJsonLd, getSiteUrl, ogImageUrl } from "@/lib/seo";

const title = "Track Your Order";
const description =
  "How to track your SquishyBun order: find your tracking link, what each status means, and how to get help if a parcel looks stuck.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/track-order" },
  openGraph: {
    type: "website",
    url: "/track-order",
    title: `${title} | SquishyBun`,
    description,
    images: [ogImageUrl()],
  },
};

const STEPS = [
  {
    heading: "1. Check your email",
    body: "As soon as your order ships (1–2 business days after purchase), we email your tracking link to the address you used at checkout. Search your inbox — and spam folder — for “SquishyBun” or the Stripe payment receipt.",
  },
  {
    heading: "2. Open the tracking link",
    body: "The link goes straight to the carrier's live tracking page. “Label created” means it's packed and waiting for carrier pickup — movement usually shows within 1–2 business days.",
  },
  {
    heading: "3. Nothing after 3 business days?",
    body: "If there's no tracking email three business days after your order, or the parcel hasn't moved for a week, email us with your order number (it's on your payment receipt) and we'll chase it for you.",
  },
] as const;

export default function TrackOrderPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}/track-order#webpage`,
            url: `${url}/track-order`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Track your order", path: "/track-order" },
            ],
            "/track-order#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-cream pb-16">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <span className="eyebrow-pill text-xs uppercase tracking-wide">Help</span>
          <h1 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Track your order
          </h1>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-ink-2">
            Every order gets a carrier tracking link by email the moment it
            ships. Here&apos;s how to find it — and what to do if it&apos;s hiding.
          </p>

          <div className="mt-8 space-y-4">
            {STEPS.map((step) => (
              <section
                key={step.heading}
                className="rounded-[18px] border-[2.5px] border-ink bg-white p-5 shadow-[3px_3px_0_var(--ink)]"
              >
                <h2 className="font-[family-name:var(--font-fredoka)] text-lg font-semibold text-ink">
                  {step.heading}
                </h2>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-ink-2">
                  {step.body}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${social.email}?subject=Order%20tracking%20help`}
              className="btn-squish text-sm"
            >
              Email us about my order
            </a>
            <Link
              href="/shipping"
              className="font-[family-name:var(--font-fredoka)] font-semibold text-ink underline decoration-pink-pop decoration-2 underline-offset-4 hover:text-pink-pop"
            >
              Delivery times →
            </Link>
          </div>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
