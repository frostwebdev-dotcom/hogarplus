import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageHeroProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Shared hero for every inner page. Navy gradient with soft brand light blooms,
 * sized so the sticky header never overlaps the heading.
 */
export function PageHero({ eyebrow, title, subtitle, children, className }: PageHeroProps) {
  return (
    <section
      className={cn(
        'on-dark relative isolate overflow-hidden bg-gradient-navy',
        'pb-16 pt-[calc(var(--header-height)+2.5rem)] md:pb-20 md:pt-[calc(var(--header-height)+4rem)]',
        className
      )}
    >
      {/* Decorative light blooms — purely presentational. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-blue/25 blur-3xl" />
        <div className="absolute -right-16 top-10 h-80 w-80 rounded-full bg-brand-purple/25 blur-3xl" />
        <div className="absolute bottom-[-6rem] left-1/3 h-64 w-64 rounded-full bg-brand-orchid/20 blur-3xl" />
        <div className="absolute inset-0 grain opacity-60" />
      </div>

      <div className="shell">
        <div className="max-w-3xl">
          <span className="eyebrow-light">
            <span aria-hidden="true" className="h-px w-6 bg-brand-orchid/70" />
            {eyebrow}
          </span>

          <h1 className="mt-5 font-heading text-[2.1rem] leading-[1.12] text-white sm:text-display-sm lg:text-display-md">
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-5 max-w-prose text-base leading-relaxed text-navy-100 sm:text-lg">
              {subtitle}
            </p>
          ) : null}

          {children ? <div className="mt-8 flex flex-wrap items-center gap-4">{children}</div> : null}
        </div>
      </div>

      {/* Soft transition into the light page body. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-surface/90"
      />
    </section>
  );
}
