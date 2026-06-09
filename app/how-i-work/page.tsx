"use client";

import { BackButton } from "@/components/BackButton";
import { howIWorkContent } from "@/content/how-i-work";

const css = `
  .hiw-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }
  .hiw-hero {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: clamp(4rem, 8vw, 6rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vw, 5rem);
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .hiw-eyebrow {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
  }
  .hiw-title {
    font-family: var(--font-display);
    font-size: clamp(4rem, 14vw, 11rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
    font-weight: 400;
  }
  .hiw-tagline {
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 300;
    color: #777;
    margin-top: 2.5rem;
    max-width: 52ch;
    line-height: 1.5;
  }
  .hiw-pillars {
    padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    display: flex;
    flex-direction: column;
  }
  .pillar {
    padding: clamp(3rem, 6vw, 5rem) 0;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 80ch;
  }
  .pillar:first-child { padding-top: 0; }
  .pillar-number { font-size: 0.625rem; letter-spacing: 0.2em; text-transform: uppercase; color: #aaa; }
  .pillar-word {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 6.5rem);
    line-height: 0.9;
    letter-spacing: -0.02em;
    font-weight: 400;
  }
  .pillar-headline {
    font-size: clamp(1.125rem, 2.5vw, 1.5rem);
    font-weight: 300;
    line-height: 1.3;
    color: #222;
    max-width: 52ch;
  }
  .pillar-body {
    font-size: 1.0625rem;
    line-height: 1.7;
    font-weight: 300;
    color: #555;
    white-space: pre-line;
    max-width: 64ch;
  }
  .hiw-process {
    border-top: 1px solid #e5e5e5;
    padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
  }
  .process-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 3rem;
    display: block;
  }
  .process-step {
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1.5rem;
    align-items: baseline;
    padding: 1.25rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  .process-step:last-child { border-bottom: none; }
  .step-number { font-size: 0.625rem; letter-spacing: 0.15em; color: #ccc; font-family: monospace; }
  .step-label {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 3vw, 2rem);
    font-weight: 400;
    line-height: 1;
    letter-spacing: -0.01em;
  }
  .step-desc {
    font-size: 0.9375rem;
    font-weight: 300;
    color: #888;
    line-height: 1.5;
    margin-top: 0.25rem;
    max-width: 56ch;
  }
  .hiw-footer {
    border-top: 1px solid #e5e5e5;
    padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  }
  @media (min-width: 768px) {
    .process-step { grid-template-columns: 4rem 12rem 1fr; }
    .step-desc { margin-top: 0; }
  }
`;

export default function HowIWork() {
  const { tagline, pillars, process, cta } = howIWorkContent;

  return (
    <main className="hiw-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="hiw-hero">
        <span className="hiw-eyebrow">Method</span>
        <div>
          <h1 className="hiw-title">How I<br />Work.</h1>
          <p className="hiw-tagline">{tagline}</p>
        </div>
      </section>

      <section className="hiw-pillars">
        {pillars.map((p) => (
          <div key={p.number} className="pillar">
            <span className="pillar-number">{p.number}</span>
            <p className="pillar-word">{p.word}</p>
            <p className="pillar-headline">{p.headline}</p>
            <p className="pillar-body">{p.body}</p>
          </div>
        ))}
      </section>

      <section className="hiw-process">
        <span className="process-label">The process</span>
        <div>
          {process.map((s) => (
            <div key={s.step} className="process-step">
              <span className="step-number">{s.step}</span>
              <div>
                <p className="step-label">{s.label}</p>
                <p className="step-desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="hiw-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "22ch" }}>
          {cta}
        </p>
      </footer>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
