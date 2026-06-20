import { FAIRAStep } from '@/lib/governance-data';

interface FAIRAProcessProps {
  steps: FAIRAStep[];
}

export default function FAIRAProcess({ steps }: FAIRAProcessProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light leading-tight tracking-tight mb-4">
          <span className="text-zinc-400">What is FAIRA and </span>
          <span className="text-white font-normal">how do I complete the assessment?</span>
        </h2>
        <p className="text-lg font-light text-zinc-400 mb-12 max-w-3xl">
          The Foundational AI Risk Assessment (FAIRA) is the Queensland Government&apos;s mandatory risk assessment for AI systems. It must be completed before any AI system is deployed within a Queensland Government agency. Here is how the process works.
        </p>
        <div className="flex flex-col gap-6">
          {steps.map((step) => (
            <div key={step.step} className="flex gap-6 items-start">
              <div className="shrink-0 w-12 h-12 rounded-full border-2 border-green-400 flex items-center justify-center">
                <span className="text-green-400 font-semibold text-lg">{step.step}</span>
              </div>
              <div className="pt-1">
                <h3 className="text-white font-medium text-lg mb-2">{step.title}</h3>
                <p className="text-zinc-400 text-sm font-light leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-zinc-900 border border-zinc-800 rounded-lg p-6">
          <p className="text-zinc-300 text-sm font-light">
            <span className="text-green-400 font-medium">How Syfre helps: </span>
            We support agencies through each step of the FAIRA process with structured templates, governance expertise, and assessment-ready documentation that aligns to the Project Assessment Framework (PAF) gate requirements. The output is evidence that satisfies Gate 3 and Gate 4 review without additional rework.
          </p>
        </div>
      </div>
    </section>
  );
}
