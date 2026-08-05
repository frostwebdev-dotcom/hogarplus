import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const routing = defineRouting({
  locales,
  defaultLocale,
  // `always` keeps both languages symmetrical (/en/... and /es/...) and makes
  // `/` redirect to `/en`, which is what the client asked for.
  localePrefix: 'always',
  localeDetection: false
});
