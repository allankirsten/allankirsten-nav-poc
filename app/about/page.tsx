"use client";

import { useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { BackButton } from "@/components/BackButton";
import { ImageGallery } from "@/components/ImageGallery";
import { renderWords, renderChars, getSubCharDelays } from "@/lib/textReveal";
import { contact } from "@/content/contact";

const css = `
  .about-page {
    background: #fff;
    color: #000;
    min-height: 100vh;
  }
  .about-hero {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: var(--section-px);
    border-bottom: 1px solid #e5e5e5;
    box-sizing: border-box;
  }
  .about-eyebrow {
    font-family: var(--font-sans);
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
    margin-bottom: 2rem;
  }
  .about-title {
    font-family: var(--font-display);
    font-size: clamp(3.5rem, 10vw, 8rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
    font-weight: 400;
    color: #000;
  }
  .about-subhead {
    font-size: clamp(1rem, 2vw, 1.375rem);
    font-weight: 300;
    color: #777;
    margin-top: 2.5rem;
    max-width: 48ch;
    line-height: 1.5;
  }
  .about-section {
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
    border-bottom: 1px solid #e5e5e5;
  }
  .about-section-label {
    font-size: 0.625rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #aaa;
    display: block;
    margin-bottom: 1.5rem;
  }
  .about-section-heading {
    font-family: var(--font-display);
    font-size: clamp(1.75rem, 4vw, 2.75rem);
    line-height: 1.1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
    max-width: 20ch;
    margin-bottom: 1.5rem;
  }
  .about-body {
    font-size: 1.0625rem;
    line-height: 1.7;
    font-weight: 300;
    color: #555;
    max-width: 66ch;
  }
  .about-body + .about-body { margin-top: 1.25rem; }
  .about-section--split {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }
  .about-split-text { min-width: 0; }
  .about-split-image {
    flex-shrink: 0;
    width: 100%;
    max-width: 22rem;
  }
  .about-split-image img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 6px;
  }
  @media (min-width: 768px) {
    .about-section--split { flex-direction: row; align-items: stretch; gap: 4rem; }
    .about-split-text { flex: 1.1; }
    .about-split-image { flex: 1; width: auto; max-width: none; }
    .about-split-image img { height: 100%; object-fit: cover; }
  }
  .about-cross-link {
    padding: clamp(4rem, 8vw, 8rem) var(--section-px);
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .about-cross-link-lead {
    font-size: 1.0625rem;
    font-weight: 300;
    color: #777;
  }
  .about-cross-link-title {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 400;
    color: #000;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    transition: gap 0.3s ease;
    width: fit-content;
  }
  .about-cross-link-title:hover { gap: 1.25rem; }
`;

const ABOUT_SUBHEAD = "Product and design leader, 23 years into a career that started with ink on paper and somehow ended up here.";

export default function About() {
  useEffect(() => {
    const words = document.querySelectorAll<HTMLElement>(".about-title .word");
    const subChars = document.querySelectorAll<HTMLElement>(".about-subhead .sub-char");
    const subDelays = getSubCharDelays(ABOUT_SUBHEAD);

    gsap.fromTo(".about-eyebrow", { opacity: 0, y: -28 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" });
    if (words.length) gsap.fromTo(words, { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, stagger: 0.1521, duration: 1.69, ease: "power3.out", delay: 0.15 });
    if (subChars.length) gsap.fromTo(subChars, { opacity: 0, y: 12 },
      { opacity: 1, y: 0, stagger: (i: number) => subDelays[i], duration: 0.6, ease: "power2.out", delay: 0.4 });
  }, []);

  return (
    <main className="about-page">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="about-hero">
        <span className="about-eyebrow">About</span>
        <div>
          <h1 className="about-title">{renderWords("Hi, I'm Allan.")}</h1>
          <p className="about-subhead">{renderChars(ABOUT_SUBHEAD)}</p>
        </div>
      </section>

      <section className="about-section about-section--split">
        <div className="about-split-image">
          <img src="/images/allan-portrait.jpg" alt="Allan Kirsten" />
        </div>
        <div className="about-split-text">
          <span className="about-section-label">The short version</span>
          <h2 className="about-section-heading">I build businesses with design as the lever.</h2>
          <p className="about-body">
            Ten years in product, twenty-three in the craft: fintechs, SaaS,
            venture builders, one very intense global team after a merger.
            Being the first designer in the room has happened more times than
            I can count, and messy is exactly where the interesting work lives.
          </p>
          <p className="about-body">
            A single week might mean reviewing a screen against usability
            heuristics, questioning the math behind an A/B test, writing a
            lifecycle job in code, and sitting in on a sales call. Staying
            hands-on is deliberate: the distance between an idea and a shipped
            thing is where most good work quietly dies.
          </p>
        </div>
      </section>

      <section className="about-section">
        <span className="about-section-label">Beyond the work</span>
        <h2 className="about-section-heading">Same curiosity, no badge.</h2>
        <p className="about-body">
          Off the clock, it&apos;s running, diving, or three hours deep into a
          game that counts as research, I&apos;ll insist. Lately there&apos;s a
          guitar too, badly played but patiently practiced. Travel is how I
          get outside my own assumptions, camera always along for it. Running
          gets tracked the same way everything else does, with entirely too
          much data.
        </p>
        <p className="about-body">
          It&apos;s all the same curiosity, really: how people behave, how
          systems work, how something ordinary becomes something worth
          paying attention to.
        </p>
        <div style={{ marginTop: "3rem" }}>
          <ImageGallery
            images={[
              { src: "/images/beyond-diving.jpg", alt: "Scuba diving" },
              { src: "/images/beyond-running.jpg", alt: "Running a half marathon" },
              { src: "/images/beyond-podcast.jpg", alt: "Recording a podcast" },
              { src: "/images/beyond-guitar.jpg", alt: "Guitar" },
            ]}
          />
        </div>
        <div style={{ marginTop: "2rem" }}>
          <a href={contact.instagramUrl} target="_blank" rel="noopener noreferrer" className="cta-underline cta-underline--light">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Instagram
          </a>
        </div>
      </section>

      <section className="about-section" style={{ borderBottom: "none" }}>
        <span className="about-section-label">Where it started</span>
        <h2 className="about-section-heading">Ink on paper, long before pixels.</h2>
        <p className="about-body">
          Long before roadmaps, there was a 14 year old inking floor plans by
          hand in an engineering office, and a self-taught programmer figuring
          out code in 1998. The patience that takes, line by line, is the same
          patience behind a Maserati illustration people still ask me about.
          Different tools, same eye.
        </p>
      </section>

      <section className="about-cross-link">
        <p className="about-cross-link-lead">Curious what this actually looks like day to day?</p>
        <Link href="/how-i-work" className="about-cross-link-title">
          See how I work <span aria-hidden="true">→</span>
        </Link>
      </section>

      <BackButton fallback="/" label="Home" forceFallback />
    </main>
  );
}
