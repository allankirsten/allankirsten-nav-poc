"use client";

import { useRef, useEffect } from "react";

const css = `
  .brands-band {
    width: 100%;
    overflow: hidden;
    cursor: grab;
  }
  .brands-band:active { cursor: grabbing; }
  .brands-track {
    display: flex;
    align-items: center;
    width: max-content;
    padding: 1.5rem 0;
    user-select: none;
    will-change: transform;
  }
  .brand-item {
    display: block;
    height: 2.5rem;
    width: auto;
    flex-shrink: 0;
    margin: 0 5.5rem;
    opacity: 0.55;
    -webkit-user-drag: none;
  }
`;

const SPEED_DESKTOP = 0.6;
const SPEED_MOBILE = 1.4;
const MOBILE_QUERY = "(max-width: 768px)";

type Brand = { name: string; src: string; ratio: number };

const wrap = (value: number, max: number) => ((value % max) + max) % max;

export function BrandsMarquee({ brands }: { brands: Brand[] }) {
  const bandRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const dragging = useRef(false);
  const dragStartX = useRef(0);
  const dragBasePos = useRef(0);
  const posRef = useRef(0);

  const doubled = [...brands, ...brands];
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

  useEffect(() => {
    const band = bandRef.current;
    const track = trackRef.current;
    if (!band || !track) return;

    const mql = window.matchMedia(MOBILE_QUERY);
    let speed = mql.matches ? SPEED_MOBILE : SPEED_DESKTOP;
    const onChange = (e: MediaQueryListEvent) => {
      speed = e.matches ? SPEED_MOBILE : SPEED_DESKTOP;
    };
    mql.addEventListener("change", onChange);

    const tick = () => {
      const half = track.scrollWidth / 2;
      if (!dragging.current) {
        posRef.current = wrap(posRef.current + speed, half);
      }
      track.style.transform = `translate3d(${-posRef.current}px,0,0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      mql.removeEventListener("change", onChange);
    };
  }, []);

  const startDrag = (x: number) => {
    dragging.current = true;
    dragStartX.current = x;
    dragBasePos.current = posRef.current;
  };

  const moveDrag = (x: number) => {
    if (!dragging.current || !trackRef.current) return;
    const half = trackRef.current.scrollWidth / 2;
    const delta = dragStartX.current - x;
    posRef.current = wrap(dragBasePos.current + delta, half);
  };

  const endDrag = () => { dragging.current = false; };

  const onMouseDown = (e: React.MouseEvent) => startDrag(e.pageX);
  const onMouseMove = (e: React.MouseEvent) => moveDrag(e.pageX);
  const onTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].pageX);
  const onTouchMove = (e: React.TouchEvent) => moveDrag(e.touches[0].pageX);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        ref={bandRef}
        className="brands-band"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={endDrag}
      >
        <div ref={trackRef} className="brands-track">
          {doubled.map((brand, i) => (
            <img
              key={i}
              className="brand-item"
              src={`${basePath}${brand.src}`}
              alt={brand.name}
              style={{ width: `calc(2.5rem * ${brand.ratio})` }}
              draggable={false}
            />
          ))}
        </div>
      </div>
    </>
  );
}
