'use client';

import { useHomepage } from '@/hooks/useWordPress';
import { getImageUrl } from '@/lib/image-utils';

export default function ServicesGrid() {
  const { data, loading, error } = useHomepage();
  
  if (loading) return <div>Loading services...</div>;
  if (error) return <div>Error loading services: {error}</div>;
  
  const serviceTiles = data?.acf?.service_tiles || [];
  console.log(serviceTiles)

  // Create rows of 3 items each
  const createRows = (items: any[], itemsPerRow: number) => {
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
          {serviceTiles.map((service, index) => (
            <div 
              key={index}
              className="bg-zinc-900 flex flex-col h-[400px] items-center justify-between px-6 py-12 rounded-xl w-full"
            >
              <div className="flex items-center justify-center h-[250px] w-full overflow-hidden">
                <img
                  src={getImageUrl(service.service_image)}
                  alt={service.service_label || ''}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="font-light text-2xl text-center tracking-tight leading-8 text-zinc-300">
                <p>{service.service_label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Grid layout */}
        <div className="hidden sm:flex flex-col gap-9">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-between w-full gap-6">
              {row.map((service, index) => (
                <div 
                  key={rowIndex * 3 + index}
                  className="bg-zinc-900 flex flex-col h-[579px] items-center justify-between px-8 py-16 rounded-xl w-full max-w-sm lg:max-w-md xl:max-w-lg"
                >
                  <div className="flex items-center justify-center h-[390px] w-full overflow-hidden">
                    <img
                      src={getImageUrl(service.service_image)}
                      alt={service.service_label || ''}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div className="font-light text-3xl text-center tracking-tight leading-10 text-zinc-300">
                    <p>{service.service_label}</p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}