import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SecondCTA from '@/components/SecondCTA';
import { getRecentArticles, WordPressArticle } from '@/lib/wordpress';

// Map WordPress categories to badge colors
const categoryColors: { [key: string]: string } = {
  'ai-intelligence': 'bg-[#fda5d5]',
  'machine-learning': 'bg-[#ffb900]',
  'data-privacy': 'bg-[#45ebe5]',
};

function InsightCard({ article }: { article: WordPressArticle }) {
  const categoryName = article.categories[0]?.name || 'Uncategorized';
  const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-');
  const badgeColor = categoryColors[categorySlug] || 'bg-[#fda5d5]';

  return (
    <a href={`/insights/${article.slug}`} className="block">
      <div className="bg-zinc-900 rounded-xl p-10 flex flex-col gap-[70px] h-full hover:bg-zinc-800 transition-colors">
        <div className="flex flex-col gap-[120px] flex-1">
          <div className="flex items-center justify-between">
            <div className="font-['Source_Sans_3:Regular',_sans-serif] text-sm text-zinc-300">
              {article.date}
            </div>
            <div className={`${badgeColor} px-1.5 py-0.5 rounded-full`}>
              <div className="font-['Source_Sans_3:Regular',_sans-serif] text-sm text-black">
                {categoryName}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            <h3 className="font-['Source_Sans_3:Regular',_sans-serif] text-xl leading-[30px] text-white">
              {article.title}
            </h3>
            <p className="font-['Source_Sans_3:Light',_sans-serif] text-base text-zinc-300 line-clamp-3">
              {article.excerpt}
            </p>
          </div>
        </div>
      </div>
    </a>
  );
}

async function getInsightsByCategory() {
  // Fetch all posts (you may want to adjust the limit)
  const allArticles = await getRecentArticles(50);

  // Group articles by category
  const categories: { [key: string]: WordPressArticle[] } = {};

  allArticles.forEach((article) => {
    const categoryName = article.categories[0]?.name || 'Uncategorized';
    if (!categories[categoryName]) {
      categories[categoryName] = [];
    }
    categories[categoryName].push(article);
  });

  return categories;
}

export default async function InsightsPage() {
  const categorizedInsights = await getInsightsByCategory();

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Main content */}
      <div className="flex flex-col gap-[90px] items-center">
        {/* Insights Section */}
        <div className="w-full px-10 flex flex-col gap-[60px]">
          {/* Header */}
          <div className="flex gap-[30px] items-center">
            <h1 className="font-['Source_Sans_3:Light',_sans-serif] text-[60px] leading-[70px] tracking-[-1.2px] text-white max-w-lg">
              Insights on AI written by <span className="font-['Source_Sans_3:Regular',_sans-serif]">humans.</span>
            </h1>
          </div>

          {/* Insights by Category */}
          {Object.entries(categorizedInsights).map(([category, articles]) => (
            <div key={category} className="flex gap-[30px] items-start w-full">
              {/* Category Label */}
              <div className="font-['Source_Sans_3:SemiBold',_sans-serif] font-semibold text-base text-zinc-300 w-[434.543px] capitalize">
                {category}
              </div>

              {/* Article Grid */}
              <div className="flex flex-wrap gap-[30px] w-[894px]">
                {articles.map((article) => (
                  <div key={article.id} className="w-[431.996px]">
                    <InsightCard article={article} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Divider */}
          <div className="h-px w-full bg-zinc-700" />
        </div>
      </div>

      <SecondCTA />
      <Footer />
    </div>
  );
}
