import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Lang = "pt" | "en";
export const LANGS: Lang[] = ["pt", "en"];
export const DEFAULT_LANG: Lang = "pt";

const CONTENT = path.join(process.cwd(), "content", "ai");

export type Metric = { label: string; value: string };

export type CaseFrontmatterSection = {
  heading: string;
  summary: string;
  visual?: string;
  visualSrc?: string;
  visualSrcMobile?: string;
};

export type Doc = {
  slug: string;
  lang: Lang;
  title: string;
  summary: string;
  tagline?: string;
  metrics?: Metric[];
  order?: number;
  featured?: boolean;
  nav?: boolean;
  company?: string;
  role?: string;
  period?: string;
  category?: string;
  status?: string;
  updated?: string;
  /** Human-facing modular sections (case studies only), one per `##` in the body. */
  sections?: CaseFrontmatterSection[];
  heroImage?: string;
  heroImageMobile?: string;
  /** Photo strip rendered after the case's sections. */
  gallery?: string[];
  /** Full markdown body (the AI-facing version). */
  body: string;
  /** Full file including frontmatter (served raw at /ai). */
  raw: string;
};

export type SiteConfig = {
  name: string;
  role?: string;
  hero: Record<Lang, { line: string; context: string }>;
  proof: Record<Lang, Metric[]>;
  philosophy: Record<Lang, string[]>;
  contact: { email: string; linkedin?: string };
  logos?: string[];
  intro: string;
};

function parseName(file: string): { slug: string; lang: Lang } {
  const base = file.replace(/\.md$/, "");
  const parts = base.split(".");
  const last = parts[parts.length - 1];
  if (parts.length > 1 && (LANGS as string[]).includes(last)) {
    return { slug: parts.slice(0, -1).join("."), lang: last as Lang };
  }
  return { slug: base, lang: DEFAULT_LANG };
}

function readKind(kind: "pages" | "cases"): Doc[] {
  const dir = path.join(CONTENT, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data, content } = matter(raw);
      const { slug, lang } = parseName(file);
      return {
        slug,
        lang,
        title: data.title ?? slug,
        summary: data.summary ?? "",
        tagline: data.tagline,
        metrics: data.metrics,
        order: data.order,
        featured: data.featured,
        nav: data.nav,
        company: data.company,
        role: data.role,
        period: data.period,
        category: data.category,
        status: data.status,
        updated: data.updated,
        sections: data.sections,
        heroImage: data.heroImage,
        heroImageMobile: data.heroImageMobile,
        gallery: data.gallery,
        body: content.trim(),
        raw,
      } as Doc;
    });
}

/** Return the doc in the requested lang, falling back to the default lang. */
function pick(docs: Doc[], slug: string, lang: Lang): Doc | undefined {
  return (
    docs.find((d) => d.slug === slug && d.lang === lang) ??
    docs.find((d) => d.slug === slug && d.lang === DEFAULT_LANG)
  );
}

export function getSite(): SiteConfig {
  const raw = fs.readFileSync(path.join(CONTENT, "site.json"), "utf8");
  return JSON.parse(raw) as SiteConfig;
}

export function getPages(lang: Lang): Doc[] {
  const all = readKind("pages");
  const slugs = [...new Set(all.map((d) => d.slug))];
  return slugs
    .map((s) => pick(all, s, lang)!)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getPage(slug: string, lang: Lang): Doc | undefined {
  return pick(readKind("pages"), slug, lang);
}

export function getCases(lang: Lang): Doc[] {
  const all = readKind("cases");
  const slugs = [...new Set(all.map((d) => d.slug))];
  return slugs
    .map((s) => pick(all, s, lang)!)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getCase(slug: string, lang: Lang): Doc | undefined {
  return pick(readKind("cases"), slug, lang);
}

/** Every (slug, lang) pair for a kind, used by AI raw endpoints and SSG. */
export function allDocs(kind: "pages" | "cases"): Doc[] {
  return readKind(kind);
}
