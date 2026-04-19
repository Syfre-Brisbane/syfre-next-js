import Link from 'next/link';
import { ServiceH1 } from '@/types/services';

interface ServiceHeroProps {
  badge: string;
  h1: ServiceH1;
  valueProposition: string;
  ctaText: string;
  ctaHref: string;
}

export default function ServiceHero({ badge, h1, valueProposition, ctaText, ctaHref }: ServiceHeroProps) {
  return (
    <section className="px-4 sm:px-6 pt-12 sm:pt-24 pb-16 sm:pb-20">
      <div className="max-w-5xl mx-auto">
        <div className="max-w-3xl flex flex-col gap-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 w-fit">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-zinc-300">{badge}</span>
          </div>

          {/* H1 */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-light leading-[1.1] tracking-tight">
            <span className="text-zinc-400">{h1.muted} </span>
            <span className="text-white font-normal">{h1.highlight}</span>
            {h1.suffix && <span className="text-zinc-400"> {h1.suffix}</span>}
          </h1>

          {/* Value Proposition */}
          <p className="text-lg sm:text-xl font-light leading-relaxed text-zinc-300">
            {valueProposition}
          </p>

          {/* CTA */}
          <Link
            href={ctaHref}
            className="bg-green-400 text-black font-semibold text-lg px-8 py-3 rounded-full w-fit inline-flex items-center justify-center hover:bg-green-300 transition-colors"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
