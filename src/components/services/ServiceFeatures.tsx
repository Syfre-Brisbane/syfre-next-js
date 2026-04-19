import { ServiceFeature } from '@/types/services';

interface ServiceFeaturesProps {
  heading: string;
  items: ServiceFeature[];
}

export default function ServiceFeatures({ heading, items }: ServiceFeaturesProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          {heading}
        </h2>
        <div className="flex flex-col gap-6">
          {items.map((item, index) => (
            <div key={index} className="flex gap-4 items-start">
              <div className="w-6 h-6 rounded-full bg-green-400/10 flex items-center justify-center mt-0.5 shrink-0">
                <svg className="w-3.5 h-3.5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <span className="text-white font-medium">{item.title}. </span>
                <span className="text-zinc-300 font-light leading-relaxed">{item.description}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
