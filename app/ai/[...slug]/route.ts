import { allDocs, LANGS, type Lang } from "@/lib/content";

export const dynamic = "force-static";

/**
 * Serves the raw markdown of a page or case, for AIs and humans who point a
 * fetcher at the site. URL shapes:
 *   /ai/pt/about            -> pages/about.md
 *   /ai/en/cases/bipa       -> cases/bipa.en.md
 */

type Ctx = { params: Promise<{ slug: string[] }> };

function findDoc(lang: Lang, kind: "pages" | "cases", slug: string) {
  const docs = allDocs(kind);
  return (
    docs.find((d) => d.slug === slug && d.lang === lang) ??
    docs.find((d) => d.slug === slug && d.lang === "pt")
  );
}

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const [lang, ...rest] = slug;

  if (!(LANGS as string[]).includes(lang) || rest.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const isCase = rest[0] === "cases";
  const name = isCase ? rest[1] : rest[0];
  if (!name) return new Response("Not found", { status: 404 });

  const doc = findDoc(lang as Lang, isCase ? "cases" : "pages", name);
  if (!doc) return new Response("Not found", { status: 404 });

  return new Response(doc.raw, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

export function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  for (const lang of LANGS) {
    for (const d of allDocs("pages")) {
      if (d.lang === lang) params.push({ slug: [lang, d.slug] });
    }
    for (const d of allDocs("cases")) {
      if (d.lang === lang) params.push({ slug: [lang, "cases", d.slug] });
    }
  }
  return params;
}
