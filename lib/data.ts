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
    price: 7.99,
  },
  {
    id: "triple",
    label: "Fan favorite",
    count: 3,
    price: 22.99,
    compareAt: 29.97,
    badge: "Best seller",
    highlight: true,
  },
  {
    id: "five",
    label: "Squad pack",
    count: 5,
    price: 37.99,
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

/* ── Bundle tiers for Mystery Dumpling ── */
export type BundleTier = {
  id: string;
  /** Display title, e.g. "Buy One" */
  title: string;
  /** Subtitle line, e.g. "No duplicates" */
  subtitle?: string;
  /** How many items the customer pays for */
  payQty: number;
  /** How many free dumpling items they get */
  freeQty: number;
  /** Bonus product name, e.g. "NeeDoh" */
  bonusProduct?: string;
  /** How many bonus products */
  bonusQty?: number;
  /** Per-box price in USD */
  perBoxUsd: number;
  /** Strikethrough compare-at per-box price */
  compareAtPerBoxUsd?: number;
  /** Total pack price in USD (displayed as primary price) */
  totalPriceUsd: number;
  /** Strikethrough compare-at total price */
  compareAtTotalUsd?: number;
  /** Badge text, e.g. "Most Popular", "Best Value" */
  badge?: string;
  /** Whether this tier includes free shipping */
  freeShipping?: boolean;
  /** Whether this is the default selected tier */
  defaultSelected?: boolean;
};

export const mysteryDumplingBundles: BundleTier[] = [
  {
    id: "mystery-b1",
    title: "BUY ONE",
    payQty: 1,
    freeQty: 0,
    perBoxUsd: 16,
    compareAtPerBoxUsd: 24,
    totalPriceUsd: 16,
    compareAtTotalUsd: 24,
  },
  {
    id: "mystery-b21",
    title: "BUY 2, GET 1 FREE",
    payQty: 2,
    freeQty: 1,
    perBoxUsd: 10.67,
    compareAtPerBoxUsd: 24,
    totalPriceUsd: 32,
    compareAtTotalUsd: 72,
    defaultSelected: true,
  },
  {
    id: "mystery-b42",
    title: "BUY 4, GET 2 FREE",
    payQty: 4,
    freeQty: 2,
    perBoxUsd: 10.5,
    compareAtPerBoxUsd: 24,
    totalPriceUsd: 63,
    compareAtTotalUsd: 144,
    badge: "Most Popular",
    freeShipping: true,
  },
  {
    id: "mystery-b63",
    title: "BUY 6, GET 3 FREE",
    payQty: 6,
    freeQty: 3,
    perBoxUsd: 9.67,
    compareAtPerBoxUsd: 24,
    totalPriceUsd: 87,
    compareAtTotalUsd: 216,
    bonusProduct: "NeeDoh",
    bonusQty: 1,
    freeShipping: true,
  },
  {
    id: "mystery-b84",
    title: "BUY 8, GET 4 FREE",
    payQty: 8,
    freeQty: 4,
    perBoxUsd: 8.83,
    compareAtPerBoxUsd: 24,
    totalPriceUsd: 106,
    compareAtTotalUsd: 288,
    badge: "Best Value",
    bonusProduct: "NeeDoh",
    bonusQty: 2,
    freeShipping: true,
  },
];

/** 
 * Standard bundles for other products 
 * Offers: BUY 2 GET 1 FREE, BUY 3 GET 1 FREE, BUY 4 GET 2 FREE
 */
export function getProductBundles(productId: string, basePrice: number, baseCompareAt?: number): BundleTier[] {
  const compareAt = baseCompareAt || Math.round(basePrice * 1.33);
  return [
    {
      id: `${productId}-b1`,
      title: "BUY ONE",
      payQty: 1,
      freeQty: 0,
      perBoxUsd: basePrice,
      compareAtPerBoxUsd: compareAt,
      totalPriceUsd: basePrice,
      compareAtTotalUsd: compareAt,
    },
    {
      id: `${productId}-b21`,
      title: "BUY 2, GET 1 FREE",
      payQty: 2,
      freeQty: 1,
      perBoxUsd: Math.round(((basePrice * 2 * 0.95) / 3) * 100) / 100,
      compareAtPerBoxUsd: compareAt,
      totalPriceUsd: Math.round(basePrice * 2 * 0.95),
      compareAtTotalUsd: compareAt * 3,
      defaultSelected: true,
    },
    {
      id: `${productId}-b31`,
      title: "BUY 3, GET 1 FREE",
      payQty: 3,
      freeQty: 1,
      perBoxUsd: Math.round(((basePrice * 3 * 0.9) / 4) * 100) / 100,
      compareAtPerBoxUsd: compareAt,
      totalPriceUsd: Math.round(basePrice * 3 * 0.9),
      compareAtTotalUsd: compareAt * 4,
      badge: "Most Popular",
    },
    {
      id: `${productId}-b42`,
      title: "BUY 4, GET 2 FREE",
      payQty: 4,
      freeQty: 2,
      perBoxUsd: Math.round(((basePrice * 4 * 0.85) / 6) * 100) / 100,
      compareAtPerBoxUsd: compareAt,
      totalPriceUsd: Math.round(basePrice * 4 * 0.85),
      compareAtTotalUsd: compareAt * 6,
      badge: "Best Value",
      freeShipping: true,
    },
  ];
}

export const singleProductOffer = {
  id: "squishybun-mystery-dumpling",
  name: "Crazy Fun Rainbow Squishy Bun Mystery Dumpling",
  slug: "mystery-dumpling",
  categoryName: "Dumpling Squishy",
  categoryImage: "/dumpling.png",
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
    { label: "Brand", value: "Squishy-Bun" },
    { label: "Character", value: "Dumpling" },
    {
      label: "Dimensions",
      value: "10 cm / 3.94 in",
    },
    { label: "Weight", value: "Approx. 0.2 kg per piece." },
  ],
  options: [
    ...mysteryDumplingBundles.map(b => ({
      id: b.id,
      label: b.title,
      sizeCm: 10,
      priceUsd: b.totalPriceUsd,
    }))
  ] as ProductSizeOption[],
} as const;

export type ProductOffer = Omit<typeof singleProductOffer, "id" | "name" | "slug" | "categoryName" | "categoryImage" | "description" | "images" | "details" | "specs" | "options"> & {
  id: string;
  name: string;
  slug: string;
  categoryName: string;
  categoryImage: string;
  description: string;
  images: readonly string[];
  details: readonly string[];
  specs: readonly { label: string; value: string }[];
  options: ProductSizeOption[];
  accentColor?: string;
  badge?: string;
};

export const products: ProductOffer[] = [
  {
    ...singleProductOffer,
    id: "squishybun-mystery-dumpling",
    accentColor: "#fdf2f8", // Rose 50
    badge: "Hot",
  },
  {
    ...singleProductOffer,
    id: "apple-squishy",
    name: "Apple Squishy",
    slug: "apple-squishy",
    categoryName: "Apple Squishy",
    categoryImage: "/apple.png",
    description: "Sweet, squishy, and satisfying Apple Squishy. A perfect addition to your collection.",
    images: ["/Apple1.png", "/Apple2.png", "/Apple3.png"],
    details: [
      "Premium slow-rise PU foam material.",
      "Sweet Apple-inspired scent for a sensory experience.",
      "Perfect for stress relief, fidgeting, and desk decoration.",
      "Vibrant red color with realistic leaf and stem detail.",
      "Suitable for ages 3 and up.",
    ],
    specs: [
      { label: "Color", value: "Red" },
      { label: "Material", value: "Slow-Rise PU Foam" },
      { label: "Theme", value: "Fruit" },
      { label: "Brand", value: "Crazy Fun" },
      { label: "Dimensions", value: "6cm Large, 7cm Tall" },
      { label: "Weight", value: "Approx. 0.2 kg" },
    ],
    accentColor: "#fff1f2", // Rose 50
    options: getProductBundles("apple-squishy", 16).map(b => ({
      id: b.id,
      label: b.title,
      sizeCm: 7,
      priceUsd: b.totalPriceUsd,
    })),
  },
  {
    ...singleProductOffer,
    id: "cheese-square",
    name: "Cheese Square",
    slug: "cheese-square",
    categoryName: "Cheese Square Squishy",
    categoryImage: "/cheese.png",
    description: "The cheesiest squishy around! Soft, slow-rise Cheese Square that you'll want to squeeze all day.",
    images: ["/cheese.png"],
    details: [
      "Realistic Swiss cheese design with crater holes.",
      "Premium slow-rise texture that's incredibly satisfying to squeeze.",
      "Perfect for cheese lovers and fidget toy collectors.",
      "Durable and high-quality construction.",
      "Suitable for ages 3 and up.",
    ],
    specs: [
      { label: "Color", value: "Yellow" },
      { label: "Material", value: "Soft PU Foam / TPR" },
      { label: "Theme", value: "Food" },
      { label: "Brand", value: "Crazy Fun" },
      { label: "Dimensions", value: "12cm x 14cm x 16cm" },
      { label: "Weight", value: "0.5 kg" },
    ],
    accentColor: "#fffbeb", // Amber 50
    badge: "Trending",
    options: getProductBundles("cheese-square", 23).map(b => ({
      id: b.id,
      label: b.title,
      sizeCm: 16,
      priceUsd: b.totalPriceUsd,
    })),
  },
  {
    ...singleProductOffer,
    id: "needoh",
    name: "NeeDoh",
    slug: "needoh",
    categoryName: "NeeDoh Squishy",
    categoryImage: "/needoh.png",
    description: "Experience extreme relaxation with our vibrant cubes: pink, blue, green, and purple. Designed to evoke a sense of calm and tranquility.",
    images: ["/needoh1.png", "/needoh2.png", "/videoneedoh.mp4"],
    details: [
      "Vibrant cubes: pink, blue, green, and purple.",
      "Helps deter habits like fidgeting, skin and nail picking, and finger cracking.",
      "Soft, durable exteriors enclose a high-density groovy goo filling.",
      "Silent and satisfying fidget experience that won't disturb others.",
      "Wash with water after frequent use to keep them as good as new!",
    ],
    specs: [
      { label: "Color", value: "Pink, blue, green, purple" },
      { label: "Material", value: "Soft exterior with high-density groovy goo filling" },
      { label: "Theme", value: "Sensory Fidget" },
      { label: "Brand", value: "Crazy Fun" },
      { label: "Dimensions", value: "2.35 inches per cube" },
      { label: "Weight", value: "Approx. 0.3 kg" },
    ],
    accentColor: "#f0fdf4", // Green 50
    options: getProductBundles("needoh", 22).map(b => ({
      id: b.id,
      label: b.title,
      sizeCm: 6,
      priceUsd: b.totalPriceUsd,
    })),
  },
  {
    ...singleProductOffer,
    id: "butter-squishy",
    name: "Butter Squishy",
    slug: "butter-squishy",
    categoryName: "Butter Squishy",
    categoryImage: "/butter.png",
    description: "Smooth, satisfying, and oh-so-squishy! The Butter Squishy is the ultimate sensory delight.",
    images: ["/butter.png"],
    details: [
      "Ultra-soft slow-rise material designed to look like a butter stick.",
      "Satisfying dough-like texture for deep sensory play.",
      "Large size makes it great for two-handed squishing.",
      "Non-toxic and safe for kids and adults.",
      "Perfect for decompressing after a long day.",
    ],
    specs: [
      { label: "Color", value: "Buttery Yellow" },
      { label: "Material", value: "Slow-rise TPR / Foam" },
      { label: "Theme", value: "Food" },
      { label: "Brand", value: "Crazy Fun" },
      { label: "Dimensions", value: "28 cm Stick" },
      { label: "Weight", value: "0.4 kg" },
    ],
    accentColor: "#fffbeb", // Amber 50
    options: getProductBundles("butter-squishy", 26).map(b => ({
      id: b.id,
      label: b.title,
      sizeCm: 28,
      priceUsd: b.totalPriceUsd,
    })),
  },
];

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
    name: "Mini Crazy Fun Rainbow Squishy Bun Mystery Dumpling 9CM (3.54\")",
    size: "9CM (3.54\")",
    price: 16,
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
      brand: "Squishy-Bun",
      character: "Dumpling",
      dimensions: "3.54 x 3.54 x 2.66 Inches (9 x 9 x 6.75 cm)",
      weight: "1.60 lb (0.73 kg)",
    },
    images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  },
  {
    id: "medium-crazy-fun-rainbow",
    name: "Medium Crazy Fun Rainbow Squishy Bun Mystery Dumpling 15CM (5.90\")",
    size: "15CM (5.90\")",
    price: 24,
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
      brand: "Squishy-Bun",
      character: "Dumpling",
      dimensions: "5.90 x 5.90 x 4.40 Inches (15 x 15 x 11.25 cm)",
      weight: "2.40 lb (1.10 kg)",
    },
    images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  },
  {
    id: "big-crazy-fun-rainbow",
    name: "i Crazy Fun Rainbow Squishy Bun Mystery Dumpling 25CM (9.84\")",
    size: "25CM (9.84\")",
    price: 33,
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
      brand: "Squishy-Bun",
      character: "Dumpling",
      dimensions: "9.84 x 9.84 x 7.38 Inches (25 x 25 x 18.75 cm)",
      weight: "4.20 lb (1.90 kg)",
    },
    images: ["/big1.png", "/vid2.mp4", "/big3.png"],
  },
  {
    id: "apple-squishy",
    name: "Apple Squishy",
    size: "6cm large, 7cm tall",
    price: 16,
    description: "Sweet, squishy, and satisfying Apple Squishy. A perfect addition to your collection.",
    details: [
      "Premium slow-rise PU foam material.",
      "Sweet Apple-inspired scent for a sensory experience.",
      "Perfect for stress relief, fidgeting, and desk decoration.",
      "Vibrant red color with realistic leaf and stem detail.",
      "Suitable for ages 3 and up.",
    ],
    specs: {
      color: "Red",
      theme: "Fruit",
      brand: "Crazy Fun",
      character: "Apple",
      dimensions: "6cm Large, 7cm Tall",
      weight: "0.2 kg",
    },
    images: ["/Apple1.png", "/Apple2.png", "/Apple3.png"],
  },
  {
    id: "cheese-square",
    name: "Cheese Square",
    size: "12cm x 14cm x 16cm",
    price: 23,
    description: "The cheesiest squishy around! Soft, slow-rise Cheese Square that you'll want to squeeze all day.",
    details: [
      "Realistic Swiss cheese design with crater holes.",
      "Premium slow-rise texture that's incredibly satisfying to squeeze.",
      "Perfect for cheese lovers and fidget toy collectors.",
      "Durable and high-quality construction.",
      "Suitable for ages 3 and up.",
    ],
    specs: {
      color: "Yellow",
      theme: "Food",
      brand: "Crazy Fun",
      character: "Cheese",
      dimensions: "12cm x 14cm x 16cm",
      weight: "0.5 kg",
    },
    images: ["/cheese.png"],
  },
  {
    id: "butter-squishy",
    name: "Butter Squishy",
    size: "28 cm tall",
    price: 26,
    description: "Smooth, satisfying, and oh-so-squishy! The Butter Squishy is the ultimate sensory delight.",
    details: [
      "Ultra-soft slow-rise material designed to look like a butter stick.",
      "Satisfying dough-like texture for deep sensory play.",
      "Large size makes it great for two-handed squishing.",
      "Non-toxic and safe for kids and adults.",
      "Perfect for decompressing after a long day.",
    ],
    specs: {
      color: "Buttery Yellow",
      theme: "Food",
      brand: "Crazy Fun",
      character: "Butter",
      dimensions: "28 cm Stick",
      weight: "0.4 kg",
    },
    images: ["/butter.png"],
  },
  {
    id: "needoh",
    name: "NeeDoh",
    size: "2.35 inches per cube",
    price: 22,
    description: "Experience extreme relaxation with our vibrant cubes: pink, blue, green, and purple, designed to evoke a sense of calm and tranquility. These brightly colored soft squares offer a soothing tactile experience, perfect for individuals seeking stress relief, including those with ADD/ADHD, OCD, autism, or high anxiety. Whether you're in the office, classroom, traveling, or aboard an airplane, these anxiety relief toys keep you focused and entertained. Mellow and cool to the touch, their soft, durable exteriors encase a high-density groovy goo filling. Wash with water after frequent use and it will be as good as new!",
    details: [
      "Vibrant cubes: pink, blue, green, and purple.",
      "Helps deter habits like fidgeting, skin and nail picking, and finger cracking.",
      "Soft, durable exteriors enclose a high-density groovy goo filling.",
      "Silent and satisfying fidget experience that won't disturb others.",
      "Wash with water after frequent use to keep them as good as new!",
    ],
    specs: {
      color: "Pink, blue, green, purple",
      theme: "Sensory Fidget",
      brand: "Crazy Fun",
      character: "Cube",
      dimensions: "2.35 inches per cube",
      weight: "0.3 kg",
    },
    images: ["/needoh1.png", "/needoh2.png", "/videoneedoh.mp4"],
  },
];

/** “The buzz is everywhere” — only these `/public` MP4s (no posters or extra assets). */
export const buzzReelVideos = [
  "/dumpling-1-trimmed.mp4",
  "/dumpling-2-trimmed.mp4",
  "/dumpling-3-trimmed.mp4",
  "/dumplings-5.mp4",
] as const;
