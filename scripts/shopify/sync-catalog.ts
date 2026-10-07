/**
 * Pulls the FULL catalog from the connected Shopify store and writes
 * lib/shopify-catalog.generated.json — the storefront's source of truth.
 * lib/data.ts builds its products from this file (prices, variants, images,
 * categories all come from Shopify), and checkout maps each variant SKU to
 * its Storefront GID from the same file.
 *
 * Run after any product change in Shopify, then commit + deploy:
 *   npm run shopify:sync
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

// Minimal .env.local loader.
for (const file of [".env.local", ".env"]) {
  const p = join(root, file);
  if (!existsSync(p)) continue;
  for (const line of readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
    if (m && process.env[m[1]] === undefined) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}

const DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim();
if (!DOMAIN || !TOKEN) {
  console.error(
    "Set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local first.",
  );
  process.exit(1);
}

const QUERY = /* GraphQL */ `
  query Catalog($cursor: String) {
    products(first: 100, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        handle
        title
        description
        productType
        tags
        images(first: 6) { nodes { url } }
        variants(first: 10) {
          nodes {
            id
            sku
            title
            availableForSale
            price { amount }
            compareAtPrice { amount }
          }
        }
      }
    }
  }
`;

type ShopifyProductNode = {
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  images: { nodes: { url: string }[] };
  variants: {
    nodes: {
      id: string;
      sku: string;
      title: string;
      availableForSale: boolean;
      price: { amount: string };
      compareAtPrice: { amount: string } | null;
    }[];
  };
};

type Page = {
  products: {
    pageInfo: { hasNextPage: boolean; endCursor: string | null };
    nodes: ShopifyProductNode[];
  };
};

async function fetchPage(cursor: string | null): Promise<Page> {
  const res = await fetch(`https://${DOMAIN}/api/2025-07/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN!,
    },
    body: JSON.stringify({ query: QUERY, variables: { cursor } }),
  });
  const json = (await res.json()) as { data?: Page; errors?: { message: string }[] };
  if (!res.ok || json.errors?.length || !json.data) {
    throw new Error(json.errors?.[0]?.message ?? `HTTP ${res.status}`);
  }
  return json.data;
}

/** Trim supplier descriptions to a sane display length, on a sentence edge. */
function tidyDescription(text: string): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= 420) return clean;
  const cut = clean.slice(0, 420);
  const lastStop = cut.lastIndexOf(". ");
  return lastStop > 180 ? cut.slice(0, lastStop + 1) : `${cut.trimEnd()}…`;
}

async function main() {
  const nodes: ShopifyProductNode[] = [];
  let cursor: string | null = null;
  for (;;) {
    const page: Page = await fetchPage(cursor);
    nodes.push(...page.products.nodes);
    if (!page.products.pageInfo.hasNextPage) break;
    cursor = page.products.pageInfo.endCursor;
  }

  let skippedNoImage = 0;
  let skippedNoVariant = 0;
  const seenSkus = new Set<string>();

  const products = nodes.flatMap((p) => {
    const images = p.images.nodes.map((n) => n.url);
    if (images.length === 0) {
      skippedNoImage++;
      console.warn(`!! skipped (no image): ${p.handle}`);
      return [];
    }
    const variants = p.variants.nodes
      .filter((v) => v.availableForSale)
      .map((v) => {
        let sku = v.sku || v.id.replace("gid://shopify/ProductVariant/", "var-");
        if (seenSkus.has(sku)) {
          console.warn(`!! duplicate SKU "${sku}" on ${p.handle} — using GID suffix`);
          sku = `${sku}-${v.id.slice(-6)}`;
        }
        seenSkus.add(sku);
        return {
          sku,
          gid: v.id,
          title: v.title === "Default Title" ? "Single" : v.title,
          priceUsd: Number(v.price.amount),
          compareAtUsd: v.compareAtPrice ? Number(v.compareAtPrice.amount) : null,
        };
      });
    if (variants.length === 0) {
      skippedNoVariant++;
      console.warn(`!! skipped (no sellable variant): ${p.handle}`);
      return [];
    }
    return [
      {
        handle: p.handle,
        title: p.title,
        description: tidyDescription(p.description),
        type: p.productType || "Squishies",
        tags: p.tags,
        images,
        variants,
      },
    ];
  });

  const outFile = join(root, "lib/shopify-catalog.generated.json");
  writeFileSync(
    outFile,
    JSON.stringify(
      {
        _comment:
          "Generated by `npm run shopify:sync` from the Shopify Storefront API — the catalog source of truth. Do not edit by hand.",
        syncedAt: new Date().toISOString(),
        store: DOMAIN,
        products,
      },
      null,
      1,
    ) + "\n",
    "utf8",
  );

  const variantCount = products.reduce((a, p) => a + p.variants.length, 0);
  console.log(
    `Wrote ${products.length} products / ${variantCount} variants to lib/shopify-catalog.generated.json` +
      (skippedNoImage || skippedNoVariant
        ? ` (skipped: ${skippedNoImage} without image, ${skippedNoVariant} without sellable variant)`
        : ""),
  );
  console.log("Commit the file and deploy to publish the catalog.");
}

main().catch((err) => {
  console.error("Sync failed:", err instanceof Error ? err.message : err);
  process.exit(1);
});
