import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import SolutionHero from './SolutionHero';
import SolutionChallenges from './SolutionChallenges';
import SolutionUseCases from './SolutionUseCases';
import SolutionFrameworkAlignment from './SolutionFrameworkAlignment';
import SolutionOutcomes from './SolutionOutcomes';
import SolutionFAQ from './SolutionFAQ';
import SolutionRelatedLinks from './SolutionRelatedLinks';
import SolutionJsonLd from './SolutionJsonLd';
import { SolutionPageData } from '@/types/solutions';

interface SolutionPageLayoutProps {
  solution: SolutionPageData;
}

export default function SolutionPageLayout({ solution }: SolutionPageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <SolutionJsonLd
        name={solution.jsonLd.name}
        description={solution.jsonLd.description}
        audienceType={solution.jsonLd.audienceType}
        slug={solution.slug}
      />
      <Header />
      <main>
        <SolutionHero
          badge={solution.badge}
          h1={solution.h1}
          valueProposition={solution.valueProposition}
          ctaText={solution.ctaText}
          ctaHref={solution.ctaHref}
        />
        <SolutionChallenges
          heading={solution.challenges.heading}
          intro={solution.challenges.intro}
          items={solution.challenges.items}
        />
        <SolutionUseCases
          heading={solution.useCases.heading}
          items={solution.useCases.items}
        />
        <SolutionFrameworkAlignment
          alignments={solution.frameworkAlignments}
        />
        <SolutionOutcomes
          heading={solution.outcomes.heading}
          items={solution.outcomes.items}
        />
        <SolutionFAQ faqs={solution.faqs} />
        <SolutionRelatedLinks
          currentSlug={solution.slug}
          relatedSlugs={solution.relatedSolutions}
        />
      </main>
      <SecondCTA
        heading="Need help meeting your AI governance obligations?"
        subheading="Book a FAIRA-mapped briefing with our team."
        ctaText={solution.ctaText}
        ctaHref={solution.ctaHref}
      />
      <Footer />
    </div>
  );
}
