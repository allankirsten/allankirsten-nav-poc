import type { CaseContent } from "../types";

export const bipaContent: CaseContent = {
  hero: {
    title: "Bipa.",
    meta: [
      { label: "Role",    value: "Lead Product Designer" },
      { label: "Year",    value: "2022–2023" },
      { label: "Sector",  value: "B2B Fintech" },
    ],
    tagline: "Building a B2B payments product from zero — in eight months, through three pivots, as the only designer.",
  },

  metrics: [
    { display: "0→1",  label: "Product built from scratch" },
    { display: "8 mo", label: "From brief to live product", count: 8,  suffix: " mo" },
    { display: "3",    label: "Pivots absorbed mid-build",  count: 3,  suffix: "" },
    { display: "1",    label: "Designer. End to end.",      count: 1,  suffix: "" },
  ],

  sections: [
    {
      label: "01 — Context",
      heading: "A startup with a sharp idea and no product.",
      body: `Bipa came to me at zero. No interface, no design language, no component library — just a vision for a B2B payments tool that would make financial reconciliation less painful for small businesses in Brazil.

The brief was open. The deadline wasn't. Eight months to go from whiteboard to live product, with a founding team that was figuring out the business model in parallel.`,
      visual: "Discovery artifacts",
    },
    {
      label: "02 — The Problem",
      heading: "Speed without chaos.",
      body: `Startups at this stage face a specific trap: moving fast produces inconsistency, and inconsistency compounds into debt that slows everything down later.

My job was to build fast enough to ship in eight months while laying foundations solid enough to survive the company's next two years. Design system first, product second — even though both had to happen at the same time.`,
    },
    {
      label: "03 — What I Did",
      heading: "System, product, strategy. In that order.",
      body: `I started with the token layer — color, type, spacing — before drawing a single screen. With that foundation, every component I built after was consistent by default, not by review.

From there, I mapped the core flows: onboarding, payment creation, approval chain, reconciliation view. Three pivots happened mid-build. Because the system was modular, each pivot cost days, not months.

I also ran discovery sessions with the founding team to pressure-test assumptions before they became shipped features. Two features were killed before they were built. That's the work that doesn't show up in a portfolio but saves a company.`,
      visual: "Core product screens",
    },
  ],

  cta: "Got a product that needs this kind of work?",
};
