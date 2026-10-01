import { collections, collectionProducts } from "@/lib/collections";
import { faqItems, products, social } from "@/lib/data";
import { FREE_DELIVERY_THRESHOLD_USD } from "@/lib/delivery";
import { getSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

/**
 * /llms.txt — a concise, factual store summary for AI assistants and answer
 * engines (llmstxt.org convention). Generated from live catalog data at build.
 */
export function GET() {
  const base = getSiteUrl();
  const minPriceUsd = Math.min(
    ...products.flatMap((p) => p.options.map((o) => o.priceUsd)),
  ).toFixed(2);
  const bestsellers = products
    .filter((p) => p.badge)
    .slice(0, 8)
    .map((p) => `- [${p.name}](${base}/products/${p.slug}) — ${p.description}`)
    .join("\n");

  const collectionLines = collections
    .map((c) => {
      const count = collectionProducts(c).length;
      return `- [${c.title}](${base}/collections/${c.slug}) — ${count} products. ${c.metaDescription}`;
    })
    .join("\n");

  const faqLines = faqItems
    .map((item) => `### ${item.q}\n${item.a}`)
    .join("\n\n");

  const body = `# SquishyBun Dumplings

> SquishyBun is an online squishy-toy store selling ${products.length} slow-rise squishies: mystery dumpling blind boxes, bakery and food squishies, crunchy ASMR sensory toys, animal squishies, gift boxes, and advent calendars. Prices start at $${minPriceUsd}. BUY 2 GET 1 FREE bundles on most squishies; free delivery on orders over $${FREE_DELIVERY_THRESHOLD_USD}. Ships to the United States, Canada, the United Kingdom, and most of Europe. Recommended for ages 3+.

## Shop

- [All products](${base}/products)
${collectionLines}

## Bestsellers

${bestsellers}

## Policies

- Delivery: free over $${FREE_DELIVERY_THRESHOLD_USD}, otherwise a flat $9 at checkout. Orders pack in 1–2 business days; transit 3–7 days (US), 5–10 (Canada), 7–14 (UK/EU). [Shipping details](${base}/shipping)
- Returns: 14-day free returns for items that arrive damaged or not as described. [Returns](${base}/returns)
- Checkout: secure Stripe checkout (cards, Google Pay, Apple Pay). Discount codes accepted at payment.

## FAQ

${faqLines}

## Contact

- Email: ${social.email}
- TikTok: ${social.tiktok}
- Instagram: ${social.instagram}
- [About the store](${base}/about) · [Contact](${base}/contact) · [Blog](${base}/blog)
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
