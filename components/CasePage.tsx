"use client";

import { useEffect, useLayoutEffect } from "react";
import type { CSSProperties } from "react";
import Link from "next/link";
import gsap from "gsap";
import { BackButton } from "@/components/BackButton";
import { CoverImage } from "@/components/CoverImage";
import { ImageGallery } from "@/components/ImageGallery";
import { renderChars, charRevealVars } from "@/lib/textReveal";
import type { CaseContent } from "@/content/types";
import type { CaseNavItem } from "@/lib/caseContent";

const css = `
  .case-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }
  .case-hero {
    --hero-pb: clamp(3rem, 6vw, 5rem);
    position: relative;
    z-index: 2;
    background: #fff;
    display: flex;
    flex-direction: column;
    min-height: 100dvh;
    box-sizing: border-box;
    padding: clamp(5rem, 10vw, 8rem) var(--section-px) var(--hero-pb);
  }
  @media (max-width: 639px) {
    .case-hero { padding-top: 7.65rem; }
  }
  .case-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 12vw, 11rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
    font-weight: 400;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-line;
  }
  .case-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 3rem;
  }
  .case-meta-item { display: flex; flex-direction: column; gap: 0.25rem; }
  .case-meta-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
  }
  .case-meta-value { font-size: 0.875rem; color: #555; }
  .case-tagline {
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 300;
    color: #777;
    max-width: 52ch;
    line-height: 1.5;
    letter-spacing: 0.02em;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-content: center;
  }
  @media (max-width: 639px) {
    .case-tagline {
      font-size: 1.375rem;
      color: #555;
      min-height: 240px;
    }
  }
  .case-metrics {
    display: grid;
    grid-template-columns: 1fr;
    border-top: 1px solid #e5e5e5;
    margin-inline: calc(-1 * var(--section-px));
    margin-bottom: calc(-1 * var(--hero-pb));
    width: calc(100% + 2 * var(--section-px));
  }
  .metric-cell {
    padding: clamp(1.5rem, 4vw, 2.5rem) var(--section-px);
    border-bottom: 1px solid #e5e5e5;
  }
  .metric-cell:last-child { border-bottom: none; }
  .metric-value {
    font-family: var(--font-display);
    font-size: clamp(1.375rem, 1.8vw, 2rem);
    line-height: 1.25;
    letter-spacing: -0.01em;
    font-weight: 400;
  }
  .metric-label {
    font-size: 0.75rem;
    font-weight: 300;
    color: #888;
    margin-top: 0.75rem;
    letter-spacing: 0.05em;
    line-height: 1.4;
  }
  .case-body {
    position: relative;
    z-index: 2;
    background: #fff;
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
    display: flex;
    flex-direction: column;
    gap: clamp(5rem, 10vw, 10rem);
  }
  .case-section { display: flex; flex-direction: column; gap: 2rem; max-width: 72ch; }
  .section-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
  }
  .section-heading {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.75rem);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
  }
  @media (max-width: 639px) {
    .section-heading { margin-top: 2rem; }
  }
  .section-body {
    font-size: 1.0625rem;
    line-height: 1.7;
    font-weight: 300;
    color: #555;
    white-space: pre-line;
  }
  .case-visual-img {
    display: block;
    width: 100%;
    margin-top: 4rem;
  }
  .case-visual-img img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
  }
  .case-placeholder {
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 4rem 0 0;
  }
  .case-placeholder-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ccc;
  }
  .case-footer {
    position: relative;
    z-index: 2;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    padding: clamp(3rem, 6vw, 6rem) var(--section-px);
  }
  .case-crosslinks {
    position: relative;
    z-index: 2;
    background: #fff;
    border-top: 1px solid #e5e5e5;
    display: grid;
    grid-template-columns: 1fr;
  }
  .crosslink {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: clamp(2rem, 5vw, 3.5rem) var(--section-px);
    text-decoration: none;
    color: inherit;
    transition: background 0.3s ease;
  }
  .crosslink:hover { background: #f7f7f7; }
  .crosslink--prev { border-bottom: 1px solid #e5e5e5; }
  .crosslink-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
  }
  .crosslink--next .crosslink-label { justify-content: flex-end; }
  .crosslink-title {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 3rem);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
  }
  .crosslink--next .crosslink-title { text-align: right; }
  @media (min-width: 640px) {
    .case-crosslinks { grid-template-columns: 1fr 1fr; }
    .crosslink--prev { border-bottom: none; border-right: 1px solid #e5e5e5; }
  }
  @media (min-width: 640px) {
    .case-metrics { grid-template-columns: repeat(var(--metrics-count), 1fr); }
    .metric-cell { border-bottom: none; border-right: 1px solid #e5e5e5; }
    .metric-cell:last-child { border-right: none; }
  }
`;

type CaseNav = { prev: CaseNavItem; next: CaseNavItem };

export function CasePage({ content, nav }: { content: CaseContent; nav?: CaseNav }) {
  const { hero, heroImage, heroImageMobile, metrics, sections, gallery, cta } = content;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(".case-title", { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0);
    tl.fromTo(".case-meta-item", { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }, 0.45);

    tl.fromTo(".case-metrics", { borderTopColor: "rgba(229,229,229,0)" },
      { borderTopColor: "#e5e5e5", duration: 0.5, ease: "power1.out" }, 1.2);

    const cells = document.querySelectorAll<HTMLElement>(".metric-cell");
    cells.forEach((cell, i) => {
      const valueEl = cell.querySelector<HTMLElement>(".metric-value");
      if (!valueEl) return;

      const m = metrics[i];
      const start = 1.2 + i * 0.08;

      tl.fromTo(cell,
        { opacity: 0, y: 32, borderColor: "rgba(229,229,229,0)" },
        { opacity: 1, y: 0, borderColor: "#e5e5e5", duration: 0.7, ease: "power3.out", clearProps: "transform" },
        start
      );

      if (m.count !== undefined) {
        const obj = { val: 0 };
        tl.to(obj, {
          val: m.count, duration: 1.4, ease: "sine.out",
          onUpdate() {
            valueEl.textContent = (m.prefix ?? "") + Math.round(obj.val) + (m.suffix ?? "");
          },
        }, start + 0.15);
      }
    });

    // Tagline reveals last, after every metric has entered — same
    // char-by-char cadence as the home hero's subtext.
    const metricsEnd = 1.2 + Math.max(0, metrics.length - 1) * 0.08 + 0.7;
    const subChars = document.querySelectorAll<HTMLElement>(".case-tagline .sub-char");
    if (subChars.length) {
      const { from, to } = charRevealVars(hero.tagline);
      tl.fromTo(subChars, from, to, metricsEnd + 0.1);
    }

    return () => { tl.kill(); };
  }, [metrics, hero.tagline]);

  return (
    <main className="case-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="case-hero">
        <div className="case-heading-group">
          <h1 className="case-title" style={{ opacity: 0 }}>{hero.title}</h1>
          <div className="case-meta">
            {hero.meta.map((m) => (
              <div key={m.label} className="case-meta-item" style={{ opacity: 0 }}>
                <span className="case-meta-label">{m.label}</span>
                <span className="case-meta-value">{m.value}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="case-tagline">{renderChars(hero.tagline)}</p>

        <div
          className="case-metrics"
          style={{ borderTopColor: "rgba(229,229,229,0)", "--metrics-count": metrics.length } as CSSProperties}
        >
          {metrics.map((m) => (
            <div key={m.label} className="metric-cell" style={{ opacity: 0, borderColor: "rgba(229,229,229,0)" }}>
              <p className="metric-value">{m.count !== undefined ? `${m.prefix ?? ""}0${m.suffix ?? ""}` : m.display}</p>
              <p className="metric-label">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CoverImage src={heroImage} srcMobile={heroImageMobile} />

      <div className="case-body">
        {sections.map((s, i) => (
          <div key={i}>
            <div className="case-section">
              <span className="section-label">{s.label}</span>
              <h2 className="section-heading">{s.heading}</h2>
              <p className="section-body">{s.body}</p>
            </div>
            {s.visualSrc ? (
              <picture className="case-visual-img">
                {s.visualSrcMobile ? (
                  <source
                    media="(max-width: 639px)"
                    srcSet={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${s.visualSrcMobile}`}
                  />
                ) : null}
                <img src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${s.visualSrc}`} alt={s.visual ?? ""} />
              </picture>
            ) : s.visual ? (
              <div className="case-placeholder">
                <span className="case-placeholder-label">Visual: {s.visual}</span>
              </div>
            ) : null}
          </div>
        ))}

        {gallery && gallery.length > 0 ? <ImageGallery images={gallery} /> : null}
      </div>

      {nav ? (
        <nav className="case-crosslinks" aria-label="Other cases">
          <Link href={`/cases/${nav.prev.slug}`} className="crosslink crosslink--prev">
            <span className="crosslink-label">← Previous case</span>
            <span className="crosslink-title">{nav.prev.title}</span>
          </Link>
          <Link href={`/cases/${nav.next.slug}`} className="crosslink crosslink--next">
            <span className="crosslink-label">Next case →</span>
            <span className="crosslink-title">{nav.next.title}</span>
          </Link>
        </nav>
      ) : null}

      <footer className="case-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "20ch" }}>
          {cta}
        </p>
      </footer>

      <BackButton fallback="/" forceFallback />
    </main>
  );
}
