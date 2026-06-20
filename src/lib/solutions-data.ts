import { SolutionPageData } from '@/types/solutions';

export const solutions: Record<string, SolutionPageData> = {
  'state-government': {
    slug: 'state-government',
    title: 'AI Solutions for Queensland State Government',
    description: 'FAIRA-ready AI governance and compliance for Queensland state agencies. QGEA-aligned AI solutions with audit-ready evidence for PAF gate reviews.',
    badge: 'State Government',
    sectorTag: 'state',
    h1: {
      muted: 'AI Solutions for',
      highlight: 'Queensland State Government',
    },
    valueProposition: 'Queensland state agencies face a clear mandate: deploy AI responsibly, or don\'t deploy it at all. The QGEA AI Governance Policy, FAIRA risk assessments, and the 8 Australian AI Ethics Principles define what compliance looks like. Syfre helps agencies meet these obligations with governance-first AI solutions that produce audit-ready evidence at every stage — from concept through to monitored production deployment.',
    challenges: {
      heading: 'Why AI governance is stalling in state agencies',
      intro: 'The Queensland Audit Office has documented gaps in AI governance across state agencies. Here are the patterns we see.',
      items: [
        {
          title: 'FAIRA assessments without AI expertise',
          description: 'The FAIRA process requires agencies to assess risk, map to ethics principles, and document controls — but most agencies don\'t have in-house AI expertise to do this with confidence. Assessments are either incomplete or overly conservative, stalling projects at Gate 3.',
        },
        {
          title: 'Governance as an afterthought',
          description: 'AI projects that start with technology and bolt on governance later produce weak evidence packs. The PAF gate process requires governance to be embedded from concept, not retrofitted before review.',
        },
        {
          title: 'Vendor claims without evidence',
          description: 'Many AI vendors claim compliance without producing the artefacts agencies need for gate reviews. Procurement officers need downloadable, version-controlled evidence — not slide decks.',
        },
      ],
    },
    useCases: {
      heading: 'How state agencies are using AI with Syfre',
      items: [
        {
          title: 'Governance Framework Establishment',
          description: 'Setting up AI governance arrangements aligned to the QGEA AI Governance Policy, with templated artefacts for each governance obligation and named accountability chains.',
        },
        {
          title: 'FAIRA-Guided AI Deployments',
          description: 'AI systems deployed with FAIRA assessment built into the project lifecycle, producing gate-ready evidence at each PAF milestone from concept through to production monitoring.',
        },
        {
          title: 'Intelligent Document Processing',
          description: 'AI-powered processing of permits, applications, and correspondence — with audit trails, human oversight, and governance controls that satisfy public records obligations.',
        },
        {
          title: 'Policy and Legislation Analysis',
          description: 'AI systems that help policy teams analyse legislation, identify regulatory impacts, and draft policy responses — with human-in-the-loop review and full transparency on AI-generated content.',
        },
      ],
    },
    frameworkAlignments: [
      {
        framework: 'QGEA AI Governance Policy',
        requirement: 'Agencies must establish governance arrangements for AI systems.',
        syfreApproach: 'Syfre delivers governance frameworks mapped directly to QGEA requirements, with templated artefacts for each obligation.',
      },
      {
        framework: 'FAIRA',
        requirement: 'All AI systems must undergo a Foundational AI Risk Assessment before deployment.',
        syfreApproach: 'FAIRA support is embedded in every engagement, with structured assessments that produce PAF gate-ready documentation.',
      },
      {
        framework: 'PAF Gate Process',
        requirement: 'AI projects must evidence governance compliance at each PAF gate.',
        syfreApproach: 'Every Syfre deliverable is structured to meet Gate 3 and Gate 4 evidence requirements without additional rework.',
      },
      {
        framework: '8 Australian AI Ethics Principles',
        requirement: 'AI systems must demonstrate alignment to the 8 principles.',
        syfreApproach: 'Ethics principle mapping is a standard deliverable in every engagement, documenting how each principle is addressed in the specific deployment context.',
      },
    ],
    outcomes: {
      heading: 'What agencies get from working with Syfre',
      items: [
        {
          metric: 'Gate-ready evidence',
          description: 'FAIRA assessments, ethics mappings, and governance artefacts structured for PAF Gate 3 and Gate 4 review — produced as standard deliverables, not extras.',
        },
        {
          metric: 'Reduced compliance risk',
          description: 'Governance embedded from concept, not retrofitted. Every AI system deployed with human oversight, audit trails, and accountability chains.',
        },
        {
          metric: 'Faster time to deployment',
          description: 'Agencies that embed governance from the start avoid the rework loop that stalls projects between Gate 3 submission and approval.',
        },
        {
          metric: 'Audit-ready documentation',
          description: 'Version-controlled, dated artefacts with named owners and evidence links — ready for Queensland Audit Office review.',
        },
      ],
    },
    faqs: [
      {
        question: 'How does Syfre help state agencies complete FAIRA assessments?',
        answer: 'Syfre provides structured support through each step of the FAIRA process: identifying the AI system, assessing risk levels, mapping to ethics principles, documenting controls, and preparing the assessment for PAF gate approval. We produce the assessment documentation as a standard deliverable, structured to meet gate evidence requirements.',
      },
      {
        question: 'What QGEA AI governance requirements does Syfre address?',
        answer: 'Syfre addresses the core QGEA AI Governance Policy requirements: establishing governance frameworks, conducting FAIRA risk assessments, aligning to the 8 Australian AI Ethics Principles, maintaining human oversight, ensuring transparency and accountability, and complying with Queensland data governance standards.',
      },
      {
        question: 'Can Syfre produce evidence for PAF Gate 3 reviews?',
        answer: 'Yes. Every Syfre engagement produces artefacts structured for PAF gate reviews, including FAIRA assessments, ethics principle mappings, human oversight arrangements, data governance compliance documentation, and accountability frameworks. These are delivered as version-controlled, dated documents with named owners.',
      },
      {
        question: 'Does Syfre use Australian-hosted infrastructure?',
        answer: 'Yes. Syfre specifies Australian-hosted infrastructure for all deployments involving Queensland Government data. Data classification follows the Queensland Government Information Security Classification Framework (QGISCF).',
      },
      {
        question: 'How does Syfre ensure human oversight of AI systems?',
        answer: 'We design human oversight mechanisms appropriate to the risk level of each deployment. Low-risk systems may use monitoring dashboards and exception-based review. High-impact decisions require mandatory human approval before the AI output is actioned. The oversight model is documented in the FAIRA assessment.',
      },
    ],
    ctaText: 'Book a FAIRA-mapped briefing',
    ctaHref: '/contact',
    relatedSolutions: ['local-councils'],
    jsonLd: {
      name: 'AI Solutions for Queensland State Government',
      description: 'FAIRA-ready AI governance and compliance for Queensland state agencies, aligned to the QGEA AI Governance Policy.',
      audienceType: 'Queensland State Government Agency',
    },
  },

  'local-councils': {
    slug: 'local-councils',
    title: 'AI Solutions for Queensland Local Councils',
    description: 'AI solutions for Queensland local councils — infrastructure monitoring, data democratisation, urban planning, and community services with governance built in.',
    badge: 'Local Councils',
    sectorTag: 'council',
    h1: {
      muted: 'AI Solutions for',
      highlight: 'Queensland Local Councils',
    },
    valueProposition: 'Queensland councils serve communities with limited resources and growing demands. AI can help — but only if it is deployed responsibly, with governance that satisfies both the QGEA requirements and community expectations. Syfre delivers practical AI solutions for municipal operations with compliance built in from day one, not bolted on after the fact.',
    challenges: {
      heading: 'Why councils struggle with AI adoption',
      intro: 'Councils face unique challenges that generic AI vendors don\'t understand.',
      items: [
        {
          title: 'Resource constraints meet compliance demands',
          description: 'Councils have smaller IT teams but face the same QGEA governance obligations as state agencies. They need AI solutions that are practical to deploy and maintain without dedicated AI staff.',
        },
        {
          title: 'Community trust and transparency',
          description: 'Council AI use is visible to ratepayers. Any deployment needs to be explainable to the community, with clear transparency about where AI is being used and how decisions are made.',
        },
        {
          title: 'Public records and archiving obligations',
          description: 'Council AI systems must comply with public records obligations. AI inputs, outputs, and decisions need to be captured and archived — not lost in opaque systems.',
        },
      ],
    },
    useCases: {
      heading: 'How councils are using AI with Syfre',
      items: [
        {
          title: 'Infrastructure Defect Detection',
          description: 'AI-powered analysis of road surfaces, footpaths, and public assets from inspection imagery — prioritising maintenance work orders based on severity and safety risk.',
        },
        {
          title: 'Development Application Processing',
          description: 'AI-assisted review of development applications for compliance with planning codes, flagging issues for human planners and reducing assessment turnaround times.',
        },
        {
          title: 'Community Service Triage',
          description: 'Intelligent routing and prioritisation of community service requests — from maintenance reports to noise complaints — with human oversight of escalation decisions.',
        },
        {
          title: 'Data Democratisation for Decision-Making',
          description: 'Making council data accessible to non-technical staff through natural language queries and automated dashboards, enabling data-informed decisions across departments.',
        },
      ],
    },
    frameworkAlignments: [
      {
        framework: 'QGEA AI Governance Policy',
        requirement: 'Local councils must establish governance arrangements aligned to QGEA.',
        syfreApproach: 'Syfre provides governance frameworks scaled for council resources — practical, maintainable, and aligned to QGEA requirements.',
      },
      {
        framework: 'FAIRA',
        requirement: 'AI systems require Foundational AI Risk Assessment.',
        syfreApproach: 'FAIRA support built into every council engagement, with assessments that account for community-facing risk and public records obligations.',
      },
      {
        framework: 'Public Records Obligations',
        requirement: 'AI inputs, outputs, and decisions must be captured for public records compliance.',
        syfreApproach: 'Every AI system includes audit trail and archiving capabilities aligned to the BCC Appropriate Use Policy and Queensland public records requirements.',
      },
      {
        framework: '8 Australian AI Ethics Principles',
        requirement: 'AI systems must align to the 8 principles, with particular attention to community impact.',
        syfreApproach: 'Ethics principle mapping with explicit consideration of community impact, fairness across demographic groups, and transparency for ratepayers.',
      },
    ],
    outcomes: {
      heading: 'What councils get from working with Syfre',
      items: [
        {
          metric: 'Practical AI with governance built in',
          description: 'AI solutions designed for council resources and operational reality — not enterprise-scale systems that require dedicated AI teams to maintain.',
        },
        {
          metric: 'Community-ready transparency',
          description: 'Every deployment includes explainability documentation that can be shared with ratepayers and community stakeholders.',
        },
        {
          metric: 'Public records compliance',
          description: 'Audit trails and archiving built into every AI system, satisfying public records obligations from day one.',
        },
        {
          metric: 'FAIRA-ready evidence',
          description: 'Governance artefacts that satisfy QGEA requirements without consuming the limited resources of council IT teams.',
        },
      ],
    },
    faqs: [
      {
        question: 'Do local councils need to comply with the QGEA AI Governance Policy?',
        answer: 'Yes. Queensland local councils are required to align with the QGEA AI Governance Policy for AI deployments. This includes conducting FAIRA risk assessments, aligning to the 8 Australian AI Ethics Principles, and maintaining appropriate governance arrangements. Syfre provides governance frameworks scaled for council resources.',
      },
      {
        question: 'How does Syfre handle public records obligations for council AI?',
        answer: 'Every AI system Syfre deploys for councils includes audit trail and archiving capabilities. AI inputs, outputs, human overrides, and decisions are captured and stored in compliance with Queensland public records requirements and the BCC Appropriate Use Policy.',
      },
      {
        question: 'Can councils deploy AI without dedicated AI staff?',
        answer: 'Yes. Syfre designs council AI solutions to be maintained by existing IT teams with standard skills. We provide training, documentation, and ongoing support arrangements. The governance framework is scaled for council resources, not enterprise-scale AI operations.',
      },
      {
        question: 'What does AI for infrastructure defect detection involve?',
        answer: 'AI analyses inspection imagery of roads, footpaths, and public assets to identify defects and prioritise maintenance. The system flags issues for human review, generates work orders, and tracks defect trends over time. All outputs include confidence scores and human oversight checkpoints.',
      },
      {
        question: 'How does Syfre ensure community transparency for council AI?',
        answer: 'Every council AI deployment includes explainability documentation that describes what the AI does, what data it uses, how decisions are made, and how community members can contest an AI-informed decision. This documentation is designed to be shared publicly.',
      },
    ],
    ctaText: 'Discuss your council\'s AI needs',
    ctaHref: '/contact',
    relatedSolutions: ['state-government'],
    jsonLd: {
      name: 'AI Solutions for Queensland Local Councils',
      description: 'AI solutions for Queensland local councils with governance built in — infrastructure monitoring, community services, and data democratisation.',
      audienceType: 'Queensland Local Council',
    },
  },
};

export const solutionsList = Object.values(solutions);

export function getSolutionBySlug(slug: string): SolutionPageData | undefined {
  return solutions[slug];
}

export function getRelatedSolutions(slugs: string[]): SolutionPageData[] {
  return slugs
    .map((slug) => solutions[slug])
    .filter((solution): solution is SolutionPageData => solution !== undefined);
}
