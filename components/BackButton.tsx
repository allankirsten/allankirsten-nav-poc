"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function BackButton({
  fallback = "/",
  label = "Back",
  forceFallback = false,
}: {
  fallback?: string;
  label?: string;
  /** Always navigate to `fallback` instead of `router.back()`. Use when browser history can't guarantee landing on `fallback` — cross-links between pages of the same kind (case-to-case, for example) make plain `back()` land somewhere other than the intended destination. */
  forceFallback?: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const hoveringRef = useRef(false);
  const router = useRouter();

  // Reveals the label briefly on mount, then collapses back down to the icon.
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      if (!hoveringRef.current) setCollapsed(true);
    }, 2200);
    return () => clearTimeout(hideTimer);
  }, []);

  const handleClick = () => {
    if (!forceFallback && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => { hoveringRef.current = true; setCollapsed(false); }}
      onMouseLeave={() => { hoveringRef.current = false; setCollapsed(true); }}
      aria-label={label}
      style={{
        position: "fixed",
        bottom: "clamp(1.25rem, 4vw, 2rem)",
        right: "clamp(1.25rem, 4vw, 2rem)",
        zIndex: 200,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: collapsed ? 0 : "0.6rem",
        background: "#000",
        color: "#fff",
        borderRadius: "999px",
        height: "56px",
        paddingLeft: collapsed ? "19px" : "1.5rem",
        paddingRight: collapsed ? "19px" : "1.75rem",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "padding 0.45s cubic-bezier(0.4, 0, 0.2, 1), gap 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{ flexShrink: 0, display: "block", marginLeft: collapsed ? "-2px" : 0, transition: "margin-left 0.45s cubic-bezier(0.4, 0, 0.2, 1)" }}
      >
        <path d="M11 3.5L5.5 9 11 14.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <span
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          whiteSpace: "nowrap",
          maxWidth: collapsed ? "0px" : "72px",
          opacity: collapsed ? 0 : 1,
          overflow: "hidden",
          transition: "max-width 0.45s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s ease",
        }}
      >
        {label}
      </span>
    </button>
  );
}
