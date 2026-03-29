/**
 * Central product + marketing copy. Swap Stripe URLs for your live Payment Links.
 * Images use Unsplash (configured in next.config.ts).
 */

export const product = {
  name: "SquishyBun Dumplings",
  tagline: "Tiny dumplings. Huge dopamine.",
  /** Static urgency copy — swap for real inventory if you add backend later */
  stockRemaining: 47,
} as const;

export const stripeLinks = {
  single: "https://buy.stripe.com/test_xxx_single",
  triple: "https://buy.stripe.com/test_xxx_triple",
  five: "https://buy.stripe.com/test_xxx_five",
} as const;

export type PricingTierId = keyof typeof stripeLinks;

export type PricingTier = {
  id: PricingTierId;
  label: string;
  count: number;
  price: number;
  compareAt?: number;
  badge?: string;
  stripeUrl: string;
  highlight?: boolean;
};

export const pricingTiers: PricingTier[] = [
  {
    id: "single",
    label: "Starter",
    count: 1,
    price: 9.99,
    stripeUrl: stripeLinks.single,
  },
  {
    id: "triple",
    label: "Fan favorite",
    count: 3,
    price: 24.99,
    compareAt: 29.97,
    badge: "Best seller",
    stripeUrl: stripeLinks.triple,
    highlight: true,
  },
  {
    id: "five",
    label: "Squad pack",
    count: 5,
    price: 39.99,
    compareAt: 49.95,
    stripeUrl: stripeLinks.five,
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
    a: "Most U.S. orders ship within 2 business days and arrive in 3–7 days. You’ll get tracking by email.",
  },
  {
    q: "What’s your refund policy?",
    a: "If something arrives damaged or not as described, email us within 14 days and we’ll make it right.",
  },
  {
    q: "Is this food?",
    a: "No — it’s a toy. Do not eat the squishy. (We can’t believe we had to say that.)",
  },
];

export const social = {
  tiktok: "https://www.tiktok.com/",
  instagram: "https://www.instagram.com/",
  email: "hello@squishybun.com",
} as const;

/** “The buzz is everywhere” — only these `/public` MP4s (no posters or extra assets). */
export const buzzReelVideos = [
  "/dumpling-1-trimmed.mp4",
  "/dumpling-2-trimmed.mp4",
  "/dumpling-3-trimmed.mp4",
  "/dumplings-5.mp4",
] as const;
