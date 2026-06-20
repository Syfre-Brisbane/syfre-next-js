interface FAQ {
  question: string;
  answer: string;
}

interface GovernanceFAQProps {
  faqs: FAQ[];
}

export default function GovernanceFAQ({ faqs }: GovernanceFAQProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-12">
          <span className="text-zinc-400">Frequently asked </span>
          <span className="text-white font-normal">questions</span>
        </h2>
        <div className="flex flex-col gap-8">
          {faqs.map((faq) => (
            <div key={faq.question} className="border-b border-zinc-800 pb-8 last:border-b-0">
              <h3 className="text-white font-medium text-lg mb-3">{faq.question}</h3>
              <p className="text-zinc-400 text-base font-light leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
