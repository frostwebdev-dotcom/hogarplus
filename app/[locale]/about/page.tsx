import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Check, MapPin } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { counties } from '@/data/counties';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { ValueBadge } from '@/components/ui/ValueBadge';
import { BookingCTA } from '@/components/home/BookingCTA';
import { Objectives } from '@/components/home/Objectives';
import { brandValues } from '@/components/home/WhyChooseUs';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/about', namespaceKey: 'about' });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('aboutPage');
  const tAbout = await getTranslations('aboutPreview');
  const tWhy = await getTranslations('why');
  const tCommon = await getTranslations('common');

  const serviceLines = [0, 1, 2, 3].map((index) => tAbout(`highlights.${index}`));

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href="/book">{tCommon('getEstimate')}</PrimaryButton>
        <PrimaryButton href="/services" variant="ghostLight" withArrow>
          {tCommon('exploreServices')}
        </PrimaryButton>
      </PageHero>

      {/*
        Story + company flyer.
        The Spanish body text is verbatim from the client's flyer; the English is
        a professional localization of the same paragraph. The flyer image sits
        beside it as a framed figure — every word it contains also exists as
        real HTML on this page, so nothing is locked inside a JPEG.
      */}
      <section className="section bg-surface" aria-labelledby="about-story-heading">
        <div className="shell">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div className="flex flex-col gap-6">
              <SectionHeading
                id="about-story-heading"
                align="start"
                eyebrow={t('story.eyebrow')}
                title={t('story.heading')}
              />

              <Reveal>
                <p className="max-w-prose text-base leading-relaxed text-navy-500 sm:text-[1.0625rem]">
                  {t('story.body')}
                </p>
              </Reveal>

              <Reveal className="flex flex-col gap-4">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
                  {t('services.heading')}
                </h3>
                <ul className="flex flex-col gap-3">
                  {serviceLines.map((line) => (
                    <li
                      key={line}
                      className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-navy-600 sm:text-base"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand-soft text-brand-purple"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm leading-relaxed text-navy-400">
                  {t('services.description')}
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <figure className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
                <div className="rounded-panel bg-gradient-brand p-[2px] shadow-card-hover">
                  <div className="overflow-hidden rounded-[calc(theme(borderRadius.panel)-2px)] bg-navy-950">
                    <Image
                      src={siteConfig.brand.companyFlyer}
                      alt={t('flyer.companyAlt')}
                      width={siteConfig.brand.companyFlyerSize.width}
                      height={siteConfig.brand.companyFlyerSize.height}
                      sizes="(min-width: 1024px) 44vw, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
                <figcaption className="mt-3 text-center text-sm text-navy-400">
                  {t('flyer.heading')} — {t('flyer.description')}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Objectives — the flyer's four goals, as an icon grid. */}
      <Objectives />

      {/* Brand values */}
      <section className="section bg-surface" aria-labelledby="about-values-heading">
        <div className="shell">
          <SectionHeading
            id="about-values-heading"
            eyebrow={tWhy('eyebrow')}
            title={tWhy('heading')}
            description={tWhy('description')}
            className="mx-auto max-w-3xl"
          />

          <RevealGroup as="ul" className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {brandValues.map((value) => (
              <ValueBadge
                key={value.key}
                icon={value.icon}
                title={tWhy(`values.${value.key}.title`)}
                description={tWhy(`values.${value.key}.description`)}
              />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Coverage — `id="coverage"` is the anchor the footer county chips use. */}
      <section id="coverage" className="section bg-white" aria-labelledby="about-coverage-heading">
        <div className="shell">
          <SectionHeading
            id="about-coverage-heading"
            eyebrow={t('coverage.eyebrow')}
            title={t('coverage.heading')}
            description={t('coverage.description')}
            className="mx-auto max-w-3xl"
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.05}
          >
            {counties.map((county) => (
              <li
                key={county.id}
                className="flex items-center gap-3 rounded-card border border-navy-100 bg-surface px-5 py-4 transition-colors hover:border-brand-blue/40"
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

      <BookingCTA />
    </>
  );
}
