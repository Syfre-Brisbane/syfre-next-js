export interface ServiceH1 {
  muted: string;
  highlight: string;
  suffix?: string;
}

export interface ServiceFeature {
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceUseCase {
  title: string;
  description: string;
}

export interface ServicePageData {
  slug: string;
  title: string;
  description: string;
  badge: string;
  h1: ServiceH1;
  valueProposition: string;
  ctaText: string;
  ctaHref: string;
  differentiator: {
    heading: string;
    intro: string;
    painPoints: Array<{
      title: string;
      description: string;
    }>;
  };
  features: {
    heading: string;
    items: ServiceFeature[];
  };
  process: {
    heading: string;
    steps: ServiceProcessStep[];
  };
  useCases: {
    heading: string;
    items: ServiceUseCase[];
  };
  relatedServices: string[];
  jsonLd: {
    serviceName: string;
    serviceDescription: string;
    serviceType: string;
  };
}
