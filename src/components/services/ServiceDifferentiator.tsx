interface ServiceDifferentiatorProps {
  heading: string;
  intro: string;
  painPoints: Array<{
    title: string;
    description: string;
  }>;
}

export default function ServiceDifferentiator({ heading, intro, painPoints }: ServiceDifferentiatorProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 bg-zinc-950">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
            {heading}
          </h2>
          <p className="text-lg font-light leading-relaxed text-zinc-400 mb-12">
            {intro}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="bg-zinc-900/50 border border-zinc-800 rounded-xl px-5 py-5"
            >
              <h3 className="text-white font-medium text-base mb-3">{point.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
