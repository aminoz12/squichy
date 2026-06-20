import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { social } from "@/lib/data";
import { breadcrumbJsonLd, getSiteUrl, SITE_NAME } from "@/lib/seo";

const title = "Contact";
const description =
  "Contact SquishyBun Dumplings support for order questions, delivery help, returns, and product guidance.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: `${title} | ${SITE_NAME}`,
    description,
  },
};

export default function ContactPage() {
  const url = getSiteUrl();

  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "ContactPage",
            "@id": `${url}/contact#webpage`,
            url: `${url}/contact`,
            name: title,
            description,
            isPartOf: { "@id": `${url}/#website` },
          },
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ],
            "/contact#breadcrumb",
          ),
        ]}
      />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
            Contact
          </p>
          <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
            Need help with an order?
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/80">
            Email support with your order number, delivery address country, and a
            short description of what you need help with.
          </p>
          <section className="mt-8 rounded-2xl border border-pink-100 bg-white p-6 shadow-[0_18px_45px_-28px_rgba(236,72,153,0.45)]">
            <h2 className="font-[family-name:var(--font-fredoka)] text-2xl font-bold text-foreground">
              Support email
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-foreground/75">
              We use email so order questions, photos, tracking details, and
              return notes stay in one place.
            </p>
            <a
              href={`mailto:${social.email}`}
              className="mt-5 inline-flex rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
            >
              {social.email}
            </a>
          </section>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Delivery", "/shipping"],
              ["Returns", "/returns"],
              ["Privacy", "/privacy"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-2xl border border-pink-100 bg-white p-5 text-sm font-extrabold text-foreground shadow-sm transition hover:border-accent/40"
              >
                {label}
              </Link>
            ))}
          </div>
        </article>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
