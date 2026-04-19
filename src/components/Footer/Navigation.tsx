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
    </div>
  );
}