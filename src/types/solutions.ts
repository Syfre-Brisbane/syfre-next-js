export interface SolutionH1 {
  muted: string;
  highlight: string;
}

export interface SolutionUseCase {
  title: string;
  description: string;
}

export interface FrameworkAlignment {
  framework: string;
  requirement: string;
  syfreApproach: string;
}

export interface SolutionOutcome {
  metric: string;
  description: string;
}

export interface SolutionPageData {
  slug: string;
  title: string;
  description: string;
  badge: string;
  sectorTag: 'state' | 'council';
  h1: SolutionH1;
  valueProposition: string;
  challenges: {
    heading: string;
    intro: string;
    items: Array<{ title: string; description: string }>;
  };
  useCases: {
    heading: string;
    items: SolutionUseCase[];
  };
  frameworkAlignments: FrameworkAlignment[];
  outcomes: {
    heading: string;
    items: SolutionOutcome[];
  };
  faqs: Array<{ question: string; answer: string }>;
  ctaText: string;
  ctaHref: string;
  relatedSolutions: string[];
  jsonLd: {
    name: string;
    description: string;
    audienceType: string;
  };
}
