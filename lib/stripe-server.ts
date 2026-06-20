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

function hasCertificateTrustError(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const message = err instanceof Error ? err.message : "";
  if (
    message.includes("UNABLE_TO_VERIFY_LEAF_SIGNATURE") ||
    message.includes("unable to verify the first certificate")
  ) {
    return true;
  }

  const detail = "detail" in err ? (err as { detail?: unknown }).detail : undefined;
  const raw = "raw" in err ? (err as { raw?: unknown }).raw : undefined;
  return hasCertificateTrustError(detail) || hasCertificateTrustError(raw);
}

export function getStripeErrorMessage(err: unknown): string {
  if (hasCertificateTrustError(err)) {
    return "Stripe checkout could not start because this local Node process does not trust the TLS certificate chain for api.stripe.com. Configure NODE_EXTRA_CA_CERTS with your trusted CA certificate or fix the local proxy/antivirus certificate interception.";
  }

  return err instanceof Error ? err.message : "Stripe checkout failed";
}
