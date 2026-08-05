import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match every pathname except Next internals, Vercel internals and anything
  // that looks like a static file (contains a dot). Unmatched app paths are
  // therefore always given a locale prefix before they reach the router.
  matcher: ['/', '/(en|es)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
};
