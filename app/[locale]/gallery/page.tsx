import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { GalleryGrid } from '@/components/gallery/GalleryGrid';
import { BookingCTA } from '@/components/home/BookingCTA';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/gallery', namespaceKey: 'gallery' });
}

export default async function GalleryPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('galleryPage');
  const tCommon = await getTranslations('common');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href="/book">{tCommon('bookOnline')}</PrimaryButton>
      </PageHero>

      <section className="section bg-surface" aria-labelledby="gallery-heading">
        <div className="shell">
          <h2 id="gallery-heading" className="sr-only">
            {t('hero.title')}
          </h2>
          <GalleryGrid />
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
