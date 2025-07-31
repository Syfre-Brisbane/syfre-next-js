'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    
    // Prepare lead data for Zoho CRM
    const leadData = {
      First_Name: formData.get('firstName') as string,
      Last_Name: formData.get('lastName') as string,
      Email: formData.get('email') as string,
      Phone: formData.get('phone') as string,
      Description: formData.get('message') as string,
      Lead_Source: 'Website Contact Form',
      Company: 'Prospect', // Default value
    };

    try {
      // Send to your API route that handles Zoho CRM integration
      const response = await fetch('/api/zoho/create-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        // Reset form
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-100 w-full max-w-xl sm:max-w-2xl rounded-xl px-6 sm:px-8 py-8 sm:py-10">
      {/* Success Message */}
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-teal-400 text-black rounded-lg">
          <p className="font-semibold">Message sent successfully!</p>
          <p className="text-sm">Thank you for contacting us. We'll get back to you soon.</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-400 text-white rounded-lg">
          <p className="font-semibold">Error sending message</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <div className="flex flex-col gap-6">
          {/* First row - First name and Last name */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm font-normal">
                First name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                required
                className="bg-zinc-100 border border-zinc-400 rounded-lg px-3.5 py-2.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-zinc-600 text-sm font-normal">
                Last name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                required
                className="bg-zinc-100 border border-zinc-400 rounded-lg px-3.5 py-2.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-600 text-sm font-normal">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              className="bg-zinc-100 border border-zinc-400 rounded-lg px-3.5 py-2.5 text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>

          {/* Phone number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-600 text-sm font-normal">
              Phone number
            </label>
            <div className="flex bg-zinc-100 border border-zinc-400 rounded-lg overflow-hidden">
              <div className="flex items-center justify-center px-3.5 py-2.5 border-r border-zinc-400">
                <span className="text-zinc-700 text-base font-normal">AU</span>
                <svg className="w-5 h-5 ml-2 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <input
                type="tel"
                name="phone"
                className="flex-1 bg-zinc-100 px-3 py-2.5 text-gray-900 text-base focus:outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-zinc-600 text-sm font-normal">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              name="message"
              required
              rows={6}
              className="bg-zinc-100 border border-zinc-400 rounded-lg px-3.5 py-3 text-gray-900 text-base resize-none focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent"
            />
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-semibold text-sm leading-5 py-3 rounded-lg w-full h-12 transition-colors ${
            isSubmitting 
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
              : 'bg-teal-400 text-black hover:bg-teal-500'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </form>
    </div>
  );
}