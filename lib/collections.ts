import { products, type ProductOffer } from "./data";

/**
 * Collection landing pages (/collections/[slug]) — derived from the catalog's
 * categories (= Shopify product types), so a new category in the store
 * becomes a page on the next sync + deploy. `intro` opens definition-style so
 * answer engines can lift it; a few flagship categories get hand-written copy.
 */
export type Collection = {
  slug: string;
  /** Matches ProductOffer.categoryName exactly. */
  category: string;
  title: string;
  metaDescription: string;
  intro: string;
};

function slugify(category: string): string {
  return category
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const CUSTOM_INTROS: Record<string, string> = {
  "Dumpling Squishies":
    "Dumpling squishies are palm-sized, slow-rise foam toys shaped like steamed bao buns — squeeze them flat and watch them puff back up. This is the collection that made SquishyBun famous on TikTok.",
  "Crispy & Crunchy":
    "Crispy and crunchy squishies are ASMR fidget toys with a crackly filling that pops and crunches with every squeeze — the most satisfying sound in the collection.",
  "Mystery Squishies":
    "Mystery squishies are blind-box surprises: you order the box, and the exact style and color stay secret until you open it. Random pulls, occasional rares, maximum unboxing fun.",
  "Advent Calendars":
    "A squishy advent calendar hides a small surprise squishy behind every numbered door — open one a day and build a whole collection by Christmas. All gift-ready out of the box.",
  "Squishy Sets":
    "Squishy sets are curated boxes of fan favorites in ready-to-give packaging — one box, zero wrapping, guaranteed squeals.",
  "Giant Squishies":
    "Giant squishies are the oversized members of the family — extra-large, two-hands-required slow-rise squish for maximum stress relief.",
  "Glitter Squishies":
    "Glitter squishies are filled with sparkle that shifts as you squeeze — mesmerizing to watch, satisfying to squash.",
};

function buildCollection(category: string, items: ProductOffer[]): Collection {
  const minPrice = Math.min(
    ...items.flatMap((p) => p.options.map((o) => o.priceUsd)),
  );
  const title = category;
  const metaDescription = `Shop ${items.length} ${category.toLowerCase()} from $${minPrice.toFixed(
    2,
  )} — slow-rise squishy toys with bundle deals and free delivery over $50.`;
  const intro =
    CUSTOM_INTROS[category] ??
    `${category} from SquishyBun: ${items.length} slow-rise squishy styles from $${minPrice.toFixed(
      2,
    )}, with bundle savings on most of them. Squeeze one flat and watch it rise right back.`;
  return { slug: slugify(category), category, title, metaDescription, intro };
}

const byCategory = new Map<string, ProductOffer[]>();
for (const p of products) {
  const list = byCategory.get(p.categoryName) ?? [];
  list.push(p);
  byCategory.set(p.categoryName, list);
}

export const collections: Collection[] = [...byCategory.entries()].map(
  ([category, items]) => buildCollection(category, items),
);

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function collectionProducts(collection: Collection): ProductOffer[] {
  return products.filter((p) => p.categoryName === collection.category);
}

export function collectionForCategory(category: string): Collection | undefined {
  return collections.find((c) => c.category === category);
}
