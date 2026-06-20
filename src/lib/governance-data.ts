export interface EthicsPrinciple {
  name: string;
  description: string;
  syfreCommitment: string;
}

export interface FAIRAStep {
  step: string;
  title: string;
  description: string;
}

export interface QGEAAlignment {
  requirement: string;
  description: string;
  syfreApproach: string;
}

export const ethicsPrinciples: EthicsPrinciple[] = [
  {
    name: 'Human, Societal and Environmental Wellbeing',
    description: 'AI systems should benefit individuals, society, and the environment.',
    syfreCommitment: 'Every AI system we build is assessed for its impact on the people it affects — not just the organisation deploying it. We design for augmentation, not replacement.',
  },
  {
    name: 'Human-Centred Values',
    description: 'AI systems should respect human rights, diversity, and the autonomy of individuals.',
    syfreCommitment: 'Our governance approach ensures human-in-the-loop oversight at every decision point where AI outputs affect individuals.',
  },
  {
    name: 'Fairness',
    description: 'AI systems should be inclusive and accessible, and should not involve or result in unfair discrimination.',
    syfreCommitment: 'We conduct bias testing and fairness assessments as part of our standard delivery process, with documented evidence at each stage.',
  },
  {
    name: 'Privacy Protection and Security',
    description: 'AI systems should respect and uphold privacy rights and data protection.',
    syfreCommitment: 'Data residency in Australia, classification aligned to the Queensland Government Information Security Classification Framework, and privacy-by-design throughout.',
  },
  {
    name: 'Reliability and Safety',
    description: 'AI systems should reliably operate in accordance with their intended purpose.',
    syfreCommitment: 'Production AI systems include monitoring, drift detection, and automated alerting. We build for reliability from day one, not as an afterthought.',
  },
  {
    name: 'Transparency and Explainability',
    description: 'There should be transparency and responsible disclosure to ensure people know when they are being significantly impacted by AI.',
    syfreCommitment: 'Audit trails capture every AI decision, input, and output. Explainability is built into the system architecture, not bolted on after deployment.',
  },
  {
    name: 'Contestability',
    description: 'When an AI system significantly impacts a person, they should be able to challenge the use or output.',
    syfreCommitment: 'We design escalation paths and human review processes for any AI output that affects individuals, with clear SLAs for review.',
  },
  {
    name: 'Accountability',
    description: 'Those responsible for AI systems should be identifiable and accountable for the outcomes.',
    syfreCommitment: 'Every AI deployment has named governance owners, documented decision authority, and clear accountability chains from operator to executive.',
  },
];

export const fairaSteps: FAIRAStep[] = [
  {
    step: '1',
    title: 'Identify the AI System',
    description: 'Define the system boundaries, intended purpose, and the specific AI capabilities being deployed. Classify the system against the QGEA AI use-case taxonomy.',
  },
  {
    step: '2',
    title: 'Assess the Risk Level',
    description: 'Evaluate the risk based on impact to individuals, sensitivity of data involved, degree of autonomy in decision-making, and reversibility of AI outputs.',
  },
  {
    step: '3',
    title: 'Map to Ethics Principles',
    description: 'Assess the system against each of the 8 Australian AI Ethics Principles. Document specific mitigations for any identified ethical risks.',
  },
  {
    step: '4',
    title: 'Document Controls and Mitigations',
    description: 'Record the governance controls, technical safeguards, human oversight mechanisms, and monitoring arrangements that address identified risks.',
  },
  {
    step: '5',
    title: 'Obtain Approval and Proceed',
    description: 'Submit the completed assessment through the appropriate approval pathway aligned to the Project Assessment Framework (PAF) gate process.',
  },
];

export const qgeaAlignments: QGEAAlignment[] = [
  {
    requirement: 'AI Governance Framework',
    description: 'Agencies must establish governance arrangements for AI systems aligned to the QGEA AI Governance Policy.',
    syfreApproach: 'Syfre provides a governance framework mapped directly to QGEA requirements, with templated artefacts for each governance obligation.',
  },
  {
    requirement: 'Risk Assessment (FAIRA)',
    description: 'All AI systems must undergo a Foundational AI Risk Assessment before deployment.',
    syfreApproach: 'We support agencies through the FAIRA process with a structured workspace that produces assessment-ready documentation aligned to PAF gates.',
  },
  {
    requirement: 'Ethics Principles Alignment',
    description: 'AI systems must demonstrate alignment to the 8 Australian AI Ethics Principles.',
    syfreApproach: 'Every engagement includes an ethics principle mapping that documents how each principle is addressed in the specific deployment context.',
  },
  {
    requirement: 'Human Oversight',
    description: 'Appropriate human-in-the-loop controls must be maintained for AI-assisted decisions.',
    syfreApproach: 'We design human oversight mechanisms appropriate to the risk level — from monitoring dashboards for low-risk systems to mandatory human approval for high-impact decisions.',
  },
  {
    requirement: 'Transparency and Accountability',
    description: 'AI use must be transparent, with clear accountability for outcomes.',
    syfreApproach: 'Audit trails, decision logs, and named accountability chains are standard deliverables in every Syfre engagement.',
  },
  {
    requirement: 'Data Governance',
    description: 'Data used in AI systems must comply with Queensland information management standards.',
    syfreApproach: 'Australian-hosted data residency, classification aligned to the QGISCF, and data handling procedures that satisfy public records obligations.',
  },
];

export const governanceFAQs = [
  {
    question: 'What is FAIRA and how do I complete the assessment?',
    answer: 'FAIRA (Foundational AI Risk Assessment) is the Queensland Government\'s mandatory risk assessment for AI systems. It requires agencies to identify the AI system, assess risk levels based on impact and autonomy, map the system to the 8 Australian AI Ethics Principles, document controls and mitigations, and obtain approval through the appropriate PAF gate. Syfre supports agencies through each step with structured templates and governance expertise.',
  },
  {
    question: 'What does QGEA require for AI deployments?',
    answer: 'The QGEA AI Governance Policy requires agencies to establish governance frameworks for AI, conduct FAIRA risk assessments, align to the 8 Australian AI Ethics Principles, maintain human oversight, ensure transparency and accountability, and comply with Queensland data governance standards. These requirements apply to all AI systems deployed within Queensland Government agencies.',
  },
  {
    question: 'How does Syfre help agencies meet QGEA AI governance requirements?',
    answer: 'Syfre provides governance frameworks mapped directly to QGEA obligations, supports agencies through the FAIRA assessment process, produces ethics principle mappings for each deployment, designs appropriate human oversight mechanisms, and delivers audit-ready documentation aligned to PAF gate requirements. Our approach is grounded in the principle that AI should augment human capability, not replace human judgement.',
  },
  {
    question: 'What are the 8 Australian AI Ethics Principles?',
    answer: 'The 8 principles are: Human, Societal and Environmental Wellbeing; Human-Centred Values; Fairness; Privacy Protection and Security; Reliability and Safety; Transparency and Explainability; Contestability; and Accountability. Queensland Government agencies must demonstrate alignment to these principles for all AI deployments as part of the QGEA AI Governance Policy.',
  },
  {
    question: 'How do I evidence AI governance at PAF Gate 3?',
    answer: 'PAF Gate 3 requires evidence that AI governance obligations have been addressed, including a completed FAIRA assessment, ethics principle alignment documentation, human oversight arrangements, data governance compliance, and accountability frameworks. Syfre produces these artefacts as standard deliverables, structured to meet Gate 3 evidence requirements without additional rework.',
  },
  {
    question: 'Does Syfre provide Australian-hosted AI solutions?',
    answer: 'Yes. Syfre specifies Australian-hosted infrastructure for all deployments involving Queensland Government data. Data classification follows the Queensland Government Information Security Classification Framework, and data handling procedures are designed to satisfy public records obligations under Queensland legislation.',
  },
];
