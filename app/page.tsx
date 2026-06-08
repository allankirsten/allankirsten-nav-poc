"use client";

import { useEffect, useRef } from "react";

const frames = [
  { id: "abertura",      label: "01", title: "Design não decora. Design decide.",                          bg: "#0D0D0D", text: "#F5F0E8" },
  { id: "provocacao",    label: "02", title: "A maioria dos designers entrega telas. Eu entrego negócios.", bg: "#E07B5A", text: "#0D0D0D" },
  { id: "identidade",    label: "03", title: "Nome + arquétipo. Minha trajetória →",                       bg: "#5A7BE0", text: "#0D0D0D" },
  { id: "prova",         label: "04", title: "Cases: Remessa Online / Bipa / Foodastic",                   bg: "#5ABA8A", text: "#0D0D0D" },
  { id: "metodo",        label: "05", title: "Clareza. Velocidade. Impacto.",                              bg: "#C8A96E", text: "#0D0D0D" },
  { id: "credibilidade", label: "06", title: "20+ anos / 2 exits / métricas reais.",                       bg: "#B05AB5", text: "#0D0D0D" },
  { id: "desfecho",      label: "07", title: "Você está construindo algo que importa?",                    bg: "#E8C547", text: "#0D0D0D" },
];

// CSS Scroll-Driven Animations — roda no compositor thread (iOS 18+, Chrome 115+)
const scrollCSS = `
  @supports (animation-timeline: scroll()) {
    [id^="overlay-"] {
      animation-name: fadeToBlack;
      animation-duration: auto;
      animation-timing-function: linear;
      animation-fill-mode: both;
      animation-timeline: scroll(root block);
    }
    ${frames.slice(0, -1).map((_, i) => `
      #overlay-${i} {
        animation-range-start: calc(${i} * var(--frame-h, 100dvh));
        animation-range-end: calc(${i} * var(--frame-h, 100dvh) + var(--frame-h, 100dvh) * 0.6);
      }
    `).join("")}
  }
`;

export default function Home() {
  const overlaysRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--frame-h", `${vh}px`);

    // RAF fallback para browsers sem scroll-driven animations (iOS < 18)
    if (CSS.supports("animation-timeline", "scroll()")) return;

    let raf: number;
    const update = () => {
      const sy = window.scrollY;
      for (let i = 0; i < frames.length - 1; i++) {
        const el = overlaysRef.current[i];
        if (!el) continue;
        const start = i * vh;
        const end = start + vh * 0.6;
        el.style.opacity = String(Math.max(0, Math.min(1, (sy - start) / (end - start))));
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main>
      <style dangerouslySetInnerHTML={{ __html: scrollCSS }} />

      {frames.map((frame, i) => (
        <div
          key={frame.id}
          id={frame.id}
          className="relative flex flex-col items-center justify-center px-8"
          style={{
            position: "sticky",
            top: 0,
            height: "100dvh",
            background: frame.bg,
            zIndex: i + 1,
          }}
        >
          {i < frames.length - 1 && (
            <div
              id={`overlay-${i}`}
              ref={(el) => { if (el) overlaysRef.current[i] = el; }}
              style={{
                position: "absolute",
                inset: 0,
                backgroundColor: "#000",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />
          )}

          <span
            className="relative z-10 text-sm tracking-widest mb-6"
            style={{ color: frame.text, opacity: 0.4 }}
          >
            [{frame.label}]
          </span>
          <h2
            className="relative z-10 text-center max-w-2xl"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 400,
              color: frame.text,
              letterSpacing: "-0.02em",
              lineHeight: 0.95,
            }}
          >
            {frame.title}
          </h2>
        </div>
      ))}
    </main>
  );
}
