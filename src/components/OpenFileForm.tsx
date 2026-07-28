'use client';

import { useId, useState } from 'react';

export default function OpenFileForm() {
  const uid = useId();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const name = (formData.get('name') as string).trim();
    const [firstName, ...rest] = name.split(/\s+/);
    const question = (formData.get('question') as string).trim();

    const leadData = {
      First_Name: firstName,
      Last_Name: rest.join(' '),
      Email: formData.get('email') as string,
      Company: formData.get('company') as string,
      Description: question !== '' ? `Wants it to find: ${question}` : '',
      Lead_Source: 'OpenFile Landing Page',
    };

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setSubmitStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 sm:px-10 py-10 sm:py-12 text-center">
        <div className="w-16 h-16 bg-[#E8B84B]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#E8B84B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">You&apos;re in the queue</h3>
        <p className="text-zinc-400 text-base leading-relaxed max-w-sm mx-auto">
          Thanks for registering. We&apos;ll be in touch as early access opens up. If you&apos;d
          like a private demo for your exploration team, just say so when we email.
        </p>
      </div>
    );
  }

  const inputClasses =
    'bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-[#E8B84B] focus:border-transparent';

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 sm:px-10 py-8 sm:py-10">
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 text-red-400 rounded-lg">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-name`} className="text-zinc-400 text-sm">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            name="name"
            required
            autoComplete="name"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-email`} className="text-zinc-400 text-sm">
            Work email <span className="text-red-400">*</span>
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            required
            autoComplete="email"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-company`} className="text-zinc-400 text-sm">
            Company <span className="text-red-400">*</span>
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            name="company"
            required
            autoComplete="organization"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${uid}-question`} className="text-zinc-400 text-sm">
            What would you want it to find? <span className="text-zinc-600">(optional)</span>
          </label>
          <textarea
            id={`${uid}-question`}
            name="question"
            rows={3}
            placeholder="e.g. Intercepts on our ground that were never followed up"
            className={`${inputClasses} placeholder:text-zinc-600 resize-none`}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-semibold text-base py-3.5 rounded-lg w-full transition-colors mt-1 ${
            isSubmitting
              ? 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
              : 'bg-[#E8B84B] text-black hover:bg-[#F0C65F]'
          }`}
        >
          {isSubmitting ? 'One moment...' : 'Get early access'}
        </button>

        <p className="text-zinc-600 text-xs text-center">
          No spam — occasional OpenFile updates only. Private demo available for exploration
          teams. Just ask.
        </p>
      </form>
    </div>
  );
}
