import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import ServiceCard from '@/components/services/ServiceCard';
import { servicesList } from '@/lib/services-data';

export const metadata: Metadata = {
  title: 'AI Consulting Services Brisbane',
  description: 'AI consulting services in Brisbane — strategy, automation, machine learning, agentic AI, BI, and generative engine optimisation.',
  alternates: {
    canonical: '/services',
  },
  openGraph: {
    title: 'AI Consulting Services Brisbane | Syfre',
    description: 'AI consulting services in Brisbane — strategy, automation, machine learning, agentic AI, BI, and generative engine optimisation.',
    url: 'https://syfre.ai/services',
    type: 'website',
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main>
        <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-3xl mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight mb-6">
                <span className="text-zinc-400">AI Consulting </span>
                <span className="text-white font-normal">Services Brisbane</span>
              </h1>
              <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
                We work with ambitious teams to build AI systems that generate real commercial impact.
                From strategy through to production — we deliver clarity, capability, and a high standard of work.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesList.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <SecondCTA />
      <Footer />
    </div>
  );
}
