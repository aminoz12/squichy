/**
 * Central product + marketing copy.
 * Checkout uses Stripe Checkout Sessions (POST /api/checkout), not Payment Links.
 */

export const product = {
  name: "SquishyBun Dumplings",
  tagline: "Tiny dumplings. Huge dopamine.",
  /** Static urgency copy — swap for real inventory if you add backend later */
  stockRemaining: 47,
} as const;

/** Favicon, navbar, and footer — place `icon.png` in `/public`. */
export const siteIconPath = "/icon.png" as const;

export type PricingTierId = "single" | "triple" | "five";

export type PricingTier = {
  id: PricingTierId;
  label: string;
  count: number;
  price: number;
  compareAt?: number;
  badge?: string;
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "single",
    label: "Starter",
    count: 1,
    price: 9.99,
  },
  {
    id: "triple",
    label: "Fan favorite",
    count: 3,
    price: 24.99,
    compareAt: 29.97,
    badge: "Best seller",
    highlight: true,
  },
  {
    id: "five",
    label: "Squad pack",
    count: 5,
    price: 39.99,
    compareAt: 49.95,
  },
];

export type ShowcaseSlide = {
  src: string;
  alt: string;
  caption: string;
};

/** Product showcase carousel — files in `/public` */
export const showcaseSlides: ShowcaseSlide[] = [
  {
    src: "/image2.jpg",
    alt: "SquishyBun Dumplings product photo, stress relief",
    caption: "Stress relief you can squeeze between meetings",
  },
  {
    src: "/image1.png",
    alt: "SquishyBun Dumplings product photo, desk collectible",
    caption: "Cute desk collectible that sparks joy",
  },
  {
    src: "/image3.jpg",
    alt: "SquishyBun Dumplings product photo, mystery unboxing",
    caption: "Mystery surprise — unbox the dopamine",
  },
];

export const benefits = [
  "Stress relief you can squeeze between meetings",
  "Cute desk collectible that sparks joy",
  "Mystery surprise — unbox the dopamine",
] as const;

export const reviews = [
  {
    name: "Mia R.",
    location: "Austin, TX",
    rating: 5,
    text: "I screamed. It’s so dumb and so perfect. Already ordered the 3-pack.",
  },
  {
    name: "Jordan K.",
    location: "Toronto, ON",
    rating: 5,
    text: "Feels expensive, ships fast, and the squish is *chef’s kiss*.",
  },
  {
    name: "Sam L.",
    location: "London, UK",
    rating: 5,
    text: "Bought as a joke. It’s now my emotional support dumpling.",
  },
] as const;

/** Long-form list on `/products` — matches classic e‑commerce review layout. */
export type ProductPageReview = {
  rating: number;
  title: string;
  body?: string;
  reviewPosted: string;
  purchaseDate: string;
  author: string;
  /** Customer / product photo in `/public` */
  image: string;
};

export const productPageReviews: ProductPageReview[] = [
  {
    rating: 5,
    title: "So cute I had to order another",
    body: "I screamed. It’s so dumb and so perfect. Already ordered the 3-pack.",
    reviewPosted: "2026-03-18",
    purchaseDate: "2026-03-02",
    author: "Mia R.",
    image: "/rev1.png",
  },
  {
    rating: 5,
    title: "I opened it and literally went “wait—WHAT?”",
    body: "Not gonna lie, I thought it would be gimmicky. The second I squeezed it I burst out laughing — it’s so soft and slow-rise I’m in love. Arrived quick too. Already telling my friends.",
    reviewPosted: "2026-03-12",
    purchaseDate: "2026-02-28",
    author: "Jordan K.",
    image: "/rev2.png",
  },
  {
    rating: 5,
    title: "Got it for my daughter — ended up a hit with both of us",
    body: "Ordered this for my daughter’s birthday and she squealed when she opened it. The mystery pull is so fun. Honestly? I keep sneaking it off her desk to squeeze it — the squish is ridiculous. Dad approved.",
    reviewPosted: "2026-02-26",
    purchaseDate: "2026-02-10",
    author: "Sam L.",
    image: "/rev3.png",
  },
  {
    rating: 5,
    title: "My daughter’s new favorite — I’m impressed too",
    body: "Bought the mystery dumpling for my daughter and the unboxing was pure joy. Slow rise is perfect and she carries it everywhere. I didn’t expect to like it this much myself, but here we are. Would buy again.",
    reviewPosted: "2026-03-05",
    purchaseDate: "2026-02-19",
    author: "Elena V.",
    image: "/rev4.png",
  },
  {
    rating: 5,
    title: "Exactly like the videos",
    reviewPosted: "2026-01-30",
    purchaseDate: "2026-01-14",
    author: "Chris P.",
    image: "/rev5.png",
  },
];

export const howItWorks = [
  {
    step: 1,
    title: "Order your pack",
    body: "Pick 1, 3, or 5 — each bundle is a blind drop.",
  },
  {
    step: 2,
    title: "We pack the mystery",
    body: "We curate squishy dumplings with love (and bubble wrap).",
  },
  {
    step: 3,
    title: "You unbox the surprise",
    body: "Film it, flex it, squeeze it — tag us on TikTok.",
  },
] as const;

export type FaqItem = { q: string; a: string };

export const faqItems: FaqItem[] = [
  {
    q: "What is a SquishyBun dumpling?",
    a: "A palm-sized, slow-rise squishy toy inspired by dumplings. You won’t know the exact style or color until it arrives — that’s the fun.",
  },
  {
    q: "How long does shipping take?",
    a: "Most US and Canada orders ship within 2 business days. Transit is typically 3–7 business days depending on your region. You’ll get tracking by email.",
  },
  {
    q: "What’s your refund policy?",
    a: "If something arrives damaged or not as described, email us within 14 days and we’ll make it right.",
  },
  {
    q: "Is this food?",
    a: "No — it’s a toy. Do not eat the squishy.",
  },
];

export const social = {
  tiktok: "https://www.tiktok.com/",
  instagram: "https://www.instagram.com/",
  email: "hello@squishybun.com",
} as const;

export type ProductSizeOption = {
  id: string;
  label: string;
  sizeCm: number;
  priceUsd: number;
};

export const singleProductOffer = {
  id: "squishybun-mystery-dumpling",
  name: "Crazy Fun Rainbow Squishy Bun Mystery Dumpling",
  description:
    "Mystery squishy bao bun sensory fidget toy — slow-rise texture, blind-box fun, and a chance at the super rare Shimmering Starlight Dumpling. Ages 3+.",
  deliveryUsd: 9,
  images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  details: [
    "This is a Mystery Squishy Bao Bun Sensory Fidget Toy.",
    "The product is from the brand Crazy Fun.",
    "It functions as a sensory fidget toy.",
    "This toy is suitable for ages 3 and up.",
    "Each package contains 1 set.",
    "There is a possibility to find a Super Rare Shimmering Starlight Dumpling.",
  ],
  specs: [
    { label: "Color", value: "Mystery" },
    { label: "Theme", value: "Mystery Dumpling" },
    { label: "Brand", value: "RMS" },
    { label: "Character", value: "Dumpling" },
    {
      label: "Dimensions",
      value: "Varies by size (17 cm or 24 cm) — see size option.",
    },
    { label: "Weight", value: "Approx. 0.7–1.9 kg depending on size." },
  ],
  options: [
    {
      id: "size-17",
      label: "17 cm",
      sizeCm: 17,
      priceUsd: 18,
    },
    {
      id: "size-24",
      label: "24 cm",
      sizeCm: 24,
      priceUsd: 26,
    },
  ] as ProductSizeOption[],
} as const;

export type ProductDetail = {
  id: string;
  name: string;
  size: string;
  price: number;
  compareAt?: number;
  description: string;
  details: string[];
  specs: {
    color: string;
    theme: string;
    brand: string;
    character: string;
    dimensions: string;
    weight: string;
  };
  images: string[];
};

export const productDetails: ProductDetail[] = [
  {
    id: "mini-crazy-fun-rainbow",
    name: "Mini Crazy Fun Rainbow Squishy Bun Mystery Dumpling 17CM",
    size: "17CM",
    price: 9.99,
    description:
      "Discover endless fun with the Mystery Squishy Bao Bun Sensory fidget toy, a delightful addition to the Crazy Fun collection. Each set provides an exciting unboxing experience, where you might uncover a super rare shimmering starlight dumpling. This engaging sensory toy is perfect for children aged 3 and up, offering a satisfying squishy texture and a touch of mystery. Enjoy the tactile play and the thrill of finding out which unique dumpling you receive in your set.",
    details: [
      "This is a Mystery Squishy Bao Bun Sensory Fidget Toy.",
      "The product is from the brand Crazy Fun.",
      "It functions as a sensory fidget toy.",
      "This toy is suitable for ages 3 and up.",
      "Each package contains 1 set.",
      "There is a possibility to find a Super Rare Shimmering Starlight Dumpling.",
    ],
    specs: {
      color: "Mystery",
      theme: "Mystery Dumpling",
      brand: "RMS",
      character: "Dumpling",
      dimensions: "6.69 x 6.69 x 5.02 Inches (17 x 17 x 12.75 cm)",
      weight: "1.60 lb (0.73 kg)",
    },
    images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  },
  {
    id: "big-crazy-fun-rainbow",
    name: "i Crazy Fun Rainbow Squishy Bun Mystery Dumpling 28CM",
    size: "28CM",
    price: 24.99,
    compareAt: 29.97,
    description:
      "Discover endless fun with the Mystery Squishy Bao Bun Sensory fidget toy, a delightful addition to the Crazy Fun collection. Each set provides an exciting unboxing experience, where you might uncover a super rare shimmering starlight dumpling. This engaging sensory toy is perfect for children aged 3 and up, offering a satisfying squishy texture and a touch of mystery. Enjoy the tactile play and the thrill of finding out which unique dumpling you receive in your set.",
    details: [
      "This is a Mystery Squishy Bao Bun Sensory Fidget Toy.",
      "The product is from the brand Crazy Fun.",
      "It functions as a sensory fidget toy.",
      "This toy is suitable for ages 3 and up.",
      "Each package contains 1 set.",
      "There is a possibility to find a Super Rare Shimmering Starlight Dumpling.",
    ],
    specs: {
      color: "Mystery",
      theme: "Mystery Dumpling",
      brand: "RMS",
      character: "Dumpling",
      dimensions: "11.02 x 11.02 x 8.27 Inches (28 x 28 x 21 cm)",
      weight: "4.20 lb (1.90 kg)",
    },
    images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  },
];

/** “The buzz is everywhere” — only these `/public` MP4s (no posters or extra assets). */
export const buzzReelVideos = [
  "/dumpling-1-trimmed.mp4",
  "/dumpling-2-trimmed.mp4",
  "/dumpling-3-trimmed.mp4",
  "/dumplings-5.mp4",
] as const;
