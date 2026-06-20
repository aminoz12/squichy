import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog-data";
import { absoluteUrl, getSiteUrl, isRasterImagePath } from "@/lib/seo";
import { products } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
    images: [absoluteUrl("/herosqueeze.png")],
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
    images: p.images.filter(isRasterImagePath).map(absoluteUrl),
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/products`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      images: products
        .map((p) => p.images.find(isRasterImagePath))
        .filter((src): src is string => Boolean(src))
        .map(absoluteUrl),
    },
    {
      url: `${base}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/shipping`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/returns`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    {
      url: `${base}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
      images: [absoluteUrl("/herosqueeze.png")],
    },
    ...productEntries,
    ...blogEntries,
  ];
}
