import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Detect leftover tutorial values so `.env.example` can override them. */
function looksLikeStripeKeyPlaceholder(v: string): boolean {
  const t = v.trim();
  if (!/^sk_(test|live)_/.test(t)) return false;
  return /paste|replace|_here|xxxx|your_secret|placeholder/i.test(t);
}

/**
 * Next.js does not load `.env.example`. Merge it when vars are unset, or when
 * `STRIPE_SECRET_KEY` is clearly a leftover template (e.g. …key_here).
 */
function mergeEnvExample() {
  const filePath = resolve(process.cwd(), ".env.example");
  if (!existsSync(filePath)) return;
  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (!key || val === "") continue;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    const cur = process.env[key];
    const missing = cur === undefined || cur === "";
    const stripePlaceholder =
      key === "STRIPE_SECRET_KEY" && typeof cur === "string" && looksLikeStripeKeyPlaceholder(cur);
    if (missing || stripePlaceholder) {
      process.env[key] = val;
    }
  }
}

mergeEnvExample();

/* eslint-disable @typescript-eslint/no-require-imports */
const legacySlugs = require("./lib/legacy-slugs.json") as {
  productSlugs: string[];
  collectionSlugs: string[];
};
const shopifyCatalog = require("./lib/shopify-catalog.generated.json") as {
  products?: { handle: string }[];
};
/* eslint-enable @typescript-eslint/no-require-imports */

const liveHandles = new Set((shopifyCatalog.products ?? []).map((p) => p.handle));

/** Pre-Shopify collection slugs → their closest store category. */
const LEGACY_COLLECTION_TARGETS: Record<string, string> = {
  dumplings: "dumpling-squishies",
  "bakery-sweets": "food-squishies",
  "sensory-asmr": "crispy-crunchy",
  animals: "animal-squishies",
  "mystery-minis": "mystery-squishies",
  "boxes-gift-sets": "squishy-sets",
};

/** Earlier same-site renames; chain into the live-handle check below. */
const RENAMED_PRODUCT_SLUGS: Record<string, string> = {
  needoh: "gooey-groovy-cubes",
  "catalog-adv-02": "reindeer-snowman-squishy-advent-calendar",
  "catalog-adv-05": "ice-cube-squishy-advent-calendar-2026",
  "catalog-adv-07": "viral-bun-squishy-advent-calendar",
  "catalog-adv-08": "24-day-christmas-bun-squishy-set",
  "catalog-adv-10": "pull-tab-squishy-advent-calendar",
  "catalog-box-adv-24": "squishy-advent-calendar-24-days",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    const redirects: { source: string; destination: string; permanent: boolean }[] = [];
    const seen = new Set<string>();

    const addProductRedirect = (from: string, preferred?: string) => {
      if (seen.has(from) || liveHandles.has(from)) return;
      seen.add(from);
      const destination =
        preferred && liveHandles.has(preferred)
          ? `/products/${preferred}`
          : "/products";
      redirects.push({ source: `/products/${from}`, destination, permanent: true });
    };

    // Same-site renames first (may now point at live store handles).
    for (const [from, to] of Object.entries(RENAMED_PRODUCT_SLUGS)) {
      addProductRedirect(from, to);
    }
    // Every pre-Shopify product slug that isn't a live store handle → catalog.
    for (const slug of legacySlugs.productSlugs) {
      addProductRedirect(slug);
    }
    // Pre-Shopify collection slugs → their closest store category.
    for (const [from, to] of Object.entries(LEGACY_COLLECTION_TARGETS)) {
      redirects.push({
        source: `/collections/${from}`,
        destination: `/collections/${to}`,
        permanent: true,
      });
    }
    return redirects;
  },
};

export default nextConfig;
