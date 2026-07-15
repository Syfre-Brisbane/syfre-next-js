import Link from 'next/link';
import { WordPressArticle } from '@/lib/wordpress';

interface InsightLinksProps {
  articles: WordPressArticle[];
  // Post slugs to show first — the articles most relevant to the page.
  preferredSlugs?: string[];
  // Stable key (e.g. the service slug) used to vary the fill articles per
  // page, so no two pages carry an identical link list.
  variantKey?: string;
  count?: number;
}

// Simple deterministic hash so each page gets a different-but-stable rotation
// offset. Must not use Math.random/Date — the list has to be identical on
// every render of the same page.
function hashKey(key: string): number {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) % 100000;
  }
  return hash;
}

// Renders contextual links to insight (blog) articles. Placed on service
// pages to cross-link the two content groups. Each page shows a small,
// page-specific selection (curated slugs first, then a rotated fill) rather
// than every article, so service pages don't share a large identical block.
export default function InsightLinks({
  articles,
  preferredSlugs = [],
  variantKey,
  count = 6,
}: InsightLinksProps) {
  if (!articles || articles.length === 0) return null;

  let selected: WordPressArticle[];
  if (variantKey) {
    const preferred = preferredSlugs
      .map((slug) => articles.find((a) => a.slug === slug))
      .filter((a): a is WordPressArticle => Boolean(a));
    const rest = articles.filter((a) => !preferred.includes(a));
    const offset = rest.length > 0 ? hashKey(variantKey) % rest.length : 0;
    const fill = rest
      .slice(offset)
      .concat(rest.slice(0, offset))
      .slice(0, Math.max(0, count - preferred.length));
    selected = preferred.slice(0, count).concat(fill);
  } else {
    selected = articles;
  }

  if (selected.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 py-16 sm:py-20 border-t border-zinc-900">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-light tracking-tight text-white mb-3">
          From our insights
        </h2>
        <p className="text-zinc-400 font-light mb-10">
          Practical thinking on AI strategy, automation, and delivery.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          {selected.map((article) => (
            <li key={article.id}>
              <Link
                href={`/insights/${article.slug}`}
                className="text-zinc-300 hover:text-green-400 transition-colors font-light leading-relaxed"
              >
                {article.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
