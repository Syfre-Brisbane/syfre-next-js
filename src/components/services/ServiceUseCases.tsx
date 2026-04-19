import { ServiceUseCase } from '@/types/services';

interface ServiceUseCasesProps {
  heading: string;
  items: ServiceUseCase[];
}

export default function ServiceUseCases({ heading, items }: ServiceUseCasesProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          {heading}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {items.map((item, index) => (
            <div key={index} className="bg-zinc-900 rounded-xl p-6 sm:p-8">
              <h3 className="text-white font-medium text-lg mb-3">{item.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
