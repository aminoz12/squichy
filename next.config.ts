import type { NextConfig } from "next";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

/** Detect leftover tutorial values so `.env.example` can override them. */
function looksLikeStripeKeyPlaceholder(v: string): boolean {
  const t = v.trim();
  if (!/^sk_(test|live)_/.test(t)) return false;
  return /paste|replace|_here|xxxx|your_secret|placeholder/i.test(t);
}

/**
 * Next.js does not load `.env.example`. Merge it when vars are unset, or when
 * `STRIPE_SECRET_KEY` is clearly a leftover template (e.g. …key_here).
 */
function mergeEnvExample() {
  const filePath = resolve(process.cwd(), ".env.example");
  if (!existsSync(filePath)) return;
  const raw = readFileSync(filePath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let val = trimmed.slice(eq + 1).trim();
    if (!key || val === "") continue;
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    const cur = process.env[key];
    const missing = cur === undefined || cur === "";
    const stripePlaceholder =
      key === "STRIPE_SECRET_KEY" && typeof cur === "string" && looksLikeStripeKeyPlaceholder(cur);
    if (missing || stripePlaceholder) {
      process.env[key] = val;
    }
  }
}

mergeEnvExample();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
