import { ServiceGlossaryTerm } from '@/types/services';

interface ServiceGlossaryProps {
  heading: string;
  intro?: string;
  terms: ServiceGlossaryTerm[];
}

// Defined-term glossary. Emits DefinedTermSet structured data and renders a
// semantic <dl>, both of which make the definitions easy for AI models to
// extract and attribute.
export default function ServiceGlossary({ heading, intro, terms }: ServiceGlossaryProps) {
  if (terms.length === 0) return null;

  const glossarySchema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: heading,
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
    })),
  };

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(glossarySchema) }}
        />
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          {heading}
        </h2>
        {intro && (
          <p className="text-zinc-300 font-normal mb-10 max-w-3xl leading-relaxed">{intro}</p>
        )}
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8 mt-10">
          {terms.map((t, index) => (
            <div key={index}>
              <dt className="text-white font-medium text-lg mb-2">{t.term}</dt>
              <dd className="text-zinc-300 font-normal leading-relaxed">{t.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
