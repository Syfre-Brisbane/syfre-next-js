'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_MENU } from '@/constants/menu';

export default function Menu() {
  const pathname = usePathname();

  return (
    <nav className="bg-zinc-800 rounded-full px-6 py-3">
      <ul className="flex items-center gap-8">
        {HEADER_MENU.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-base font-light transition-colors px-2 py-1 rounded-full ${
                  isActive
                    ? 'text-white bg-zinc-700'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}