'use client';

import { useState } from 'react';
import Button from './Button';

interface WorkshopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkshopModal({ isOpen, onClose }: WorkshopModalProps) {
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

    // Format data for Zoho CRM API
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
      const response = await fetch('/api/zoho/create-lead', {
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

  const handleClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white text-black rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-2xl sm:text-3xl font-semibold leading-tight">
              Unlock the Strategic Power of AI in Your Business
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-black transition-colors ml-4 text-2xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          <div className="mb-8">
            <p className="text-base leading-relaxed text-gray-700">
              This hands-on workshop is designed for forward-thinking companies with $1M+ in annual revenue and 15+ employees who are ready to move beyond curiosity and start building a practical, tailored roadmap for AI and automation. Whether you&apos;re looking to overcome operational growing pains, accelerate growth, or enhance your digital products with intelligent systems, this session brings together your key decision-makers with expert AI strategists to identify high-impact opportunities and chart a clear implementation path. This is a premium, outcomes-focused session built for businesses serious about driving measurable value from AI.
            </p>
          </div>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Application Submitted!</h3>
                <p className="text-gray-600">
                  Thank you for your interest in our AI Roadmap Workshop. We&apos;ll be in touch soon to discuss the next steps.
                </p>
              </div>
              <Button variant="primary" onClick={handleClose}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block text-sm font-medium mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="Enter your mobile number"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors"
                    placeholder="Enter your company name"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button
                  type="button"
                  variant="tertiary"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? 'Submitting...' : 'Apply for Workshop'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}