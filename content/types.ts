export type Frame = {
  id: string;
  label: string;
  title: string;
  sub: string;
  subHref?: string;
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
  visual?: string; // if set, renders a placeholder block after the section
};

export type CaseContent = {
  hero: {
    title: string;        // use \n for line breaks
    meta: { label: string; value: string }[];
    tagline: string;
  };
  metrics: CaseMetric[];
  sections: CaseSection[];
  cta: string;
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
};

export type HowIWorkContent = {
  tagline: string;
  pillars: HowIWorkPillar[];
  process: HowIWorkStep[];
  cta: string;
};
