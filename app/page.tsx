"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { frames } from "@/content/frames";
import type { Frame } from "@/content/types";

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

    frames.forEach((_, i) => {
      const frameEl = document.getElementById(frames[i].id);
      if (!frameEl) return;

      const textBlock = frameEl.querySelector<HTMLElement>(".frame-text");
      const words = frameEl.querySelectorAll<HTMLElement>(".word");
      const sub = frameEl.querySelector<HTMLElement>(".frame-sub");
      const frameStart = i * fh;
      const alreadyPast = restoringScroll && frameStart < targetY;

      if (textBlock) {
        gsap.fromTo(textBlock, { y: 0 }, {
          y: 40, ease: "none",
          scrollTrigger: { start: frameStart, end: frameStart + fh, scrub: 1 },
        });
      }

      if (!words.length) return;

      const wordDelay = words.length * 0.09 + 0.15;

      if (alreadyPast) {
        gsap.set(words, { opacity: 1, y: 0, scale: 1 });
        if (sub) gsap.set(sub, { opacity: 0.5, y: 0 });
        return;
      }

      if (i === 0) {
        if (!restoringScroll) {
          gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 1.0, ease: "power3.out" });
          if (sub) gsap.fromTo(sub, { opacity: 0, y: 16 },
            { opacity: 0.5, y: 0, duration: 0.7, ease: "power3.out", delay: wordDelay });
        } else {
          gsap.set(words, { opacity: 1, y: 0, scale: 1 });
          if (sub) gsap.set(sub, { opacity: 0.5, y: 0 });
        }
        return;
      }

      gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, stagger: 0.09, duration: 1.0, ease: "power3.out",
        scrollTrigger: { start: frameStart - 120, end: frameStart + fh * 0.25, toggleActions: "play none none none" },
      });
      if (sub) gsap.fromTo(sub, { opacity: 0, y: 16 }, {
        opacity: 0.5, y: 0, duration: 0.7, ease: "power3.out", delay: wordDelay,
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
              {(() => {
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
                        onClick={saveScroll}
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
              })()}
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
                {frame.sub}
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
                {frame.sub}
              </p>
            )}
          </div>
        </div>
      ))}
    </main>
  );
}
