interface SolutionChallengesProps {
  heading: string;
  intro: string;
  items: Array<{ title: string; description: string }>;
}

export default function SolutionChallenges({ heading, intro, items }: SolutionChallengesProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-4">
          {heading}
        </h2>
        <p className="text-lg font-light text-zinc-400 mb-12 max-w-3xl">
          {intro}
        </p>
        <div className="flex flex-col gap-8">
          {items.map((item) => (
            <div key={item.title} className="border-l-2 border-green-400 pl-6">
              <h3 className="text-white font-medium text-lg mb-2">{item.title}</h3>
              <p className="text-zinc-400 font-light leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
