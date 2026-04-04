import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog-data";
import { blogPosts } from "@/lib/blog-data";
import { faqItems, singleProductOffer, siteIconPath, social } from "@/lib/data";

export const SITE_NAME = "SquishyBun Dumplings";
export const SITE_TAGLINE =
  "Mystery squishy dumpling fidget toys — blind-box fun, slow-rise squish, ships USA, Canada & UK.";

/** Canonical origin for metadata, sitemap, and JSON-LD. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  return "http://localhost:3000";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

const OG_IMAGE_PATH = "/herosqueeze.png";

export function rootMetadataExtras(): Pick<
  Metadata,
  | "metadataBase"
  | "title"
  | "description"
  | "keywords"
  | "authors"
  | "creator"
  | "openGraph"
  | "twitter"
  | "robots"
  | "alternates"
  | "category"
  | "icons"
> {
  const base = getMetadataBase();
  const ogImage = new URL(OG_IMAGE_PATH, base);

  return {
    metadataBase: base,
    title: {
      default: `${SITE_NAME} | Mystery Squishy Dumpling Toys | USA, Canada & UK`,
      template: `%s | ${SITE_NAME}`,
    },
    description: SITE_TAGLINE,
    keywords: [
      "squishy toy",
      "fidget toy",
      "sensory toy",
      "mystery dumpling",
      "bao bun squishy",
      "Crazy Fun",
      "blind box toy",
      "USA",
      "Canada",
      "United Kingdom",
      "UK",
      "stress relief toy",
    ],
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    category: "toys",
    alternates: {
      canonical: "/",
      languages: {
        "x-default": "/",
        "en-US": "/",
        "en-CA": "/",
        "en-GB": "/",
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      alternateLocale: ["en_CA", "en_GB"],
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: SITE_TAGLINE,
      url: base,
      images: [
        {
          url: ogImage,
          alt: "Crazy Fun squishy mystery dumpling toy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description: SITE_TAGLINE,
      images: [ogImage.toString()],
    },
    /** Tab + bookmark icon: `public/icon.png` (also mirrored as `app/icon.png`). */
    icons: {
      icon: siteIconPath,
      shortcut: siteIconPath,
      apple: siteIconPath,
    },
  };
}

function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@type": "Organization" as const,
    "@id": `${url}/#organization`,
    name: SITE_NAME,
    url,
    logo: absoluteUrl(OG_IMAGE_PATH),
    sameAs: [social.tiktok, social.instagram],
  };
}

export function websiteJsonLd() {
  const url = getSiteUrl();
  return {
    "@type": "WebSite" as const,
    "@id": `${url}/#website`,
    url,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    publisher: { "@id": `${url}/#organization` },
    inLanguage: ["en-US", "en-CA", "en-GB"],
  };
}

export function faqPageJsonLd() {
  return {
    "@type": "FAQPage" as const,
    "@id": `${getSiteUrl()}/#faq`,
    mainEntity: faqItems.map((item) => ({
      "@type": "Question" as const,
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.a,
      },
    })),
  };
}

export function productBreadcrumbJsonLd() {
  const url = getSiteUrl();
  const productsUrl = `${url}/products`;
  return {
    "@type": "BreadcrumbList" as const,
    itemListElement: [
      {
        "@type": "ListItem" as const,
        position: 1,
        name: "Home",
        item: url,
      },
      {
        "@type": "ListItem" as const,
        position: 2,
        name: "Shop",
        item: productsUrl,
      },
    ],
  };
}

export function blogIndexJsonLd() {
  const url = getSiteUrl();
  const blogUrl = `${url}/blog`;
  return {
    "@type": "Blog" as const,
    "@id": `${blogUrl}#blog`,
    url: blogUrl,
    name: `${SITE_NAME} — Blog`,
    description:
      "Guides, shipping tips, and squishy dumpling ideas for shoppers in the United States, Canada, and the United Kingdom.",
    publisher: { "@id": `${url}/#organization` },
    inLanguage: ["en-US", "en-CA", "en-GB"],
    blogPost: blogPosts.map((p) => ({
      "@type": "BlogPosting" as const,
      headline: p.title,
      description: p.description,
      url: `${url}/blog/${p.slug}`,
      datePublished: p.publishedAt,
    })),
  };
}

export function blogPostingJsonLd(post: BlogPost) {
  const url = getSiteUrl();
  const postUrl = `${url}/blog/${post.slug}`;
  const ogImage = absoluteUrl(OG_IMAGE_PATH);
  return {
    "@type": "BlogPosting" as const,
    "@id": `${postUrl}#article`,
    mainEntityOfPage: { "@type": "WebPage" as const, "@id": postUrl },
    headline: post.title,
    description: post.description,
    image: [ogImage],
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization" as const,
      name: SITE_NAME,
      url,
    },
    publisher: { "@id": `${url}/#organization` },
    inLanguage: ["en-US", "en-CA", "en-GB"],
    keywords: post.keywords.join(", "),
  };
}

function isRasterImagePath(src: string) {
  return /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(src);
}

export function productJsonLd() {
  const url = getSiteUrl();
  const prices = singleProductOffer.options.map((o) => o.priceUsd);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const productUrl = `${url}/products`;
  const productImages = singleProductOffer.images
    .filter(isRasterImagePath)
    .map((src) => absoluteUrl(src));

  return {
    "@type": "Product" as const,
    "@id": `${productUrl}#product`,
    name: singleProductOffer.name,
    description: singleProductOffer.description,
    image: productImages,
    brand: {
      "@type": "Brand" as const,
      name: "Crazy Fun",
    },
    sku: singleProductOffer.id,
    offers: {
      "@type": "AggregateOffer" as const,
      url: productUrl,
      priceCurrency: "USD",
      lowPrice: low,
      highPrice: high,
      offerCount: singleProductOffer.options.length,
      availability: "https://schema.org/InStock",
    },
    audience: {
      "@type": "PeopleAudience" as const,
      suggestedMinAge: 3,
    },
  };
}
