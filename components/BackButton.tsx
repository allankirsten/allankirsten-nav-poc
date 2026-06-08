"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function BackButton({ fallback = "/", label = "Back" }: { fallback?: string; label?: string }) {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const t = setTimeout(() => setCollapsed(true), 2800);
    return () => clearTimeout(t);
  }, []);

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setCollapsed(false)}
      onMouseLeave={() => setCollapsed(true)}
      aria-label={label}
      style={{
        position: "fixed",
        bottom: "clamp(1.25rem, 4vw, 2rem)",
        right: "clamp(1.25rem, 4vw, 2rem)",
        zIndex: 200,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.6rem",
        background: "#000",
        color: "#fff",
        borderRadius: "999px",
        height: "56px",
        paddingLeft: collapsed ? "1rem" : "1.5rem",
        paddingRight: collapsed ? "1rem" : "1.75rem",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        boxSizing: "border-box",
        transition: "padding 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{ flexShrink: 0, display: "block" }}
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
