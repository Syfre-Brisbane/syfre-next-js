import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import ShareButtons from '@/components/ShareButtons';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPostBySlug } from '@/lib/wordpress';
import { getCategoryBadgeVariant, getBadgeBackgroundColor } from '@/lib/badge-utils';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const article = await getPostBySlug(resolvedParams.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Syfre',
      description: 'The requested article could not be found.',
    };
  }
  
  return {
    title: `${article.title} | Syfre`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = await getPostBySlug(resolvedParams.slug);
  
  if (!article) {
    notFound();
  }

  const primaryCategory = article.categories[0]?.name || 'AI Intelligence';
  const badgeVariant = getCategoryBadgeVariant(primaryCategory);
  const badgeColor = getBadgeBackgroundColor(badgeVariant);
  const showBadge = primaryCategory.toLowerCase() !== 'uncategorized';
  
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="px-4 sm:px-6 py-12 sm:py-24">
          <div className="max-w-4xl mx-auto flex flex-col gap-16">
            {/* Article Header */}
            <div className="flex flex-col gap-8">
              {/* Date and Badge */}
              <div className="flex items-center gap-6">
                <span className="text-sm text-zinc-300">
                  {article.date}
                </span>
                {showBadge && (
                  <div
                    className="px-2 py-1 rounded-full text-xs text-black"
                    style={{ backgroundColor: badgeColor }}
                  >
                    {primaryCategory}
                  </div>
                )}
              </div>
              {/* Article Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight tracking-tight text-white">
                {article.title}
              </h1>
              {/* Share Section */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-zinc-500">Share this insight</span>
                <ShareButtons title={article.title} />
              </div>
            </div>
            {/* Article Content */}
            <div className="flex flex-col gap-12">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
                <img src="/arrow-right.png" alt="arrow" className="w-3 h-3" />
                <Link href="/insights" className="hover:text-zinc-300 transition-colors">Insights</Link>
                <img src="/arrow-right.png" alt="arrow" className="w-3 h-3" />
                <span className="text-green-400">{article.title}</span>
              </div>
              {/* Article Content from WordPress */}
              <div
                className="prose prose-invert prose-lg max-w-none w-full
                  prose-headings:font-source-sans-3-semibold prose-headings:text-gray-50 prose-headings:tracking-tight
                  prose-p:font-source-sans-3-light prose-p:text-zinc-100 prose-p:leading-relaxed prose-p:text-2xl
                  prose-ul:font-source-sans-3-light prose-ul:text-zinc-100 prose-ul:text-2xl
                  prose-li:leading-8 prose-li:mb-2 prose-li:marker:text-green-400
                  prose-strong:font-source-sans-3-semibold prose-strong:text-gray-50
                  prose-a:text-green-400 prose-a:underline prose-a:decoration-green-400 hover:prose-a:text-green-300
                  [&_a]:text-green-400 [&_a]:underline [&_a]:decoration-green-400"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>
            
            {/* CTA Section */}
            <CTA />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}