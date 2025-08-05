import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CTA from '@/components/CTA';
import ShareButtons from '@/components/ShareButtons';
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
        <div className="box-border content-stretch flex flex-col gap-[60px] items-center justify-start px-10 py-0 relative rounded-tl-[60px] rounded-tr-[60px] size-full">
          <div className="box-border content-stretch flex flex-col gap-20 items-start justify-start p-0 relative shrink-0 w-[894px]">
            <div
              className="box-border content-stretch flex flex-col gap-10 items-start justify-start p-0 relative shrink-0"
              
            >
              <div
                className="box-border content-stretch flex flex-row gap-[30px] h-6 items-center justify-start p-0 relative shrink-0 w-[894px]"
                
              >
                <div
                  className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[14px] text-left text-nowrap text-zinc-300"
                  
                >
                  <p className="block leading-[normal] whitespace-pre">
                    {article.date}
                  </p>
                </div>
                {showBadge && (
                  <div
                    className="box-border content-stretch flex flex-row items-center justify-start px-1.5 py-0.5 relative rounded-[9999px] shrink-0"
                    style={{ backgroundColor: badgeColor }}
                  >
                    <div
                      className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[#000000] text-[14px] text-left text-nowrap"
                    >
                      <p className="block leading-[normal] whitespace-pre">
                        {primaryCategory}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[72px] text-left text-zinc-300 tracking-[-1.44px] w-[894px]"

              >
                <p className="adjustLetterSpacing block leading-[82px]">
                  {article.title}
                </p>
              </div>
              <div
                  className="box-border content-stretch flex flex-row gap-3 items-center justify-start p-0 relative shrink-0"
                  

              >
                <div
                    className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[#71717b] text-[14px] text-left text-nowrap"

                >
                  <p className="block leading-[normal] whitespace-pre">
                    Share this insight
                  </p>
                </div>
                <ShareButtons title={article.title} />
              </div>
            </div>
            <div
                className="box-border content-stretch flex flex-row gap-[60px] items-start justify-start p-0 relative rounded-tl-[60px] rounded-tr-[60px] shrink-0 w-full"
              

            >
              <div
                className="box-border content-stretch flex flex-col gap-[60px] items-start justify-start p-0 relative rounded-xl shrink-0 w-[899px]"

              >
                <div
                  className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0"
                  

                >
                  <div
                    className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[#71717b] text-[14px] text-left text-nowrap"

                  >
                    <p className="block leading-[normal] whitespace-pre">Home</p>
                  </div>
                  <div
                    className="h-[7.5px] relative shrink-0 w-[18px]"
                    

                  >
                    <div className="absolute bottom-[-6.667%] left-[-2.778%] right-[-2.778%] top-[-6.667%]">
                      <img
                        alt="arrow right"
                        className="block max-w-none size-full"
                        src="/arrow-right.png"
                      />
                    </div>
                  </div>
                  <div
                    className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[#71717b] text-[14px] text-left text-nowrap"

                  >
                    <p className="block leading-[normal] whitespace-pre">
                      Insights
                    </p>
                  </div>
                  <div
                    className="h-[7.5px] relative shrink-0 w-[18px]"
                    

                  >
                    <div className="absolute bottom-[-6.667%] left-[-2.778%] right-[-2.778%] top-[-6.667%]">
                      <img
                        alt="arrow right"
                        className="block max-w-none size-full"
                        src="/arrow-right.png"
                      />
                    </div>
                  </div>
                  <div
                    className="font-source-sans-3-regular leading-[0] relative shrink-0 text-[#00c950] text-[14px] text-left text-nowrap"

                  >
                    <p className="block leading-[normal] whitespace-pre">
                      {article.title}
                    </p>
                  </div>
                </div>
                {/* Article Content from WordPress */}
                <div
                  className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-[899px]"
                  
                >
                  <div
                    className="prose prose-invert prose-lg max-w-none w-full
                      prose-headings:font-source-sans-3-semibold prose-headings:text-gray-50 prose-headings:tracking-tight
                      prose-p:font-source-sans-3-light prose-p:text-zinc-100 prose-p:leading-relaxed prose-p:text-2xl
                      prose-ul:font-source-sans-3-light prose-ul:text-zinc-100 prose-ul:text-2xl
                      prose-li:leading-8 prose-li:mb-2
                      prose-strong:font-source-sans-3-semibold prose-strong:text-gray-50
                      prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </div>
              </div>
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