import { NextResponse, type NextRequest } from 'next/server';

const locales = ['el', 'en'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (locales.some((l) => pathname === '/' + l || pathname.startsWith('/' + l + '/'))) return;
  const pref = req.headers.get('accept-language')?.toLowerCase().startsWith('en') ? 'en' : 'el';
  const url = req.nextUrl.clone();
  url.pathname = '/' + pref + (pathname === '/' ? '' : pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|images|favicon.ico|robots.txt|sitemap.xml).*)']
};
