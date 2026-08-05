import { useTranslations } from 'next-intl';

import type { IconKey } from '@/components/ui/Icon';
import { RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ValueBadge } from '@/components/ui/ValueBadge';

/**
 * Trust section.
 *
 * Everything stated here is a description of *how we work* — no certifications,
 * years in business, customer counts, ratings or guarantees, because none of
 * those have been confirmed by the client.
 */
export const brandValues: Array<{
  key: 'personalized' | 'reliable' | 'flexible' | 'detail' | 'bothMarkets' | 'coverage';
  icon: IconKey;
}> = [
  { key: 'personalized', icon: 'user' },
  { key: 'reliable', icon: 'handshake' },
  { key: 'flexible', icon: 'calendar' },
  { key: 'detail', icon: 'search' },
  { key: 'bothMarkets', icon: 'building' },
  { key: 'coverage', icon: 'mapPin' }
];

export function WhyChooseUs({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const t = useTranslations('why');
  const isLight = tone === 'light';

  return (
    <section
      className={
        isLight
          ? 'on-dark section relative isolate overflow-hidden bg-gradient-navy'
          : 'section bg-surface'
      }
      aria-labelledby="why-heading"
    >
      {isLight ? (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-brand-blue/20 blur-3xl" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-brand-purple/25 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-brand-orchid/15 blur-3xl" />
          <div className="absolute inset-0 grain opacity-50" />
        </div>
      ) : null}

      <div className="shell">
        <SectionHeading
          id="why-heading"
          eyebrow={t('eyebrow')}
          title={t('heading')}
          description={t('description')}
          tone={isLight ? 'light' : 'dark'}
          className="mx-auto max-w-3xl"
        />

        <RevealGroup
          as="ul"
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3"
          stagger={0.06}
        >
          {brandValues.map((value) => (
            <ValueBadge
              key={value.key}
              icon={value.icon}
              tone={isLight ? 'light' : 'dark'}
              title={t(`values.${value.key}.title`)}
              description={t(`values.${value.key}.description`)}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
