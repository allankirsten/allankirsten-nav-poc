"use client";

import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/content/types";

const css = `
  .testimonial-track {
    display: flex;
    justify-content: flex-start;
    gap: 2.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: clamp(2rem, 8vw, 8rem);
    scrollbar-width: none;
    padding: 0 clamp(2rem, 8vw, 8rem) 0.5rem;
  }
  .testimonial-track::-webkit-scrollbar { display: none; }
  .testimonial-card {
    flex: 0 0 auto;
    scroll-snap-align: start;
    width: clamp(300px, 75vw, 460px);
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
    box-sizing: border-box;
  }
`;

export function TestimonialsFrame({
  testimonials,
  label,
  text,
}: {
  testimonials: Testimonial[];
  label: string;
  text: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const items = testimonials.slice(0, 5);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActive = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>(".testimonial-card"));
      const center = track.getBoundingClientRect().left + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const dist = Math.abs(r.left + r.width / 2 - center);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActive(closest);
    };

    updateActive();
    track.addEventListener("scroll", updateActive, { passive: true });
    return () => track.removeEventListener("scroll", updateActive);
  }, []);

  const goTo = (i: number) => {
    const track = trackRef.current;
    const card = track?.querySelectorAll<HTMLElement>(".testimonial-card")[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div
      className="frame-text"
      style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        willChange: "transform",
        gap: "2.5rem",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div style={{ paddingLeft: "clamp(1.5rem, 6vw, 6rem)" }}>
        <span
          className="frame-label"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-caption)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: text,
            display: "block",
          }}
        >
          {label}
        </span>
      </div>

      <div ref={trackRef} className="testimonial-track">
        {items.map((t, i) => (
          <div key={i} className="testimonial-card">
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "3.5rem",
                lineHeight: 1,
                color: "var(--accent)",
                opacity: 0.5,
              }}
            >
              “
            </span>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                lineHeight: 1.25,
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: text,
                marginTop: "-1.5rem",
              }}
            >
              {t.quote}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.04em",
                  color: text,
                }}
              >
                {t.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.04em",
                  color: text,
                  opacity: 0.5,
                }}
              >
                {t.role}, {t.company}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir para depoimento ${i + 1}`}
            onClick={() => goTo(i)}
            style={{
              width: i === active ? "8px" : "6px",
              height: i === active ? "8px" : "6px",
              borderRadius: "50%",
              background: i === active ? "var(--accent)" : text,
              opacity: i === active ? 1 : 0.3,
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
