"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackButton } from "@/components/BackButton";

type Metric = {
  label: string;
  display: string;
  count?: number;
  prefix?: string;
  suffix?: string;
};

const metrics: Metric[] = [
  { display: "100×",  label: "User growth (40k to 4M)",   count: 100, suffix: "×" },
  { display: "$229M", label: "Exit valuation (EBANX)",     count: 229, prefix: "$", suffix: "M" },
  { display: "−60%",  label: "Delivery time, post-DS" },
  { display: "2 yr",  label: "Time leading product design", count: 2,  suffix: " yr" },
];

const sections = [
  {
    label: "01 — Context",
    heading: "A fintech growing faster than its own infrastructure.",
    body: `When I joined Remessa Online, the product was moving at a pace that the design process couldn't keep up with. Forty thousand active users, a small team, and a roadmap that kept expanding.

The mission was clear: make the product scale without losing quality. That meant solving both the near-term UX problems and the underlying structural ones — simultaneously.`,
  },
  {
    label: "02 — The Work",
    heading: "Redesign the experience. Then build the system that prevents the next redesign.",
    body: `I started by mapping the onboarding flow — the single highest-friction surface in the product. Three main drop-off points. Each one rooted in a different problem: copy that assumed too much, a flow that asked for information at the wrong moment, and a verification step that felt like a dead end.

After fixing the flow, I turned to the foundation. I built Remessa's first Design System from scratch: tokens, components, interaction patterns. The goal was to make future design decisions fast and consistent by default — not by convention.

The system reduced delivery time on new interfaces by 60%. More importantly, it gave the engineering team a shared language with design, which changed how we collaborated.`,
  },
  {
    label: "03 — Scale",
    heading: "From 40k to 4 million.",
    body: `Over two years, the user base grew 100x. The product shipped continuously — new corridors, new features, new markets — without accumulating the kind of design debt that usually comes with that pace.

The exit to EBANX at a $229M valuation closed while I was still at the company. The design system and the product foundations I built were part of what made that scale possible.`,
  },
];

const css = `
  .case-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }

  .case-hero {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: clamp(5rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem) clamp(3rem, 6vw, 5rem);
    border-bottom: 1px solid #e5e5e5;
  }

  .case-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 12vw, 11rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
    font-weight: 400;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .case-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    margin-top: 2.5rem;
    margin-bottom: 2rem;
  }

  .case-meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .case-meta-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
  }

  .case-meta-value {
    font-size: 0.875rem;
    color: #555;
  }

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
  }

  .metric-cell {
    padding: clamp(2rem, 5vw, 4rem) clamp(1.5rem, 6vw, 6rem);
    border-right: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
  }

  .metric-cell:nth-child(even) {
    border-right: none;
  }

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
    padding: clamp(4rem, 8vw, 8rem) clamp(1.5rem, 6vw, 6rem);
    display: flex;
    flex-direction: column;
    gap: clamp(5rem, 10vw, 10rem);
  }

  .case-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    max-width: 72ch;
  }

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

  .case-placeholder {
    background: #f7f7f7;
    border: 1px solid #e5e5e5;
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 clamp(1.5rem, 6vw, 6rem);
  }

  .case-placeholder-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #ccc;
  }

  .case-footer {
    border-top: 1px solid #e5e5e5;
    padding: clamp(3rem, 6vw, 6rem) clamp(1.5rem, 6vw, 6rem);
  }

  @media (min-width: 640px) {
    .case-metrics {
      grid-template-columns: repeat(4, 1fr);
    }
    .metric-cell {
      border-bottom: none;
    }
    .metric-cell:nth-child(even) {
      border-right: 1px solid #e5e5e5;
    }
    .metric-cell:last-child {
      border-right: none;
    }
  }
`;

export default function RemessaCase() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cells = document.querySelectorAll<HTMLElement>(".metric-cell");

    cells.forEach((cell, i) => {
      const valueEl = cell.querySelector<HTMLElement>(".metric-value");
      if (!valueEl) return;

      const m = metrics[i];

      gsap.fromTo(cell,
        { opacity: 0, y: 32 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "power3.out",
          delay: i * 0.08,
          scrollTrigger: {
            trigger: cell,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      if (m.count !== undefined) {
        const obj = { val: 0 };
        valueEl.textContent = (m.prefix ?? "") + "0" + (m.suffix ?? "");
        gsap.to(obj, {
          val: m.count,
          duration: 1.8,
          ease: "power2.out",
          delay: i * 0.08 + 0.15,
          onUpdate() {
            valueEl.textContent = (m.prefix ?? "") + Math.round(obj.val) + (m.suffix ?? "");
          },
          scrollTrigger: {
            trigger: cell,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <main className="case-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="case-hero">
        <h1 className="case-title">Remessa<br />Online.</h1>

        <div className="case-meta">
          {[
            { label: "Company",  value: "Remessa Online" },
            { label: "Role",     value: "Lead Product Designer" },
            { label: "Year",     value: "2021–2022" },
            { label: "Sector",   value: "Fintech / FX" },
          ].map((m) => (
            <div key={m.label} className="case-meta-item">
              <span className="case-meta-label">{m.label}</span>
              <span className="case-meta-value">{m.value}</span>
            </div>
          ))}
        </div>

        <p className="case-tagline">
          From 40 thousand to 4 million users. One redesign, one design system, two years.
        </p>
      </section>

      <div className="case-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="metric-cell">
            <p className="metric-value">{m.display}</p>
            <p className="metric-label">{m.label}</p>
          </div>
        ))}
      </div>

      <div className="case-body">
        {sections.map((s, i) => (
          <div key={i}>
            <div className="case-section">
              <span className="section-label">{s.label}</span>
              <h2 className="section-heading">{s.heading}</h2>
              <p className="section-body">{s.body}</p>
            </div>

            {i === 0 && (
              <div className="case-placeholder" style={{ marginTop: "3rem" }}>
                <span className="case-placeholder-label">Visual — Onboarding flow mapping</span>
              </div>
            )}
            {i === 1 && (
              <div className="case-placeholder" style={{ marginTop: "3rem" }}>
                <span className="case-placeholder-label">Visual — Design System components</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <footer className="case-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "20ch" }}>
          Got a product that needs this kind of work?
        </p>
      </footer>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
