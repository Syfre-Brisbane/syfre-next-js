import { ServiceProcessStep } from '@/types/services';

interface ServiceProcessProps {
  heading: string;
  steps: ServiceProcessStep[];
}

export default function ServiceProcess({ heading, steps }: ServiceProcessProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          {heading}
        </h2>
        <div className="flex flex-col gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 items-start">
              <span className="text-green-400 font-semibold text-sm mt-1 w-6 shrink-0">
                {String(index + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-white font-medium text-lg mb-1">{step.title}</h3>
                <p className="text-zinc-400 font-light leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
