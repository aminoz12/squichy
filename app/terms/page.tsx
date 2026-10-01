import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { social } from "@/lib/data";
import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME, ogImageUrl } from "@/lib/seo";

const title = "Terms of Service";
const description =
  "Terms of service for SquishyBun Dumplings: orders, pricing, payment, shipping, returns, product safety, and how to contact us.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", url: "/terms", title, description, images: [ogImageUrl()] },
};

const SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "1. Who we are",
    body: [
      `This website is operated by ${SITE_NAME} ("SquishyBun", "we", "us"). You can reach us any time at ${social.email}. By placing an order or using this site you agree to these terms.`,
    ],
  },
  {
    heading: "2. Products",
    body: [
      "We sell squishy and sensory toys. They are toys, not food — they must never be chewed or eaten. All products are recommended for ages 3 and up and may contain small parts; young children should be supervised.",
      "Mystery and blind-box products contain a surprise style or color chosen at random from the range shown on the product page. The specific style you receive cannot be chosen or guaranteed.",
      "Product photos are as accurate as we can make them, but colors can vary slightly between screens and between hand-made batches.",
    ],
  },
  {
    heading: "3. Orders & payment",
    body: [
      "All prices are shown in US dollars. Payment is processed securely by Stripe (cards, Apple Pay, Google Pay where available); we never see or store your full card details.",
      "Bundle offers (such as BUY 2, GET 1 FREE) are applied as shown on the product page at the time of purchase. Promotional codes, where available, are entered on the payment page.",
      "We may refuse or cancel an order in case of a pricing error, suspected fraud, or stock unavailability — if payment was taken, it will be refunded in full.",
    ],
  },
  {
    heading: "4. Shipping",
    body: [
      `We ship to the United States, Canada, the United Kingdom, and most European countries. Orders are packed within 1–2 business days; estimated transit times are listed on our Shipping page. Delivery is free on orders over $${FREE_DELIVERY_THRESHOLD_USD}; otherwise the delivery cost is shown at checkout before you pay.`,
      "A tracking link is emailed when your order ships. International orders may be subject to local import taxes or duties, which are the buyer's responsibility.",
    ],
  },
  {
    heading: "5. Returns & refunds",
    body: [
      "If your order arrives damaged, defective, or not as described, email us within 14 days of delivery and we will replace it or refund you — returns are free. See the Returns page for the step-by-step process.",
      "Because mystery boxes are a game of chance, receiving a duplicate or a style you did not hope for is not a defect. Advent calendars and gift sets can only be returned unopened.",
    ],
  },
  {
    heading: "6. Your account of use",
    body: [
      "You agree to use this site lawfully and not to interfere with its operation, attempt to access other customers' data, or scrape content for commercial reuse.",
    ],
  },
  {
    heading: "7. Intellectual property",
    body: [
      "The SquishyBun name, logo, product photography, and site content belong to us or our licensors and may not be reproduced without permission. Third-party trademarks mentioned on the site belong to their respective owners.",
    ],
  },
  {
    heading: "8. Liability",
    body: [
      "Nothing in these terms limits rights you have under applicable consumer law. Beyond what the law requires, our liability for any claim related to an order is limited to the amount you paid for that order.",
    ],
  },
  {
    heading: "9. Changes & contact",
    body: [
      `We may update these terms from time to time; the version published on this page applies to new orders. Questions? Email ${social.email} or use the contact page — we answer fast.`,
    ],
  },
];

export default function TermsPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}/terms#webpage`,
            url: `${url}/terms`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Terms of Service", path: "/terms" },
            ],
            "/terms#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 bg-cream pb-16">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <span className="eyebrow-pill text-xs uppercase tracking-wide">Legal</span>
          <h1 className="mt-4 font-[family-name:var(--font-fredoka)] text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm font-semibold text-ink-2">
            Last updated: October 1, 2026
          </p>

          <div className="mt-8 space-y-7">
            {SECTIONS.map((section) => (
              <section key={section.heading}>
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-semibold text-ink">
                  {section.heading}
                </h2>
                {section.body.map((para) => (
                  <p
                    key={para.slice(0, 40)}
                    className="mt-2 text-sm font-semibold leading-relaxed text-ink-2"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <p className="mt-10 text-sm font-semibold text-ink-2">
            See also:{" "}
            <Link href="/shipping" className="font-bold text-ink underline decoration-pink-pop decoration-2 underline-offset-2 hover:text-pink-pop">
              Shipping
            </Link>
            {" · "}
            <Link href="/returns" className="font-bold text-ink underline decoration-pink-pop decoration-2 underline-offset-2 hover:text-pink-pop">
              Returns
            </Link>
            {" · "}
            <Link href="/privacy" className="font-bold text-ink underline decoration-pink-pop decoration-2 underline-offset-2 hover:text-pink-pop">
              Privacy
            </Link>
          </p>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
