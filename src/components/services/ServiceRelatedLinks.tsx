import Link from 'next/link';
import { getRelatedServices } from '@/lib/services-data';

interface ServiceRelatedLinksProps {
  currentSlug: string;
  relatedSlugs: string[];
}

export default function ServiceRelatedLinks({ currentSlug, relatedSlugs }: ServiceRelatedLinksProps) {
  const related = getRelatedServices(relatedSlugs).filter((s) => s.slug !== currentSlug);

  if (related.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-12">
          Related services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {related.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="bg-zinc-900 rounded-xl p-6 sm:p-8 hover:bg-zinc-800 transition-colors group"
            >
              <div className="flex flex-col gap-3">
                <span className="text-green-400 text-sm font-medium">{service.badge}</span>
                <h3 className="text-white font-medium text-lg group-hover:text-green-400 transition-colors">
                  {service.jsonLd.serviceName}
                </h3>
                <p className="text-zinc-400 font-light text-sm leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
