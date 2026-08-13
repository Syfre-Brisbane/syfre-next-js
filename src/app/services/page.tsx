import type { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import ServiceHero from '@/components/services/ServiceHero';
import ServiceExplainer from '@/components/services/ServiceExplainer';
import ServiceClients from '@/components/services/ServiceClients';
import ServiceCard from '@/components/services/ServiceCard';
import ServiceFAQ from '@/components/services/ServiceFAQ';
import GovernanceCredentials from '@/components/shared/GovernanceCredentials';
import { servicesList } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'AI Consultant Brisbane',
  description:
    'Syfre is a Brisbane-based AI consultancy led by Steve Macfarlane — AI strategy, automation, machine learning, and agentic AI for Queensland businesses and government. Free 30-minute scoping call.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'AI Consultant Brisbane | Syfre AI Consultancy',
    description:
      'Founder-led, governance-first AI consulting in Brisbane. Strategy, automation, machine learning, agentic AI, and business intelligence for Queensland businesses and government.',
    url: 'https://syfre.ai/services',
    type: 'website',
    images: [OG_IMAGE],
  },
};

// Extractable, GEO-friendly Q&A targeting the "AI consultant / consulting Brisbane"
// query cluster. ServiceFAQ emits FAQPage JSON-LD from this array.
const faqs = [
  {
    question: 'What does an AI consultant in Brisbane do?',
    answer:
      'An AI consultant helps your organisation identify where artificial intelligence can deliver measurable value, then designs and builds the systems to capture it. At Syfre that spans AI strategy, automation, machine learning, agentic AI, and business intelligence — grounded in what current AI can actually do, and governed to the Australian AI Ethics Principles. We serve Brisbane, South-East Queensland, and clients across Australia.',
  },
  {
    question: 'How much does an AI consultant cost in Brisbane?',
    answer:
      'Syfre engagements are fixed-scope and quoted after a free 30-minute scoping call, so you know the cost before committing. Pricing depends on the work — a half-day AI Roadmap Workshop is a fixed fee, while automation or machine-learning builds are quoted by scope. There are no open-ended retainers, and there is no charge for the initial consultation.',
  },
  {
    question: 'Who is the lead AI consultant at Syfre?',
    answer:
      'Every Syfre engagement is led by Steve Macfarlane, founder and lead AI consultant. Steve has built production AI systems across property, aviation, professional services, financial services, and Queensland Government. You work directly with a practitioner who builds AI systems — not an account manager who outsources the delivery.',
  },
  {
    question: 'Do you work with Queensland Government agencies?',
    answer:
      'Yes. Syfre delivers governance-first AI for Queensland state agencies, local councils, and Queensland Health, mapped to the QGEA AI Governance Policy, the Foundational AI Risk Assessment (FAIRA), and the 8 Australian AI Ethics Principles — with audit-ready evidence produced as standard. Government agencies can request a FAIRA-mapped governance briefing.',
  },
  {
    question: 'Can I work with a Syfre AI consultant remotely, or only in Brisbane?',
    answer:
      'Both. We deliver on-site for Brisbane and South-East Queensland clients, and remotely by video conference anywhere in Australia. The initial scoping call is run by video or in person in Brisbane — whichever suits you.',
  },
  {
    question: 'What industries has Syfre worked in?',
    answer:
      'Syfre has built AI systems across property, aviation, professional services, financial services, and Queensland Government. The underlying techniques transfer across industries — what matters most is clean data and a clearly defined business problem, both of which we assess in the scoping call.',
  },
  {
    question: 'How is Syfre different from other AI consulting firms in Brisbane?',
    answer:
      'Syfre is an AI-native consultancy, not an IT firm that added AI to its service list. Our strategies are built by the people who also build the systems, so recommendations are grounded in engineering reality. We are founder-led, vendor-neutral, and governance-first — every engagement ships with the evidence Australian organisations need to deploy AI responsibly.',
  },
];

const whySyfre = [
  {
    label: 'Founder-led',
    description:
      'Every engagement is led by Steve Macfarlane, Syfre’s founder and lead AI consultant. You work directly with a practitioner who builds AI systems, not an account manager who outsources the thinking.',
  },
  {
    label: 'Brisbane-based',
    description:
      'Headquartered in Brisbane and focused on Queensland. We deliver on-site across Brisbane and South-East Queensland, or remotely anywhere in Australia.',
  },
  {
    label: 'Vendor-neutral',
    description:
      'No reseller agreements and no vendor partnerships. We recommend open-source, commercial, or custom-built solutions based on what fits your needs — not a commission.',
  },
  {
    label: 'Proven in production',
    description:
      'AI systems delivered across property, aviation, professional services, financial services, and Queensland Government — engineered to reach production, not just a demo.',
  },
];

const engagementSteps = [
  {
    title: 'Free 30-minute scoping call',
    description:
      'We start with a free, no-obligation scoping call to understand your goals, your data, and whether AI is genuinely the right fit for the problem in front of you.',
  },
  {
    title: 'Fixed-scope proposal',
    description:
      'You receive a written proposal with clear scope, timeline, and a fixed quote. No open-ended retainers, no scope creep, no surprises on the invoice.',
  },
  {
    title: 'Delivery & handover',
    description:
      'We build in sprints, involve your team throughout, and hand over production-ready systems with documentation and governance artefacts your organisation can stand behind.',
  },
];

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://syfre.ai/services#webpage',
      url: 'https://syfre.ai/services',
      name: 'AI Consultant Brisbane',
      description:
        'Founder-led AI consulting in Brisbane — strategy, automation, machine learning, agentic AI, and business intelligence for Queensland businesses and government.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      about: { '@id': 'https://syfre.ai/#organization' },
      primaryImageOfPage: 'https://syfre.ai/og-default.png',
      breadcrumb: { '@id': 'https://syfre.ai/services#breadcrumb' },
    },
    {
      // Extends the sitewide #organization entity from the root layout; same
      // @id so the nodes merge. Adds the founder Person and offer catalogue so
      // AI systems associate "Steve Macfarlane", "AI consultant" and "Brisbane".
      '@type': ['ProfessionalService', 'Organization'],
      '@id': 'https://syfre.ai/#organization',
      name: 'Syfre AI Solutions',
      alternateName: 'Syfre',
      url: 'https://syfre.ai',
      description:
        'Brisbane-based AI consultancy delivering AI strategy, automation, machine learning, agentic AI, and business intelligence with governance mapped to the Australian AI Ethics Principles.',
      areaServed: [
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'State', name: 'Queensland' },
        { '@type': 'Country', name: 'Australia' },
      ],
      founder: {
        '@type': 'Person',
        name: 'Steve Macfarlane',
        jobTitle: 'Founder & AI Consultant',
        url: 'https://syfre.ai/about',
        sameAs: ['https://www.linkedin.com/in/stevemacfarlaneaibrisbane'],
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'AI Consulting Services',
        itemListElement: servicesList.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.jsonLd.serviceName,
            url: `https://syfre.ai/services/${service.slug}`,
          },
        })),
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://syfre.ai/services#service',
      name: 'AI Consulting',
      serviceType: 'AI Consulting',
      description:
        'AI consulting in Brisbane covering strategy, automation, machine learning, agentic AI, business intelligence, and generative engine optimisation.',
      provider: { '@id': 'https://syfre.ai/#organization' },
      areaServed: [
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'State', name: 'Queensland' },
        { '@type': 'Country', name: 'Australia' },
      ],
      mainEntityOfPage: { '@id': 'https://syfre.ai/services#webpage' },
    },
    {
      '@type': 'ItemList',
      itemListElement: servicesList.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.jsonLd.serviceName,
        url: `https://syfre.ai/services/${service.slug}`,
      })),
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://syfre.ai/services#breadcrumb',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://syfre.ai/services' },
      ],
    },
  ],
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Header />
      <main>
        <ServiceHero
          badge="Brisbane AI Consultancy"
          h1={{ muted: 'AI Consultant', highlight: 'Brisbane' }}
          valueProposition="Syfre is a Brisbane-based AI consultancy led by Steve Macfarlane, an AI consultant who has built production AI systems across property, aviation, professional services, financial services, and Queensland Government. We help ambitious Queensland businesses and public-sector teams move from AI ideas to systems that deliver measurable commercial impact."
          ctaText="Book a free scoping call"
          ctaHref="/contact"
        />

        <ServiceExplainer
          heading="What does an AI consultant in Brisbane do?"
          body="An AI consultant helps an organisation decide where artificial intelligence can create real value, then designs and builds the systems to deliver it. A good AI consultant starts with your business objectives — not the technology — and works backwards to the right capability, whether that is automation, machine learning, agentic AI, or business intelligence. Syfre works as a founder-led AI consultancy in Brisbane: we assess your AI readiness, prioritise the highest-ROI opportunities, build production-ready systems, and embed governance mapped to the 8 Australian AI Ethics Principles so every solution is safe, auditable, and actually adopted."
        />

        <ServiceClients />

        {/* Why Syfre — E-E-A-T / local credibility */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
                Why work with Syfre
              </h2>
              <p className="text-lg font-light leading-relaxed text-zinc-300">
                Most AI consulting firms in Brisbane are IT companies that added AI to the brochure.
                Syfre is AI-native: the person who sets your strategy is the person who builds the systems.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whySyfre.map((item) => (
                <div
                  key={item.label}
                  className="border border-zinc-800 rounded-lg p-6 hover:border-zinc-700 transition-colors"
                >
                  <div className="text-green-400 font-semibold text-sm mb-2">{item.label}</div>
                  <p className="text-zinc-400 text-base font-light leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services grid — retains the hub function, links to the ranking subpages */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
                AI consulting services in Brisbane
              </h2>
              <p className="text-lg font-light leading-relaxed text-zinc-300">
                From strategy through to production. Start with the capability you need, or begin with a
                roadmap and let the priorities emerge.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Engagement + pricing signal */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
                How to work with a Syfre AI consultant
              </h2>
              <p className="text-lg font-light leading-relaxed text-zinc-300">
                Engagements are fixed-scope and quoted after the free scoping call. Whether you need a
                half-day AI Roadmap Workshop or a multi-month build, you will know the cost before you commit.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {engagementSteps.map((step, index) => (
                <div key={step.title} className="border border-zinc-800 rounded-lg p-6">
                  <div className="text-green-400 font-semibold text-sm mb-3">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-white font-medium text-lg mb-2">{step.title}</h3>
                  <p className="text-zinc-400 text-base font-light leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
            <Link
              href="/contact"
              className="bg-green-400 text-black font-semibold text-lg px-8 py-3 rounded-full w-fit inline-flex items-center justify-center hover:bg-green-300 transition-colors"
            >
              Book a free scoping call
            </Link>
          </div>
        </section>

        <ServiceFAQ faqs={faqs} />

        <GovernanceCredentials />
      </main>
      <SecondCTA />
      <Footer />
    </div>
  );
}
