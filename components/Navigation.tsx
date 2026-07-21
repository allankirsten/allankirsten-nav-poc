"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { scrollToHomeSection } from "@/lib/homeScroll";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work" },
  { label: "Method", href: "/how-i-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "mailto:allankirsten@gmail.com" },
];

type BgTheme = "dark" | "light";

const THEMES: Record<BgTheme, { bg: (a: number) => string; border: string; text: string; active: string }> = {
  dark: {
    bg: (a) => `rgba(0, 0, 0, ${a})`,
    border: "rgba(245, 240, 232, 0.08)",
    text: "#F5F0E8",
    active: "#C8A96E",
  },
  light: {
    bg: (a) => `rgba(255, 255, 255, ${a})`,
    border: "rgba(13, 13, 13, 0.08)",
    text: "#141210",
    active: "#8A6A32",
  },
};

// Luminance of the color sitting right behind the header, sampled from the DOM —
// lets the bar flip light/dark as the page scrolls past differently colored sections.
function readBgTheme(sampleY: number): BgTheme {
  const el = document.elementFromPoint(window.innerWidth / 2, sampleY);
  let node: Element | null = el;
  while (node) {
    const bg = getComputedStyle(node).backgroundColor;
    const m = bg.match(/[\d.]+/g);
    if (m && m.length >= 3 && (m.length < 4 || Number(m[3]) > 0)) {
      const [r, g, b] = m.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      return luminance > 0.5 ? "light" : "dark";
    }
    node = node.parentElement;
  }
  return "dark";
}

function NavLink({
  href,
  label,
  active,
  theme,
  onClick,
  mobile = false,
}: {
  href: string;
  label: string;
  active: boolean;
  theme: BgTheme;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  mobile?: boolean;
}) {
  const t = THEMES[theme];
  return (
    <Link
      href={href}
      onClick={onClick}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: mobile ? "1rem" : "0.8125rem",
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: active ? t.active : t.text,
        opacity: active ? 1 : 0.75,
        textDecoration: "none",
        transition: "opacity 0.2s ease, color 0.2s ease",
        ...(mobile ? { padding: "0.85rem 0", borderBottom: `1px solid ${t.border}`, display: "block" } : {}),
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = t.active;
        (e.currentTarget as HTMLElement).style.opacity = "1";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = active ? t.active : t.text;
        (e.currentTarget as HTMLElement).style.opacity = active ? "1" : "0.75";
      }}
    >
      {label}
    </Link>
  );
}

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bgTheme, setBgTheme] = useState<BgTheme>("dark");
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 40);
      if (isOpen) return; // fullscreen overlay covers the sample point while open — keep last reading
      const sampleY = (headerRef.current?.offsetHeight ?? 68) + 6;
      setBgTheme(readBgTheme(sampleY));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname, isOpen]);

  // Lock body scroll while the fullscreen overlay is open.
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

  // Entrance: overlay fades in, then links reveal with the same fade-up + stagger
  // used for content entrance elsewhere on the site (home frames, /ai).
  useEffect(() => {
    if (!isOpen) return;
    const overlay = overlayRef.current;
    const links = linkRefs.current.filter((el): el is HTMLAnchorElement => Boolean(el));
    if (!overlay) return;

    const tl = gsap.timeline();
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.45, ease: "power2.out" });
    if (links.length) {
      tl.fromTo(
        links,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", stagger: 0.08 },
        "-=0.25"
      );
    }
    return () => { tl.kill(); };
  }, [isOpen]);

  const closeMenu = () => {
    const overlay = overlayRef.current;
    if (!overlay) { setIsOpen(false); return; }
    gsap.to(overlay, { opacity: 0, duration: 0.25, ease: "power2.in", onComplete: () => setIsOpen(false) });
  };

  const isActive = (href: string) => {
    if (href.startsWith("mailto:") || href.includes("#")) return false;
    return href === pathname;
  };

  // Next's <Link> is a same-route no-op for hash-only changes — clicking
  // "Work" while already on "/" would otherwise never scroll anywhere,
  // since the home page's own hash handling only runs on mount/hashchange.
  // Intercept it here and scroll directly instead of navigating.
  const handleHashNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hashPos = href.indexOf("#");
    if (hashPos === -1) return;
    const targetPath = href.slice(0, hashPos) || "/";
    const id = href.slice(hashPos + 1);
    if (pathname === targetPath) {
      e.preventDefault();
      if (scrollToHomeSection(id)) window.history.replaceState(null, "", href);
    }
  };

  const t = THEMES[bgTheme];

  return (
    <header
      ref={headerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1rem clamp(1.5rem, 6vw, 3rem)",
        background: t.bg(scrolled ? 0.92 : 0.1),
        backdropFilter: "blur(10px)",
        transition: "background 0.3s ease",
      }}
    >
      <Link href="/" aria-label="Allan Kirsten, home" style={{ display: "flex", alignItems: "center" }}>
        <Image src="/logo-ak.png" alt="AK" width={36} height={36} priority style={{ borderRadius: "50%" }} />
      </Link>

      <nav className="hidden md:flex" style={{ alignItems: "center", gap: "2rem" }}>
        {NAV_LINKS.map((link) => (
          <NavLink
            key={link.href}
            href={link.href}
            label={link.label}
            active={isActive(link.href)}
            theme={bgTheme}
            onClick={(e) => handleHashNav(e, link.href)}
          />
        ))}
      </nav>

      <button
        onClick={() => (isOpen ? closeMenu() : setIsOpen(true))}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="flex md:hidden"
        style={{
          position: "relative",
          zIndex: 210,
          width: "32px",
          height: "32px",
          cursor: "pointer",
          background: "none",
          border: "none",
          padding: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            left: "5px",
            right: "5px",
            top: "50%",
            height: "1px",
            background: t.text,
            transform: isOpen ? "translateY(0) rotate(45deg)" : "translateY(-4px) rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.65,0,0.35,1), background 0.2s ease",
          }}
        />
        <span
          style={{
            position: "absolute",
            left: "5px",
            right: "5px",
            top: "50%",
            height: "1px",
            background: t.text,
            transform: isOpen ? "translateY(0) rotate(-45deg)" : "translateY(4px) rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.65,0,0.35,1), background 0.2s ease",
          }}
        />
      </button>

      {isOpen && (
        <div
          ref={overlayRef}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            height: "100dvh",
            zIndex: 205,
            background: t.bg(1),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "clamp(1.5rem, 6vw, 3rem)",
            boxSizing: "border-box",
            opacity: 0,
          }}
        >
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => { handleHashNav(e, link.href); closeMenu(); }}
              ref={(el) => { linkRefs.current[i] = el; }}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.25rem, 10vw, 3.25rem)",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: isActive(link.href) ? t.active : t.text,
                textDecoration: "none",
                display: "flex",
                alignItems: "baseline",
                gap: "1rem",
                padding: "0.6rem 0",
                borderBottom: `1px solid ${t.border}`,
                opacity: 0,
              }}
            >
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "0.75rem", letterSpacing: "0.15em", opacity: 0.4 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
