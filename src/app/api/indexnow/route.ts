import { NextResponse } from 'next/server';
import { getRecentArticles } from '@/lib/wordpress';
import { servicesList } from '@/lib/services-data';

const INDEXNOW_KEY = 'a88eaa9d092248cf908c7b0a9432a193';
const SITE_URL = 'https://syfre.ai';

async function getAllUrls(): Promise<string[]> {
  const articles = await getRecentArticles(100);

  const articleUrls = articles.map((a) => `${SITE_URL}/insights/${a.slug}`);
  const serviceUrls = servicesList.map((s) => `${SITE_URL}/services/${s.slug}`);

  return [
    SITE_URL,
    `${SITE_URL}/services`,
    ...serviceUrls,
    `${SITE_URL}/contact`,
    `${SITE_URL}/insights`,
    ...articleUrls,
  ];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  if (secret !== process.env.INDEXNOW_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const urls = await getAllUrls();

  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: 'syfre.ai',
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList: urls,
    }),
  });

  return NextResponse.json({
    status: response.status,
    submitted: urls.length,
    urls,
  });
}
