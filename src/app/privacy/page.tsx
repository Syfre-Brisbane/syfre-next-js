import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Australian Privacy Principles',
  description: 'Syfre AI Solutions privacy policy aligned to the Australian Privacy Principles (APPs) and Queensland Information Privacy Act 2009. How we collect, use, and protect your personal information.',
  alternates: {
    canonical: '/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Syfre',
    description: 'Syfre AI Solutions privacy policy aligned to the Australian Privacy Principles (APPs) and Queensland Information Privacy Act 2009.',
    url: 'https://syfre.ai/privacy',
    type: 'website',
    images: [OG_IMAGE],
  },
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
                <h2 className="text-3xl font-light text-white mb-6">Regulatory Framework</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  This privacy policy is aligned to the Australian Privacy Principles (APPs) under the Privacy Act 1988 (Cth) and the Queensland Information Privacy Act 2009 (Qld). Where Syfre handles personal information on behalf of Queensland Government agencies, we comply with the Information Privacy Principles (IPPs) under Queensland legislation.
                </p>
                <p className="text-zinc-300 leading-relaxed">
                  Syfre AI Solutions Pty Ltd (ABN to be confirmed) is the entity responsible for the personal information described in this policy. Our registered address is Brisbane, Queensland, Australia.
                </p>
              </section>

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
                <h2 className="text-3xl font-light text-white mb-6">Your Rights Under the Australian Privacy Principles</h2>
                <p className="text-zinc-300 mb-4 leading-relaxed">
                  Under the Australian Privacy Principles and the Queensland Information Privacy Act 2009, you have the right to:
                </p>
                <ul className="list-disc pl-6 text-zinc-300 space-y-2">
                  <li><strong>Access</strong> — request access to the personal information we hold about you (APP 12)</li>
                  <li><strong>Correction</strong> — request correction of inaccurate, out-of-date, incomplete, or misleading information (APP 13)</li>
                  <li><strong>Complaint</strong> — make a complaint about our handling of your personal information</li>
                  <li><strong>Opt-out</strong> — opt out of receiving direct marketing communications at any time</li>
                  <li><strong>Anonymity</strong> — where practicable, interact with us without identifying yourself (APP 2)</li>
                </ul>
                <p className="text-zinc-300 mt-4 leading-relaxed">
                  To exercise any of these rights, contact us at hello@syfre.com.au. We will respond within 30 days. If you are not satisfied with our response, you may lodge a complaint with the Office of the Australian Information Commissioner (OAIC) or the Office of the Information Commissioner Queensland (OIC).
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Cross-Border Data Disclosure</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Syfre stores data on Australian-hosted infrastructure. Where we use third-party services that may process data outside Australia (such as cloud-based CRM or analytics tools), we take reasonable steps to ensure those providers comply with the Australian Privacy Principles (APP 8). We do not disclose personal information to overseas recipients without appropriate safeguards.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-light text-white mb-6">Queensland Government Engagements</h2>
                <p className="text-zinc-300 leading-relaxed">
                  Where Syfre processes personal information on behalf of a Queensland Government agency, we do so in accordance with the Information Privacy Principles (IPPs) under the Information Privacy Act 2009 (Qld) and any specific data handling requirements specified in the engagement agreement. Data classification follows the Queensland Government Information Security Classification Framework (QGISCF).
                </p>
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