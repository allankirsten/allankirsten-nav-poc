"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frames } from "@/content/frames";
import { testimonials } from "@/content/testimonials";
import { TestimonialsFrame } from "@/components/TestimonialsFrame";
import { ContactFrame } from "@/components/ContactFrame";
import type { Frame, Testimonial } from "@/content/types";

type HomeSection =
  | { kind: "frame"; frame: Frame }
  | { kind: "testimonials"; id: string; label: string; bg: string; text: string; testimonials: Testimonial[] }
  | { kind: "contact"; id: string; label: string; bg: string; text: string };

// Testimonials slot in right after the credibility frame, before the closing CTA.
const credIdx = frames.findIndex((f) => f.id === "credibilidade");
const homeSections: HomeSection[] = [
  ...frames.slice(0, credIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "testimonials" as const, id: "depoimentos", label: "07", bg: "#000", text: "#fff", testimonials },
  ...frames.slice(credIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "contact" as const, id: "contato", label: "09", bg: "#fff", text: "#000" },
];

// Breaks title into segments, grouping multi-word linked phrases together.
function parseTitle(title: string, links?: Record<string, string>) {
  const words = title.split(" ");
  const segments: { words: string[]; href?: string }[] = [];
  let i = 0;
  while (i < words.length) {
    let matched = false;
    if (links) {
      // Try longest phrase first to avoid partial matches
      const phrases = Object.keys(links).sort((a, b) => b.split(" ").length - a.split(" ").length);
      for (const phrase of phrases) {
        const pWords = phrase.split(" ");
        if (words.slice(i, i + pWords.length).join(" ") === phrase) {
          segments.push({ words: pWords, href: links[phrase] });
          i += pWords.length;
          matched = true;
          break;
        }
      }
    }
    if (!matched) {
      segments.push({ words: [words[i]] });
      i++;
    }
  }
  return segments;
}

// Splits text into individual char spans for letter-by-letter reveal animations.
function renderChars(text: string) {
  return text.split("").map((ch, i) => (
    <span key={i} className="sub-char" style={{ display: "inline-block", whiteSpace: "pre" }}>
      {ch}
    </span>
  ));
}

// Renders a title's words as spans, grouping linked phrases into <Link> elements.
function renderTitleWords(frame: Frame, onLinkClick: () => void) {
  const segments = parseTitle(frame.title, frame.links);
  const totalWords = frame.title.split(" ").length;
  let globalIdx = 0;
  return segments.map((seg, si) => {
    const wordSpans = seg.words.map((w) => {
      const idx = globalIdx++;
      const mr = idx < totalWords - 1 ? "0.28em" : 0;
      return (
        <span key={idx} className="word" style={{ display: "inline-block", marginRight: mr }}>
          {w}
        </span>
      );
    });
    if (seg.href) {
      return (
        <Link
          key={si}
          href={seg.href}
          onClick={onLinkClick}
          style={{
            color: "inherit",
            textDecoration: "underline",
            textDecorationThickness: "0.04em",
            textUnderlineOffset: "0.12em",
          }}
        >
          {wordSpans}
        </Link>
      );
    }
    return <span key={si}>{wordSpans}</span>;
  });
}

// Computes per-character entry delays so the reveal pauses naturally at spaces, commas, and periods.
function getSubCharDelays(text: string) {
  const BASE = 0.045;
  const SPACE_PAUSE = 0.09;
  const COMMA_PAUSE = 0.28;
  const PERIOD_PAUSE = 0.45;
  const delays: number[] = [];
  let t = 0;
  for (let i = 0; i < text.length; i++) {
    delays.push(t);
    const ch = text[i];
    let gap = BASE;
    if (ch === ",") gap += COMMA_PAUSE;
    else if (ch === ".") gap += PERIOD_PAUSE;
    else if (ch === " ") gap += SPACE_PAUSE;
    t += gap;
  }
  return delays;
}

const SCROLL_KEY = "homeScrollY";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const firstFrame = document.getElementById(frames[0].id);
    const fh = firstFrame?.offsetHeight || window.innerHeight;
    document.documentElement.style.setProperty("--frame-h", `${fh}px`);

    const savedRaw = sessionStorage.getItem(SCROLL_KEY);
    const restoringScroll = savedRaw !== null;
    const targetY = restoringScroll ? parseInt(savedRaw!, 10) : 0;
    if (restoringScroll) sessionStorage.removeItem(SCROLL_KEY);

    homeSections.forEach((section, i) => {
      const sectionId = section.kind === "frame" ? section.frame.id : section.id;
      const frameEl = document.getElementById(sectionId);
      if (!frameEl) return;

      const textBlock = frameEl.querySelector<HTMLElement>(".frame-text");
      const frameStart = i * fh;
      const alreadyPast = restoringScroll && frameStart < targetY;

      if (textBlock) {
        gsap.fromTo(textBlock, { y: 0 }, {
          y: 40, ease: "none",
          scrollTrigger: { start: frameStart, end: frameStart + fh, scrub: true },
        });
      }

      if (section.kind === "testimonials") {
        const label = frameEl.querySelector<HTMLElement>(".frame-label");
        const cards = frameEl.querySelectorAll<HTMLElement>(".testimonial-card");

        if (alreadyPast) {
          gsap.set([label, ...Array.from(cards)], { opacity: 1, y: 0 });
          return;
        }

        if (label) gsap.fromTo(label, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        });
        if (cards.length) gsap.fromTo(cards, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.15,
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        });

        return;
      }

      if (section.kind === "contact") {
        const label = frameEl.querySelector<HTMLElement>(".frame-label");
        const heading = frameEl.querySelector<HTMLElement>(".contact-heading");
        const pills = frameEl.querySelectorAll<HTMLElement>(".contact-pill");

        if (alreadyPast) {
          gsap.set([label, heading, ...Array.from(pills)], { opacity: 1, y: 0 });
          return;
        }

        if (label) gsap.fromTo(label, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        });
        if (heading) gsap.fromTo(heading, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        });
        if (pills.length) gsap.fromTo(pills, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.25,
          scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
        });

        return;
      }

      const frame = section.frame;
      const words = frameEl.querySelectorAll<HTMLElement>(".word");
      const subChars = frameEl.querySelectorAll<HTMLElement>(".sub-char");
      const subDelays = getSubCharDelays(frame.sub);

      if (!words.length) return;

      const wordDelay = words.length * 0.1521 + 0.2535;

      const labelEl = frameEl.querySelector<HTMLElement>(".hero-label");
      const cueEl = frameEl.querySelector<HTMLElement>(".scroll-cue");

      if (alreadyPast) {
        gsap.set(words, { opacity: 1, y: 0, scale: 1 });
        if (subChars.length) gsap.set(subChars, { opacity: 1, y: 0 });
        if (labelEl) gsap.set(labelEl, { opacity: 1, y: 0 });
        if (cueEl) gsap.set(cueEl, { opacity: 1, y: 0 });
        return;
      }

      if (i === 0) {
        if (!restoringScroll) {
          if (labelEl) gsap.fromTo(labelEl, { opacity: 0, y: -28 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });

          gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out", delay: 0.15 });

          if (subChars.length) gsap.fromTo(subChars, { opacity: 0, y: 12 },
            { opacity: 1, y: 0, stagger: (idx: number) => subDelays[idx], duration: 0.6, ease: "power2.out", delay: 0.4 });

          if (cueEl) gsap.fromTo(cueEl, { opacity: 0, y: -8 }, {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out", delay: 0.6,
            onComplete: () => {
              gsap.to(cueEl, { y: 6, duration: 1.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
            },
          });
        } else {
          gsap.set(words, { opacity: 1, y: 0, scale: 1 });
          if (subChars.length) gsap.set(subChars, { opacity: 1, y: 0 });
          if (labelEl) gsap.set(labelEl, { opacity: 1, y: 0 });
          if (cueEl) gsap.set(cueEl, { opacity: 1, y: 0 });
        }
        return;
      }

      gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out",
        scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
      });
      if (subChars.length) gsap.fromTo(subChars, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, stagger: (idx: number) => subDelays[idx], duration: 0.6, ease: "power2.out", delay: wordDelay,
        scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
      });
    });

    if (restoringScroll) {
      const doScroll = () => window.scrollTo({ top: targetY, behavior: "instant" });
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
      setTimeout(doScroll, 100);
      setTimeout(doScroll, 250);
    }

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const saveScroll = () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));

  return (
    <main style={{ overflowX: "hidden" }}>
      {homeSections.map((section, i) => {
        if (section.kind === "testimonials") {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{
                position: "sticky",
                top: 0,
                height: "100dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <TestimonialsFrame testimonials={section.testimonials} label={section.label} text={section.text} />
            </div>
          );
        }

        if (section.kind === "contact") {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{
                position: "sticky",
                top: 0,
                height: "100dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
              }}
            >
              <ContactFrame label={section.label} text={section.text} />
            </div>
          );
        }

        const frame = section.frame;
        return (
        <div
          key={frame.id}
          id={frame.id}
          style={
            i === 0
              ? {
                  position: "sticky",
                  top: 0,
                  height: "100dvh",
                  background: frame.bg,
                  zIndex: i + 1,
                  display: "flex",
                }
              : {
                  position: "sticky",
                  top: 0,
                  height: "100dvh",
                  background: frame.bg,
                  zIndex: i + 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  paddingLeft: "clamp(1.5rem, 6vw, 6rem)",
                }
          }
        >
          {i === 0 ? (
            <div
              className="frame-text"
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
                width: "100%",
                boxSizing: "border-box",
                willChange: "transform",
                padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 6vw, 6rem)",
              }}
            >
              {/* Band 1 — label */}
              <div className="hero-label">
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "var(--text-caption)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: frame.text,
                    display: "block",
                  }}
                >
                  {frame.label}
                </span>
              </div>

              {/* Band 2 — title */}
              <div style={{ display: "flex", alignItems: "center", flex: 1, minHeight: 0 }}>
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
                  {renderTitleWords(frame, saveScroll)}
                </h2>
              </div>

              {/* Band 3 — tagline + scroll cue */}
              <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1rem" }}>
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
                    textAlign: "left",
                  }}
                >
                  {renderChars(frame.sub)}
                </p>
                <span
                  className="scroll-cue"
                  style={{
                    fontSize: "1.25rem",
                    color: frame.text,
                    opacity: 0.5,
                    lineHeight: 1,
                  }}
                >
                  ↓
                </span>
              </div>
            </div>
          ) : (
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
                {renderTitleWords(frame, saveScroll)}
              </h2>

              {frame.subHref ? (
                <Link
                  href={frame.subHref}
                  onClick={saveScroll}
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
                    display: "block",
                    textDecoration: "underline",
                    textDecorationThickness: "0.04em",
                    textUnderlineOffset: "0.2em",
                  }}
                >
                  {renderChars(frame.sub)}
                </Link>
              ) : (
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
                  {renderChars(frame.sub)}
                </p>
              )}
            </div>
          )}
        </div>
        );
      })}
    </main>
  );
}
