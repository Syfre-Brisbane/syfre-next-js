import type { Metadata } from 'next';
import ServicePageLayout from '@/components/services/ServicePageLayout';
import { getServiceBySlug } from '@/lib/services-data';

const service = getServiceBySlug('generative-engine-optimisation')!;

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: {
    canonical: `/services/${service.slug}`,
  },
  openGraph: {
    title: service.title,
    description: service.description,
    url: `https://syfre.ai/services/${service.slug}`,
    type: 'website',
  },
};

export default function Page() {
  return <ServicePageLayout service={service} />;
}
