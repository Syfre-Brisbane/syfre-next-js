import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import ServiceHero from './ServiceHero';
import ServiceExplainer from './ServiceExplainer';
import ServiceClients from './ServiceClients';
import ServiceDifferentiator from './ServiceDifferentiator';
import ServiceFeatures from './ServiceFeatures';
import ServiceProcess from './ServiceProcess';
import ServiceUseCases from './ServiceUseCases';
import ServiceKeyStats from './ServiceKeyStats';
import ServiceComparison from './ServiceComparison';
import ServiceGlossary from './ServiceGlossary';
import ServiceRelatedLinks from './ServiceRelatedLinks';
import ServiceFAQ from './ServiceFAQ';
import ServiceJsonLd from './ServiceJsonLd';
import InsightLinks from '@/components/shared/InsightLinks';
import { getRecentArticles } from '@/lib/wordpress';
import { ServicePageData } from '@/types/services';

interface ServicePageLayoutProps {
  service: ServicePageData;
  // Optional page-specific section (e.g. an application form), rendered
  // after the use-cases section.
  children?: React.ReactNode;
}

export default async function ServicePageLayout({ service, children }: ServicePageLayoutProps) {
  const articles = await getRecentArticles(100);

  return (
    <div className="min-h-screen bg-black text-white">
      <ServiceJsonLd
        serviceName={service.jsonLd.serviceName}
        serviceDescription={service.jsonLd.serviceDescription}
        serviceType={service.jsonLd.serviceType}
        slug={service.slug}
        url={`https://syfre.ai/services/${service.slug}`}
      />
      <Header />
      <main>
        <ServiceHero
          badge={service.badge}
          h1={service.h1}
          valueProposition={service.valueProposition}
          ctaText={service.ctaText}
          ctaHref={service.ctaHref}
        />
        <ServiceExplainer
          heading={service.explainer.heading}
          body={service.explainer.body}
        />
        {service.keyStats && (
          <ServiceKeyStats
            heading={service.keyStats.heading}
            intro={service.keyStats.intro}
            stats={service.keyStats.stats}
          />
        )}
        {service.comparison && (
          <ServiceComparison
            heading={service.comparison.heading}
            intro={service.comparison.intro}
            leftLabel={service.comparison.leftLabel}
            rightLabel={service.comparison.rightLabel}
            rows={service.comparison.rows}
          />
        )}
        <ServiceClients />
        <ServiceDifferentiator
          heading={service.differentiator.heading}
          intro={service.differentiator.intro}
          painPoints={service.differentiator.painPoints}
        />
        <ServiceFeatures
          heading={service.features.heading}
          items={service.features.items}
        />
        <ServiceProcess
          heading={service.process.heading}
          steps={service.process.steps}
        />
        <ServiceUseCases
          heading={service.useCases.heading}
          items={service.useCases.items}
        />
        {children}
        {service.glossary && (
          <ServiceGlossary
            heading={service.glossary.heading}
            intro={service.glossary.intro}
            terms={service.glossary.terms}
          />
        )}
        <ServiceFAQ faqs={service.faqs} />
        <ServiceRelatedLinks
          currentSlug={service.slug}
          relatedSlugs={service.relatedServices}
        />
        <InsightLinks
          articles={articles}
          preferredSlugs={service.relatedInsights}
          variantKey={service.slug}
        />
      </main>
      <SecondCTA />
      <Footer />
    </div>
  );
}
