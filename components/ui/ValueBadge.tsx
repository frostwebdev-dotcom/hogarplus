'use client';

import { motion, useReducedMotion } from 'framer-motion';

import { getIcon, type IconKey } from './Icon';
import { revealItemVariants, revealItemVariantsReduced } from './Reveal';
import { cn } from '@/lib/utils';

type ValueBadgeProps = {
  icon: IconKey;
  title: string;
  description: string;
  tone?: 'dark' | 'light';
  /** `compact` is the inline badge used in the About preview column. */
  layout?: 'card' | 'compact';
  className?: string;
};

/**
 * A single trust/value statement. Used by the "Why choose us" grid (light tone
 * on navy) and by the About preview column (compact, on white).
 */
export function ValueBadge({
  icon,
  title,
  description,
  tone = 'dark',
  layout = 'card',
  className
}: ValueBadgeProps) {
  const Icon = getIcon(icon);
  const shouldReduceMotion = useReducedMotion();
  const isLight = tone === 'light';

  if (layout === 'compact') {
    return (
      <motion.li
        variants={shouldReduceMotion ? revealItemVariantsReduced : revealItemVariants}
        className={cn('flex gap-4', className)}
      >
        <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-brand-soft text-brand-purple">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-heading text-base font-semibold text-navy">{title}</span>
          <span className="text-[0.9375rem] leading-relaxed text-navy-500">{description}</span>
        </span>
      </motion.li>
    );
  }

  return (
    <motion.li
      variants={shouldReduceMotion ? revealItemVariantsReduced : revealItemVariants}
      className={cn(
        'group flex h-full flex-col gap-4 rounded-card p-6 transition-all duration-300 ease-brand',
        isLight
          ? 'surface-card-dark hover:border-white/25 hover:bg-white/[0.1]'
          : 'surface-card hover:-translate-y-1 hover:shadow-card-hover',
        'motion-reduce:transform-none',
        className
      )}
    >
      <span
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-xl',
          isLight
            ? 'bg-gradient-brand text-white shadow-glow'
            : 'bg-gradient-brand-soft text-brand-purple'
        )}
      >
        <Icon aria-hidden="true" className="h-6 w-6" />
      </span>

      <h3
        className={cn(
          'font-heading text-lg font-semibold',
          isLight ? 'text-white' : 'text-navy'
        )}
      >
        {title}
      </h3>

      <p
        className={cn(
          'text-[0.9375rem] leading-relaxed',
          isLight ? 'text-navy-100' : 'text-navy-500'
        )}
      >
        {description}
      </p>
    </motion.li>
  );
}
