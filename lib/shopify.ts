"use client";

/**
 * Shopify headless integration (Storefront API).
 *
 * The front end keeps its own catalog, pages, and cart UI. Shopify is the
 * system of record for products, inventory, discounts, and payment: checkout
 * creates a Shopify cart from the shopper's lines and redirects to Shopify's
 * hosted checkout. Everything here is gated on the two public env vars, so
 * the site runs unchanged (Stripe checkout) until the store is connected.
 */

import variantMapJson from "./shopify-variants.json";

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN?.trim();
const STOREFRONT_TOKEN =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN?.trim();
const API_VERSION = "2025-07";

const VARIANT_BY_OPTION_ID: Record<string, string> =
  (variantMapJson as { variants?: Record<string, string> }).variants ?? {};

export function isShopifyEnabled(): boolean {
  return Boolean(STORE_DOMAIN && STOREFRONT_TOKEN);
}

/** Storefront variant GID for one of our option ids (set by shopify:sync). */
export function shopifyVariantId(optionId: string): string | undefined {
  return VARIANT_BY_OPTION_ID[optionId];
}

/** True when every line can be charged through Shopify. */
export function canCheckoutWithShopify(
  items: readonly { id: string }[],
): boolean {
  return (
    isShopifyEnabled() &&
    items.length > 0 &&
    items.every((item) => Boolean(shopifyVariantId(item.id)))
  );
}

async function storefrontFetch<T>(
  query: string,
  variables: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(
    `https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN ?? "",
      },
      body: JSON.stringify({ query, variables }),
    },
  );
  const json = (await res.json()) as {
    data?: T;
    errors?: { message: string }[];
  };
  if (!res.ok || json.errors?.length) {
    throw new Error(
      json.errors?.[0]?.message ?? `Shopify request failed (${res.status})`,
    );
  }
  if (!json.data) throw new Error("Shopify returned no data");
  return json.data;
}

const CART_CREATE_MUTATION = /* GraphQL */ `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        checkoutUrl
      }
      userErrors {
        message
      }
    }
  }
`;

type CartCreateResult = {
  cartCreate: {
    cart: { checkoutUrl: string } | null;
    userErrors: { message: string }[];
  };
};

/**
 * Creates a Shopify cart from our cart lines and returns the hosted-checkout
 * URL. `id` is our internal option id; quantities are bundle counts.
 */
export async function createShopifyCheckoutUrl(
  items: readonly { id: string; quantity: number }[],
): Promise<string> {
  const lines = items.map((item) => {
    const merchandiseId = shopifyVariantId(item.id);
    if (!merchandiseId) {
      throw new Error(`No Shopify variant mapped for "${item.id}"`);
    }
    return { merchandiseId, quantity: item.quantity };
  });

  const data = await storefrontFetch<CartCreateResult>(CART_CREATE_MUTATION, {
    lines,
  });
  const error = data.cartCreate.userErrors[0]?.message;
  if (error) throw new Error(error);
  const url = data.cartCreate.cart?.checkoutUrl;
  if (!url) throw new Error("Shopify did not return a checkout URL");
  return url;
}
