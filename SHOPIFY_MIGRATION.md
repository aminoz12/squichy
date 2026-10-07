# Shopify headless migration

The front end stays exactly as it is. Shopify becomes the backend: products,
inventory, discounts, taxes, shipping, and **payment via Shopify's hosted
checkout**. The integration is credential-gated — until the two env vars are
set, the site keeps using Stripe, so nothing breaks during the transition.

## How it works

- The storefront keeps rendering from its own catalog (`lib/data.ts`), so all
  pages, SEO, and the cart UI are unchanged.
- Every bundle tier on the site maps to a **Shopify variant**; the variant
  **SKU is our internal option id** (e.g. `sq-001-b21`). That SKU is the join
  key between the two systems.
- `lib/shopify-variants.json` (generated) maps option ids → Shopify variant
  GIDs. When it's populated and the env vars are set, the Checkout button
  creates a Shopify cart and redirects to Shopify checkout. Otherwise: Stripe.

## One-time setup (owner)

1. **Create the store** (any Shopify plan). Settings to mirror the site:
   - Payments: activate Shopify Payments (+ Apple/Google Pay).
   - Shipping: one profile — **free over $50**, otherwise **$9 flat** for
     US/CA/UK/EU (matches the site's free-delivery bar and FAQ).
   - Markets: US, CA, UK, EU. Currency USD.
   - Checkout → customer accounts optional; enable order **notes** if you
     want gift messages (the Stripe gift-message field doesn't carry over).
2. **Import products**: Admin → Products → Import →
   [`shopify-import/products.csv`](shopify-import/products.csv)
   (58 products, 161 variants; images are pulled from the live site
   automatically). Re-generate anytime with `npm run shopify:csv`.
3. **Collections**: create 7 automated collections, condition
   *Product tag equals* `category:Dumplings`, `category:Bakery & Sweets`,
   `category:Sensory & ASMR`, `category:Animals`, `category:Mystery Minis`,
   `category:Boxes & Gift Sets`, `category:Advent Calendars`.
   (Only needed for Shopify admin organization — the site's collection pages
   are independent.)
4. **Storefront API token**: Admin → Settings → Apps and sales channels →
   Develop apps → Create app → Configure **Storefront API** scopes:
   `unauthenticated_read_product_listings`, `unauthenticated_write_checkouts`,
   `unauthenticated_read_checkouts` → Install → copy the **Storefront API
   access token** (public; safe in the browser).
5. **Analytics**: add GA4 + Meta Pixel in Shopify (Settings → Customer events
   or the Google & Facebook channel apps) so `purchase` fires on Shopify's
   thank-you page. The site keeps firing `view_item` / `add_to_cart` /
   `begin_checkout`.

## Connect the storefront (dev)

1. In `.env.local` (and the same two vars in Netlify):

   ```
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN=shpat_…storefront token…
   ```

2. `npm run shopify:sync` — pulls the catalog, writes
   `lib/shopify-variants.json`, and **warns about any missing variant or
   price drift** between the site and Shopify. Fix warnings before going live.
3. Commit the JSON, deploy. Checkout now goes through Shopify.
4. Test: add a bundle + a single to the bag → Checkout → Shopify checkout
   page shows the same lines and totals → place a test order
   (Shopify Payments test mode), cancel/refund it.

## After any product/price change in Shopify

Prices shown on the site come from the site's catalog; prices **charged**
come from Shopify. Keep them identical: change prices in both places (or ask
the dev to mirror the change), then run `npm run shopify:sync` — it fails
loudly on drift — commit, deploy. A Netlify build hook triggered by a Shopify
"product update" webhook can automate the redeploy.

## Decommissioning Stripe (after Shopify is verified live)

- Remove `STRIPE_SECRET_KEY` from Netlify, delete `app/api/checkout*`,
  `lib/stripe-server.ts`, and the Stripe branches in `lib/checkout-client.ts`
  and `components/CheckoutReturnBanner.tsx`.
- Keep the Stripe account open until the last refund window has passed.
