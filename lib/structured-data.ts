import type { Locale } from '@/i18n/routing';
import { getPhone, siteConfig } from './site-config';

/**
 * Organization / LocalBusiness structured data.
 *
 * CONFIRMED fields only: business name, website, phone, email, New Jersey
 * service area, and the services offered.
 *
 * Deliberately omitted because the client has not confirmed them:
 *   `address` / `postalAddress`  · `openingHoursSpecification`
 *   `aggregateRating` / `review` · `priceRange`
 *   `foundingDate`               · `numberOfEmployees`
 *
 * Emitting any of those would be both an SEO risk and a factual claim we are
 * not entitled to make. Add them only once the client supplies them.
 */
export function buildLocalBusinessJsonLd(
  locale: Locale,
  description: string,
  serviceNames: string[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'HomeAndConstructionBusiness'],
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    url: `${siteConfig.url}/${locale}`,
    description,
    inLanguage: [locale],
    telephone: getPhone(locale).display,
    email: siteConfig.email,
    knowsLanguage: ['en', 'es'],
    areaServed: {
      '@type': 'State',
      name: 'New Jersey',
      containedInPlace: { '@type': 'Country', name: 'United States' }
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: siteConfig.name,
      itemListElement: serviceNames.map((name) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name, serviceType: name }
      }))
    },
    ...(siteConfig.social.length > 0
      ? { sameAs: siteConfig.social.map((s) => s.href) }
      : {})
  };
}

export function buildWebSiteJsonLd(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: `${siteConfig.url}/${locale}`,
    name: siteConfig.name,
    inLanguage: locale,
    publisher: { '@id': `${siteConfig.url}/#organization` }
  };
}
