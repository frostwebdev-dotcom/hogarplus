'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Check } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { Service } from '@/data/services';
import { getIcon } from '@/components/ui/Icon';
import { revealItemVariants, revealItemVariantsReduced } from '@/components/ui/Reveal';

/**
 * "What's included" panel shown on the Services page beneath the card grid.
 *
 * TODO(client): every checklist row is an example written for this demo. Replace
 * `services.items.<id>.included.*` in the message files with approved scope.
 */
export function ServiceChecklist({ service }: { service: Service }) {
  const t = useTranslations('services');
  const shouldReduceMotion = useReducedMotion();
  const Icon = getIcon(service.icon);

  const included = Array.from({ length: service.includedCount }, (_, index) =>
    t(`items.${service.id}.included.${index}`)
  );

  return (
    <motion.li
      variants={shouldReduceMotion ? revealItemVariantsReduced : revealItemVariants}
      className="h-full scroll-mt-32"
      id={service.slug}
    >
      <article className="flex h-full flex-col gap-5 rounded-panel border border-navy-100/70 bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glow">
            <Icon aria-hidden="true" className="h-6 w-6" />
          </span>
          <h3 className="font-heading text-xl font-semibold text-navy">
            {t(`items.${service.id}.title`)}
          </h3>
        </div>

        <p className="text-[0.9375rem] leading-relaxed text-navy-500">
          {t(`items.${service.id}.description`)}
        </p>

        <div className="flex flex-1 flex-col gap-3 border-t border-navy-100 pt-5">
          <h4 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-purple">
            {t('includedTitle')}
          </h4>
          <ul className="flex flex-col gap-2.5">
            {included.map((row) => (
              <li key={row} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-navy-600">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-blue/10 text-brand-blue"
                >
                  <Check className="h-3 w-3" />
                </span>
                <span>{row}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/book" className="btn-secondary btn-sm w-full">
          {t('bookThis')}
          <span className="sr-only">: {t(`items.${service.id}.title`)}</span>
        </Link>
      </article>
    </motion.li>
  );
}
