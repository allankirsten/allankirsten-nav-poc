"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const steps = [
  { n: "01", label: "Diagnose", color: "#E07B5A" },
  { n: "02", label: "Frame",    color: "#C8A96E" },
  { n: "03", label: "System",   color: "#5ABA8A" },
  { n: "04", label: "Build",    color: "#5A7BE0" },
  { n: "05", label: "Ship",     color: "#B05AB5" },
  { n: "06", label: "Learn",    color: "#E07B5A" },
];

const N       = steps.length;
const LX      = 52;
const FIRST_Y = 72;
const STEP    = 96;
const LAST_Y  = FIRST_Y + STEP * (N - 1);   // 552
const NR      = 20;
const LABEL_X = LX + NR + 16;

// Return arc: leaves bottom node going left, sweeps up, arrives at top node from below → arrow points up
const RETURN = `M ${LX},${LAST_Y} C -48,${LAST_Y} ${LX},${FIRST_Y + 52} ${LX},${FIRST_Y}`;

export function ProcessDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const svg = svgRef.current!;

    const track     = svg.querySelector<SVGLineElement>(".p-track");
    const returnArc = svg.querySelector<SVGPathElement>(".p-return");
    const nodes     = Array.from(svg.querySelectorAll<SVGGElement>(".pnode"));
    const labels    = Array.from(svg.querySelectorAll<SVGGElement>(".plabel"));

    gsap.set([nodes, labels, returnArc], { opacity: 0 });

    const trackLen = track?.getTotalLength() ?? 0;
    if (track && trackLen > 0) {
      gsap.set(track, { strokeDasharray: trackLen, strokeDashoffset: trackLen });
    }

    const BEAT = 0.44;

    const tl = gsap.timeline({ paused: true });

    if (track && trackLen > 0) {
      tl.to(track, { strokeDashoffset: 0, duration: N * BEAT, ease: "none" }, 0);
    }
    for (let i = 0; i < N; i++) {
      tl.to(nodes[i],  { opacity: 1, duration: 0.25, ease: "power2.out" }, i * BEAT)
        .to(labels[i], { opacity: 1, duration: 0.25, ease: "power2.out" }, i * BEAT + 0.1);
    }
    tl.to(returnArc, { opacity: 0.65, duration: 1.1, ease: "power2.inOut" }, N * BEAT + 0.1);

    const timer = window.setTimeout(() => tl.play(), 600);

    return () => {
      window.clearTimeout(timer);
      tl.kill();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox={`-60 40 340 ${LAST_Y + 60}`}
      style={{ width: "100%", maxWidth: 320 }}
      aria-label="Diagrama de processo"
    >
      <defs>
        <marker id="arr-up" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
          <polyline points="1,7 4,2 7,7" fill="none" stroke="#C8A96E" strokeWidth="1" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* Vertical track */}
      <line
        className="p-track"
        x1={LX} y1={FIRST_Y}
        x2={LX} y2={LAST_Y}
        stroke="#F5F0E8"
        strokeWidth="0.75"
        strokeOpacity="0.15"
      />

      {/* Return arc — dashed gold, curves left and back up */}
      <path
        className="p-return"
        d={RETURN}
        fill="none"
        stroke="#C8A96E"
        strokeWidth="1"
        strokeOpacity="0.65"
        strokeDasharray="3 6"
        markerEnd="url(#arr-up)"
      />

      {/* Labels */}
      {steps.map((s, i) => {
        const y = FIRST_Y + i * STEP;
        return (
          <g key={i} className="plabel">
            <text x={LABEL_X} y={y - 9} fill="#F5F0E8" fontSize="11"
              fontFamily="monospace" letterSpacing="0.18em" opacity="0.4"
              style={{ textTransform: "uppercase" }}>
              {s.n}
            </text>
            <text x={LABEL_X} y={y + 14} fill={s.color} fontSize="20"
              fontFamily="var(--font-display)" letterSpacing="-0.01em">
              {s.label}
            </text>
          </g>
        );
      })}

      {/* Nodes — rendered after labels so they sit on top */}
      {steps.map((s, i) => {
        const y = FIRST_Y + i * STEP;
        return (
          <g key={i} className="pnode">
            <circle cx={LX} cy={y} r={NR}     fill="#0D0D0D" stroke={s.color} strokeWidth="1.5" />
            <circle cx={LX} cy={y} r={NR - 8} fill="none"   stroke={s.color} strokeWidth="0.5" strokeOpacity="0.3" />
          </g>
        );
      })}
    </svg>
  );
}
