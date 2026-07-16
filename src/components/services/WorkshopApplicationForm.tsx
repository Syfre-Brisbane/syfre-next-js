'use client';

import { useState } from 'react';
import Button from '@/components/Button';

const inputStyles =
  'w-full px-4 py-3 bg-black border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors';

export default function WorkshopApplicationForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    company: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Split name into first and last name
    const nameParts = formData.name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';

    const leadData = {
      First_Name: firstName,
      Last_Name: lastName,
      Email: formData.email,
      Phone: formData.mobile,
      Description: 'Applied for AI Roadmap Workshop',
      Lead_Source: 'Workshop Application',
      Company: formData.company,
      Workshop_Application: true // Custom field to identify workshop leads
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', mobile: '', company: '', email: '' });
      } else {
        console.error('Failed to submit application');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="apply" className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900 scroll-mt-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          Apply for an AI Roadmap Workshop
        </h2>
        <p className="text-zinc-400 font-light leading-relaxed mb-10 max-w-3xl">
          This hands-on workshop is designed for forward-thinking companies with $1M+ in annual
          revenue and 15+ employees who are ready to move beyond curiosity and start building a
          practical, tailored roadmap for AI and automation. Register your interest below and
          we&apos;ll be in touch to discuss the next steps.
        </p>

        <div className="bg-zinc-900 rounded-xl p-6 sm:p-8 max-w-3xl">
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
              <p className="text-zinc-400">
                Thank you for your interest in our AI Roadmap Workshop. We&apos;ll be in touch soon to discuss the next steps.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-zinc-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium text-zinc-300 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-zinc-300 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className={inputStyles}
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Submitting...' : 'Apply for Workshop'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
