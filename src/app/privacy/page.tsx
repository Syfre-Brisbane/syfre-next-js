import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Our privacy policy and how we handle your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <main className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-4xl">
            <h1 className="text-6xl font-light leading-tight tracking-tight mb-8">
              <span className="text-zinc-300">Privacy </span>
              <span className="text-white font-normal">Policy</span>
            </h1>
            
            <p className="text-zinc-400 mb-12 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <div className="space-y-12">
              <section>
                <h2 className="text-3xl font-light text-white mb-6">Information We Collect</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  We collect information you provide directly to us, such as when you:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 mb-4 space-y-2">
                  <li>Fill out our contact form</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Request information about our services</li>
                  <li>Communicate with us via email or phone</li>
                </ul>
                <p className="text-zinc-300 leading-relaxed">
                  This may include your name, email address, phone number, company information, and any messages you send to us.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">How We Use Your Information</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Send you information about our services</li>
                  <li>Improve our website and services</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and prevent fraud</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Information Sharing</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To trusted service providers who assist us in operating our website and conducting our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or merger</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Data Security</h2>
                <p className="text-zinc-300 leading-relaxed">
                  We implement appropriate security measures to protect your personal information against unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
                  storage is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Cookies and Tracking</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Our website may use cookies and similar technologies to enhance your browsing experience and analyze 
                  website traffic. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Your Rights</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  Depending on your location, you may have the right to:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Delete your information</li>
                  <li>Object to processing of your information</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Data Retention</h2>
                <p className="text-zinc-300 leading-relaxed">
                  We retain your personal information only for as long as necessary to fulfill the purposes outlined in 
                  this privacy policy, unless a longer retention period is required by law.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Children&apos;s Privacy</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Changes to This Policy</h2>
                <p className="text-zinc-300 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting 
                  the new policy on this page and updating the &ldquo;Last updated&rdquo; date.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Contact Us</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  If you have any questions about this privacy policy or our privacy practices, please contact us at:
                </p>
                <div className="mt-4 text-zinc-300 space-y-2">
                  <p>Email: hello@syfre.com.au</p>
                  <p>Phone: +61 0414 383 094</p>
                  <p>Address: 40 Prospect Street, Fortitude Valley, QLD 4006</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}