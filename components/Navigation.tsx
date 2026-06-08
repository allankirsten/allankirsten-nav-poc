"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Início",      href: "#abertura",                      color: "#E07B5A" },
  { label: "Trajetória",  href: "#identidade",                    color: "#5A7BE0" },
  { label: "Casos",       href: "#prova",                         color: "#5ABA8A" },
  { label: "Método",      href: "#metodo",                        color: "#C8A96E" },
  { label: "Conversar",   href: "mailto:allankirsten@gmail.com",  color: "#B05AB5" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLAnchorElement[]>([]);

  // Appear after scrolling past first frame
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(navRef.current, { opacity: 0, pointerEvents: "none" });

      ScrollTrigger.create({
        trigger: "#abertura",
        start: "bottom 75%",
        onEnter: () => {
          gsap.to(navRef.current, {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power2.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(navRef.current, {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.4,
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const openMenu = () => {
    setIsOpen(true);
    gsap.set(overlayRef.current, { display: "flex", opacity: 0, scale: 0.98 });
    gsap.set(linksRef.current, { y: 24, opacity: 0 });

    gsap
      .timeline()
      .to(overlayRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "power2.out" })
      .to(
        linksRef.current,
        { y: 0, opacity: 1, stagger: 0.07, duration: 0.35, ease: "power3.out" },
        "-=0.15"
      );
  };

  const closeMenu = () => {
    gsap
      .timeline({
        onComplete: () => {
          setIsOpen(false);
          gsap.set(overlayRef.current, { display: "none" });
        },
      })
      .to(linksRef.current, {
        y: -12,
        opacity: 0,
        stagger: { each: 0.05, from: "end" },
        duration: 0.22,
      })
      .to(overlayRef.current, { opacity: 0, scale: 0.98, duration: 0.28 }, "-=0.1");
  };

  return (
    <>
      {/* Hamburger trigger */}
      <nav ref={navRef} className="fixed top-0 right-0 z-50 p-6">
        <button
          onClick={openMenu}
          aria-label="Abrir menu"
          className="flex flex-col gap-[5px] cursor-pointer"
        >
          <span
            className="block w-6 h-px transition-colors"
            style={{ background: "var(--text)" }}
          />
          <span
            className="block w-4 h-px transition-colors"
            style={{ background: "var(--text)" }}
          />
        </button>
      </nav>

      {/* Fullscreen overlay */}
      <div
        ref={overlayRef}
        style={{
          display: "none",
          background: "rgba(13, 13, 13, 0.96)",
          backdropFilter: "blur(8px)",
        }}
        className="fixed inset-0 z-[100] flex-col items-center justify-center"
        onClick={(e) => {
          if (e.target === overlayRef.current) closeMenu();
        }}
      >
        {/* Close button */}
        <button
          onClick={closeMenu}
          aria-label="Fechar menu"
          className="absolute top-6 right-6 cursor-pointer"
          style={{ color: "var(--text)", opacity: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Links */}
        <nav className="flex flex-col items-center gap-4 w-full px-8 max-w-2xl">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => { if (el) linksRef.current[i] = el; }}
              href={link.href}
              onClick={closeMenu}
              className="w-full flex items-center px-8 py-5 rounded-2xl font-light tracking-widest uppercase transition-opacity duration-200"
              style={{
                fontSize: "clamp(1.25rem, 3.5vw, 2.5rem)",
                background: link.color,
                color: "#0D0D0D",
                letterSpacing: "0.1em",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = "1";
              }}
            >
              <span className="mr-4 text-xs opacity-50" style={{ fontSize: "0.65em" }}>0{i + 1}</span>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </>
  );
}
