import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Globe, Mail, MapPin, Phone } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';
import { PageHero } from '@/components/ui/PageHero';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { DemoContactForm } from '@/components/forms/DemoContactForm';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/contact', namespaceKey: 'contact' });
}

export default async function ContactPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contactPage');
  const tCommon = await getTranslations('common');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href={siteConfig.phoneHref} icon={<Phone aria-hidden="true" className="h-4 w-4" />}>
          {siteConfig.phone}
        </PrimaryButton>
        <PrimaryButton href="/book" variant="ghostLight" withArrow>
          {tCommon('getEstimate')}
        </PrimaryButton>
      </PageHero>

      {/* Contact information */}
      <section className="section-tight bg-surface" aria-labelledby="contact-info-heading">
        <div className="shell">
          <SectionHeading
            id="contact-info-heading"
            eyebrow={t('info.eyebrow')}
            title={t('info.heading')}
            className="mx-auto max-w-3xl"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Phone — a link, because it navigates (dials). */}
            <Reveal>
              <a
                href={siteConfig.phoneHref}
                className="group flex h-full flex-col gap-3 rounded-card border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-card-hover motion-reduce:transform-none"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-purple transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Phone aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="font-heading text-lg font-semibold text-navy">
                  {t('info.phone.title')}
                </span>
                <span className="text-[0.9375rem] text-brand-blue">{siteConfig.phone}</span>
                <span className="text-sm leading-relaxed text-navy-500">
                  {t('info.phone.description')}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.06}>
              <a
                href={siteConfig.emailHref}
                className="group flex h-full flex-col gap-3 rounded-card border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-card-hover motion-reduce:transform-none"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-purple transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Mail aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="font-heading text-lg font-semibold text-navy">
                  {t('info.email.title')}
                </span>
                <span className="break-all text-[0.9375rem] text-brand-blue">{siteConfig.email}</span>
                <span className="text-sm leading-relaxed text-navy-500">
                  {t('info.email.description')}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href={siteConfig.url}
                className="group flex h-full flex-col gap-3 rounded-card border border-navy-100/70 bg-white p-6 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-card-hover motion-reduce:transform-none"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-purple transition-colors group-hover:bg-gradient-brand group-hover:text-white">
                  <Globe aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="font-heading text-lg font-semibold text-navy">
                  {t('info.website.title')}
                </span>
                <span className="break-all text-[0.9375rem] text-brand-blue">
                  {siteConfig.websiteDisplay}
                </span>
                <span className="text-sm leading-relaxed text-navy-500">
                  {t('info.website.description')}
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="flex h-full flex-col gap-3 rounded-card border border-navy-100/70 bg-white p-6 shadow-card">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-purple">
                  <MapPin aria-hidden="true" className="h-6 w-6" />
                </span>
                <span className="font-heading text-lg font-semibold text-navy">
                  {t('info.area.title')}
                </span>
                <span className="text-sm leading-relaxed text-navy-500">
                  {t('info.area.description')}
                </span>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* Form */}
      <section className="section bg-white" aria-labelledby="contact-form-heading">
        <div className="shell">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14">
            <SectionHeading
              id="contact-form-heading"
              align="start"
              eyebrow={t('form.eyebrow')}
              title={t('form.heading')}
              description={t('form.description')}
            />

            <DemoContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
