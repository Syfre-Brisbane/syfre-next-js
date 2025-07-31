'use client';

import { useState } from 'react';

export default function Navigation() {
  const [activeItem, setActiveItem] = useState('Home');

  const navItems = [
    'Home',
    'AI & Data Solutions',
    'Case studies',
    'Insights',
    'About'
  ];

  return (
    <nav className="bg-zinc-900 rounded-full px-2 py-2">
      <div className="flex items-center space-x-1">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={`px-4 py-2 text-base rounded-full transition-all duration-200 ${
              activeItem === item
                ? 'bg-zinc-700 text-white font-medium'
                : 'text-white font-light hover:bg-zinc-800'
            }`}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}