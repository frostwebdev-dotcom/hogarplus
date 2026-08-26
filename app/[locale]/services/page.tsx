import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Info } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { services } from '@/data/services';
import { PageHero } from '@/components/ui/PageHero';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { ServiceCard } from '@/components/services/ServiceCard';
import { ServiceChecklist } from '@/components/services/ServiceChecklist';
import { BookingCTA } from '@/components/home/BookingCTA';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/services', namespaceKey: 'services' });
}

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('servicesPage');
  const tCommon = await getTranslations('common');

  return (
    <>
      <PageHero
        eyebrow={t('hero.eyebrow')}
        title={t('hero.title')}
        subtitle={t('hero.subtitle')}
      >
        <PrimaryButton href="/book">{tCommon('getEstimate')}</PrimaryButton>
        <PrimaryButton href="/contact" variant="ghostLight" withArrow>
          {tCommon('contactUs')}
        </PrimaryButton>
      </PageHero>

      {/* Card grid */}
      <section className="section bg-surface" aria-labelledby="services-overview-heading">
        <div className="shell">
          <SectionHeading
            id="services-overview-heading"
            eyebrow={t('intro.eyebrow')}
            title={t('intro.heading')}
            description={t('intro.description')}
            className="mx-auto max-w-3xl"
          />

          <RevealGroup
            as="ul"
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            stagger={0.07}
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Checklists */}
      <section className="section bg-white" aria-labelledby="services-checklists-heading">
        <div className="shell">
          <SectionHeading
            id="services-checklists-heading"
            eyebrow={t('checklists.eyebrow')}
            title={t('checklists.heading')}
            description={t('checklists.description')}
            className="mx-auto max-w-3xl"
          />

          {/* Explicit, visible statement that these lists are placeholders. */}
          <Reveal className="mt-8 flex justify-center">
            <p className="flex max-w-2xl items-start gap-2.5 rounded-card border border-navy-100 bg-surface px-5 py-4 text-sm leading-relaxed text-navy-400">
              <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
              {t('checklists.disclaimer')}
            </p>
          </Reveal>

          <RevealGroup
            as="ul"
            className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
            stagger={0.06}
          >
            {services.map((service) => (
              <ServiceChecklist key={service.id} service={service} />
            ))}
          </RevealGroup>
        </div>
      </section>

      <BookingCTA />
    </>
  );
}
