import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';

export const metadata: Metadata = {
  title: 'About Syfre | Brisbane AI Consultancy',
  description: 'Syfre is a Brisbane-based AI consultancy focused on responsible AI that augments human capability. Queensland-focused, governance-first AI solutions.',
  alternates: {
    canonical: '/about',
  },
  openGraph: {
    title: 'About Syfre | Brisbane AI Consultancy',
    description: 'Syfre is a Brisbane-based AI consultancy focused on responsible AI that augments human capability.',
    url: 'https://syfre.ai/about',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://syfre.ai/about/#aboutpage',
      url: 'https://syfre.ai/about',
      name: 'About Syfre AI Solutions',
      description: 'Brisbane-based AI consultancy focused on responsible AI that augments human capability.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      mainEntity: { '@id': 'https://syfre.ai/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://syfre.ai' },
        { '@type': 'ListItem', position: 2, name: 'About', item: 'https://syfre.ai/about' },
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <Header />
      <main>
        {/* Hero */}
        <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight mb-8">
                <span className="text-zinc-400">AI with </span>
                <span className="text-white font-normal">human values</span>
              </h1>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300 mb-6">
                Syfre is a Brisbane-based AI consultancy built on a straightforward belief: artificial intelligence should augment human capability, not replace human judgement. Every system we build, every governance framework we deliver, and every strategy we recommend is grounded in this principle.
              </p>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                We work with ambitious organisations across Queensland — from state government agencies navigating QGEA compliance to private sector teams building their first AI systems. The common thread is a commitment to doing AI responsibly, with governance and ethics built in from day one.
              </p>
            </div>
          </div>
        </section>

        {/* Why Queensland */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-6">
              <span className="text-zinc-400">Why </span>
              <span className="text-white font-normal">Queensland</span>
            </h2>
            <div className="max-w-3xl space-y-6">
              <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Queensland is building some of the most thoughtful AI governance frameworks in Australia. The QGEA AI Governance Policy, the FAIRA risk assessment process, and the commitment to the 8 Australian AI Ethics Principles set a high bar — and that is exactly the environment where responsible AI consultancies should operate.
              </p>
              <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Syfre is headquartered in Brisbane because this is where the work matters most. State agencies need partners who understand their governance obligations. Councils need AI that works within municipal constraints. Queensland Health needs solutions that prioritise clinical safety and reach rural communities. We are building for this specific context, not applying generic frameworks from elsewhere.
              </p>
            </div>
          </div>
        </section>

        {/* What We Believe */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
              <span className="text-zinc-400">What we </span>
              <span className="text-white font-normal">believe</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="border-l-2 border-green-400 pl-6">
                <h3 className="text-white font-medium text-lg mb-3">AI augments, it does not replace</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  The best AI systems make humans better at what they do. They handle the repetitive, surface the relevant, and free people to apply judgement, creativity, and empathy — the things machines cannot do.
                </p>
              </div>
              <div className="border-l-2 border-green-400 pl-6">
                <h3 className="text-white font-medium text-lg mb-3">Governance is not a blocker</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  Done well, governance accelerates AI deployment. It gives teams confidence to move forward, stakeholders confidence to approve, and communities confidence to trust. We embed governance from concept, not as a retrofit.
                </p>
              </div>
              <div className="border-l-2 border-green-400 pl-6">
                <h3 className="text-white font-medium text-lg mb-3">Evidence over claims</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  We produce artefacts, not assertions. Every governance commitment is documented, version-controlled, and auditable. If we cannot evidence it, we do not claim it.
                </p>
              </div>
              <div className="border-l-2 border-green-400 pl-6">
                <h3 className="text-white font-medium text-lg mb-3">Practical over theoretical</h3>
                <p className="text-zinc-400 font-light leading-relaxed">
                  We build and deploy AI systems. Our strategies are grounded in what we know works in production, not what looks good in a slide deck. Engineering reality shapes every recommendation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className="px-4 sm:px-6 py-16 sm:py-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
              <span className="text-zinc-400">Founded by </span>
              <span className="text-white font-normal">practitioners</span>
            </h2>
            <div className="max-w-3xl">
              <div className="border border-zinc-800 rounded-lg p-8">
                <h3 className="text-white font-medium text-xl mb-2">Steve Macfarlane</h3>
                <p className="text-green-400 text-sm font-medium mb-4">Founder & AI Consultant</p>
                <p className="text-zinc-300 font-light leading-relaxed">
                  Steve founded Syfre to bridge the gap between AI capability and responsible deployment. With a background in technology consulting and a focus on the Queensland market, he leads Syfre&apos;s work across strategy, governance, and hands-on AI delivery for both public and private sector clients.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SecondCTA />
      <Footer />
    </div>
  );
}
