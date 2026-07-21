"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frames } from "@/content/frames";
import { brands } from "@/content/brands";
import { testimonials } from "@/content/testimonials";
import { workItems } from "@/content/work";
import { TestimonialsFrame } from "@/components/TestimonialsFrame";
import { ContactFrame } from "@/components/ContactFrame";
import { WorkFrame } from "@/components/WorkFrame";
import { BrandsMarquee } from "@/components/BrandsMarquee";
import { renderChars, charRevealVars } from "@/lib/textReveal";
import { scrollToHomeSection } from "@/lib/homeScroll";
import type { Frame, Testimonial, WorkItem } from "@/content/types";

type HomeSection =
  | { kind: "frame"; frame: Frame }
  | { kind: "brands"; id: string; bg: string }
  | { kind: "testimonials"; id: string; label: string; bg: string; text: string; testimonials: Testimonial[] }
  | { kind: "work"; id: string; label: string; bg: string; text: string; items: WorkItem[] }
  | { kind: "contact"; id: string; label: string; bg: string; text: string };

const provIdx = frames.findIndex((f) => f.id === "provocacao");
const identIdx = frames.findIndex((f) => f.id === "identidade");
const credIdx = frames.findIndex((f) => f.id === "credibilidade");
const homeSections: HomeSection[] = [
  ...frames.slice(0, provIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "brands" as const, id: "marcas", bg: "#111" },
  ...frames.slice(provIdx + 1, identIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "work" as const, id: "work", label: "04", bg: "#fff", text: "#000", items: workItems },
  ...frames.slice(identIdx + 1, credIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "testimonials" as const, id: "depoimentos", label: "07", bg: "#000", text: "#fff", testimonials },
  ...frames.slice(credIdx + 1).map((frame) => ({ kind: "frame" as const, frame })),
  { kind: "contact" as const, id: "contato", label: "08", bg: "#fff", text: "#000" },
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

// Renders a title's words as spans, grouping linked phrases into <Link> elements.
function renderTitleWords(frame: Frame, onLinkClick: () => void) {
  const segments = parseTitle(frame.title, frame.links);
  const totalWords = frame.title.split(" ").length;
  let globalIdx = 0;
  return segments.map((seg, si) => {
    const wordSpans = seg.words.map((w) => {
      const idx = globalIdx++;
      const text = idx < totalWords - 1 ? w + " " : w;
      return (
        <span key={idx} className="word" style={{ display: "inline-block", whiteSpace: "pre" }}>
          {text}
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

const SCROLL_KEY = "homeScrollY";

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const vh = window.innerHeight;
    document.documentElement.style.setProperty("--frame-h", `${vh}px`);

    // Measure actual rendered heights so scroll triggers work with flexible containers
    const frameTops: number[] = [];
    let cumulative = 0;
    homeSections.forEach((section) => {
      const id = section.kind === "frame" ? section.frame.id : section.id;
      frameTops.push(cumulative);
      cumulative += document.getElementById(id)?.offsetHeight ?? vh;
    });

    // A URL hash (e.g. nav link to /#work from another page) jumps straight to that frame,
    // same as restoring a saved scroll position — the sticky-frame layout isn't ready
    // for the browser's native hash-scroll until heights are measured above.
    const savedRaw = sessionStorage.getItem(SCROLL_KEY);
    const hashId = window.location.hash.slice(1);
    const hashIndex = hashId
      ? homeSections.findIndex((s) => (s.kind === "frame" ? s.frame.id : s.id) === hashId)
      : -1;

    const restoringScroll = savedRaw !== null || hashIndex !== -1;
    const targetY = savedRaw !== null ? parseInt(savedRaw, 10) : hashIndex !== -1 ? frameTops[hashIndex] : 0;
    if (savedRaw !== null) sessionStorage.removeItem(SCROLL_KEY);

    homeSections.forEach((section, i) => {
      const sectionId = section.kind === "frame" ? section.frame.id : section.id;
      const frameEl = document.getElementById(sectionId);
      if (!frameEl) return;

      const textBlock = frameEl.querySelector<HTMLElement>(".frame-text");
      const frameStart = frameTops[i];
      const frameHeight = frameEl.offsetHeight;
      const alreadyPast = restoringScroll && frameStart < targetY;

      if (textBlock) {
        gsap.fromTo(textBlock, { y: 0 }, {
          y: 40, ease: "none",
          scrollTrigger: { start: frameStart, end: frameStart + frameHeight, scrub: true },
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
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (cards.length) gsap.fromTo(cards, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out", stagger: 0.12, delay: 0.15,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });

        return;
      }

      if (section.kind === "contact") {
        const label = frameEl.querySelector<HTMLElement>(".frame-label");
        const heading = frameEl.querySelector<HTMLElement>(".contact-heading");
        const sub = frameEl.querySelector<HTMLElement>(".contact-sub");
        const pills = frameEl.querySelectorAll<HTMLElement>(".contact-pill");

        if (alreadyPast) {
          gsap.set([label, heading, sub, ...Array.from(pills)], { opacity: 1, y: 0 });
          return;
        }

        if (label) gsap.fromTo(label, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (heading) gsap.fromTo(heading, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (sub) gsap.fromTo(sub, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out", delay: 0.2,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (pills.length) gsap.fromTo(pills, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.3,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });

        return;
      }

      if (section.kind === "work") {
        const label = frameEl.querySelector<HTMLElement>(".frame-label");
        const heading = frameEl.querySelector<HTMLElement>(".work-heading");
        const rows = frameEl.querySelectorAll<HTMLElement>(".work-row");

        if (alreadyPast) {
          gsap.set([label, heading, ...Array.from(rows)], { opacity: 1, y: 0 });
          return;
        }

        if (label) gsap.fromTo(label, { opacity: 0, y: 20 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power2.out",
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (heading) gsap.fromTo(heading, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.1,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        if (rows.length) gsap.fromTo(rows, { opacity: 0, y: 24 }, {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.1, delay: 0.3,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });

        return;
      }

      if (section.kind !== "frame") return;

      const frame = section.frame;
      const words = frameEl.querySelectorAll<HTMLElement>(".word");
      const subChars = frameEl.querySelectorAll<HTMLElement>(".sub-char");
      const ctaEl = frameEl.querySelector<HTMLElement>(".frame-cta");

      if (!words.length) return;

      const wordDelay = words.length * 0.1521 + 0.2535;

      const labelEl = frameEl.querySelector<HTMLElement>(".hero-label");
      const cueEl = frameEl.querySelector<HTMLElement>(".scroll-cue");

      if (alreadyPast) {
        gsap.set(words, { opacity: 1, y: 0, scale: 1 });
        if (subChars.length) gsap.set(subChars, { opacity: 1, y: 0 });
        if (labelEl) gsap.set(labelEl, { opacity: 1, y: 0 });
        if (cueEl) gsap.set(cueEl, { opacity: 1, y: 0 });
        if (ctaEl) gsap.set(ctaEl, { opacity: 1, y: 0 });
        return;
      }

      if (i === 0) {
        if (!restoringScroll) {
          if (labelEl) gsap.fromTo(labelEl, { opacity: 0, y: -28 },
            { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });

          gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out", delay: 0.15 });

          if (subChars.length) {
            const { from, to } = charRevealVars(frame.sub, { delay: 0.4 });
            gsap.fromTo(subChars, from, to);
          }

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
        scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
      });
      if (subChars.length) {
        const { from, to } = charRevealVars(frame.sub, {
          delay: wordDelay,
          scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
        });
        gsap.fromTo(subChars, from, to);
      }
      if (ctaEl) gsap.fromTo(ctaEl, { opacity: 0, y: 12 }, {
        opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: wordDelay + 0.3,
        scrollTrigger: { start: frameStart - 120, end: frameStart + frameHeight * 0.25, toggleActions: "play none none none" },
      });
    });

    if (restoringScroll) {
      // Hash jumps re-measure live (`scrollToHomeSection`) instead of trusting
      // the `frameTops` snapshot above — that snapshot can be stale by the
      // time this runs if images/fonts shift layout after mount. A saved
      // scroll position (session restore) is an absolute pixel value with
      // nothing to re-measure, so it uses `targetY` directly.
      const doScroll = () => {
        if (hashId) scrollToHomeSection(hashId);
        else window.scrollTo({ top: targetY, behavior: "instant" });
      };
      requestAnimationFrame(() => requestAnimationFrame(doScroll));
      setTimeout(doScroll, 100);
      setTimeout(doScroll, 250);
      // Final correction once every image/font has actually finished loading.
      if (document.readyState === "complete") doScroll();
      else window.addEventListener("load", doScroll, { once: true });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  // Same-page hash changes (e.g. clicking "Work" while already on "/") don't
  // remount this component, so the jump above never re-runs for them. This
  // listens for the whole component's lifetime and re-runs just the scroll.
  useEffect(() => {
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      if (id) scrollToHomeSection(id);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const saveScroll = () => sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));

  return (
    <main style={{ overflowX: "hidden" }}>
      {homeSections.map((section, i) => {
        if (section.kind === "brands") {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{
                position: "sticky",
                top: 0,
                minHeight: "70dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              <BrandsMarquee brands={brands} />
            </div>
          );
        }

        if (section.kind === "testimonials") {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{
                position: "sticky",
                top: 0,
                minHeight: "100dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                alignItems: "center",
                padding: "clamp(5rem, 16vw, 14rem) 0",
                boxSizing: "border-box",
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
                minHeight: "100dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "clamp(5rem, 16vw, 14rem) var(--section-px)",
                boxSizing: "border-box",
              }}
            >
              <ContactFrame label={section.label} text={section.text} />
            </div>
          );
        }

        if (section.kind === "work") {
          return (
            <div
              key={section.id}
              id={section.id}
              style={{
                position: "sticky",
                top: 0,
                minHeight: "100dvh",
                background: section.bg,
                zIndex: i + 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                padding: "clamp(5rem, 16vw, 14rem) var(--section-px)",
                boxSizing: "border-box",
              }}
            >
              <WorkFrame items={section.items} label={section.label} text={section.text} onLinkClick={saveScroll} />
            </div>
          );
        }

        const frame = section.frame;
        return (
        <div
          key={frame.id}
          id={frame.id}
          style={{
            position: "sticky",
            top: 0,
            minHeight: "100dvh",
            background: frame.bg,
            zIndex: i + 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "clamp(5rem, 16vw, 14rem) var(--section-px)",
            boxSizing: "border-box",
            overflow: i === 0 ? "hidden" : undefined,
          }}
        >
          {i === 0 ? (
            <>
            <div className="hero-bg-wrap" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100dvh" }}>
              <Image
                src="/images/octopus-bg.webp"
                alt=""
                fill
                sizes="100vw"
                className="bg-fade-in"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "120px",
                background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
            <div
              className="frame-text"
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                width: "100%",
                boxSizing: "border-box",
                willChange: "transform",
              }}
            >
              <div className="hero-label" style={{ marginBottom: "1.5rem" }}>
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

              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--text-display)",
                  lineHeight: "var(--text-display--line-height)",
                  fontWeight: 400,
                  color: frame.text,
                  letterSpacing: "-0.01em",
                  textAlign: "left",
                }}
              >
                {renderTitleWords(frame, saveScroll)}
              </h2>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1.25rem" }}>
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
              </div>
            </div>
            </>
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
                  fontSize: "var(--text-display-section)",
                  lineHeight: "var(--text-display--line-height)",
                  fontWeight: 400,
                  color: frame.text,
                  letterSpacing: "-0.01em",
                  textAlign: "left",
                }}
              >
                {renderTitleWords(frame, saveScroll)}
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
                {renderChars(frame.sub)}
              </p>

              {frame.subHref && frame.cta && (
                <Link
                  href={frame.subHref}
                  onClick={saveScroll}
                  className={`frame-cta cta-underline${frame.text === "#000" ? " cta-underline--light" : ""}`}
                  style={{ marginTop: "1.5rem" }}
                >
                  {frame.cta}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>
        );
      })}
    </main>
  );
}
