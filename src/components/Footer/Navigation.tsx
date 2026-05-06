import Link from 'next/link';

export default function Navigation() {
  return (
    <div className="flex flex-col gap-1 text-sm w-32">
      <h3 className="font-semibold text-white mb-1">Navigation</h3>
      <Link href="/services" className="font-light text-white hover:text-green-400 transition-colors">
        Services
      </Link>
      <Link href="/insights" className="font-light text-white hover:text-green-400 transition-colors">
        Insights
      </Link>
      <Link href="/contact" className="font-light text-white hover:text-green-400 transition-colors">
        Contact Us
      </Link>
      <h3 className="font-semibold text-white mb-1 mt-3">Services</h3>
      <Link href="/services/ai-strategy-consulting" className="font-light text-white hover:text-green-400 transition-colors">
        AI Strategy
      </Link>
      <Link href="/services/ai-automation" className="font-light text-white hover:text-green-400 transition-colors">
        AI Automation
      </Link>
      <Link href="/services/agentic-ai-solutions" className="font-light text-white hover:text-green-400 transition-colors">
        Agentic AI
      </Link>
      <Link href="/services/machine-learning-predictive-modelling" className="font-light text-white hover:text-green-400 transition-colors">
        Machine Learning
      </Link>
      <Link href="/services/business-intelligence-data-analytics" className="font-light text-white hover:text-green-400 transition-colors">
        BI & Analytics
      </Link>
      <Link href="/services/generative-engine-optimisation" className="font-light text-white hover:text-green-400 transition-colors">
        GEO
      </Link>
    </div>
  );
}