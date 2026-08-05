import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Phone } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { BookingPanel } from '@/components/booking/BookingPanel';

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

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href={siteConfig.phoneHref} variant="ghostLight" icon={<Phone aria-hidden="true" className="h-4 w-4" />}>
          {siteConfig.phone}
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

      {/* Scheduler */}
      <section className="section bg-white" aria-labelledby="book-scheduler-heading">
        <div className="shell">
          <h2 id="book-scheduler-heading" className="sr-only">
            {t('scheduler.heading')}
          </h2>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-10">
            <BookingPanel />

            <Reveal delay={0.08} className="flex flex-col gap-6">
              <div className="rounded-panel border border-navy-100 bg-surface p-6 shadow-card sm:p-7">
                <h3 className="font-heading text-xl text-navy">{t('scheduler.alternativeTitle')}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-500">
                  {t('scheduler.alternativeBody')}
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <PrimaryButton href={siteConfig.phoneHref} icon={<Phone aria-hidden="true" className="h-4 w-4" />}>
                    {siteConfig.phone}
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
    </>
  );
}
