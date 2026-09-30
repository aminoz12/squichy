import { products, type ProductOffer } from "./data";

/**
 * Collection landing pages (/collections/[slug]) — one per product category.
 * Slugs mirror classic storefront URLs; `intro` opens with a definition-style
 * sentence so answer engines can lift it directly.
 */
export type Collection = {
  slug: string;
  /** Must match ProductOffer.categoryName exactly. */
  category: string;
  title: string;
  metaDescription: string;
  intro: string;
};

export const collections: Collection[] = [
  {
    slug: "dumplings",
    category: "Dumplings",
    title: "Dumpling Squishies",
    metaDescription:
      "Shop slow-rise dumpling squishies: smiley steamed buns, glitter dumplings and mystery bao blind boxes. BUY 2 GET 1 FREE, free delivery over $50.",
    intro:
      "Dumpling squishies are palm-sized, slow-rise foam toys shaped like steamed bao buns — squeeze them flat and watch them puff back up. This is the collection that made SquishyBun famous on TikTok, from the classic Smiley Dumpling to glitter-filled mystery pulls.",
  },
  {
    slug: "bakery-sweets",
    category: "Bakery & Sweets",
    title: "Bakery & Sweets Squishies",
    metaDescription:
      "Squishy toys shaped like food: butter sticks, toast, mochi, apples and more slow-rise bakery treats. BUY 2 GET 1 FREE, free delivery over $50.",
    intro:
      "Bakery and sweets squishies are slow-rise sensory toys shaped like your favorite treats — butter sticks, mini toast, mochi daifuku, apples and potato chips. Soft enough for desk fidgeting, cute enough to collect the whole pastry case.",
  },
  {
    slug: "sensory-asmr",
    category: "Sensory & ASMR",
    title: "Sensory & ASMR Squishies",
    metaDescription:
      "Crunchy, gooey and stretchy ASMR squishies: ice cubes, jelly balls, NeeDoh cubes and crunch-filled fidget toys. BUY 2 GET 1 FREE.",
    intro:
      "Sensory and ASMR squishies are fidget toys built for texture and sound — crunchy fillings that crackle, gooey ice cubes that squash flat, and stretchy jelly balls that snap back. A quiet, satisfying outlet for busy hands at a desk or in class.",
  },
  {
    slug: "animals",
    category: "Animals",
    title: "Animal Squishies",
    metaDescription:
      "Adorable animal squishies: hand-painted chonky cats, tongue-out pups, mini chicks and bunny squishies. BUY 2 GET 1 FREE, free delivery over $50.",
    intro:
      "Animal squishies are slow-rise foam companions shaped like chonky cats, puppies, chicks and bunnies. Several are hand-painted, which makes each one slightly unique — fan favorites for collectors and the hardest category to squish just once.",
  },
  {
    slug: "mystery-minis",
    category: "Mystery Minis",
    title: "Mystery Mini Blind Boxes",
    metaDescription:
      "Mystery squishy blind boxes: surprise bao buns and angel animal minis in random styles. The unboxing is half the fun. BUY 2 GET 1 FREE.",
    intro:
      "Mystery minis are squishy blind boxes — you order the box, and the style and color inside stay a surprise until you open it. Random pulls, occasional rares, and the exact unboxing thrill that fills everyone’s TikTok feed.",
  },
  {
    slug: "boxes-gift-sets",
    category: "Boxes & Gift Sets",
    title: "Squishy Gift Boxes & Sets",
    metaDescription:
      "Gift-ready squishy sets: bakery boxes, crunchy ASMR packs, blind bags and stocking stuffers. No wrapping needed — free delivery over $50.",
    intro:
      "Squishy gift boxes are curated sets of fan-favorite squishies in ready-to-give packaging — bakery assortments, crunchy ASMR packs, mystery blind bags and stocking stuffer minis. One box, zero wrapping, guaranteed squeals.",
  },
  {
    slug: "advent-calendars",
    category: "Advent Calendars",
    title: "Squishy Advent Calendars",
    metaDescription:
      "Squishy advent calendars with a surprise squishy behind every door — dumplings, ice cubes and Christmas buns. Free delivery over $50.",
    intro:
      "A squishy advent calendar hides a small surprise squishy behind every numbered door — open one a day and build a whole collection by Christmas. Dumpling, ice-cube and Christmas-bun editions, all gift-ready out of the box.",
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function collectionProducts(collection: Collection): ProductOffer[] {
  return products.filter((p) => p.categoryName === collection.category);
}

export function collectionForCategory(category: string): Collection | undefined {
  return collections.find((c) => c.category === category);
}
