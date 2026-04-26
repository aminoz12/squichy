import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { Navbar } from "@/components/Navbar";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { blogPosts, getBlogPost } from "@/lib/blog-data";
import {
  blogPostingJsonLd,
  getMetadataBase,
  getSiteUrl,
  SITE_NAME,
} from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Not found" };

  const base = getSiteUrl();
  const canonicalUrl = `${base}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        "x-default": canonicalUrl,
        "en-US": canonicalUrl,
        "en-CA": canonicalUrl,
        "en-GB": canonicalUrl,
      },
    },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
      images: [
        {
          url: new URL("/herosqueeze.png", getMetadataBase()),
          alt: post.title,
        },
      ],
    },
    twitter: {
      title: post.title,
      description: post.description,
      images: [new URL("/herosqueeze.png", getMetadataBase()).toString()],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <JsonLd data={blogPostingJsonLd(post)} />
      <Navbar />
      <main className="flex-1 border-t border-pink-100/80 bg-gradient-to-b from-white to-[#fff5fb] pb-24 md:pb-12">
        <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="text-sm font-semibold text-foreground/60">
            <Link href="/" className="hover:text-primary-dark hover:underline">
              Home
            </Link>
            <span className="mx-2 text-foreground/40">/</span>
            <Link href="/blog" className="hover:text-primary-dark hover:underline">
              Blog
            </Link>
          </nav>

          <header className="mt-6">
            <time
              dateTime={post.publishedAt}
              className="text-xs font-bold uppercase tracking-wide text-primary-dark"
            >
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <h1 className="mt-3 font-[family-name:var(--font-fredoka)] text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-foreground/80">
              {post.description}
            </p>
          </header>

          <div className="mt-10 max-w-none">
            {post.sections.map((section) => (
              <section key={section.heading} className="mb-10">
                <h2 className="font-[family-name:var(--font-fredoka)] text-xl font-bold text-foreground sm:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, i) => (
                  <p
                    key={`${section.heading}-${i}`}
                    className="mt-4 text-base leading-relaxed text-foreground/85"
                  >
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="mt-12 rounded-2xl border border-[#ff8a12]/40 bg-gradient-to-br from-[#fff8f0] to-white p-6 shadow-sm">
            <p className="font-[family-name:var(--font-fredoka)] text-lg font-bold text-[#2d2384]">
              Shop SquishyBun Dumplings
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Mystery Crazy Fun rainbow squishy buns — sizes, photos, and secure checkout for
              shoppers in the United States, Canada, and the United Kingdom.
            </p>
            <Link
              href="/products#offer"
              className="mt-4 inline-flex rounded-xl bg-[#ff8a12] px-5 py-3 text-sm font-black uppercase tracking-wide text-white shadow-md shadow-orange-500/25 transition hover:brightness-105"
            >
              View product
            </Link>
          </aside>

          <p className="mt-10 text-center text-sm text-foreground/55">
            <Link href="/blog" className="font-bold text-primary-dark hover:underline">
              ← All articles
            </Link>
            <span className="mx-2">·</span>
            <span>{SITE_NAME}</span>
          </p>
        </article>
      </main>
      <Footer />
      <CartDrawer />
      <StickyMobileCTA />
    </>
  );
}
