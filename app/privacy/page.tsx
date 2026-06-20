import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { social } from "@/lib/data";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "Privacy";
const description =
  "Privacy notes for SquishyBun Dumplings, including checkout, analytics, support email, and order communication.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

const sections = [
  {
    heading: "Checkout data",
    copy: "Payments are handled through secure checkout. Card details are processed by the payment provider and are not stored in this storefront code.",
  },
  {
    heading: "Analytics and ads",
    copy: "The site may use analytics and advertising tags to understand traffic, measure checkout events, and improve campaigns. These scripts are loaded after the page is usable.",
  },
  {
    heading: "Support messages",
    copy: "If you email support, we use the information you provide to answer your question, review order issues, and keep a record of the conversation.",
  },
] as const;

export default function PrivacyPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "WebPage",
            "@id": `${url}/privacy#webpage`,
            url: `${url}/privacy`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Privacy", path: "/privacy" },
            ],
            "/privacy#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            Privacy
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
            Privacy and data use
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            This page explains the practical ways SquishyBun Dumplings uses order,
            support, and site activity information.
          </p>
          <section className="mt-10 grid gap-4">
            {sections.map((section) => (
              <div
                key={section.heading}
                className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_18px_45px_-28px_rgba(236,72,153,0.45)]"
              >
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground">
                  {section.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  {section.copy}
                </p>
              </div>
            ))}
          </section>
          <p className="mt-8 text-sm leading-relaxed text-foreground/75">
            Questions about privacy or order data can be sent to{" "}
            <a href={`mailto:${social.email}`} className="font-bold text-primary-dark underline">
              {social.email}
            </a>
            .
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
          >
            Contact support
          </Link>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
