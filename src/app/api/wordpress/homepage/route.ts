import { NextResponse } from 'next/server';
import { getHomepageData } from '@/lib/wordpress';

export async function GET() {
  try {
    const data = await getHomepageData();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch homepage data' }, { status: 500 });
  }
}
