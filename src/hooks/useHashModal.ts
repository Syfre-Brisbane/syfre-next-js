'use client';

import { useEffect, useState } from 'react';

export function useHashModal(hashValue: string) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkHash = () => {
      const currentHash = window.location.hash.slice(1);
      setIsOpen(currentHash === hashValue);
    };

    // Check initial hash
    checkHash();

    // Listen for hash changes
    window.addEventListener('hashchange', checkHash);

    return () => {
      window.removeEventListener('hashchange', checkHash);
    };
  }, [hashValue]);

  const closeModal = () => {
    // Remove hash from URL without page reload
    const url = new URL(window.location.href);
    url.hash = '';
    window.history.replaceState({}, '', url.pathname + url.search);
    // Manually update state since replaceState doesn't trigger hashchange
    setIsOpen(false);
  };

  return { isOpen, closeModal };
}