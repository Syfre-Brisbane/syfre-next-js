import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Skip redirects in local development
  if (host.includes('localhost') || host.includes('127.0.0.1')) {
    return NextResponse.next();
  }

  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const needsWwwRedirect = host.startsWith('www.');
  const needsHttpsRedirect = proto === 'http';

  if (needsWwwRedirect || needsHttpsRedirect) {
    const cleanHost = host.replace(/^www\./, '').replace(/:\d+$/, '');
    const url = new URL(request.url);
    return NextResponse.redirect(`https://${cleanHost}${url.pathname}${url.search}`, 301);
  }

  return NextResponse.next();
}
