import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="px-4 sm:px-6 py-12 sm:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Mobile: Stacked layout */}
          <div className="flex flex-col gap-12 sm:hidden">
            {/* Mobile - Heading and contact info */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <h1 className="text-4xl sm:text-6xl font-light leading-tight tracking-tight">
                  <span className="text-zinc-300">Let&apos;s build something </span>
                  <span className="text-white font-normal">intelligent.</span>
                </h1>
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
                <div className="flex gap-4">
                  <span className="text-white text-base font-normal">+61 0414 383 094</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white text-base font-normal">
                    40 Prospect Street, Fortitude Valley, QLD 4006
                  </span>
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
                <div className="flex gap-4">
                  <span className="text-white text-base font-normal">+61 0414 383 094</span>
                </div>
                <div className="flex gap-4">
                  <span className="text-white text-base font-normal">
                    40 Prospect Street, Fortitude Valley, QLD 4006
                  </span>
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