import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const proto = request.headers.get('x-forwarded-proto') || 'https';
  const needsWwwRedirect = host.startsWith('www.');
  const needsHttpsRedirect = proto === 'http';

  if (needsWwwRedirect || needsHttpsRedirect) {
    const newUrl = new URL(request.url);
    newUrl.host = host.replace(/^www\./, '');
    newUrl.protocol = 'https:';
    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}
