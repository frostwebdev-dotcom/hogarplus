'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Quote } from 'lucide-react';

import type { DemoTestimonial } from '@/data/demo-content';
import { revealItemVariants, revealItemVariantsReduced } from '@/components/ui/Reveal';

/**
 * Testimonial card.
 *
 * The attribution is intentionally anonymous — an anonymous role plus a county
 * (e.g. "Residential Client — Union County"). No names, photos, star ratings or
 * dates are rendered, because none of that has been verified.
 */
export function TestimonialCard({ testimonial }: { testimonial: DemoTestimonial }) {
  const t = useTranslations('testimonials');
  const tCommon = useTranslations('common');
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.li
      variants={shouldReduceMotion ? revealItemVariantsReduced : revealItemVariants}
      className="h-full"
    >
      <figure className="flex h-full flex-col gap-5 rounded-card border border-navy-100/70 bg-white p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover sm:p-7">
        <Quote aria-hidden="true" className="h-8 w-8 shrink-0 text-brand-orchid/50" />

        <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-navy-600 sm:text-base">
          {t(`samples.${testimonial.quoteKey}.quote`)}
        </blockquote>

        <figcaption className="flex items-center gap-3 border-t border-navy-100 pt-5">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-brand-soft font-heading text-sm font-bold text-brand-purple"
          >
            {testimonial.initials}
          </span>
          <span className="text-sm font-semibold text-navy">
            {t(`roles.${testimonial.roleKey}`)}
            <span className="block font-normal text-navy-400">
              {testimonial.county} {tCommon('county')}
            </span>
          </span>
        </figcaption>
      </figure>
    </motion.li>
  );
}
