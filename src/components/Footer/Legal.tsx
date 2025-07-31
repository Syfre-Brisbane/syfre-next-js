import Link from 'next/link';

export default function Legal() {
  return (
    <div className="flex flex-col gap-1 text-sm w-32">
      <h3 className="font-semibold text-white mb-1">Legal</h3>
      <Link href="/privacy" className="font-light text-white hover:text-green-400 transition-colors">
        Privacy Policy
      </Link>
    </div>
  );
}