import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'syfre-revalidate-2026';

async function handleRevalidate(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== REVALIDATION_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  revalidateTag('wordpress');

  return NextResponse.json({ revalidated: true, now: Date.now() });
}

export async function POST(request: NextRequest) {
  return handleRevalidate(request);
}

export async function GET(request: NextRequest) {
  return handleRevalidate(request);
}
