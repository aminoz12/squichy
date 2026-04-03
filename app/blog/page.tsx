import type { Metadata } from "next";
import Link from "next/link";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { blogPosts } from "@/lib/blog-data";
import {
  blogIndexJsonLd,
  getMetadataBase,
  SITE_NAME,
} from "@/lib/seo";

const blogDescription =
  "Squishy guides, shipping tips for the USA, Canada & UK, and mystery dumpling ideas — written to help you shop Crazy Fun rainbow squishy buns with confidence.";

export const metadata: Metadata = {
  title: "Blog — mystery squishy dumplings, shipping & gift ideas",
  description: blogDescription,
  alternates: {
    canonical: "/blog",
    languages: {
      "x-default": "/blog",
      "en-US": "/blog",
      "en-CA": "/blog",
      "en-GB": "/blog",
    },
  },
  keywords: [
    "squishy blog",
    "mystery dumpling guide",
    "USA Canada UK toy shipping",
    "Crazy Fun squishy",
    "fidget toy articles",
  ],
  openGraph: {
    type: "website",
    url: "/blog",
    title: `Blog | ${SITE_NAME}`,
    description: blogDescription,
    images: [
      {
        url: new URL("/herosqueeze.png", getMetadataBase()),
        alt: "SquishyBun mystery dumpling toy",
      },
    ],
  },
  twitter: {
    title: `Blog | ${SITE_NAME}`,
    description: blogDescription,
  },
};

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <JsonLd data={blogIndexJsonLd()} />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <header className="max-w-2xl">
            <p className="text-sm font-extrabold uppercase tracking-widest text-primary-dark">
              Blog
            </p>
            <h1 className="mt-2 font-[family-name:var(--font-fredoka)] text-3xl font-black tracking-tight text-foreground sm:text-4xl">
              Squishy guides for the US, Canada & UK
            </h1>
            <p className="mt-4 text-base leading-relaxed text-foreground/80">
              {blogDescription}
            </p>
            <Link
              href="/products#offer"
              className="mt-6 inline-flex rounded-xl bg-[#ffd500] px-5 py-3 text-sm font-black uppercase tracking-wide text-[#2d2384] shadow-md shadow-amber-400/35 transition hover:brightness-105"
            >
              Shop mystery dumplings
            </Link>
          </header>

          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
            {sorted.map((post) => (
              <li key={post.slug}>
                <article className="flex h-full flex-col rounded-2xl border border-pink-100/90 bg-white/90 p-6 shadow-[0_20px_50px_-24px_rgba(236,72,153,0.35)] ring-1 ring-pink-50 transition hover:border-accent/30 hover:shadow-[0_24px_55px_-22px_rgba(236,72,153,0.42)]">
                  <time
                    dateTime={post.publishedAt}
                    className="text-xs font-bold uppercase tracking-wide text-primary-dark/80"
                  >
                    {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                  <h2 className="mt-3 font-[family-name:var(--font-fredoka)] text-xl font-bold leading-snug text-foreground sm:text-[1.35rem]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-dark"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">
                    {post.description}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex text-sm font-extrabold text-primary-dark underline-offset-4 hover:underline"
                  >
                    Read article →
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCTA />
    </>
  );
}
