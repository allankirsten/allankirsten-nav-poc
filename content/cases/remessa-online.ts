import type { CaseContent } from "../types";

export const remessaContent: CaseContent = {
  hero: {
    title: "Remessa\nOnline.",
    meta: [
      { label: "Company", value: "Remessa Online" },
      { label: "Role",    value: "Lead Product Designer" },
      { label: "Year",    value: "2021–2022" },
      { label: "Sector",  value: "Fintech / FX" },
    ],
    tagline: "From 40 thousand to 4 million users. One redesign, one design system, two years.",
  },

  metrics: [
    { display: "100×",  label: "User growth (40k to 4M)",    count: 100, suffix: "×" },
    { display: "$229M", label: "Exit valuation (EBANX)",      count: 229, prefix: "$", suffix: "M" },
    { display: "−60%",  label: "Delivery time, post-DS" },
    { display: "2 yr",  label: "Time leading product design", count: 2,   suffix: " yr" },
  ],

  sections: [
    {
      label: "01 — Context",
      heading: "A fintech growing faster than its own infrastructure.",
      body: `When I joined Remessa Online, the product was moving at a pace that the design process couldn't keep up with. Forty thousand active users, a small team, and a roadmap that kept expanding.

The mission was clear: make the product scale without losing quality. That meant solving both the near-term UX problems and the underlying structural ones — simultaneously.`,
      visual: "Onboarding flow mapping",
    },
    {
      label: "02 — The Work",
      heading: "Redesign the experience. Then build the system that prevents the next redesign.",
      body: `I started by mapping the onboarding flow — the single highest-friction surface in the product. Three main drop-off points. Each one rooted in a different problem: copy that assumed too much, a flow that asked for information at the wrong moment, and a verification step that felt like a dead end.

After fixing the flow, I turned to the foundation. I built Remessa's first Design System from scratch: tokens, components, interaction patterns. The goal was to make future design decisions fast and consistent by default — not by convention.

The system reduced delivery time on new interfaces by 60%. More importantly, it gave the engineering team a shared language with design, which changed how we collaborated.`,
      visual: "Design System components",
    },
    {
      label: "03 — Scale",
      heading: "From 40k to 4 million.",
      body: `Over two years, the user base grew 100x. The product shipped continuously — new corridors, new features, new markets — without accumulating the kind of design debt that usually comes with that pace.

The exit to EBANX at a $229M valuation closed while I was still at the company. The design system and the product foundations I built were part of what made that scale possible.`,
    },
  ],

  cta: "Got a product that needs this kind of work?",
};
