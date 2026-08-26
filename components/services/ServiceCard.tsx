'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { Service } from '@/data/services';
import { getIcon } from '@/components/ui/Icon';
import { revealItemVariants, revealItemVariantsReduced } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

/**
 * Service card used on the homepage grid and the Services page.
 *
 * `h-full` plus a `flex-1` body keeps every card in a row the same height even
 * when the descriptions differ in length.
 */
export function ServiceCard({ service, className }: { service: Service; className?: string }) {
  const t = useTranslations('services');
  const shouldReduceMotion = useReducedMotion();
  const Icon = getIcon(service.icon);

  const highlights = Array.from({ length: service.highlightCount }, (_, index) =>
    t(`items.${service.id}.highlights.${index}`)
  );

  return (
    <motion.li
      variants={shouldReduceMotion ? revealItemVariantsReduced : revealItemVariants}
      className={cn('h-full', className)}
    >
      <article
        className="group relative flex h-full flex-col gap-5 rounded-card border border-navy-100/70 bg-white p-6
                   shadow-card transition-all duration-300 ease-brand
                   hover:-translate-y-1.5 hover:border-brand-blue/30 hover:shadow-card-hover
                   motion-reduce:transform-none sm:p-7"
      >
        {/* Gradient hairline that reveals on hover. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-brand transition-transform duration-500 ease-brand group-hover:scale-x-100"
        />

        {/*
          Illustrated banner. Decorative: the heading, description and
          highlights below already carry the meaning, so it is hidden from
          assistive tech rather than repeating the card in alt text.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element -- an inline SVG asset; next/image adds nothing to a vector and would need dangerouslyAllowSVG. */}
        <img
          src={service.illustration}
          alt=""
          aria-hidden="true"
          width={400}
          height={220}
          loading="lazy"
          decoding="async"
          className="-mx-6 -mt-6 h-36 w-[calc(100%+3rem)] rounded-t-card object-cover sm:-mx-7 sm:-mt-7 sm:w-[calc(100%+3.5rem)]"
        />

        <div className="-mt-1 flex items-start justify-between gap-3">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand-soft text-brand-purple transition-all duration-300 ease-brand group-hover:bg-gradient-brand group-hover:text-white group-hover:shadow-glow">
            <Icon aria-hidden="true" className="h-7 w-7" />
          </span>

          {service.featured ? (
            <span className="rounded-pill bg-brand-orchid/10 px-3 py-1 text-[0.75rem] font-semibold uppercase tracking-wide text-brand-purple">
              {t(`items.${service.id}.badge`)}
            </span>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col gap-3">
          <h3 className="font-heading text-xl font-semibold text-navy">
            {t(`items.${service.id}.title`)}
          </h3>
          <p className="text-[0.9375rem] leading-relaxed text-navy-500">
            {t(`items.${service.id}.description`)}
          </p>

          <ul className="mt-2 flex flex-col gap-2">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex items-start gap-2.5 text-[0.9375rem] text-navy-600">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-blue" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link
          href={{ pathname: '/services', hash: service.slug }}
          className="link-underline inline-flex items-center gap-2 text-[0.9375rem]"
        >
          {t('learnMore')}
          <span className="sr-only">: {t(`items.${service.id}.title`)}</span>
          <ArrowRight
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1 motion-reduce:transform-none"
          />
        </Link>
      </article>
    </motion.li>
  );
}
