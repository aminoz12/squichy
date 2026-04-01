import Stripe from "stripe";

/**
 * Server-only Stripe client. Uses STRIPE_SECRET_KEY (clé secrète).
 * Never import this from client components.
 */
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return new Stripe(key, { typescript: true });
}
