import type { Metadata } from 'next';
import Link from 'next/link';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Syfre | AI Consultant in Brisbane',
  description:
    'Get in touch with Syfre, a Brisbane AI consultancy. Tell us about the process you want to automate or the AI opportunity you are weighing up, and Steve Macfarlane will reply personally.',
  keywords: [
    'contact Syfre',
    'AI consultant Brisbane',
    'AI consultancy Brisbane',
    'Brisbane AI automation',
    'contact AI consultant Brisbane',
    'AI consulting Brisbane',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Syfre | AI Consultant in Brisbane',
    description:
      'Get in touch with Brisbane AI consultancy Syfre. Tell us about the process you want to automate or the AI opportunity you are weighing up, and we will get back to you.',
    url: 'https://syfre.ai/contact',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const CALENDLY_URL = 'https://calendly.com/steve-macfarlane-syfre';

const helpTopics = [
  {
    name: 'AI Automation',
    href: '/services/ai-automation',
    description:
      'Intelligent document processing, workflow automation, and exception handling that take real work off your team.',
  },
  {
    name: 'AI Strategy Consulting',
    href: '/services/ai-strategy-consulting',
    description:
      'An AI readiness assessment and a prioritised roadmap grounded in how your business actually runs.',
  },
  {
    name: 'AI Roadmap Workshop',
    href: '/services/ai-roadmap-workshop',
    description:
      'A half-day session that turns scattered AI ideas into a prioritised, costed delivery plan.',
  },
  {
    name: 'Agentic AI Solutions',
    href: '/services/agentic-ai-solutions',
    description:
      'AI agents that carry out multi-step work end to end, not just answer questions.',
  },
  {
    name: 'Machine Learning & Predictive Modelling',
    href: '/services/machine-learning-predictive-modelling',
    description:
      'Prediction, classification, and detection models built to be used, not just to score well.',
  },
  {
    name: 'Business Intelligence & Data Analytics',
    href: '/services/business-intelligence-data-analytics',
    description:
      'Data pipelines and dashboards that answer the questions your team actually asks.',
  },
  {
    name: 'Generative Engine Optimisation',
    href: '/services/generative-engine-optimisation',
    description:
      'Get your business cited in AI answers from ChatGPT, Claude, and Google’s AI Overviews.',
  },
];

const contactFaqs = [
  {
    question: 'How do I get in touch with Syfre?',
    answer:
      'Send a message using the form on this page, email hello@syfre.ai, or use the “Book a time” link to put a slot in the calendar. Steve Macfarlane, Syfre’s founder and lead AI consultant, reads every enquiry and replies personally.',
  },
  {
    question: 'What happens after I send a message?',
    answer:
      'Steve gets back to you to arrange a time to talk. The first conversation is about understanding the process or problem you have in mind, whether AI is the right approach, and what a build or engagement would involve — so you leave with a clear recommendation either way.',
  },
  {
    question: 'Do I need to be in Brisbane to work with Syfre?',
    answer:
      'No. Syfre is Brisbane-based and works with clients across Queensland and remotely by video. On-site work in Brisbane and South-East Queensland is available on request.',
  },
  {
    question: 'Who will I be dealing with?',
    answer:
      'Steve Macfarlane, Syfre’s founder and lead AI consultant. Steve is the named technical lead on every Syfre engagement and has built AI systems across property, aviation, professional services, financial services, and Queensland Government.',
  },
  {
    question: 'What should I include in my message?',
    answer:
      'A short description of the process or problem, rough volumes if it is an automation, any timeline you are working to, and the outcome you are after. Enough to point you in the right direction — we dig into the detail on the call.',
  },
];

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://syfre.ai/contact/#contactpage',
      url: 'https://syfre.ai/contact',
      name: 'Contact Syfre | AI Consultant in Brisbane',
      description:
        'Get in touch with Syfre, a Brisbane AI consultancy. Tell us about the process you want to automate or the AI opportunity you are weighing up, and we will get back to you.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      mainEntity: {
        '@type': 'ContactPoint',
        email: 'hello@syfre.ai',
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
      '@type': 'FAQPage',
      '@id': 'https://syfre.ai/contact/#contact-faqs',
      mainEntity: contactFaqs.map((faq) => ({
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

function ContactIntro() {
  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-light leading-8 tracking-tight text-white">
        Tell us about the process you want to automate or the AI problem you are weighing up. Steve Macfarlane, Syfre&apos;s founder, reads every enquiry and replies personally.
      </p>
      <div className="flex flex-col gap-3">
        <a
          href={CALENDLY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-400 text-black font-semibold text-lg leading-7 px-8 py-2 rounded-full h-12 w-fit inline-flex items-center justify-center"
        >
          Book a time
        </a>
        <a href="mailto:hello@syfre.ai" className="text-green-400 text-base font-normal w-fit">
          hello@syfre.ai
        </a>
      </div>
    </div>
  );
}

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
              <h1 className="text-4xl font-light leading-tight tracking-tight">
                <span className="text-zinc-300">Let&apos;s build something </span>
                <span className="text-white font-normal">intelligent.</span>
              </h1>
              <ContactIntro />
            </div>
            <ContactForm />
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden sm:flex gap-12 lg:gap-24 xl:gap-44 items-start justify-start">
            <div className="flex flex-col gap-10 w-96">
              <h1 className="text-6xl font-light leading-tight tracking-tight">
                <span className="text-zinc-300">Let&apos;s build something </span>
                <span className="text-white font-normal">intelligent.</span>
              </h1>
              <ContactIntro />
            </div>

            <ContactForm />
          </div>
        </div>
      </main>

      {/* What we can help with — service paths, no pricing */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
              What we can help with
            </h2>
            <p className="text-lg font-light leading-relaxed text-zinc-300">
              Mention any of these in your message, or browse the full range of{' '}
              <Link href="/services" className="text-green-400 hover:text-green-300 transition-colors">
                AI consulting in Brisbane
              </Link>{' '}
              we offer — strategy, automation, machine learning, agentic AI, and data.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpTopics.map((topic) => (
              <Link
                key={topic.name}
                href={topic.href}
                className="group bg-zinc-950 border border-zinc-800 rounded-lg p-6 flex flex-col gap-3 hover:border-zinc-700 transition-colors"
              >
                <h3 className="text-white font-medium text-lg">{topic.name}</h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed">
                  {topic.description}
                </p>
                <span className="text-green-400 group-hover:text-green-300 text-sm font-light mt-auto pt-2">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact FAQ */}
      <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
            Getting in touch — common questions
          </h2>
          <div className="flex flex-col divide-y divide-zinc-800">
            {contactFaqs.map((faq, index) => (
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
