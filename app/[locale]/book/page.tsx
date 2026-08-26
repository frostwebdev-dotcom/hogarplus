import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { getPhone, siteConfig } from '@/lib/site-config';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BookingPanel } from '@/components/booking/BookingPanel';
import { counties } from '@/data/counties';
import { MapPin } from 'lucide-react';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/book', namespaceKey: 'book' });
}

const STEPS = ['one', 'two', 'three'] as const;

export default async function BookPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('bookPage');
  const tCommon = await getTranslations('common');
  const phone = getPhone(locale);

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href={phone.href} variant="ghostLight" icon={<Phone aria-hidden="true" className="h-4 w-4" />}>
          {phone.display}
        </PrimaryButton>
      </PageHero>

      {/* Steps */}
      <section className="section bg-surface" aria-labelledby="book-steps-heading">
        <div className="shell">
          <SectionHeading
            id="book-steps-heading"
            eyebrow={t('steps.eyebrow')}
            title={t('steps.heading')}
            className="mx-auto max-w-3xl"
          />

          <RevealGroup as="ol" className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <li
                key={step}
                className="relative flex h-full flex-col gap-4 rounded-card border border-navy-100/70 bg-white p-6 shadow-card sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand font-heading text-lg font-bold text-white shadow-glow"
                >
                  {index + 1}
                </span>
                <h3 className="font-heading text-lg font-semibold text-navy">
                  {t(`steps.${step}.title`)}
                </h3>
                <p className="text-[0.9375rem] leading-relaxed text-navy-500">
                  {t(`steps.${step}.description`)}
                </p>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* What we need before a visit */}
      <section className="section bg-white" aria-labelledby="book-request-heading">
        <div className="shell">
          <h2 id="book-request-heading" className="sr-only">
            {t('request.heading')}
          </h2>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <BookingPanel />

            <Reveal delay={0.08} className="flex flex-col gap-6">
              <div className="rounded-panel border border-navy-100 bg-surface p-6 shadow-card sm:p-7">
                <h3 className="font-heading text-xl text-navy">{t('request.alternativeTitle')}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-500">
                  {t('request.alternativeBody')}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <PrimaryButton href={phone.href} icon={<Phone aria-hidden="true" className="h-4 w-4" />}>
                    {phone.display}
                  </PrimaryButton>
                  <PrimaryButton href="/contact" variant="secondary" withArrow>
                    {tCommon('contactUs')}
                  </PrimaryButton>
                </div>
              </div>

              <div className="rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-400">
                  {tCommon('serviceAreaShort')}
                </p>
                <a
                  href={siteConfig.emailHref}
                  className="link-underline mt-3 inline-block break-all text-[0.9375rem]"
                >
                  {siteConfig.email}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
      {/* Where we work — the same nine counties listed on About and in the footer. */}
      <section className="section-tight bg-surface" aria-labelledby="book-coverage-heading">
        <div className="shell">
          <SectionHeading
            id="book-coverage-heading"
            eyebrow={t('coverage.eyebrow')}
            title={t('coverage.heading')}
            description={t('coverage.description')}
            className="mx-auto max-w-3xl"
          />

          <RevealGroup
            as="ul"
            className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.04}
          >
            {counties.map((county) => (
              <li
                key={county.id}
                className="flex items-center gap-3 rounded-card border border-navy-100 bg-white px-5 py-4 transition-colors hover:border-brand-blue/40"
              >
                <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-blue" />
                <span className="font-semibold text-navy">
                  {county.name} {tCommon('county')}
                </span>
              </li>
            ))}
          </RevealGroup>
        </div>
      </section>
    </>
  );
}
