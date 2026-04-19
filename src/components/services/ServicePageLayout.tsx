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
import ServiceRelatedLinks from './ServiceRelatedLinks';
import ServiceFAQ from './ServiceFAQ';
import ServiceJsonLd from './ServiceJsonLd';
import { ServicePageData } from '@/types/services';

interface ServicePageLayoutProps {
  service: ServicePageData;
}

export default function ServicePageLayout({ service }: ServicePageLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-white">
      <ServiceJsonLd
        serviceName={service.jsonLd.serviceName}
        serviceDescription={service.jsonLd.serviceDescription}
        serviceType={service.jsonLd.serviceType}
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
        <ServiceFAQ faqs={service.faqs} />
        <ServiceRelatedLinks
          currentSlug={service.slug}
          relatedSlugs={service.relatedServices}
        />
      </main>
      <SecondCTA />
      <Footer />
    </div>
  );
}
