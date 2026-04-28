import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with Syfre AI Solutions. Book a call or send us a message to discuss your AI strategy, automation, and consulting needs in Brisbane.',
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Syfre',
    description: 'Get in touch with Syfre AI Solutions. Book a call or send us a message to discuss your AI strategy, automation, and consulting needs in Brisbane.',
    url: 'https://syfre.ai/contact',
    type: 'website',
    images: [OG_IMAGE],
  },
};

const contactJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ContactPage',
      '@id': 'https://syfre.ai/contact/#contactpage',
      url: 'https://syfre.ai/contact',
      name: 'Contact Syfre AI Solutions',
      description: 'Get in touch with Syfre AI Solutions. Book a call or send us a message to discuss your AI strategy, automation, and consulting needs in Brisbane.',
      isPartOf: { '@id': 'https://syfre.ai/#website' },
      mainEntity: {
        '@type': 'ContactPoint',
        email: 'hello@syfre.com.au',
        contactType: 'sales',
        url: 'https://syfre.ai/contact',
      },
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
            {/* Mobile - Heading and contact info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <div className="text-4xl sm:text-6xl font-light leading-tight tracking-tight">
                  <span className="text-zinc-300">Let&apos;s build something </span>
                  <span className="text-white font-normal">intelligent.</span>
                </div>
                <p className="text-lg sm:text-2xl font-light leading-7 sm:leading-8 tracking-tight text-white">
                  Leave a message or simply book a video call.
                </p>
                <a 
                  href="https://calendly.com/steve-macfarlane-syfre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-400 text-black font-semibold text-lg leading-7 px-8 py-2 rounded-full h-12 w-fit inline-flex items-center justify-center"
                >
                  Book a call
                </a>
              </div>
              
              {/* Contact information */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <a href="mailto:hello@syfre.com.au" className="text-green-400 text-base font-normal">
                    hello@syfre.com.au
                  </a>
                </div>
              </div>
            </div>
            {/* Mobile - Contact form */}
            <ContactForm />
          </div>

          {/* Desktop: Side by side layout */}
          <div className="hidden sm:flex gap-12 lg:gap-24 xl:gap-44 items-start justify-start">
            {/* Left side - Heading and contact info */}
            <div className="flex flex-col gap-14 w-96">
              <div className="flex flex-col gap-6">
                <h1 className="text-6xl font-light leading-tight tracking-tight">
                  <span className="text-zinc-300">Let&apos;s build something </span>
                  <span className="text-white font-normal">intelligent.</span>
                </h1>
                <p className="text-2xl font-light leading-8 tracking-tight text-white">
                  Leave a message or simply book a video call.
                </p>
                <a 
                  href="https://calendly.com/steve-macfarlane-syfre"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-400 text-black font-semibold text-lg leading-7 px-8 py-2 rounded-full h-12 w-fit inline-flex items-center justify-center"
                >
                  Book a call
                </a>
              </div>
              
              {/* Contact information */}
              <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                  <a href="mailto:hello@syfre.com.au" className="text-green-400 text-base font-normal">
                    hello@syfre.com.au
                  </a>
                </div>
              </div>
            </div>

            {/* Right side - Contact form */}
            <ContactForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}