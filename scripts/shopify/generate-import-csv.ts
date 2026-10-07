/**
 * Generates a Shopify product-import CSV from the site's own catalog, so the
 * Shopify store mirrors the storefront exactly:
 *
 * - Handle  = our product slug (URLs stay identical)
 * - Variant = one per bundle tier ("Bundle" option); SKU = our option id,
 *   which is the join key `shopify:sync` uses to map variants back
 * - Images  = absolute URLs on the live site (Shopify downloads them)
 * - Tags    = category + feel → build automated collections from the
 *   "category:" tag in Shopify admin
 *
 * Run: npm run shopify:csv  →  shopify-import/products.csv
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  getProductBundles,
  mysteryDumplingBundles,
  products,
  type BundleTier,
} from "../../lib/data";
import { isRasterImagePath } from "../../lib/seo";

const SITE = "https://squishy-bun.com";

const HEADERS = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "SEO Title",
  "SEO Description",
  "Status",
] as const;

type Row = Partial<Record<(typeof HEADERS)[number], string | number>>;

function csvCell(value: string | number | undefined): string {
  if (value === undefined) return "";
  const s = String(value);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function toLine(row: Row): string {
  return HEADERS.map((h) => csvCell(row[h])).join(",");
}

function bodyHtml(p: (typeof products)[number]): string {
  const details = p.details.map((d) => `<li>${d}</li>`).join("");
  return `<p>${p.description}</p><ul>${details}</ul>`;
}

/** Bundle tiers for a product, with compare-at totals (mirrors the PDP). */
function tiersFor(p: (typeof products)[number]): BundleTier[] {
  if (p.id === "squishybun-mystery-dumpling") return [...mysteryDumplingBundles];
  const base = p.options[0]?.priceUsd ?? 0;
  const all = getProductBundles(p.id, base);
  // Products sold at a single price (gift sets, advent calendars) have one option.
  return all.filter((tier) => p.options.some((o) => o.id === tier.id));
}

function vendorFor(p: (typeof products)[number]): string {
  return (
    p.specs.find((s) => s.label.toLowerCase() === "brand")?.value ?? "Squishy Bun"
  );
}

const rows: string[] = [HEADERS.join(",")];
let productCount = 0;
let variantCount = 0;

for (const p of products) {
  const tiers = tiersFor(p);
  if (tiers.length === 0) {
    console.warn(`!! no tiers resolved for ${p.id} — skipped`);
    continue;
  }
  productCount++;

  const images = p.images.filter(isRasterImagePath);
  const singlePrice = tiers.length === 1;
  const feel = p.specs.find((s) => s.label === "Feel")?.value;
  const tags = [
    `category:${p.categoryName}`,
    ...(feel ? [`feel:${feel}`] : []),
    ...(p.badge ? [`badge:${p.badge}`] : []),
  ].join(", ");

  tiers.forEach((tier, i) => {
    variantCount++;
    const first = i === 0;
    const row: Row = {
      Handle: p.slug,
      "Option1 Name": first ? (singlePrice ? "Title" : "Bundle") : undefined,
      "Option1 Value": singlePrice ? "Default Title" : tier.title,
      "Variant SKU": tier.id,
      "Variant Grams": 200,
      "Variant Inventory Policy": "continue",
      "Variant Fulfillment Service": "manual",
      "Variant Price": tier.totalPriceUsd.toFixed(2),
      "Variant Compare At Price": tier.compareAtTotalUsd
        ? tier.compareAtTotalUsd.toFixed(2)
        : undefined,
      "Variant Requires Shipping": "TRUE",
      "Variant Taxable": "TRUE",
    };
    if (first) {
      Object.assign(row, {
        Title: p.name,
        "Body (HTML)": bodyHtml(p),
        Vendor: vendorFor(p),
        Type: p.categoryName,
        Tags: tags,
        Published: "TRUE",
        "Image Src": images[0] ? `${SITE}${images[0]}` : undefined,
        "Image Position": images[0] ? 1 : undefined,
        "Image Alt Text": images[0] ? p.name : undefined,
        "SEO Title": p.name,
        "SEO Description": p.description.slice(0, 320),
        Status: "active",
      } satisfies Row);
    }
    rows.push(toLine(row));
  });

  // Additional images get their own rows (Shopify CSV convention).
  images.slice(1).forEach((src, idx) => {
    rows.push(
      toLine({
        Handle: p.slug,
        "Image Src": `${SITE}${src}`,
        "Image Position": idx + 2,
        "Image Alt Text": p.name,
      }),
    );
  });
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), "../../shopify-import");
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "products.csv");
writeFileSync(outFile, "﻿" + rows.join("\n") + "\n", "utf8");

console.log(
  `Wrote ${outFile}: ${productCount} products, ${variantCount} variants, ${rows.length - 1} rows.`,
);
