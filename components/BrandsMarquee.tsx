"use client";

import { useRef, useEffect } from "react";

const css = `
  .brands-band {
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
    cursor: grab;
    -webkit-overflow-scrolling: touch;
  }
  .brands-band:active { cursor: grabbing; }
  .brands-band::-webkit-scrollbar { display: none; }
  .brands-band { scrollbar-width: none; }
  .brands-track {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 1.5rem 0;
    user-select: none;
  }
  .brand-item {
    font-family: var(--font-sans);
    font-size: 0.6875rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.28);
    white-space: nowrap;
    flex-shrink: 0;
    padding: 0 3.5rem;
  }
`;

const SPEED = 0.6;

export function BrandsMarquee({ brands }: { brands: string[] }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);
  const posRef = useRef(0);

  const doubled = [...brands, ...brands, ...brands, ...brands];

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const tick = () => {
      if (!dragging.current) {
        posRef.current += SPEED;
        const half = band.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        band.scrollLeft = posRef.current;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    dragStartX.current = e.pageX;
    dragScrollLeft.current = bandRef.current!.scrollLeft;
    posRef.current = bandRef.current!.scrollLeft;
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.pageX;
    const next = dragScrollLeft.current + delta;
    bandRef.current!.scrollLeft = next;
    posRef.current = bandRef.current!.scrollLeft;
  };

  const onMouseUp = () => { dragging.current = false; };

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    dragStartX.current = e.touches[0].pageX;
    dragScrollLeft.current = bandRef.current!.scrollLeft;
    posRef.current = bandRef.current!.scrollLeft;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const delta = dragStartX.current - e.touches[0].pageX;
    const next = dragScrollLeft.current + delta;
    bandRef.current!.scrollLeft = next;
    posRef.current = bandRef.current!.scrollLeft;
  };

  const onTouchEnd = () => { dragging.current = false; };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={bandRef}
        className="brands-band"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="brands-track">
          {doubled.map((brand, i) => (
            <span key={i} className="brand-item">{brand}</span>
          ))}
        </div>
      </div>
    </>
  );
}
