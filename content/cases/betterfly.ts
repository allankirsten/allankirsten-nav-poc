import type { CaseContent } from "../types";

export const betterflyContent: CaseContent = {
  hero: {
    title: "Betterfly.",
    meta: [
      { label: "Role",    value: "Head of Product Design" },
      { label: "Year",    value: "2022–2023" },
      { label: "Sector",  value: "HR Tech / B2B SaaS" },
    ],
    tagline: "Building the design function, the design system, and the product — across eight Latin American markets at once.",
  },

  metrics: [
    { display: "8",    label: "Countries at launch",       count: 8,  suffix: "" },
    { display: "$60M", label: "Series B raised",           count: 60, prefix: "$", suffix: "M" },
    { display: "0→1",  label: "Product design org built" },
    { display: "3×",   label: "Team growth in 12 months", count: 3,  suffix: "×" },
  ],

  sections: [
    {
      label: "01 — Context",
      heading: "A category-defining platform with a design team of one.",
      body: `Betterfly is a B2B wellness and benefits platform operating across Latin America. When I joined, the product was expanding aggressively — new countries, new benefit types, new enterprise clients — but the design function hadn't kept pace.

There was no design system, no research practice, and no shared language between design and product. I was brought in to build that foundation while simultaneously delivering on a roadmap that didn't slow down for anyone.`,
      visual: "Platform overview",
    },
    {
      label: "02 — The Work",
      heading: "Build the team, build the product, build the system.",
      body: `My first move was establishing the design principles — not as a document, but as a filter for every decision. What does a Betterfly experience feel like? Warm, accessible, human. That informed everything from the component library to the tone of onboarding copy.

I structured the design system around the platform's core tension: enterprise-grade reliability that feels personal to the end user. B2B products often sacrifice one for the other. Here, both had to be true.

In parallel, I scaled the team. Defined roles, hiring criteria, and the rituals that keep a distributed design team aligned — from Brazil to Chile to Mexico.`,
      visual: "Design System tokens & components",
    },
    {
      label: "03 — Impact",
      heading: "Eight countries. One coherent product.",
      body: `Betterfly launched across 8 Latin American markets while I was leading design. The Series B closed at $60M — largely on the strength of product traction and a platform that enterprise clients trusted at scale.

The design system became the connective tissue that made multi-market expansion possible without fragmenting the experience. Same tokens, same patterns, adapted for local context where it mattered.

The team I built went from one to three in twelve months, with the infrastructure to keep growing without losing craft.`,
    },
  ],

  cta: "Got a product that needs this kind of work?",
};
