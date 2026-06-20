'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HEADER_MENU } from '@/constants/menu';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleExpanded = (href: string) => {
    setExpandedItem(expandedItem === href ? null : href);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white p-2"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-zinc-900 border-t border-zinc-800 z-50">
          <nav className="px-6 py-4">
            <ul className="flex flex-col gap-1">
              {HEADER_MENU.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItem === item.href;

                return (
                  <li key={item.href}>
                    {hasChildren ? (
                      <>
                        <button
                          onClick={() => toggleExpanded(item.href)}
                          className={`w-full flex items-center justify-between text-lg font-light py-3 px-4 rounded-lg transition-colors ${
                            isActive
                              ? 'text-white bg-zinc-800'
                              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                          }`}
                        >
                          {item.label}
                          <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                        {isExpanded && (
                          <ul className="ml-4 mt-1 flex flex-col gap-1">
                            {item.children!.map((child) => {
                              const isChildActive = pathname === child.href;
                              return (
                                <li key={child.href}>
                                  <Link
                                    href={child.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-base font-light py-2.5 px-4 rounded-lg transition-colors ${
                                      isChildActive
                                        ? 'text-white bg-zinc-800'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block text-lg font-light py-3 px-4 rounded-lg transition-colors ${
                          isActive
                            ? 'text-white bg-zinc-800'
                            : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
