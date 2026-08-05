import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { Playfair_Display, Poppins } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { routing, type Locale } from '@/i18n/routing';
import { siteConfig } from '@/lib/site-config';
import { services } from '@/data/services';
import { buildLocalBusinessJsonLd, buildWebSiteJsonLd } from '@/lib/structured-data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SkipToContent } from '@/components/layout/SkipToContent';
import { JsonLd } from '@/components/seo/JsonLd';

import '../globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  weight: ['500', '600', '700']
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '500', '600', '700']
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#071B4D',
  width: 'device-width',
  initialScale: 1
};

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const safeLocale: Locale = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;

  const t = await getTranslations({ locale: safeLocale, namespace: 'meta' });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t('home.title'),
      // Inner pages supply their own full title; the template keeps the brand
      // visible for anything that only sets a short title.
      template: `%s | ${siteConfig.name}`
    },
    description: t('home.description'),
    applicationName: siteConfig.name,
    referrer: 'origin-when-cross-origin',
    formatDetection: { telephone: true, address: false, email: true },
    icons: { icon: '/favicon.svg' },
    robots: {
      // Demo phase: indexable by default so the client can preview SERP output.
      index: true,
      follow: true
    }
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale segment.
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'meta' });
  const tServices = await getTranslations({ locale, namespace: 'services.items' });

  // Service names for the JSON-LD offer catalogue, localized like everything else.
  const serviceNames = services.map((service) => tServices(`${service.id}.title`));

  return (
    <html lang={locale} className={`${playfair.variable} ${poppins.variable}`}>
      <body className="min-h-screen bg-surface font-body">
        <NextIntlClientProvider>
          <SkipToContent />
          <Header />
          <main id="main-content" tabIndex={-1} className="focus:outline-none">
            {props.children}
          </main>
          <Footer />
        </NextIntlClientProvider>

        <JsonLd id="ld-organization" data={buildLocalBusinessJsonLd(locale, t('home.description'), serviceNames)} />
        <JsonLd id="ld-website" data={buildWebSiteJsonLd(locale)} />
      </body>
    </html>
  );
}
