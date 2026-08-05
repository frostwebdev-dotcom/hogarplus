import { useTranslations } from 'next-intl';

import { services } from '@/data/services';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/services/ServiceCard';

export function ServicesSection() {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');

  return (
    <section className="section bg-white" aria-labelledby="services-heading">
      <div className="shell">
        <SectionHeading
          id="services-heading"
          eyebrow={t('eyebrow')}
          title={t('heading')}
          description={t('description')}
          className="mx-auto max-w-3xl"
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          stagger={0.07}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </RevealGroup>

        <div className="mt-12 flex justify-center">
          <PrimaryButton href="/services" variant="secondary" withArrow>
            {tCommon('viewAll')}
          </PrimaryButton>
        </div>
      </div>
    </section>
  );
}
