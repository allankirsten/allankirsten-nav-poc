export type Frame = {
  id: string;
  label: string;
  title: string;
  sub: string;
  subHref?: string;
  cta?: string;          // label do link (underline + arrow) quando subHref está presente
  bg: string;
  text: string;
  links?: Record<string, string>;
};

export type CaseMetric = {
  label: string;
  display: string;
  count?: number;
  prefix?: string;
  suffix?: string;
};

export type CaseSection = {
  label: string;
  heading: string;
  body: string;
  visual?: string;    // descriptive label; renders placeholder if no visualSrc
  visualSrc?: string; // image path; renders real image when set
  visualSrcMobile?: string; // optional art-directed crop, used below the 640px breakpoint
};

export type CaseContent = {
  hero: {
    title: string;        // use \n for line breaks
    meta: { label: string; value: string }[];
    tagline: string;
  };
  heroImage?: string;     // path or URL; renders dark placeholder if omitted
  heroImageMobile?: string; // optional art-directed crop, used below the 640px breakpoint
  metrics: CaseMetric[];
  sections: CaseSection[];
  gallery?: { src: string; alt?: string }[]; // photo strip rendered after the sections
};

export type HowIWorkPillar = {
  number: string;
  word: string;
  headline: string;
  body: string;
};

export type HowIWorkStep = {
  step: string;
  label: string;
  desc: string;
  phase: "Data" | "Initiative";
};

export type HowIWorkContent = {
  tagline: string;
  pillars: HowIWorkPillar[];
  processIntro: string;
  processLoop: string;
  process: HowIWorkStep[];
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export type WorkItem = {
  slug: string;
  name: string;
  tagline: string;
};
