import Link from 'next/link';
import { WordPressArticle } from '@/lib/wordpress';

// Renders contextual links to every insight (blog) article. Placed on service
// pages so the two content groups are fully cross-linked, giving the indexed
// blog more internal paths into the service pages and vice versa.
export default function InsightLinks({ articles }: { articles: WordPressArticle[] }) {
  if (!articles || articles.length === 0) return null;

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
          {articles.map((article) => (
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
