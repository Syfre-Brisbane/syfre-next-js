import { NextRequest, NextResponse } from 'next/server';
import { getRecentArticles } from '@/lib/wordpress';

export async function GET(request: NextRequest) {
  const limit = Number(request.nextUrl.searchParams.get('limit') || '10');

  try {
    const articles = await getRecentArticles(limit);
    return NextResponse.json(articles);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}
