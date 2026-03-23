'use client';

import { useState } from 'react';

export default function AciAfricaForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const challenge = formData.get('challenge') as string;

    const leadData = {
      First_Name: formData.get('firstName') as string,
      Last_Name: formData.get('lastName') as string,
      Email: formData.get('email') as string,
      Company: formData.get('organisation') as string,
      Description: challenge !== '' ? `Training challenge: ${challenge}` : '',
      Lead_Source: 'ACI Africa 2026 - Qual-eFire Workshop',
    };

    try {
      const response = await fetch('/api/zoho/create-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
        (e.target as HTMLFormElement).reset();
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
        <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-semibold text-white mb-3">Your session is reserved</h3>
        <p className="text-zinc-400 text-lg leading-relaxed max-w-md mx-auto mb-4">
          Tim will be in touch within 48 hours to schedule your session and understand your training setup ahead of time.
        </p>
        <p className="text-zinc-500 text-sm">
          Find us at the conference if you want to talk sooner.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-6 sm:px-10 py-8 sm:py-10">
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-400/10 border border-red-400/20 text-red-400 rounded-lg">
          <p className="font-semibold">Error</p>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-zinc-400 text-sm">
              First name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="firstName"
              required
              autoComplete="given-name"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>
          <div className="flex-1 flex flex-col gap-1.5">
            <label className="text-zinc-400 text-sm">
              Last name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="lastName"
              required
              autoComplete="family-name"
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-sm">
            Work email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-sm">
            Airport / Organisation <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            name="organisation"
            required
            autoComplete="organization"
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-zinc-400 text-sm">
            Biggest training challenge
          </label>
          <select
            name="challenge"
            defaultValue=""
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white text-base focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent appearance-none"
          >
            <option value="" className="text-zinc-500">Select one...</option>
            <option value="Knowledge decay between assessments">Knowledge decay between assessments</option>
            <option value="Proving competency for compliance">Proving competency for compliance</option>
            <option value="Staff time away from operations">Staff time away from operations</option>
            <option value="Scaling training across stations">Scaling training across stations</option>
            <option value="Digitising existing course material">Digitising existing course material</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`font-semibold text-base py-3.5 rounded-lg w-full transition-colors mt-1 ${
            isSubmitting
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-green-400 text-black hover:bg-green-500'
          }`}
        >
          {isSubmitting ? 'Sending...' : 'Reserve my strategy session'}
        </button>

        <p className="text-zinc-600 text-xs text-center">
          Limited spots available. No obligation.
        </p>
      </form>
    </div>
  );
}
