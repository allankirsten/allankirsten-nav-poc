"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BackButton } from "@/components/BackButton";

type Metric = {
  label: string;
  display: string;   // what renders initially / for non-numeric
  count?: number;    // target for count-up
  suffix?: string;   // appended after number during animation
};

const metrics: Metric[] = [
  { display: "0→1",  label: "Product built from scratch" },
  { display: "8 mo", label: "From brief to live product", count: 8,  suffix: " mo" },
  { display: "3",    label: "Pivots absorbed mid-build",  count: 3,  suffix: "" },
  { display: "1",    label: "Designer. End to end.",      count: 1,  suffix: "" },
];

const sections = [
  {
    label: "01 — Context",
    heading: "A startup with a sharp idea and no product.",
    body: `Bipa came to me at zero. No interface, no design language, no component library — just a vision for a B2B payments tool that would make financial reconciliation less painful for small businesses in Brazil.

The brief was open. The deadline wasn't. Eight months to go from whiteboard to live product, with a founding team that was figuring out the business model in parallel.`,
  },
  {
    label: "02 — The Problem",
    heading: "Speed without chaos.",
    body: `Startups at this stage face a specific trap: moving fast produces inconsistency, and inconsistency compounds into debt that slows everything down later.

My job was to build fast enough to ship in eight months while laying foundations solid enough to survive the company's next two years. Design system first, product second — even though both had to happen at the same time.`,
  },
  {
    label: "03 — What I Did",
    heading: "System, product, strategy. In that order.",
    body: `I started with the token layer — color, type, spacing — before drawing a single screen. With that foundation, every component I built after was consistent by default, not by review.

From there, I mapped the core flows: onboarding, payment creation, approval chain, reconciliation view. Three pivots happened mid-build. Because the system was modular, each pivot cost days, not months.

I also ran discovery sessions with the founding team to pressure-test assumptions before they became shipped features. Two features were killed before they were built. That's the work that doesn't show up in a portfolio but saves a company.`,
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

  .case-title {
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 14rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
    font-weight: 400;
    overflow-wrap: break-word;
    word-break: break-word;
  }

  .case-tagline {
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 300;
    color: #777;
    margin-top: 2.5rem;
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
    display: flex;
    flex-direction: column;
    gap: 3rem;
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

export default function BipaCase() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cells = document.querySelectorAll<HTMLElement>(".metric-cell");

    cells.forEach((cell, i) => {
      const valueEl = cell.querySelector<HTMLElement>(".metric-value");
      if (!valueEl) return;

      const m = metrics[i];

      // Slide-up + fade in for every cell (staggered)
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

      // Count-up for numeric metrics
      if (m.count !== undefined) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: m.count,
          duration: 1.6,
          ease: "power2.out",
          delay: i * 0.08 + 0.15,
          onUpdate() {
            const rounded = Math.round(obj.val);
            valueEl.textContent = rounded + (m.suffix ?? "");
          },
          scrollTrigger: {
            trigger: cell,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
        // Start at zero so count-up begins from scratch
        valueEl.textContent = "0" + (m.suffix ?? "");
      }
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <main className="case-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      {/* Hero */}
      <section className="case-hero">
        <h1 className="case-title">Bipa.</h1>

        <div className="case-meta">
          {[
            { label: "Company", value: "Bipa" },
            { label: "Role", value: "Lead Product Designer" },
            { label: "Year", value: "2022–2023" },
            { label: "Sector", value: "B2B Fintech" },
          ].map((m) => (
            <div key={m.label} className="case-meta-item">
              <span className="case-meta-label">{m.label}</span>
              <span className="case-meta-value">{m.value}</span>
            </div>
          ))}
        </div>

        <p className="case-tagline">
          Building a B2B payments product from zero — in eight months, through three pivots, as the only designer.
        </p>
      </section>

      {/* Metrics */}
      <div className="case-metrics">
        {metrics.map((m) => (
          <div key={m.label} className="metric-cell">
            <p className="metric-value">{m.display}</p>
            <p className="metric-label">{m.label}</p>
          </div>
        ))}
      </div>

      {/* Body sections */}
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
                <span className="case-placeholder-label">Visual — Discovery artifacts</span>
              </div>
            )}
            {i === 2 && (
              <div className="case-placeholder" style={{ marginTop: "3rem" }}>
                <span className="case-placeholder-label">Visual — Core product screens</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="case-footer">
        <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 5vw, 3.5rem)", lineHeight: 1, fontWeight: 400, color: "#000", maxWidth: "20ch" }}>
          Got a product that needs this kind of work?
        </p>
      </footer>

      <BackButton fallback="/" label="Home" />
    </main>
  );
}
