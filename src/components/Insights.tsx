import Badge from './Badge';
import Link from 'next/link';
import { getRecentArticles } from '@/lib/wordpress';
import { getCategoryBadgeVariant } from '@/lib/badge-utils';

export default async function Insights() {
  const articles = await getRecentArticles(3);

  return (
    <section className="px-6 py-36 w-full rounded-t-[60px]">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <div>
            <h2 className="text-6xl font-light leading-tight tracking-tight text-white">
              <span>Insights on AI written by </span>
              <span className="font-normal">humans.</span>
            </h2>
          </div>
          <div className="border border-green-400 rounded-full px-3 py-1.5">
            <span className="text-lg font-normal text-green-400 leading-7">
              Explore all insights
            </span>
          </div>
        </div>

        {/* Insights Grid */}
        <div className="flex gap-8 w-full">
          {articles.map((article) => {
            const primaryCategory = article.categories[0]?.name || 'AI Intelligence';
            const badgeVariant = getCategoryBadgeVariant(primaryCategory);
            const showBadge = primaryCategory.toLowerCase() !== 'uncategorized';
            
            return (
              <Link 
                key={article.id}
                href={`/insights/${article.slug}`}
                className="bg-zinc-900 flex flex-col gap-16 p-10 rounded-xl flex-1 max-w-[432px] hover:bg-zinc-800 transition-colors"
              >
                <div className="flex flex-col gap-32 w-full">
                  {/* Date and Badge */}
                  <div className="flex items-center justify-between w-full">
                    <span className="text-xs font-normal text-zinc-300">
                      {article.date}
                    </span>
                    {showBadge && (
                      <Badge variant={badgeVariant}>
                        {primaryCategory}
                      </Badge>
                    )}
                  </div>

                  {/* Title and Description */}
                  <div className="flex flex-col gap-2.5 w-full">
                    <h3 className="text-xl font-normal text-white leading-8">
                      {article.title}
                    </h3>
                    <p className="text-base font-light text-zinc-300 leading-normal">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}