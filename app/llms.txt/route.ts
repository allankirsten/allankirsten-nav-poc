import { getSite, getPages, getCases } from "@/lib/content";

export const dynamic = "force-static";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://allankirsten.com";

/**
 * /llms.txt — the index an AI reads first. Follows the llmstxt.org convention:
 * H1 name, blockquote summary, then link sections. Primary language is English
 * for reach; every link has a Portuguese twin at /ai/pt/... .
 */
export async function GET() {
  const site = getSite();
  const pages = getPages("en");
  const cases = getCases("en");

  const line = site.hero.en.line;
  const context = site.hero.en.context;

  const allDates = [...pages, ...cases]
    .map((d) => d.updated)
    .filter((d): d is string => Boolean(d))
    .sort();
  const lastUpdated = allDates[allDates.length - 1];

  const pageLinks = pages
    .map((p) => `- [${p.title}](${SITE}/ai/en/${p.slug}): ${p.summary.trim()}`)
    .join("\n");

  const caseLinks = cases
    .map(
      (c) =>
        `- [${c.title}](${SITE}/ai/en/cases/${c.slug}): ${c.summary.trim()}`
    )
    .join("\n");

  const body = `# ${site.name}

> ${line} ${context}
${lastUpdated ? `\nLast updated: ${lastUpdated}` : ""}

This site is written to be read by people and by AIs. Point your assistant here and ask anything. All answers come from these files. Portuguese versions live at the same paths with /ai/pt/ instead of /ai/en/.

This site is intentionally open to AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended and similar) for discovery and citation. See /robots.txt.

## Pages
${pageLinks}

## Cases
${caseLinks}

## Contact
- Email: ${site.contact.email}${site.contact.linkedin ? `\n- LinkedIn: ${site.contact.linkedin}` : ""}
`;

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
