import type { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Syfre | Book an AI Automation Consultation in Brisbane',
  description:
    'Book an AI automation consultation, an AI roadmap workshop, or a FAIRA-mapped governance briefing with Syfre, a Brisbane-based AI consultancy. Free 30-minute scoping call available.',
  keywords: [
    'book AI automation consultation',
    'book an AI automation consultation',
    'AI automation consultation Brisbane',
    'AI consultation booking',
    'book AI roadmap workshop',
    'FAIRA briefing booking',
    'AI consultant Brisbane',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Book an AI Automation Consultation | Syfre',
    description:
      'Book an AI automation consultation, an AI roadmap workshop, or a FAIRA-mapped governance briefing with Brisbane AI consultancy Syfre. Free 30-minute scoping call.',
    url: 'https://syfre.ai/contact',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const CALENDLY_URL = 'https://calendly.com/steve-macfarlane-syfre';

const consultationTypes = [
  {
    name: 'AI Automation Consultation',
    href: '/services/ai-automation',
    audience: 'Operations, finance, and customer service teams',
    duration: '30 minutes',
    price: 'No charge',
    description:
      'Scope an AI automation opportunity — intelligent document processing, exception-handling workflows, or AI-extended RPA. Output is a fixed-scope build plan with timeline and indicative cost.',
    cta: 'Book an AI automation consultation',
    keywords: 'book AI automation consultation Brisbane',
  },
  {
    name: 'AI Roadmap Workshop Scoping Call',
    href: '/services/ai-roadmap-workshop',
    audience: 'CEOs, CTOs, boards, government agency leadership',
    duration: '30 minutes',
    price: 'No charge',
    description:
      'Scope a two-week AI Roadmap Workshop that delivers a prioritised AI Opportunity Register, a 12-month delivery roadmap, and a FAIRA-aligned governance scaffold. Suitable for organisations of 50–2,000 staff.',
    cta: 'Book a workshop scoping call',
    keywords: 'book AI roadmap workshop Brisbane',
  },
  {
    name: 'FAIRA-Mapped Governance Briefing',
    href: '/governance',
    audience: 'Queensland Government agencies and councils',
    duration: '45 minutes',
    price: 'No charge',
    description:
      'A briefing on how Syfre aligns to the QGEA AI Governance Policy, FAIRA, and the 8 Australian AI Ethics Principles — with a walkthrough of the artefacts we produce for PAF Gate 3 evidence.',
    cta: 'Book a FAIRA briefing',
    keywords: 'book FAIRA AI governance briefing Queensland',
  },
];

const bookingFaqs = [
  {
    question: 'How do I book an AI automation consultation?',
    answer:
      'You can book an AI automation consultation in two ways: use the "Book a call" button on this page to choose a time via Calendly, or send a message via the contact form on this page describing your automation problem and we will reply with a time. The first AI automation consultation is a 30-minute video or in-person scoping call run by Steve Macfarlane, Syfre\'s founder and lead AI consultant.',
  },
  {
    question: 'What does an AI automation consultation cost?',
    answer:
      'The initial 30-minute AI automation consultation is free. There is no obligation to engage Syfre afterwards. If you decide to proceed, we provide a fixed-scope quote for the automation build before any paid work begins.',
  },
  {
    question: 'What happens during an AI automation consultation?',
    answer:
      'The consultation has three parts: (1) you describe the process you want to automate and the volume and pain points involved, (2) we determine whether AI automation is the right approach versus simpler RPA or workflow tooling, and (3) we sketch a fixed-scope build plan with timeline, deliverables, and indicative cost. You leave the call with a clear recommendation, whether or not we are the right partner.',
  },
  {
    question: 'Can I book a consultation remotely or only in Brisbane?',
    answer:
      'Both. AI automation consultations are run by video conference for clients outside Brisbane, or in person for Brisbane and South-East Queensland clients on request. Workshops and engagements are delivered on-site in Brisbane and across Queensland, or remotely with collaborative whiteboarding tools.',
  },
  {
    question: 'Who runs the consultation?',
    answer:
      'Every initial consultation is run by Steve Macfarlane, Syfre\'s founder and lead AI consultant. Steve has built AI systems across property, aviation, professional services, financial services, and Queensland Government, and is the named technical lead on every Syfre engagement.',
  },
  {
    question: 'What if I am a Queensland Government agency?',
    answer:
      'Queensland Government agencies and councils should book a FAIRA-mapped governance briefing instead of (or alongside) the AI automation consultation. The briefing walks through how Syfre aligns to the QGEA AI Governance Policy, FAIRA, and the 8 Australian AI Ethics Principles, and the artefacts we produce for PAF Gate 3 evidence.',
  },
];

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://syfre.ai/contact/#contactpage',
      url: 'https://syfre.ai/contact',
      name: 'Book an AI Automation Consultation | Contact Syfre',
      description:
        'Book an AI automation consultation, an AI roadmap workshop, or a FAIRA-mapped governance briefing with Syfre, a Brisbane AI consultancy.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      mainEntity: {
        '@type': 'ContactPoint',
        email: 'hello@syfre.com.au',
        telephone: '+61414383094',
        contactType: 'sales',
        url: 'https://syfre.ai/contact',
        areaServed: [
          { '@type': 'City', name: 'Brisbane' },
          { '@type': 'State', name: 'Queensland' },
          { '@type': 'Country', name: 'Australia' },
        ],
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://syfre.ai/contact/#ai-automation-consultation',
      name: 'AI Automation Consultation',
      alternateName: [
        'Book an AI Automation Consultation',
        'AI Automation Scoping Call',
      ],
      description:
        'A 30-minute, no-charge AI automation consultation with Syfre\'s lead AI consultant. Used to scope intelligent document processing, workflow automation, exception handling, or RPA-plus-AI opportunities and produce a fixed-scope build plan.',
      serviceType: 'AI Automation Consultation',
      provider: { '@id': 'https://syfre.ai/#organization' },
      areaServed: [
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'State', name: 'Queensland' },
        { '@type': 'Country', name: 'Australia' },
      ],
      offers: {
        '@type': 'Offer',
        name: 'Book an AI automation consultation',
        url: CALENDLY_URL,
        priceCurrency: 'AUD',
        price: '0',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://syfre.ai/#organization' },
        potentialAction: {
          '@type': 'ReserveAction',
          name: 'Book an AI automation consultation',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: CALENDLY_URL,
            actionPlatform: [
              'https://schema.org/DesktopWebPlatform',
              'https://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'AI Automation Consultation',
            provider: { '@id': 'https://syfre.ai/#organization' },
          },
        },
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://syfre.ai/contact/#ai-roadmap-workshop-call',
      name: 'AI Roadmap Workshop Scoping Call',
      alternateName: ['Book an AI Roadmap Workshop', 'AI Roadmap Workshop Booking'],
      description:
        'Book a 30-minute scoping call for the Syfre AI Roadmap Workshop — a two-week, expert-led engagement that produces a prioritised AI roadmap, governance scaffold, and executive business cases.',
      serviceType: 'AI Strategy Workshop Booking',
      provider: { '@id': 'https://syfre.ai/#organization' },
      areaServed: [
        { '@type': 'City', name: 'Brisbane' },
        { '@type': 'State', name: 'Queensland' },
        { '@type': 'Country', name: 'Australia' },
      ],
      offers: {
        '@type': 'Offer',
        name: 'Book an AI roadmap workshop scoping call',
        url: CALENDLY_URL,
        priceCurrency: 'AUD',
        price: '0',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://syfre.ai/#organization' },
      },
    },
    {
      '@type': 'Service',
      '@id': 'https://syfre.ai/contact/#faira-briefing',
      name: 'FAIRA-Mapped AI Governance Briefing',
      alternateName: ['Book a FAIRA Briefing', 'QGEA AI Governance Briefing'],
      description:
        'A 45-minute briefing for Queensland Government agencies and councils on how Syfre aligns to the QGEA AI Governance Policy, FAIRA risk assessments, and the 8 Australian AI Ethics Principles, with a walkthrough of artefacts produced for PAF Gate 3 evidence.',
      serviceType: 'AI Governance Briefing',
      provider: { '@id': 'https://syfre.ai/#organization' },
      audience: {
        '@type': 'GovernmentOrganization',
        name: 'Queensland Government Agencies and Councils',
      },
      offers: {
        '@type': 'Offer',
        name: 'Book a FAIRA-mapped briefing',
        url: CALENDLY_URL,
        priceCurrency: 'AUD',
        price: '0',
        availability: 'https://schema.org/InStock',
        seller: { '@id': 'https://syfre.ai/#organization' },
      },
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://syfre.ai/contact/#booking-faqs',
      mainEntity: bookingFaqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://syfre.ai/contact' },
      ],
    },
  ],
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Header />

      <main className="px-4 sm:px-6 py-12 sm:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col gap-12 sm:hidden">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="text-4xl sm:text-6xl font-light leading-tight tracking-tight">
                  <span className="text-zinc-300">Let&apos;s build something </span>
                  <span className="text-white font-normal">intelligent.</span>
                </div>
                <p className="text-lg sm:text-2xl font-light leading-7 sm:leading-8 tracking-tight text-white">
                  Book an AI automation consultation, an AI roadmap workshop, or a FAIRA-mapped governance briefing — or leave a message.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-400 text-black font-semibold text-lg leading-7 px-8 py-2 rounded-full h-12 w-fit inline-flex items-center justify-center"
                >
                  Book a call
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <a href="mailto:hello@syfre.com.au" className="text-green-400 text-base font-normal">
                    hello@syfre.com.au
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <p className="text-white font-medium text-sm mb-1">Queensland Government?</p>
                <p className="text-zinc-400 text-sm font-light">
                  Book a FAIRA-mapped briefing to see how Syfre aligns to your QGEA governance obligations.
                </p>
              </div>
            </div>
            <ContactForm />
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden sm:flex gap-12 lg:gap-24 xl:gap-44 items-start justify-start">
            <div className="flex flex-col gap-14 w-96">
              <div className="flex flex-col gap-6">
                <h1 className="text-6xl font-light leading-tight tracking-tight">
                  <span className="text-zinc-300">Let&apos;s build something </span>
                  <span className="text-white font-normal">intelligent.</span>
                </h1>
                <p className="text-2xl font-light leading-8 tracking-tight text-white">
                  Book an AI automation consultation, an AI roadmap workshop, or a FAIRA-mapped governance briefing — or leave a message.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-400 text-black font-semibold text-lg leading-7 px-8 py-2 rounded-full h-12 w-fit inline-flex items-center justify-center"
                >
                  Book a call
                </a>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <a href="mailto:hello@syfre.com.au" className="text-green-400 text-base font-normal">
                    hello@syfre.com.au
                  </a>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-5">
                <p className="text-white font-medium text-sm mb-1">Queensland Government?</p>
                <p className="text-zinc-400 text-sm font-light">
                  Book a FAIRA-mapped briefing to see how Syfre aligns to your QGEA governance obligations.
                </p>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </main>

      {/* What you can book — entity-rich consultation types */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              What you can book
            </h2>
            <p className="text-lg font-light leading-relaxed text-zinc-300">
              Every initial consultation is run by Steve Macfarlane, Syfre&apos;s founder and lead AI consultant. All initial calls are free, delivered by video conference or in person in Brisbane, and have no obligation to engage further.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {consultationTypes.map((consultation) => (
              <div
                key={consultation.name}
                className="bg-zinc-950 border border-zinc-800 rounded-lg p-6 flex flex-col gap-4"
              >
                <div>
                  <h3 className="text-white font-medium text-xl mb-2">{consultation.name}</h3>
                  <p className="text-zinc-400 font-light text-sm leading-relaxed">
                    {consultation.description}
                  </p>
                </div>

                <dl className="flex flex-col gap-1.5 text-sm border-t border-zinc-900 pt-4">
                  <div className="flex gap-2">
                    <dt className="text-zinc-500 font-light w-20">For</dt>
                    <dd className="text-zinc-300 font-light">{consultation.audience}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-zinc-500 font-light w-20">Length</dt>
                    <dd className="text-zinc-300 font-light">{consultation.duration}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="text-zinc-500 font-light w-20">Cost</dt>
                    <dd className="text-zinc-300 font-light">{consultation.price}</dd>
                  </div>
                </dl>

                <div className="flex flex-col gap-2 mt-auto pt-2">
                  <a
                    href={CALENDLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-400 text-black font-semibold text-sm px-5 py-2.5 rounded-full inline-flex items-center justify-center"
                  >
                    {consultation.cta}
                  </a>
                  <Link
                    href={consultation.href}
                    className="text-zinc-400 hover:text-white text-sm font-light text-center"
                  >
                    Learn more →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking-intent FAQ */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
            Booking an AI consultation — common questions
          </h2>
          <div className="flex flex-col divide-y divide-zinc-800">
            {bookingFaqs.map((faq, index) => (
              <div key={index} className="py-8 first:pt-0 last:pb-0">
                <h3 className="text-white font-medium text-lg mb-3">{faq.question}</h3>
                <p className="text-zinc-400 font-light leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
