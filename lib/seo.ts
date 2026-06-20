import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog-data";
import { blogPosts } from "@/lib/blog-data";
import {
  faqItems,
  productPageReviews,
  products,
  siteIconPath,
  social,
  type ProductOffer,
} from "@/lib/data";

export const SITE_NAME = "SquishyBun Dumplings";
export const SITE_TAGLINE =
  "Mystery squishy dumpling fidget toys — blind-box fun, slow-rise squish, ships USA, Canada & UK.";

/** Canonical origin for metadata, sitemap, and JSON-LD. Set NEXT_PUBLIC_SITE_URL in production. */
export function getSiteUrl(): string {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3000";
  }
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  return "https://www.squishy-bun.com";
}

export function getMetadataBase(): URL {
  return new URL(`${getSiteUrl()}/`);
}

const OG_IMAGE_PATH = "/herosqueeze.png";
const META_DESCRIPTION_MAX = 155;

export function truncateDescription(text: string, max = META_DESCRIPTION_MAX): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const clipped = clean.slice(0, max - 3);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 80 ? lastSpace : clipped.length).trim()}...`;
}

export function rootMetadataExtras(): Pick<
  Metadata,
  | "metadataBase"
  | "title"
  | "description"
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
      default: "SquishyBun | Mystery Squishy Toys",
      template: "%s | SquishyBun",
    },
    description: SITE_TAGLINE,
    authors: [{ name: SITE_NAME }],
    creator: SITE_NAME,
    category: "toys",
    alternates: {
      canonical: "/",
      languages: {
        "x-default": "/",
        "en": "/",
        "en-US": "/",
        "en-CA": "/",
        "en-GB": "/",
        "en-AU": "/",
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
      title: `${SITE_NAME} | Mystery squishy toys`,
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
      title: `${SITE_NAME} | Mystery squishy toys`,
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

export function absoluteUrl(path: string): string {
  const base = getSiteUrl().replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

function specificSocialProfiles(): string[] {
  return [social.tiktok, social.instagram].filter((url) => {
    try {
      const parsed = new URL(url);
      return parsed.pathname.replace(/\/$/, "") !== "";
    } catch {
      return false;
    }
  });
}

export function organizationJsonLd() {
  const url = getSiteUrl();
  return {
    "@type": "Organization" as const,
    "@id": `${url}/#organization`,
    name: SITE_NAME,
    url,
    logo: absoluteUrl(OG_IMAGE_PATH),
    ...(specificSocialProfiles().length ? { sameAs: specificSocialProfiles() } : {}),
    contactPoint: {
      "@type": "ContactPoint" as const,
      email: social.email,
      url: absoluteUrl("/contact"),
      contactType: "customer support",
      availableLanguage: ["English"],
    },
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

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
  idPath = "/#breadcrumb",
) {
  const url = getSiteUrl();
  return {
    "@type": "BreadcrumbList" as const,
    "@id": `${url}${idPath}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
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

function reviewAverage() {
  if (productPageReviews.length === 0) return 0;
  const total = productPageReviews.reduce((sum, review) => sum + review.rating, 0);
  return Number((total / productPageReviews.length).toFixed(1));
}

function reviewJsonLd() {
  return productPageReviews.map((review) => ({
    "@type": "Review" as const,
    name: review.title,
    reviewBody: review.body ?? review.title,
    datePublished: review.reviewPosted,
    author: {
      "@type": "Person" as const,
      name: review.author,
    },
    reviewRating: {
      "@type": "Rating" as const,
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
  }));
}

export function isRasterImagePath(src: string) {
  return /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/i.test(src);
}

function getProductBrand(product: ProductOffer): string {
  return product.specs.find((row) => row.label.toLowerCase() === "brand")?.value ?? "Crazy Fun";
}

function merchantReturnPolicyJsonLd() {
  return {
    "@type": "MerchantReturnPolicy" as const,
    applicableCountry: ["US", "CA", "GB"],
    returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
    merchantReturnDays: 14,
    returnMethod: "https://schema.org/ReturnByMail",
    returnFees: "https://schema.org/FreeReturn",
    merchantReturnLink: absoluteUrl("/returns"),
  };
}

function shippingDetailsJsonLd(product: ProductOffer) {
  const shippingRate = {
    "@type": "MonetaryAmount" as const,
    value: product.deliveryUsd,
    currency: "USD",
  };

  return [
    { country: "US", minDays: 3, maxDays: 7 },
    { country: "CA", minDays: 5, maxDays: 10 },
    { country: "GB", minDays: 7, maxDays: 14 },
  ].map((region) => ({
    "@type": "OfferShippingDetails" as const,
    shippingRate,
    shippingDestination: {
      "@type": "DefinedRegion" as const,
      addressCountry: region.country,
    },
    deliveryTime: {
      "@type": "ShippingDeliveryTime" as const,
      handlingTime: {
        "@type": "QuantitativeValue" as const,
        minValue: 1,
        maxValue: 2,
        unitCode: "DAY",
      },
      transitTime: {
        "@type": "QuantitativeValue" as const,
        minValue: region.minDays,
        maxValue: region.maxDays,
        unitCode: "DAY",
      },
    },
  }));
}

export function productMetaDescription(product: ProductOffer): string {
  return truncateDescription(
    `${product.description} Ships to the USA, Canada, the UK, and select European destinations.`,
    150,
  );
}

export function productJsonLd(product: ProductOffer) {
  const url = getSiteUrl();
  const prices = product.options.map((o) => o.priceUsd);
  const low = Math.min(...prices);
  const high = Math.max(...prices);
  const productUrl = `${url}/products/${product.slug}`;
  const productImages = product.images
    .filter(isRasterImagePath)
    .map((src) => absoluteUrl(src));

  return {
    "@type": "Product" as const,
    "@id": `${productUrl}#product`,
    name: product.name,
    description: product.description,
    image: productImages,
    brand: {
      "@type": "Brand" as const,
      name: getProductBrand(product),
    },
    sku: product.id,
    category: product.categoryName,
    additionalProperty: product.specs.map((row) => ({
      "@type": "PropertyValue" as const,
      name: row.label,
      value: row.value,
    })),
    aggregateRating: {
      "@type": "AggregateRating" as const,
      ratingValue: reviewAverage(),
      reviewCount: productPageReviews.length,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviewJsonLd(),
    offers: {
      "@type": "AggregateOffer" as const,
      url: productUrl,
      priceCurrency: "USD",
      lowPrice: low,
      highPrice: high,
      offerCount: product.options.length,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${url}/#organization` },
      shippingDetails: shippingDetailsJsonLd(product),
      hasMerchantReturnPolicy: merchantReturnPolicyJsonLd(),
    },
    audience: {
      "@type": "PeopleAudience" as const,
      suggestedMinAge: 3,
    },
  };
}

export function productDetailBreadcrumbJsonLd(product: ProductOffer) {
  return breadcrumbJsonLd(
    [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/products" },
      { name: product.name, path: `/products/${product.slug}` },
    ],
    `/products/${product.slug}#breadcrumb`,
  );
}

export function productsCollectionJsonLd() {
  const url = getSiteUrl();
  return {
    "@type": "CollectionPage" as const,
    "@id": `${url}/products#collection`,
    url: `${url}/products`,
    name: "Squishy toy collection",
    description:
      "Mystery dumpling squishies, apple squishies, cheese squishies, butter squishies, and NeeDoh-style sensory toys for shoppers in the USA, Canada, UK, and Europe.",
    isPartOf: { "@id": `${url}/#website` },
    mainEntity: {
      "@type": "ItemList" as const,
      itemListElement: products.map((product, index) => ({
        "@type": "ListItem" as const,
        position: index + 1,
        url: `${url}/products/${product.slug}`,
        name: product.name,
      })),
    },
  };
}
