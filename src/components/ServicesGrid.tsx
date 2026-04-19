import Link from 'next/link';
import { getImageUrl } from '@/lib/image-utils';
import { HomepageData, ServiceTile } from '@/types/wordpress';

const serviceLabelToSlug: Record<string, string> = {
  'AI Strategy Consulting': '/services/ai-strategy-consulting',
  'AI Strategy and Advisory': '/services/ai-strategy-consulting',
  'AI Strategy & Advisory': '/services/ai-strategy-consulting',
  'AI Automation': '/services/ai-automation',
  'Agentic AI Solutions': '/services/agentic-ai-solutions',
  'Business Intelligence & Data Analytics': '/services/business-intelligence-data-analytics',
  'Machine Learning & Predictive Modelling': '/services/machine-learning-predictive-modelling',
  'Generative Engine Optimisation': '/services/generative-engine-optimisation',
  'Generative Engine Optimisation (GEO)': '/services/generative-engine-optimisation',
};

function getServiceHref(label?: string): string | null {
  if (!label) return null;
  return serviceLabelToSlug[label] || null;
}

interface ServicesGridProps {
  homepage: HomepageData | null;
}

export default function ServicesGrid({ homepage }: ServicesGridProps) {
  const serviceTiles = homepage?.acf?.service_tiles || [];

  // Create rows of 3 items each
  const createRows = (items: unknown[], itemsPerRow: number) => {
    const rows = [];
    for (let i = 0; i < items.length; i += itemsPerRow) {
      rows.push(items.slice(i, i + itemsPerRow));
    }
    return rows;
  };

  const rows = createRows(serviceTiles, 3);

  return (
    <section className="px-4 sm:px-6 py-8 sm:py-16 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Mobile: Single column layout */}
        <div className="flex flex-col gap-6 sm:hidden">
          {serviceTiles.map((service, index) => {
            const serviceData = service as ServiceTile;
            const href = getServiceHref(serviceData.service_label);
            const tile = (
              <div
                className="bg-zinc-900 flex flex-col h-[400px] items-center justify-between px-6 py-12 rounded-xl w-full"
              >
                <div className="flex items-center justify-center h-[250px] w-full overflow-hidden">
                  <img
                    src={getImageUrl(serviceData.service_image)}
                    alt={serviceData.service_label || ''}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="font-light text-2xl text-center tracking-tight leading-8 text-zinc-300">
                  <p>{serviceData.service_label}</p>
                </div>
              </div>
            );
            return href ? (
              <Link key={index} href={href} className="block">
                {tile}
              </Link>
            ) : (
              <div key={index}>{tile}</div>
            );
          })}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden sm:flex flex-col gap-9">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-between w-full gap-6">
              {row.map((service, index) => {
                const serviceData = service as ServiceTile;
                const href = getServiceHref(serviceData.service_label);
                const tile = (
                  <div
                    className="bg-zinc-900 flex flex-col h-[579px] items-center justify-between px-8 py-16 rounded-xl w-full max-w-sm lg:max-w-md xl:max-w-lg"
                  >
                    <div className="flex items-center justify-center h-[390px] w-full overflow-hidden">
                      <img
                        src={getImageUrl(serviceData.service_image)}
                        alt={serviceData.service_label || ''}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="font-light text-3xl text-center tracking-tight leading-10 text-zinc-300">
                      <p>{serviceData.service_label}</p>
                    </div>
                  </div>
                );
                return href ? (
                  <Link key={rowIndex * 3 + index} href={href} className="block w-full max-w-sm lg:max-w-md xl:max-w-lg">
                    {tile}
                  </Link>
                ) : (
                  <div key={rowIndex * 3 + index} className="w-full max-w-sm lg:max-w-md xl:max-w-lg">
                    {tile}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
