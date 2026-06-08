"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const frames = [
  { id: "abertura",      label: "01", title: "Design doesn't decorate. Design decides.",      sub: "A belief, not a tagline.",            bg: "#000", text: "#fff" },
  { id: "provocacao",    label: "02", title: "Most designers ship screens. I ship businesses.", sub: "20+ years of proof.",                bg: "#fff", text: "#000" },
  { id: "identidade",    label: "03", title: "Two decades. Two exits. One craft.",             sub: "Design as a multiplier.",             bg: "#000", text: "#fff" },
  { id: "prova",         label: "04", title: "Remessa Online. Bipa. Betterfly.",               sub: "From seed to scale.",                 bg: "#fff", text: "#000" },
  { id: "metodo",        label: "05", title: "Clarity. Velocity. Impact.",                     sub: "How I work, every time.",             bg: "#000", text: "#fff" },
  { id: "credibilidade", label: "06", title: "$229M exit. 4M users. One designer.",            sub: "Results, not résumé.",                bg: "#fff", text: "#000" },
  { id: "desfecho",      label: "07", title: "Are you building something that matters?",       sub: "Let's talk.",                         bg: "#000", text: "#fff" },
];


export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Altura real do frame — 100dvh pode diferir de window.innerHeight em mobile
    const firstFrame = document.getElementById(frames[0].id);
    const fh = firstFrame?.offsetHeight || window.innerHeight;
    document.documentElement.style.setProperty("--frame-h", `${fh}px`);

    frames.forEach((_, i) => {
      const frameEl = document.getElementById(frames[i].id);
      if (!frameEl) return;

      const textBlock = frameEl.querySelector<HTMLElement>(".frame-text");
      const words = frameEl.querySelectorAll<HTMLElement>(".word");
      const frameStart = i * fh;

      // Parallax invertido: texto deriva para baixo (+40px), afastando do frame que sobe
      if (textBlock) {
        gsap.fromTo(textBlock,
          { y: 0 },
          {
            y: 40,
            ease: "none",
            scrollTrigger: { start: frameStart, end: frameStart + fh, scrub: 1 },
          }
        );
      }

      if (!words.length) return;

      const sub = frameEl.querySelector<HTMLElement>(".frame-sub");
      const wordDelay = words.length * 0.09 + 0.15;

      // Frame 0: dispara direto no mount
      if (i === 0) {
        gsap.fromTo(words,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 1.0, ease: "power3.out" }
        );
        if (sub) gsap.fromTo(sub, { opacity: 0, y: 16 },
          { opacity: 0.5, y: 0, duration: 0.7, ease: "power3.out", delay: wordDelay }
        );
        return;
      }

      // Frames 1-6
      gsap.fromTo(words,
        { opacity: 0, y: 40, scale: 0.96 },
        {
          opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 1.0, ease: "power3.out",
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        }
      );
      if (sub) gsap.fromTo(sub, { opacity: 0, y: 16 },
        {
          opacity: 0.5, y: 0, duration: 0.7, ease: "power3.out", delay: wordDelay,
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <main style={{ overflowX: "hidden" }}>
      {frames.map((frame, i) => (
        <div
          key={frame.id}
          id={frame.id}
          style={{
            position: "sticky",
            top: 0,
            height: "100dvh",
            background: frame.bg,
            zIndex: i + 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
          }}
        >
          {/* text block — camada de parallax */}
          <div
            className="frame-text"
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100%",
              maxWidth: "80ch",
              boxSizing: "border-box",
              willChange: "transform",
            }}
          >
            <span
              className="frame-label"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-caption)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: frame.text,
                marginBottom: "1.5rem",
                display: "block",
              }}
            >
              {frame.label}
            </span>

            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-display)",
                lineHeight: "var(--text-display--line-height)",
                fontWeight: 400,
                color: frame.text,
                letterSpacing: "-0.01em",
                maxWidth: "14ch",
                textAlign: "left",
              }}
            >
              {frame.title.split(" ").map((word, wi, arr) => (
                <span
                  key={wi}
                  className="word"
                  style={{
                    display: "inline-block",
                    marginRight: wi < arr.length - 1 ? "0.28em" : 0,
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <p
              className="frame-sub"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "var(--text-caption)",
                fontWeight: 300,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: frame.text,
                opacity: 0.5,
                marginTop: "2rem",
                textAlign: "left",
              }}
            >
              {frame.sub}
            </p>
          </div>
        </div>
      ))}
    </main>
  );
}
