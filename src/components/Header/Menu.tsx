'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_MENU } from '@/constants/menu';

export default function Menu() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className="bg-zinc-800 rounded-full px-6 py-3">
      <ul className="flex items-center gap-8">
        {HEADER_MENU.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const hasChildren = item.children && item.children.length > 0;

          if (hasChildren) {
            return (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className={`text-base font-light transition-colors px-2 py-1 rounded-full inline-flex items-center gap-1 ${
                    isActive
                      ? 'text-white bg-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {item.label}
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {openDropdown === item.href && (
                  <div className="absolute top-full left-0 pt-2 z-50">
                    <div className="bg-zinc-800 rounded-lg border border-zinc-700 py-2 min-w-48 shadow-xl">
                      {item.children!.map((child) => {
                        const isChildActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block px-4 py-2 text-sm font-light transition-colors ${
                              isChildActive
                                ? 'text-white bg-zinc-700'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-700/50'
                            }`}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </li>
            );
          }

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
