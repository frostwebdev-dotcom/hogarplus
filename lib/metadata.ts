import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { locales, type Locale } from '@/i18n/routing';
import { siteConfig } from './site-config';

const OG_LOCALE: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_US'
};

/** Builds the canonical + hreflang alternates map for a given route. */
function buildAlternates(locale: Locale, path: string) {
  const clean = path === '/' ? '' : path;
  const languages = Object.fromEntries(
    locales.map((l) => [l, `/${l}${clean}`])
  ) as Record<Locale, string>;

  return {
    canonical: `/${locale}${clean}`,
    languages: { ...languages, 'x-default': `/${locales[0]}${clean}` }
  };
}

type PageMetaOptions = {
  locale: Locale;
  /** Route path without the locale prefix, e.g. `/services` or `/`. */
  path: string;
  /** Key inside the `meta` namespace, e.g. `services`. */
  namespaceKey: string;
};

/**
 * Produces fully localized metadata for a page. Titles and descriptions always
 * come from the translation files — never hardcoded in a route.
 */
export async function buildPageMetadata({
  locale,
  path,
  namespaceKey
}: PageMetaOptions): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t(`${namespaceKey}.title`);
  const description = t(`${namespaceKey}.description`);
  const alternates = buildAlternates(locale, path);

  return {
    title,
    description,
    alternates,
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      locale: OG_LOCALE[locale],
      url: alternates.canonical,
      title,
      description,
      images: [{ url: siteConfig.media.ogImage, width: 1200, height: 630, alt: siteConfig.name }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteConfig.media.ogImage]
    }
  };
}
