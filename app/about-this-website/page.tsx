"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { BackButton } from "@/components/BackButton";
import { renderWords, renderChars, getSubCharDelays } from "@/lib/textReveal";

const css = `
  .atw-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }
  .atw-hero {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--section-px);
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .atw-eyebrow {
    font-family: var(--font-sans);
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
    margin-bottom: 2rem;
  }
  .atw-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 11vw, 9rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    font-weight: 400;
    color: #000;
  }
  .atw-subhead {
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 300;
    color: #777;
    margin-top: 2.5rem;
    max-width: 48ch;
    line-height: 1.5;
  }
  .atw-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-bottom: 1px solid #e5e5e5;
  }
  .atw-metric-cell {
    padding: clamp(2rem, 5vw, 3.5rem) var(--section-px);
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .atw-metric-cell:nth-child(even) { border-right: none; }
  .atw-metric-value {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 4vw, 2.25rem);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 400;
  }
  .atw-metric-label {
    font-size: 0.75rem;
    font-weight: 300;
    color: #888;
    margin-top: 0.75rem;
    letter-spacing: 0.02em;
    line-height: 1.4;
  }
  .atw-section {
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
    border-bottom: 1px solid #e5e5e5;
  }
  .atw-section-inner { max-width: 72ch; }
  .atw-section-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
    margin-bottom: 1.5rem;
  }
  .atw-section-heading {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
    max-width: 24ch;
    margin-bottom: 1.5rem;
  }
  .atw-body {
    font-size: 1.0625rem;
    line-height: 1.7;
    font-weight: 300;
    color: #555;
    max-width: 66ch;
  }
  .atw-body + .atw-body { margin-top: 1.25rem; }

  /* Timeline — the tools changed eras, the builder didn't. Kept as flowing
     text rather than a spec row: this is the light, personal section. */
  .atw-timeline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.6rem;
    margin: 2rem 0;
    font-size: 0.9375rem;
    color: #555;
  }
  .atw-timeline-arrow { color: #ccc; }

  /* Spec rows — term / monospace value / description. Used wherever this
     page names a real technical detail, so a technical reader can verify
     it instead of taking the prose's word for it. */
  .atw-rows { margin-top: 3rem; max-width: 72ch; }
  .atw-row {
    padding: 1.5rem 0;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .atw-row:last-child { border-bottom: 1px solid #eee; }
  .atw-row-term {
    font-size: 0.625rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #aaa;
  }
  .atw-row-value {
    font-family: monospace;
    font-size: 0.9375rem;
    color: #000;
  }
  .atw-row-desc {
    font-size: 0.9375rem;
    line-height: 1.6;
    font-weight: 300;
    color: #666;
    max-width: 58ch;
  }
  @media (min-width: 640px) {
    .atw-row {
      display: grid;
      grid-template-columns: 10rem 14rem 1fr;
      align-items: baseline;
      gap: 1.5rem;
    }
  }

  /* Process steps — reused visual language from /how-i-work's own process
     list, applied here to the content pipeline instead of the work method. */
  .atw-steps { margin-top: 3rem; max-width: 72ch; }
  .atw-step {
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1.5rem;
    align-items: baseline;
    padding: 1.25rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .atw-step:last-child { border-bottom: none; }
  .atw-step-number { font-size: 0.625rem; letter-spacing: 0.15em; color: #ccc; font-family: monospace; }
  .atw-step-label {
    font-family: var(--font-display);
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 400;
    line-height: 1.2;
    letter-spacing: -0.01em;
  }
  .atw-step-desc {
    font-size: 0.9375rem;
    font-weight: 300;
    color: #888;
    line-height: 1.5;
    margin-top: 0.35rem;
    max-width: 56ch;
  }
  @media (min-width: 768px) {
    .atw-step { grid-template-columns: 4rem 12rem 1fr; }
    .atw-step-desc { margin-top: 0; }
  }

  /* Tag list — named crawlers/bots, as chips rather than a run-on sentence. */
  .atw-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 1.5rem; }
  .atw-tag {
    font-family: monospace;
    font-size: 0.75rem;
    padding: 0.35rem 0.7rem;
    border: 1px solid #e5e5e5;
    border-radius: 999px;
    color: #555;
  }

  .atw-cross-link {
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .atw-cross-link-lead {
    font-size: 1.0625rem;
    font-weight: 300;
    color: #777;
  }
  .atw-cross-link-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: gap 0.3s ease;
    width: fit-content;
  }
  .atw-cross-link-title:hover { gap: 1.25rem; }
  @media (min-width: 640px) {
    .atw-metrics { grid-template-columns: repeat(4, 1fr); }
    .atw-metric-cell { border-bottom: none; }
    .atw-metric-cell:nth-child(even) { border-right: 1px solid #e5e5e5; }
    .atw-metric-cell:last-child { border-right: none; }
  }
`;

const ATW_SUBHEAD = "The portfolio of someone who builds things for a living should, itself, be well built.";

const timeline = ["HTML/CSS by hand", "Flash", "WordPress", "Framer", "Next.js, paired with Claude Code"];

const metrics = [
  { value: "1999", label: "Building sites by hand since" },
  { value: "Next.js 16", label: "App Router · Turbopack · TypeScript" },
  { value: "1 vault", label: "Single source for site, /ai and llms.txt" },
  { value: "Claude Code", label: "Pair-programmed, not outsourced" },
];

const stackRows = [
  { term: "Frontend", value: "Next.js 16 · React 19 · TypeScript", desc: "App Router, server-rendered by default. No client bundle ships unless a page genuinely needs interactivity." },
  { term: "Build", value: "Turbopack", desc: "Next's Rust-based bundler, replacing Webpack in dev and build. Faster cold starts, the main reason to run it." },
  { term: "Animation", value: "GSAP 3.15", desc: "Timeline-based entrance animations, hand-tuned per page. No animation-library defaults, every easing curve was picked on purpose." },
  { term: "Content", value: "Markdown + gray-matter", desc: "No headless CMS, no database. Every case and page is a .md file with frontmatter, versioned exactly like the code that reads it." },
  { term: "Hosting", value: "Vercel", desc: "Continuous deploy from main. Push is the deploy button; there is no staging environment between a commit and production." },
];

const pipelineSteps = [
  { step: "01", label: "Write", desc: "Every case, page and decision starts as a note in an Obsidian vault, the same second brain that runs the rest of my work." },
  { step: "02", label: "Sync", desc: "A sync script copies finished markdown from the vault into this repo's content/ai/ folder, one file per case or page." },
  { step: "03", label: "Split", desc: "Each file generates two projections from a single source: full prose for /ai and llms.txt, a curated sections field in the frontmatter for the human case page." },
  { step: "04", label: "Render", desc: "Next.js reads that same file with gray-matter to build both the human route and the machine-readable one. Nothing gets typed twice." },
  { step: "05", label: "Ship", desc: "Commit, push, Vercel deploys. Editing a live case study means editing one markdown file, not three." },
];

const seoRows = [
  { term: "robots.txt", value: "app/robots.ts", desc: "Explicitly allows 12 named AI crawlers, not just the wildcard. The default already permits them; naming each one out loud makes the intent checkable, not just implied." },
  { term: "/ai + llms.txt", value: "force-static", desc: "Raw markdown routes, in English and Portuguese, with no nav, no CSS, no JS. This page has all three; /ai deliberately has none of them." },
  { term: "sitemap.xml", value: "app/sitemap.ts", desc: "Every human route plus every /ai/{en,pt}/* page and case, cross-linked with hreflang so engines read the two languages as alternates, not duplicates." },
  { term: "JSON-LD", value: "Person schema", desc: "On home and /about, real fields only, sourced from the same facts as the rest of the site. No invented ratings, no schema the page can't back up." },
  { term: "Freshness", value: "updated: frontmatter", desc: "Every markdown file carries its own last-edited date, surfaced in llms.txt so a crawler can tell what actually changed." },
];

const crawlerTags = ["GPTBot", "ChatGPT-User", "ClaudeBot", "Claude-Web", "anthropic-ai", "PerplexityBot", "Perplexity-User", "Google-Extended", "OAI-SearchBot", "Applebot-Extended", "Bytespider", "CCBot"];

export default function AboutThisWebsite() {
  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".atw-title .word");
    const subChars = document.querySelectorAll<HTMLElement>(".atw-subhead .sub-char");
    const subDelays = getSubCharDelays(ATW_SUBHEAD);

    gsap.fromTo(".atw-eyebrow", { opacity: 0, y: -28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
    if (words.length) gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out", delay: 0.15 });
    if (subChars.length) gsap.fromTo(subChars, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: (i: number) => subDelays[i], duration: 0.6, ease: "power2.out", delay: 0.4 });
  }, []);

  return (
    <main className="atw-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="atw-hero">
        <span className="atw-eyebrow">Process</span>
        <div>
          <h1 className="atw-title">{renderWords("Nobody builds this for me.")}</h1>
          <p className="atw-subhead">{renderChars(ATW_SUBHEAD)}</p>
        </div>
      </section>

      <div className="atw-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="atw-metric-cell">
            <p className="atw-metric-value">{m.value}</p>
            <p className="atw-metric-label">{m.label}</p>
          </div>
        ))}
      </div>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">Why</span>
          <h2 className="atw-section-heading">The habit started in 1999.</h2>
          <p className="atw-body">
            Every version of this site, back to that year&apos;s raw HTML,
            came out of my own hands. Agencies started offering
            portfolio-building as standard work somewhere along the way; that
            offer never got taken up. Hiring it out was never really the
            temptation.
          </p>
          <div className="atw-timeline">
            {timeline.map((t, i) => (
              <span key={t}>
                {i > 0 && <span className="atw-timeline-arrow" aria-hidden="true">→ </span>}
                {t}
              </span>
            ))}
          </div>
          <p className="atw-body">
            Five eras, five completely different tools, and the same person
            behind the keyboard in every one of them. This site&apos;s
            content now lives in an Obsidian vault, the same second brain
            that runs the rest of my work, with Claude Code doing real
            pair-programming rather than acting as a chatbot on the side.
          </p>
          <p className="atw-body">
            A showcase built by someone who builds products for a living makes
            its own argument before any case study loads, and that argument
            only holds if the thing is actually well made under the hood.
            Everything below this line is the evidence for that, laid out for
            whoever wants to check it.
          </p>
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">What&apos;s not finished</span>
          <h2 className="atw-section-heading">Text and numbers first. Screens after.</h2>
          <p className="atw-body">
            The product case studies here run on real prose and real numbers
            already; the screens and galleries behind them are still being
            built. That ordering was deliberate: finish what actually
            carries a hiring or investment decision, then layer in the
            visual polish.
          </p>
          <p className="atw-body">
            If a screenshot would settle something a paragraph can&apos;t,
            asking directly beats waiting for the gallery to ship. The work
            behind these numbers is real whether or not a screenshot is live
            yet.
          </p>
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">Voice</span>
          <h2 className="atw-section-heading">A documented voice, not a vibe.</h2>
          <p className="atw-body">
            The copy across this site follows a written guide, not
            instinct rewritten each time. Identity before job title. A point
            of view before the evidence that backs it. A number wherever an
            adjective was about to do the work instead.
          </p>
          <p className="atw-body">
            One rule did more editing than any other: no more than two
            consecutive sentences opening with &quot;I + verb&quot; in
            English, or &quot;Eu + verbo&quot; in Portuguese, a pattern that
            reads as flat and repetitive even when each sentence is fine on
            its own. A full pass through all six case studies went back and
            cut exactly that, along with an overused contrast pattern
            (&quot;not X, it&apos;s Y&quot;) that had crept into four of
            them. This paragraph followed the same rule while describing it.
          </p>
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">System</span>
          <h2 className="atw-section-heading">One serif for a point of view, one sans built to be read.</h2>
          <p className="atw-body">
            Two typefaces, chosen for opposite reasons. Atkinson Hyperlegible
            carries the body copy: designed by the Braille Institute with
            letterforms disambiguated for low-vision reading, chosen here
            because running text has to be read without effort, not admired.
            DM Serif Display carries the opposite job, reserved for wherever
            the page needs to state a position instead of transmit
            information.
          </p>
          <p className="atw-body">
            One accent color, one radius token, one spacing scale: the same
            restraint applied to color and space as to type. Two of the
            grays used for captions and dividers fall short of WCAG AA on
            their own and are restricted to exactly that, borders and
            low-emphasis labels, never running text. The full audit, tokens
            and all, is live at{" "}
            <Link href="/design-system" className="text-link text-link--light">/design-system</Link>.
          </p>
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">Workflow</span>
          <h2 className="atw-section-heading">One markdown vault, every projection.</h2>
          <p className="atw-body">
            The content pipeline is the part that actually took engineering,
            more than any animation. A single note in a personal knowledge
            vault turns into a human-readable page, a machine-readable route,
            and an entry in llms.txt, all from the same file.
          </p>
        </div>
        <div className="atw-steps">
          {pipelineSteps.map((s) => (
            <div key={s.step} className="atw-step">
              <span className="atw-step-number">{s.step}</span>
              <div>
                <p className="atw-step-label">{s.label}</p>
                <p className="atw-step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">Stack</span>
          <h2 className="atw-section-heading">Next.js on Vercel, nothing exotic.</h2>
          <p className="atw-body">
            No framework built in-house, no clever infra to show off. The
            interesting decisions live in what didn&apos;t get added: no
            headless CMS, no database, no auth layer for a site that has
            nothing to log into.
          </p>
        </div>
        <div className="atw-rows">
          {stackRows.map((r) => (
            <div key={r.term} className="atw-row">
              <span className="atw-row-term">{r.term}</span>
              <span className="atw-row-value">{r.value}</span>
              <p className="atw-row-desc">{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="atw-section">
        <div className="atw-section-inner">
          <span className="atw-section-label">SEO / GEO</span>
          <h2 className="atw-section-heading">Built to be read by crawlers and by models.</h2>
          <p className="atw-body">
            Search engines are one audience. Language models fetching the raw
            page are a different one, with different needs, and the site is
            structured for both instead of assuming they overlap.
          </p>
        </div>
        <div className="atw-rows">
          {seoRows.map((r) => (
            <div key={r.term} className="atw-row">
              <span className="atw-row-term">{r.term}</span>
              <span className="atw-row-value">{r.value}</span>
              <p className="atw-row-desc">{r.desc}</p>
            </div>
          ))}
        </div>
        <div className="atw-section-inner">
          <p className="atw-body" style={{ marginTop: "2.5rem" }}>Named in robots.txt:</p>
        </div>
        <div className="atw-tags">
          {crawlerTags.map((t) => (
            <span key={t} className="atw-tag">{t}</span>
          ))}
        </div>
      </section>

      <section className="atw-section" style={{ borderBottom: "none" }}>
        <div className="atw-section-inner">
          <span className="atw-section-label">Metrics</span>
          <h2 className="atw-section-heading">GA4 for people, a Sheet for machines.</h2>
          <p className="atw-body">
            GA4 tracks human visits site-wide, standard client-side script.
            But /llms.txt and /ai/* are force-static: nothing runs
            per-request in production, so GA4&apos;s JS never fires for
            whatever actually reads those routes, which is mostly curl,
            LLM tools and crawler bots, not browsers.
          </p>
          <p className="atw-body">
            A proxy intercepts exactly those two path patterns and fires an
            async POST before letting the static response through. That
            request authenticates as a Google service account by
            hand-signing its own JWT, no SDK dependency, and appends a row
            (timestamp, path, user-agent, referer, IP) to a Sheet. A daily
            job buckets the results by bot signature and writes a summary
            back into the vault. Two logging systems, because GA4 genuinely
            can&apos;t see the audience the other one is built for.
          </p>
        </div>
        <div className="atw-rows">
          <div className="atw-row">
            <span className="atw-row-term">Proxy</span>
            <span className="atw-row-value">proxy.ts</span>
            <p className="atw-row-desc">Next 16 renamed middleware.ts to proxy.ts. Matches /llms.txt and /ai/:path*, nothing else.</p>
          </div>
          <div className="atw-row">
            <span className="atw-row-term">Log endpoint</span>
            <span className="atw-row-value">/api/log-hit</span>
            <p className="atw-row-desc">Fire-and-forget, appends to Google Sheets via a hand-signed service-account JWT.</p>
          </div>
          <div className="atw-row">
            <span className="atw-row-term">GA4 property</span>
            <span className="atw-row-value">434221761</span>
            <p className="atw-row-desc">Covers every human page. Never fires on the two AI-facing routes above.</p>
          </div>
        </div>
      </section>

      <section className="atw-cross-link">
        <p className="atw-cross-link-lead">Curious about the operating system behind all of this?</p>
        <Link href="/how-i-work" className="atw-cross-link-title">
          See how I work <span aria-hidden="true">→</span>
        </Link>
      </section>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
