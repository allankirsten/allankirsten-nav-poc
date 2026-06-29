"use client";

import { useEffect, useLayoutEffect } from "react";
import gsap from "gsap";
import { BackButton } from "@/components/BackButton";
import { ImgFull } from "@/components/ImgFull";
import type { CaseContent } from "@/content/types";

const css = `
  .case-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }
  .case-hero {
    position: relative;
    z-index: 2;
    background: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100dvh;
    box-sizing: border-box;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vw, 5rem);
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
    margin-top: 2.5rem;
    margin-bottom: 2rem;
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
  }
  .case-metrics {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border-top: 1px solid #e5e5e5;
    margin-inline: calc(-1 * clamp(1.5rem, 6vw, 6rem));
    width: calc(100% + 2 * clamp(1.5rem, 6vw, 6rem));
  }
  .metric-cell {
    padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 6rem);
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }
  .metric-cell:nth-child(even) { border-right: none; }
  .metric-value {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    font-weight: 400;
    will-change: transform, opacity;
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
    padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    display: flex;
    flex-direction: column;
    gap: clamp(5rem, 10vw, 10rem);
  }
  .case-section { display: flex; flex-direction: column; gap: 1.5rem; max-width: 72ch; }
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
    height: auto;
    margin-top: 3rem;
    border: 1px solid #e8e8e8;
    border-radius: 3px;
  }
  .case-placeholder {
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 3rem clamp(1.5rem, 6vw, 6rem) 0;
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
    padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  }
  @media (min-width: 640px) {
    .case-metrics { grid-template-columns: repeat(4, 1fr); }
    .metric-cell { border-bottom: none; }
    .metric-cell:nth-child(even) { border-right: 1px solid #e5e5e5; }
    .metric-cell:last-child { border-right: none; }
  }
`;

export function CasePage({ content }: { content: CaseContent }) {
  const { hero, heroImage, metrics, sections, cta } = content;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(".case-title", { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, 0);
    tl.fromTo(".case-meta-item", { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out", stagger: 0.08 }, 0.45);
    tl.fromTo(".case-tagline", { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, 1.0);

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
        { opacity: 1, y: 0, borderColor: "#e5e5e5", duration: 0.7, ease: "power3.out" },
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

    return () => { tl.kill(); };
  }, [metrics]);

  return (
    <main className="case-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="case-hero">
        <h1 className="case-title" style={{ opacity: 0 }}>{hero.title}</h1>
        <div className="case-meta">
          {hero.meta.map((m) => (
            <div key={m.label} className="case-meta-item" style={{ opacity: 0 }}>
              <span className="case-meta-label">{m.label}</span>
              <span className="case-meta-value">{m.value}</span>
            </div>
          ))}
        </div>
        <p className="case-tagline" style={{ opacity: 0 }}>{hero.tagline}</p>

        <div className="case-metrics" style={{ borderTopColor: "rgba(229,229,229,0)" }}>
          {metrics.map((m) => (
            <div key={m.label} className="metric-cell" style={{ opacity: 0, borderColor: "rgba(229,229,229,0)" }}>
              <p className="metric-value">{m.count !== undefined ? `${m.prefix ?? ""}0${m.suffix ?? ""}` : m.display}</p>
              <p className="metric-label">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <ImgFull src={heroImage} />

      <div className="case-body">
        {sections.map((s, i) => (
          <div key={i}>
            <div className="case-section">
              <span className="section-label">{s.label}</span>
              <h2 className="section-heading">{s.heading}</h2>
              <p className="section-body">{s.body}</p>
            </div>
            {s.visualSrc ? (
              <img
                src={s.visualSrc}
                alt={s.visual ?? ""}
                className="case-visual-img"
              />
            ) : s.visual ? (
              <div className="case-placeholder">
                <span className="case-placeholder-label">Visual — {s.visual}</span>
              </div>
            ) : null}
          </div>
        ))}
      </div>

      <footer className="case-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "20ch" }}>
          {cta}
        </p>
      </footer>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
