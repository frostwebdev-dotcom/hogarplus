import { useTranslations } from 'next-intl';
import { HeartHandshake, Home, Sparkles, Trophy } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * "Nuestro Objetivo / Our Objective".
 *
 * The four statements are the client's own, taken verbatim from the company
 * flyer and professionally localized. Each gets an icon that matches its
 * meaning rather than a generic checkmark, and they are laid out as a grid
 * instead of one dense paragraph.
 */
const OBJECTIVE_ICONS = [
  Home, // transform homes into spotless, healthy spaces
  HeartHandshake, // help clients relax and enjoy their space
  Sparkles, // deep cleaning that exceeds expectations
  Trophy // contribute to quality of life and peace of mind
] as const;

export function Objectives() {
  const t = useTranslations('objectives');

  return (
    <section className="section bg-white" aria-labelledby="objectives-heading">
      <div className="shell">
        <SectionHeading
          id="objectives-heading"
          eyebrow={t('eyebrow')}
          title={t('heading')}
          className="mx-auto max-w-3xl"
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {OBJECTIVE_ICONS.map((Icon, index) => (
            <Reveal as="li" key={index} delay={index * 0.06} className="h-full">
              <div className="group flex h-full items-start gap-5 rounded-card border border-navy-100/70 bg-surface p-6 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-brand-purple/30 hover:shadow-card-hover motion-reduce:transform-none sm:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
                  <Icon aria-hidden="true" className="h-6 w-6" />
                </span>
                <p className="text-[0.9375rem] leading-relaxed text-navy-600 sm:text-base">
                  {t(`items.${index}`)}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
