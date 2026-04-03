import type { Metadata } from "next";
import { faqItems, singleProductOffer, social } from "@/lib/data";

export const SITE_NAME = "SquishyBun Dumplings";
export const SITE_TAGLINE =
  "Mystery squishy dumpling fidget toys — blind-box fun, slow-rise squish, ships USA & Canada.";

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
> {
  const base = getMetadataBase();
  const ogImage = new URL(OG_IMAGE_PATH, base);

  return {
    metadataBase: base,
    title: {
      default: `${SITE_NAME} | Mystery Squishy Dumpling Toys | USA & Canada`,
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
      alternateLocale: ["en_CA"],
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
    inLanguage: ["en-US", "en-CA"],
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

export function productJsonLd() {
  const url = getSiteUrl();
  const prices = singleProductOffer.options.map((o) => o.priceUsd);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const productUrl = `${url}/products`;

  return {
    "@type": "Product" as const,
    "@id": `${productUrl}#product`,
    name: singleProductOffer.name,
    description: singleProductOffer.description,
    image: singleProductOffer.images.map((src) => absoluteUrl(src)),
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
