"use client";

import { BackButton } from "@/components/BackButton";

const pillars = [
  {
    number: "01",
    word: "Clarity.",
    headline: "The most expensive thing in product is building the wrong thing clearly.",
    body: `Before I open Figma, I need to understand the actual problem. Not the symptom, not the feature request — the underlying gap between where the business is and where it needs to be.

This means asking uncomfortable questions early. Who is this for, really? What does success look like in numbers? What happens if we do nothing? Most projects skip this phase because it feels slow. It's the opposite: it's the only thing that makes everything else fast.

Clarity also means alignment. Design decisions made without shared understanding get revisited, revised, and relitigated. I work to make the problem legible to everyone in the room before any solution is proposed.`,
  },
  {
    number: "02",
    word: "Velocity.",
    headline: "Speed is a design principle, not a trade-off.",
    body: `Moving fast is a skill. It requires systems, not shortcuts.

I build with reuse in mind from day one — tokens, components, patterns that compound over time. When the design system is right, new surfaces take hours instead of weeks. When it's wrong, every new screen is a negotiation.

Velocity also means making decisions under uncertainty without freezing. I default to testable assumptions over perfect specifications. A prototype that fails in week two is worth more than a spec that fails in production.

The teams I work with ship faster after I join — not because I work harder, but because I reduce the friction between idea and execution.`,
  },
  {
    number: "03",
    word: "Impact.",
    headline: "Design that doesn't move a number doesn't matter.",
    body: `I measure my work the way the business measures its work: users retained, revenue converted, support tickets not filed, decisions made faster.

This means being present in the conversations where product strategy is made — not as an executor, but as a co-author. The best design decisions I've made happened before any wireframe existed, in a meeting where I asked the right question at the right time.

Impact also accumulates. The design systems I've built are still running products I left years ago. The research frameworks I established became standard practice. Good design work has leverage — it keeps paying after you're gone.`,
  },
];

const process = [
  { step: "01", label: "Diagnose", desc: "Understand the real problem. Audit the existing product. Align on what success looks like." },
  { step: "02", label: "Frame",    desc: "Define scope and principles. What are we building and, as importantly, what aren't we." },
  { step: "03", label: "System",   desc: "Establish the design foundation before building surfaces. Tokens, components, patterns." },
  { step: "04", label: "Build",    desc: "Design, prototype, test. Iterate fast. Keep the feedback loop tight." },
  { step: "05", label: "Ship",     desc: "Handoff with precision. QA the implementation. The design isn't done until it's live correctly." },
  { step: "06", label: "Learn",    desc: "Measure against the original hypothesis. Feed learning into the next cycle." },
];

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
    margin-bottom: 2rem;
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

  .pillar:first-child {
    padding-top: 0;
  }

  .pillar-number {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
  }

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

  .process-steps {
    display: flex;
    flex-direction: column;
  }

  .process-step {
    display: grid;
    grid-template-columns: 2rem 1fr;
    gap: 1.5rem;
    align-items: baseline;
    padding: 1.25rem 0;
    border-bottom: 1px solid #f0f0f0;
  }

  .process-step:last-child {
    border-bottom: none;
  }

  .step-number {
    font-size: 0.625rem;
    letter-spacing: 0.15em;
    color: #ccc;
    font-family: monospace;
  }

  .step-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

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
    .process-step {
      grid-template-columns: 4rem 12rem 1fr;
    }
    .step-desc {
      margin-top: 0;
    }
  }
`;

export default function HowIWork() {
  return (
    <main className="hiw-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="hiw-hero">
        <span className="hiw-eyebrow">Method</span>
        <h1 className="hiw-title">How I<br />Work.</h1>
        <p className="hiw-tagline">
          Three principles I've never shipped a good product without. Applied the same way at a seed-stage startup and a company with four million users.
        </p>
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
        <div className="process-steps">
          {process.map((s) => (
            <div key={s.step} className="process-step">
              <span className="step-number">{s.step}</span>
              <div className="step-content">
                <span className="step-label">{s.label}</span>
                <span className="step-desc">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="hiw-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "22ch" }}>
          Want to see this in practice?
        </p>
      </footer>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
