"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

const css = `
  .scroll-gallery-track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;
  }
  .scroll-gallery-track::-webkit-scrollbar { display: none; }
  .scroll-gallery-slide {
    flex: 0 0 auto;
    scroll-snap-align: start;
  }
  .scroll-gallery-dots {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
  }
  .scroll-gallery-dot {
    border-radius: 50%;
    border: none;
    padding: 0;
    cursor: pointer;
    transition: width 0.25s ease, height 0.25s ease, opacity 0.25s ease, background 0.25s ease;
  }
`;

/**
 * Shared mechanism behind every horizontal scroll-snap carousel on the site
 * (home testimonials, about gallery): a scrollable track plus dot pagination
 * that tracks whichever slide sits closest to the track's start edge.
 * Callers own slide markup and styling, this owns scroll/active-index logic.
 */
export function ScrollGallery({
  slides,
  trackClassName,
  slideClassName,
  trackStyle,
  dotsStyle,
  dotsClassName,
  dotColor = "#000",
  activeDotColor,
  dotLabel = (i: number) => `Go to slide ${i + 1}`,
  renderSlide,
}: {
  slides: ReactNode[];
  trackClassName?: string;
  slideClassName?: string;
  trackStyle?: CSSProperties;
  dotsStyle?: CSSProperties;
  dotsClassName?: string;
  dotColor?: string;
  activeDotColor?: string;
  dotLabel?: (i: number) => string;
  /** Override how each slide wrapper renders, receives (slide, index, isActive). Defaults to a plain div. */
  renderSlide?: (slide: ReactNode, i: number, active: boolean) => ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateActive = () => {
      const items = Array.from(track.querySelectorAll<HTMLElement>(".scroll-gallery-slide"));
      const trackLeft = track.getBoundingClientRect().left;
      let closest = 0;
      let minDist = Infinity;
      items.forEach((item, i) => {
        const dist = Math.abs(item.getBoundingClientRect().left - trackLeft);
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
    const item = track?.querySelectorAll<HTMLElement>(".scroll-gallery-slide")[i];
    item?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  return (
    <div>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <div
        ref={trackRef}
        className={`scroll-gallery-track${trackClassName ? ` ${trackClassName}` : ""}`}
        style={trackStyle}
      >
        {slides.map((slide, i) => {
          const isActive = i === active;
          const className = `scroll-gallery-slide${slideClassName ? ` ${slideClassName}` : ""}`;
          return renderSlide ? (
            <div key={i} className={className}>{renderSlide(slide, i, isActive)}</div>
          ) : (
            <div key={i} className={className}>{slide}</div>
          );
        })}
      </div>

      <div
        className={`scroll-gallery-dots${dotsClassName ? ` ${dotsClassName}` : ""}`}
        style={dotsStyle}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={dotLabel(i)}
            onClick={() => goTo(i)}
            className="scroll-gallery-dot"
            style={{
              width: i === active ? "8px" : "6px",
              height: i === active ? "8px" : "6px",
              background: i === active ? (activeDotColor ?? dotColor) : dotColor,
              opacity: i === active ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}
