import type { MetadataRoute } from "next";
import { getPages, getCases } from "@/lib/content";
import { HUMAN_CASE_SLUGS } from "@/lib/caseContent";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://allankirsten.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = getPages("en").filter((p) => p.slug !== "contact");
  const cases = getCases("en");

  const entries: MetadataRoute.Sitemap = [
    { url: SITE, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE}/contact`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${SITE}/how-i-work`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/about-this-website`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE}/ai`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE}/llms.txt`, changeFrequency: "monthly", priority: 0.8 },
  ];

  for (const slug of HUMAN_CASE_SLUGS) {
    entries.push({
      url: `${SITE}/cases/${slug}`,
      changeFrequency: "yearly",
      priority: 0.6,
    });
  }

  // AI-facing text routes: each page/case exists at both /ai/pt/... and
  // /ai/en/..., cross-linked via hreflang so engines don't read them as
  // duplicate/competing content.
  for (const p of pages) {
    entries.push({
      url: `${SITE}/ai/en/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${SITE}/ai/en/${p.slug}`,
          pt: `${SITE}/ai/pt/${p.slug}`,
        },
      },
    });
    entries.push({
      url: `${SITE}/ai/pt/${p.slug}`,
      lastModified: p.updated,
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: {
        languages: {
          en: `${SITE}/ai/en/${p.slug}`,
          pt: `${SITE}/ai/pt/${p.slug}`,
        },
      },
    });
  }

  for (const c of cases) {
    entries.push({
      url: `${SITE}/ai/en/cases/${c.slug}`,
      lastModified: c.updated,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE}/ai/en/cases/${c.slug}`,
          pt: `${SITE}/ai/pt/cases/${c.slug}`,
        },
      },
    });
    entries.push({
      url: `${SITE}/ai/pt/cases/${c.slug}`,
      lastModified: c.updated,
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: {
        languages: {
          en: `${SITE}/ai/en/cases/${c.slug}`,
          pt: `${SITE}/ai/pt/cases/${c.slug}`,
        },
      },
    });
  }

  return entries;
}
