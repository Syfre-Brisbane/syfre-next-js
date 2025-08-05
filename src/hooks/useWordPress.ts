'use client';

import { useState, useEffect } from 'react';
import { getHomepageData, getPage, getPosts } from '@/lib/wordpress';
import { HomepageData, WordPressPage, WordPressPost, HeroTitle, PositioningText } from '@/types/wordpress';

// Hook to fetch homepage data
export function useHomepage() {
  const [data, setData] = useState<HomepageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const homepage = await getHomepageData();
        console.log('Fetched homepage data:', homepage);
        setData(homepage);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch homepage data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Helper function to get hero title with fallbacks
  const getHeroTitle = (): HeroTitle => {
    return {
      part_1: data?.acf?.hero_title?.part_1,
      part_2: data?.acf?.hero_title?.part_2,
      highlight: data?.acf?.hero_title?.highlight,
      part_3: data?.acf?.hero_title?.part_3
    };
  };

  // Helper function to get positioning text
  const getPositioningText = (): PositioningText => {
    return {
      part1: data?.acf?.positioning?.part_1,
      highlight: data?.acf?.positioning?.highlight,
      part2: data?.acf?.positioning?.part_2
    };
  };

  return { data, loading, error, getHeroTitle, getPositioningText };
}

// Hook to fetch a specific page
export function usePage(pageId: number) {
  const [data, setData] = useState<WordPressPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const page = await getPage(pageId);
        setData(page);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page data');
      } finally {
        setLoading(false);
      }
    }

    if (pageId) {
      fetchData();
    }
  }, [pageId]);

  // Helper function to get hero title with fallbacks
  const getHeroTitle = (): HeroTitle => {
    const heroTitle = (data?.acf as Record<string, unknown>)?.hero_title as HeroTitle || {};
    return {
      part_1: heroTitle.part_1 || "We're an AI company,",
      part_2: heroTitle.part_2 || "with ",
      highlight: heroTitle.highlight || "human",
      part_3: heroTitle.part_3 || " values."
    };
  };

  // Helper function to get positioning text
  const getPositioningText = (): PositioningText => {
    const positioning = (data?.acf as Record<string, unknown>)?.positioning as Record<string, unknown> || {};
    return {
      part1: positioning.text_part_1 as string | undefined,
      highlight: positioning.text_highlight as string | undefined,
      part2: positioning.text_part_2 as string | undefined
    };
  };

  return { data, loading, error, getHeroTitle, getPositioningText };
}

// Hook to fetch posts
export function usePosts(limit = 10) {
  const [data, setData] = useState<WordPressPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const posts = await getPosts(limit);
        setData(posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [limit]);

  return { data, loading, error };
}