interface ServiceFAQProps {
  faqs: Array<{
    question: string;
    answer: string;
  }>;
}

export default function ServiceFAQ({ faqs }: ServiceFAQProps) {
  if (faqs.length === 0) return null;

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          Frequently asked questions
        </h2>
        <div className="flex flex-col divide-y divide-zinc-800">
          {faqs.map((faq, index) => (
            <div key={index} className="py-8 first:pt-0 last:pb-0">
              <h3 className="text-white font-medium text-lg mb-3">{faq.question}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
