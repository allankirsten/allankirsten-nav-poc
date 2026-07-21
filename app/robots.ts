import type { MetadataRoute } from "next";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://allankirsten.com";

/**
 * Explicitly allow known AI crawlers (in addition to the default `*` allow).
 * Absence of a blocking rule already means "allowed", but naming these
 * out loud is a clear, checkable signal of intent.
 */
// This build is currently staged at allankirsten.com/2026, not its own
// indexable site — disallow everything here too (belt and suspenders
// alongside the disallow rule on the root domain's own robots.txt and the
// X-Robots-Tag header set in next.config.ts). Reinstate the allow-list
// below once /2026 is promoted to the root domain.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
