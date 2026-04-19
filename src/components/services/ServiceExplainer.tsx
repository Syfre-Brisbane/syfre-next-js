interface ServiceExplainerProps {
  heading: string;
  body: string;
}

export default function ServiceExplainer({ heading, body }: ServiceExplainerProps) {
  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-6">
            {heading}
          </h2>
          <p className="text-lg font-light leading-relaxed text-zinc-300">
            {body}
          </p>
        </div>
      </div>
    </section>
  );
}
