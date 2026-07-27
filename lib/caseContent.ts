import { getCase, getCases, type Doc } from "@/lib/content";
import type { CaseContent } from "@/content/types";

const DEFAULT_LANG = "en";

/** Cases with a page on the human site, single source of truth (also used by app/sitemap.ts). */
export const HUMAN_CASE_SLUGS = [
  "remessa-online",
  "xerpay",
  "foodastic",
];

/**
 * Maps a case Doc (sourced from content/ai/cases/<slug>.md, mirrored from the
 * vault's _Publish/cases/) into the shape CasePage.tsx renders. `sections` in
 * the frontmatter is the short, human version of each `##` in the body — the
 * body itself stays full-depth for /ai and llms.txt only.
 */
function toCaseContent(doc: Doc): CaseContent {
  const meta = [
    doc.role && { label: "Role", value: doc.role },
    doc.period && { label: "Period", value: doc.period },
    doc.category && { label: "Category", value: doc.category },
  ].filter((m): m is { label: string; value: string } => Boolean(m));

  return {
    heroImage: doc.heroImage,
    heroImageMobile: doc.heroImageMobile,
    hero: {
      title: doc.title,
      meta,
      tagline: doc.tagline ?? "",
    },
    metrics: (doc.metrics ?? []).map((m) => ({ label: m.label, display: m.value })),
    sections: (doc.sections ?? []).map((s, i) => ({
      label: String(i + 1).padStart(2, "0"),
      heading: s.heading,
      body: s.summary.trim(),
      visual: s.visual,
      visualSrc: s.visualSrc,
      visualSrcMobile: s.visualSrcMobile,
    })),
    gallery: (doc.gallery ?? []).map((src) => ({ src })),
  };
}

export function getCaseContent(slug: string): CaseContent {
  const doc = getCase(slug, DEFAULT_LANG);
  if (!doc) throw new Error(`Case not found: ${slug}`);
  return toCaseContent(doc);
}

export type CaseNavItem = { slug: string; title: string };

/** Prev/next in the published order (vault `order` field), wrapping around. */
export function getCaseNavigation(slug: string): { prev: CaseNavItem; next: CaseNavItem } {
  const ordered = getCases(DEFAULT_LANG)
    .filter((c) => HUMAN_CASE_SLUGS.includes(c.slug))
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const idx = ordered.findIndex((c) => c.slug === slug);
  const prev = ordered[(idx - 1 + ordered.length) % ordered.length];
  const next = ordered[(idx + 1) % ordered.length];

  return {
    prev: { slug: prev.slug, title: prev.title },
    next: { slug: next.slug, title: next.title },
  };
}
