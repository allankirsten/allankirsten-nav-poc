"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { BackButton } from "@/components/BackButton";
import { howIWorkContent } from "@/content/how-i-work";
import { renderWords, renderChars, getSubCharDelays } from "@/lib/textReveal";

const BIPA_CAST_URL = "https://www.youtube.com/watch?v=MF_56tmqwaU&list=PLa0LRF9MEUIrs5g-GSejXKvNiASj02Ngq&index=7";

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
    justify-content: center;
    padding: var(--section-px);
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .hiw-eyebrow {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
    margin-bottom: 2rem;
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
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
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
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
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
    padding: clamp(3rem, 6vw, 6rem) var(--section-px);
  }
  @media (min-width: 768px) {
    .process-step { grid-template-columns: 4rem 12rem 1fr; }
    .step-desc { margin-top: 0; }
  }
`;

export default function HowIWork() {
  const { tagline, pillars, process, cta } = howIWorkContent;

  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".hiw-title .word");
    const subChars = document.querySelectorAll<HTMLElement>(".hiw-tagline .sub-char");
    const subDelays = getSubCharDelays(tagline);

    gsap.fromTo(".hiw-eyebrow", { opacity: 0, y: -28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
    if (words.length) gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out", delay: 0.15 });
    if (subChars.length) gsap.fromTo(subChars, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: (i: number) => subDelays[i], duration: 0.6, ease: "power2.out", delay: 0.4 });
  }, [tagline]);

  return (
    <main className="hiw-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="hiw-hero">
        <span className="hiw-eyebrow">Method</span>
        <div>
          <h1 className="hiw-title">{renderWords("How I")}<br />{renderWords("Work.")}</h1>
          <p className="hiw-tagline">{renderChars(tagline)}</p>
        </div>
      </section>

      <section className="hiw-pillars">
        {pillars.map((p) => (
          <div key={p.number} className="pillar">
            <span className="pillar-number">{p.number}</span>
            <p className="pillar-word">{p.word}</p>
            <p className="pillar-headline">{p.headline}</p>
            <p className="pillar-body">
              {p.body}
              {p.number === "01" && (
                <>
                  {" "}Talked through a version of this on{" "}
                  <a href={BIPA_CAST_URL} target="_blank" rel="noopener noreferrer" className="text-link text-link--light">
                    Bipa Cast #74
                  </a>
                  , if podcasts are more your speed.
                </>
              )}
            </p>
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
