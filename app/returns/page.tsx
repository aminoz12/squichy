import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { social } from "@/lib/data";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "Returns";
const description =
  "SquishyBun Dumplings returns guidance: contact support within 14 days if an order arrives damaged or not as described.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/returns" },
  openGraph: {
    type: "website",
    url: "/returns",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

const policies = [
  {
    heading: "14-day support window",
    copy: "Email support within 14 days of delivery if a product arrives damaged, incomplete, or not as described.",
  },
  {
    heading: "Photos help us review faster",
    copy: "Include your order number and clear photos of the product, packaging, and shipping label when relevant.",
  },
  {
    heading: "Do not send items back first",
    copy: "Wait for support instructions before mailing anything. That keeps the return route and refund review tied to your order.",
  },
] as const;

export default function ReturnsPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}/returns#webpage`,
            url: `${url}/returns`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Returns", path: "/returns" },
            ],
            "/returns#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            Returns
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
            Returns and order issue support
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            Squishy toys are inspected before dispatch. If something arrives damaged
            or different from the product page, support can review the issue.
          </p>
          <section className="mt-10 grid gap-4 sm:grid-cols-3">
            {policies.map((policy) => (
              <div
                key={policy.heading}
                className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_18px_45px_-28px_rgba(236,72,153,0.45)]"
              >
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
                  {policy.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {policy.copy}
                </p>
              </div>
            ))}
          </section>
          <div className="mt-10 rounded-2xl border border-[#ff8a12]/40 bg-white p-6 shadow-sm">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-[#2d2384]">
              Start a return review
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Email {social.email} with your order number and a short note. We will
              reply with the next step for your specific order.
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
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
