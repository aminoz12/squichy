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
    a: "Most EU orders ship within 2 business days and arrive in 3–7 days. You’ll get tracking by email.",
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
  priceEuro: number;
};

export const singleProductOffer = {
  id: "squishybun-mystery-dumpling",
  name: "Crazy Fun Rainbow Squishy Bun Mystery Dumpling",
  deliveryEuro: 9,
  images: ["/big1.png", "/big2.png", "/big3.png"],    
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
      priceEuro: 18,
    },
    {
      id: "size-24",
      label: "24 cm",
      sizeCm: 24,
      priceEuro: 26,
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
    images: ["/big1.png", "/big2.png", "/big3.png"],
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
    images: ["/big1.png", "/big2.png", "/big3.png"],
  },
];

/** “The buzz is everywhere” — only these `/public` MP4s (no posters or extra assets). */
export const buzzReelVideos = [
  "/dumpling-1-trimmed.mp4",
  "/dumpling-2-trimmed.mp4",
  "/dumpling-3-trimmed.mp4",
  "/dumplings-5.mp4",
] as const;
