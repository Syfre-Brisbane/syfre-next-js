import type { Metadata } from 'next';
import { OG_IMAGE } from '@/lib/metadata';
import SolutionPageLayout from '@/components/solutions/SolutionPageLayout';
import { getSolutionBySlug } from '@/lib/solutions-data';

const solution = getSolutionBySlug('state-government')!;

export const metadata: Metadata = {
  title: solution.title,
  description: solution.description,
  alternates: {
    canonical: `/solutions/${solution.slug}`,
  },
  openGraph: {
    title: `${solution.title} | Syfre`,
    description: solution.description,
    url: `https://syfre.ai/solutions/${solution.slug}`,
    type: 'website',
    images: [OG_IMAGE],
  },
};

export default function StateGovernmentPage() {
  return <SolutionPageLayout solution={solution} />;
}
