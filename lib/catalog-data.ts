/**
 * Imported Squishy Bun catalog (generated from the reference site export).
 * Images live in /public/catalog. Mapped into full ProductOffer entries in lib/data.ts.
 */

export type CatalogFeel = "soft" | "gooey" | "crunchy" | "gift";

export type CatalogEntry = {
  id: string;
  name: string;
  slug: string;
  category: string;
  priceUsd: number;
  image: string;
  feel: CatalogFeel;
  description: string;
  badge?: string;
};

export const catalogEntries: CatalogEntry[] = [
  {
    "id": "sq-001",
    "name": "Smiley Dumpling Squishy",
    "slug": "smiley-dumpling-squishy",
    "category": "Dumplings",
    "priceUsd": 12.99,
    "image": "/catalog/sq-001.webp",
    "feel": "soft",
    "description": "The classic. A smiley steamed dumpling that squishes flat and slowly springs back. Your new desk buddy.",
    "badge": "Best seller"
  },
  {
    "id": "sq-002",
    "name": "Glitter Dumpling in Steamer Basket",
    "slug": "glitter-dumpling-in-steamer-basket",
    "category": "Dumplings",
    "priceUsd": 14.99,
    "image": "/catalog/sq-002.webp",
    "feel": "gooey",
    "description": "Glitter-packed dumpling nestled in its own bamboo steamer basket. Sparkly, squeezy, gift-ready.",
    "badge": "Gift pick"
  },
  {
    "id": "sq-004",
    "name": "Golden Mantou Bun Squishy",
    "slug": "golden-mantou-bun-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 10.99,
    "image": "/catalog/sq-004.webp",
    "feel": "soft",
    "description": "A golden, pillowy mantou bun that rises back slowly after every squeeze. Our lowest-priced happy.",
    "badge": "Starter pick"
  },
  {
    "id": "sq-005",
    "name": "Sticky Butter Stick Squishy",
    "slug": "sticky-butter-stick-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 12.99,
    "image": "/catalog/sq-005.webp",
    "feel": "soft",
    "description": "A buttery, stick-of-butter squish with a satisfying slow rebound. Weirdly relaxing."
  },
  {
    "id": "sq-009",
    "name": "Mochi Daifuku Squishy",
    "slug": "mochi-daifuku-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 12.99,
    "image": "/catalog/sq-009.webp",
    "feel": "soft",
    "description": "Soft, chewy mochi daifuku with a dreamy squish. All the comfort, none of the crumbs."
  },
  {
    "id": "sq-010",
    "name": "Soufflé Cream Squishy",
    "slug": "souffl-cream-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 12.99,
    "image": "/catalog/sq-010.webp",
    "feel": "soft",
    "description": "A cloud-soft soufflé topped with cream. Slow-rise, super squeezable."
  },
  {
    "id": "sq-011",
    "name": "Crunchy Popsicle Squishy",
    "slug": "crunchy-popsicle-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 14.99,
    "image": "/catalog/sq-011.webp",
    "feel": "crunchy",
    "description": "Crunchy popsicle squishy with an ASMR crackle. Squeeze it and listen.",
    "badge": "Trending"
  },
  {
    "id": "sq-017",
    "name": "Crystal Ice Cube Squishy",
    "slug": "crystal-ice-cube-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 11.99,
    "image": "/catalog/sq-017.webp",
    "feel": "gooey",
    "description": "A clear, wobbly ice cube with a gooey maltose feel. Ultra-satisfying to poke and stretch.",
    "badge": "Trending"
  },
  {
    "id": "sq-022",
    "name": "Chonky Cat Squishy (Hand-Painted)",
    "slug": "chonky-cat-squishy-hand-painted",
    "category": "Animals",
    "priceUsd": 24.99,
    "image": "/catalog/sq-022.webp",
    "feel": "soft",
    "description": "Hand-painted chonky cat with a plush, velvety feel. Every one has its own personality.",
    "badge": "Fan favorite"
  },
  {
    "id": "sq-023",
    "name": "Bubble-Blowing Pet Squishy",
    "slug": "bubble-blowing-pet-squishy",
    "category": "Animals",
    "priceUsd": 10.99,
    "image": "/catalog/sq-023.webp",
    "feel": "soft",
    "description": "A pet squishy that blows a bubble when you squeeze. Guaranteed giggles.",
    "badge": "Starter pick"
  },
  {
    "id": "sq-024",
    "name": "Tongue-Out Pup Squishy",
    "slug": "tongue-out-pup-squishy",
    "category": "Animals",
    "priceUsd": 12.99,
    "image": "/catalog/sq-024.webp",
    "feel": "soft",
    "description": "A tongue-out pup with an adorable goofy face and a satisfying squish."
  },
  {
    "id": "sq-029",
    "name": "Mystery Bao Blind Box",
    "slug": "mystery-bao-blind-box",
    "category": "Mystery Minis",
    "priceUsd": 13.99,
    "image": "/catalog/sq-029.webp",
    "feel": "soft",
    "description": "A mystery bao blind box. Unbox, squish, collect them all.",
    "badge": "Mystery"
  },
  {
    "id": "sq-003",
    "name": "Sparkle Bao Bun Squishy",
    "slug": "sparkle-bao-bun-squishy",
    "category": "Dumplings",
    "priceUsd": 13.99,
    "image": "/catalog/sq-003.webp",
    "feel": "soft",
    "description": "A sparkly bao bun with a dreamy shimmer. Squeeze it, watch it rise, repeat."
  },
  {
    "id": "sq-006",
    "name": "Holiday Butter Squishy",
    "slug": "holiday-butter-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 14.99,
    "image": "/catalog/sq-006.webp",
    "feel": "soft",
    "description": "Festive butter squishy with a holiday twist. Stocking-stuffer energy."
  },
  {
    "id": "sq-007",
    "name": "Slow-Rise Bakery Squishy (Baguette / Croissant)",
    "slug": "slow-rise-bakery-squishy-baguette-croissant",
    "category": "Bakery & Sweets",
    "priceUsd": 14.99,
    "image": "/catalog/sq-007.webp",
    "feel": "soft",
    "description": "Slow-rise bakery squishy in baguette or croissant. It smells like nothing and feels like everything."
  },
  {
    "id": "sq-008",
    "name": "Mini Toast Squishy",
    "slug": "mini-toast-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 10.99,
    "image": "/catalog/sq-008.webp",
    "feel": "soft",
    "description": "A tiny slice of toast that squishes, stretches and springs back. Perfect in a pocket.",
    "badge": "Starter pick"
  },
  {
    "id": "sq-012",
    "name": "Crunchy Chocolate Squishy",
    "slug": "crunchy-chocolate-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 13.99,
    "image": "/catalog/sq-012.webp",
    "feel": "crunchy",
    "description": "A chocolate-bar squish with that crunchy, crackly ASMR texture.",
    "badge": "Trending"
  },
  {
    "id": "sq-013",
    "name": "Crunchy Peanut Squishy",
    "slug": "crunchy-peanut-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 10.99,
    "image": "/catalog/sq-013.webp",
    "feel": "crunchy",
    "description": "Tiny crunchy peanut, huge sensory payoff. The cheapest way to get the crackle.",
    "badge": "Trending"
  },
  {
    "id": "sq-014",
    "name": "Crunchy Brick Squishy",
    "slug": "crunchy-brick-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 12.99,
    "image": "/catalog/sq-014.webp",
    "feel": "crunchy",
    "description": "A crunchy brick squishy for maximum crackle. Great fidget for meetings.",
    "badge": "Trending"
  },
  {
    "id": "sq-015",
    "name": "Potato Chip Squishy",
    "slug": "potato-chip-squishy",
    "category": "Bakery & Sweets",
    "priceUsd": 12.99,
    "image": "/catalog/sq-015.webp",
    "feel": "soft",
    "description": "A potato chip that is fully squishable and calorie-free. Snack-shaped stress relief."
  },
  {
    "id": "sq-016",
    "name": "Mini Pillow Squishy",
    "slug": "mini-pillow-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 10.99,
    "image": "/catalog/sq-016.webp",
    "feel": "soft",
    "description": "A mini pillow squish for the smallest, softest hand fidget.",
    "badge": "Starter pick"
  },
  {
    "id": "sq-018",
    "name": "Ice Candy Shapes Squishy (Heart / Drop / Star)",
    "slug": "ice-candy-shapes-squishy-heart-drop-star",
    "category": "Sensory & ASMR",
    "priceUsd": 12.99,
    "image": "/catalog/sq-018.webp",
    "feel": "gooey",
    "description": "Ice-candy shapes in heart, drop or star with that squishy, gooey stretch."
  },
  {
    "id": "sq-019",
    "name": "Gold Coin Squishy",
    "slug": "gold-coin-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 12.99,
    "image": "/catalog/sq-019.webp",
    "feel": "gooey",
    "description": "A shiny gold coin squish with a gooey, stretchy feel. Treasure you can squeeze."
  },
  {
    "id": "sq-020",
    "name": "Jelly Slush Ball",
    "slug": "jelly-slush-ball",
    "category": "Sensory & ASMR",
    "priceUsd": 13.99,
    "image": "/catalog/sq-020.webp",
    "feel": "gooey",
    "description": "A jelly slush ball that oozes and squelches in your hand. Sensory heaven."
  },
  {
    "id": "sq-021",
    "name": "Soap Bar Squishy",
    "slug": "soap-bar-squishy",
    "category": "Sensory & ASMR",
    "priceUsd": 13.99,
    "image": "/catalog/sq-021.webp",
    "feel": "gooey",
    "description": "A soap bar that is definitely not for washing. Squishy, slippery-smooth, weirdly addictive."
  },
  {
    "id": "sq-025",
    "name": "Pop-Eye Dragon Squishy",
    "slug": "pop-eye-dragon-squishy",
    "category": "Animals",
    "priceUsd": 11.99,
    "image": "/catalog/sq-025.webp",
    "feel": "soft",
    "description": "A pop-eye dragon whose eyes bulge when squeezed. Cute and a little ridiculous."
  },
  {
    "id": "sq-026",
    "name": "Handmade Bunny & Carrot Taba Squishy",
    "slug": "handmade-bunny-and-carrot-taba-squishy",
    "category": "Animals",
    "priceUsd": 34.99,
    "image": "/catalog/sq-026.webp",
    "feel": "soft",
    "description": "Handmade bunny and carrot taba squishy. A premium collectible for the desk shelf.",
    "badge": "Collector"
  },
  {
    "id": "sq-027",
    "name": "Mini Chick Squishies (6-Pack)",
    "slug": "mini-chick-squishies-6-pack",
    "category": "Animals",
    "priceUsd": 12.99,
    "image": "/catalog/sq-027.webp",
    "feel": "soft",
    "description": "Six mini chicks in one pack. Share them, stash them, or squish all six."
  },
  {
    "id": "sq-028",
    "name": "Angel Animal Blind Box Squishy",
    "slug": "angel-animal-blind-box-squishy",
    "category": "Mystery Minis",
    "priceUsd": 11.99,
    "image": "/catalog/sq-028.webp",
    "feel": "soft",
    "description": "An angel animal blind box: you never know which sweet face you will get.",
    "badge": "Mystery"
  },
  {
    "id": "box-bakery",
    "name": "Bakery Squishy Gift Box (5 pcs)",
    "slug": "bakery-squishy-gift-box-5-pcs",
    "category": "Boxes & Gift Sets",
    "priceUsd": 34.99,
    "image": "/catalog/box-bakery.webp",
    "feel": "gift",
    "description": "Five bakery squishies in one gift box: butter, toast, baguette, mantou and mochi.",
    "badge": "Gift set"
  },
  {
    "id": "box-crunch",
    "name": "Crunchy ASMR Squishy Box (4 pcs)",
    "slug": "crunchy-asmr-squishy-box-4-pcs",
    "category": "Boxes & Gift Sets",
    "priceUsd": 34.99,
    "image": "/catalog/box-crunch.webp",
    "feel": "gift",
    "description": "Four crunchy ASMR squishies in one box. Crackle for days.",
    "badge": "Trending"
  },
  {
    "id": "box-ice",
    "name": "Ice Cube Sensory Box (6 pcs)",
    "slug": "ice-cube-sensory-box-6-pcs",
    "category": "Boxes & Gift Sets",
    "priceUsd": 27.99,
    "image": "/catalog/box-ice.webp",
    "feel": "gift",
    "description": "Six ice cube squishies for the gooey-texture obsessed. A sensory box.",
    "badge": "Gift set"
  },
  {
    "id": "box-mystery-3",
    "name": "Mystery Squishy Blind Bag – 3-Pack",
    "slug": "mystery-squishy-blind-bag-3-pack",
    "category": "Boxes & Gift Sets",
    "priceUsd": 18.99,
    "image": "/catalog/box-mystery-3.webp",
    "feel": "gift",
    "description": "Three surprise squishies in a blind bag. The lucky dip everyone loves.",
    "badge": "Mystery"
  },
  {
    "id": "box-stocking-10",
    "name": "Stocking Stuffer Squishy Pack (10 minis)",
    "slug": "stocking-stuffer-squishy-pack-10-minis",
    "category": "Boxes & Gift Sets",
    "priceUsd": 20.99,
    "image": "/catalog/box-stocking-10.webp",
    "feel": "gift",
    "description": "Ten mini squishies for stockings, party bags and classroom treats.",
    "badge": "Best value"
  },
  {
    "id": "adv-01",
    "name": "Countdown to Christmas Dumpling Advent Calendar",
    "slug": "countdown-to-christmas-dumpling-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 35.99,
    "image": "/catalog/adv-01.webp",
    "feel": "gift",
    "description": "A winter-themed calendar with a dumpling squishy behind every door. Count down to the big day.",
    "badge": "Gift set"
  },
  {
    "id": "adv-03",
    "name": "Mystery Dumpling Advent Calendar – 24 Squishies",
    "slug": "mystery-dumpling-advent-calendar-24-squishies",
    "category": "Advent Calendars",
    "priceUsd": 37.99,
    "image": "/catalog/adv-03.webp",
    "feel": "gift",
    "description": "24 doors, 24 mystery dumpling squishies. A new surprise every day until Christmas.",
    "badge": "Gift set"
  },
  {
    "id": "adv-04",
    "name": "Ice Cube Squishy Advent Calendar",
    "slug": "ice-cube-squishy-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 43.99,
    "image": "/catalog/adv-04.webp",
    "feel": "gift",
    "description": "24 gooey, translucent ice cube squishies in a bold numbered box. Poke, stretch, repeat.",
    "badge": "Gift set"
  },
  {
    "id": "adv-06",
    "name": "Mystery Bun Advent Calendar",
    "slug": "mystery-bun-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 48.99,
    "image": "/catalog/adv-06.webp",
    "feel": "gift",
    "description": "A jungle-themed box of mystery bun squishies and fun surprises. A little happy every day.",
    "badge": "Big one"
  },
  {
    "id": "adv-09",
    "name": "Deluxe Mystery Advent Calendar – Dumplings & Cubes",
    "slug": "deluxe-mystery-advent-calendar-dumplings-and-cubes",
    "category": "Advent Calendars",
    "priceUsd": 37.99,
    "image": "/catalog/adv-09.webp",
    "feel": "gift",
    "description": "Numbered doors hiding a mix of dumpling, bun and cube squishies. The deluxe countdown.",
    "badge": "Gift set"
  },
  {
    "id": "gift-01",
    "name": "Pink Slow-Rise Squishy Gift Set (4 pcs)",
    "slug": "pink-slow-rise-squishy-gift-set-4-pcs",
    "category": "Boxes & Gift Sets",
    "priceUsd": 34.99,
    "image": "/catalog/gift-01.webp",
    "feel": "gift",
    "description": "A pink slow-rise squishy gift set with four pieces. Pretty in the box, fun out of it.",
    "badge": "Gift set"
  },
  {
    "id": "gift-02",
    "name": "Magic Book Poke Box Squishy Surprise",
    "slug": "magic-book-poke-box-squishy-surprise",
    "category": "Boxes & Gift Sets",
    "priceUsd": 34.99,
    "image": "/catalog/gift-02.webp",
    "feel": "gift",
    "description": "A magic-book poke box with a squishy surprise inside. Fun to open, fun to keep.",
    "badge": "Gift set"
  },
  {
    "id": "gift-03",
    "name": "Christmas Squishy Gift Box",
    "slug": "christmas-squishy-gift-box",
    "category": "Boxes & Gift Sets",
    "priceUsd": 32.99,
    "image": "/catalog/gift-03.webp",
    "feel": "gift",
    "description": "A Christmas squishy gift box, ready to wrap. Easy holiday present.",
    "badge": "Gift set"
  },
  {
    "id": "gift-04",
    "name": "Christmas Tree & Santa Maltose Squishy Set",
    "slug": "christmas-tree-and-santa-maltose-squishy-set",
    "category": "Boxes & Gift Sets",
    "priceUsd": 13.99,
    "image": "/catalog/gift-04.webp",
    "feel": "gift",
    "description": "A Christmas tree and Santa maltose squishy set. Gooey festive cheer.",
    "badge": "Gift set"
  },
  {
    "id": "gift-05",
    "name": "Santa Maltose Squishy Gift Box",
    "slug": "santa-maltose-squishy-gift-box",
    "category": "Boxes & Gift Sets",
    "priceUsd": 18.99,
    "image": "/catalog/gift-05.webp",
    "feel": "gift",
    "description": "A Santa maltose squishy in a gift box. Jolly, stretchy, cute.",
    "badge": "Gift set"
  },
  {
    "id": "gift-06",
    "name": "Christmas Bun Squishy Gift Box",
    "slug": "christmas-bun-squishy-gift-box",
    "category": "Boxes & Gift Sets",
    "priceUsd": 13.99,
    "image": "/catalog/gift-06.webp",
    "feel": "gift",
    "description": "A Christmas bun squishy in a gift box. Soft, festive, giftable.",
    "badge": "Gift set"
  },
  {
    "id": "gift-07",
    "name": "Halloween Bun Squishy Gift Box",
    "slug": "halloween-bun-squishy-gift-box",
    "category": "Boxes & Gift Sets",
    "priceUsd": 13.99,
    "image": "/catalog/gift-07.webp",
    "feel": "gift",
    "description": "A Halloween bun squishy gift box. A spooky-cute treat.",
    "badge": "Gift set"
  },
  {
    "id": "gift-08",
    "name": "Reindeer Antler Bead Bun Squishy",
    "slug": "reindeer-antler-bead-bun-squishy",
    "category": "Boxes & Gift Sets",
    "priceUsd": 12.99,
    "image": "/catalog/gift-08.webp",
    "feel": "gift",
    "description": "A reindeer antler bead bun squishy. A cute festive novelty.",
    "badge": "Gift set"
  },
  {
    "id": "box-adv-24",
    "name": "Squishy Advent Calendar – 24 Days of Squish",
    "slug": "squishy-advent-calendar-24-days",
    "category": "Advent Calendars",
    "priceUsd": 29.99,
    "image": "/catalog/box-adv-24.webp",
    "feel": "soft",
    "description": "Squishy Advent Calendar – 24 Days of Squish — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  },
  {
    "id": "adv-02",
    "name": "Reindeer & Snowman Squishy Advent Calendar (Poke Box)",
    "slug": "reindeer-snowman-squishy-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 24.99,
    "image": "/catalog/adv-02.webp",
    "feel": "soft",
    "description": "Reindeer & Snowman Squishy Advent Calendar (Poke Box) — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  },
  {
    "id": "adv-05",
    "name": "Ice Cube Squishy Advent Calendar 2026",
    "slug": "ice-cube-squishy-advent-calendar-2026",
    "category": "Advent Calendars",
    "priceUsd": 32.99,
    "image": "/catalog/adv-05.webp",
    "feel": "soft",
    "description": "Ice Cube Squishy Advent Calendar 2026 — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  },
  {
    "id": "adv-07",
    "name": "Viral Bun Squishy Advent Calendar",
    "slug": "viral-bun-squishy-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 24.99,
    "image": "/catalog/adv-07.webp",
    "feel": "soft",
    "description": "Viral Bun Squishy Advent Calendar — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  },
  {
    "id": "adv-08",
    "name": "24-Day Christmas Bun Squishy Set",
    "slug": "24-day-christmas-bun-squishy-set",
    "category": "Advent Calendars",
    "priceUsd": 27.99,
    "image": "/catalog/adv-08.webp",
    "feel": "soft",
    "description": "24-Day Christmas Bun Squishy Set — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  },
  {
    "id": "adv-10",
    "name": "Pull-Tab Squishy Advent Calendar",
    "slug": "pull-tab-squishy-advent-calendar",
    "category": "Advent Calendars",
    "priceUsd": 19.99,
    "image": "/catalog/adv-10.webp",
    "feel": "soft",
    "description": "Pull-Tab Squishy Advent Calendar — a day-by-day squishy countdown packed with collectible surprises. Open a door, squish a new friend.",
    "badge": "The complete collection"
  }
];
