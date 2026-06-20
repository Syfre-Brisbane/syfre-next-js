import Link from 'next/link';
import { servicesList } from '@/lib/services-data';

// Renders contextual links to every service page. Placed on insight (blog)
// articles so Google routes crawl priority from regularly-crawled, indexed
// posts to the service pages.
export default function ServiceLinks() {
  if (servicesList.length === 0) return null;

  return (
    <section className="border-t border-zinc-800 pt-12">
      <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-white mb-3">
        Explore our AI services
      </h2>
      <p className="text-zinc-400 font-light mb-8">
        Brisbane-based AI consulting across strategy, automation, agents, and data.
      </p>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {servicesList.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/services/${service.slug}`}
              className="text-green-400 underline decoration-green-400 hover:text-green-300 transition-colors font-light"
            >
              {service.jsonLd.serviceName}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
