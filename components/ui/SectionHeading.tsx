import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** `center` is the default; `start` left-aligns for two-column layouts. */
  align?: 'center' | 'start';
  /** `light` inverts the colours for use on the navy sections. */
  tone?: 'dark' | 'light';
  /** Heading level — keeps document outline correct on every page. */
  as?: 'h2' | 'h3';
  className?: string;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  tone = 'dark',
  as: Tag = 'h2',
  className,
  id
}: SectionHeadingProps) {
  const isLight = tone === 'light';

  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className
      )}
    >
      {eyebrow ? (
        <span className={isLight ? 'eyebrow-light' : 'eyebrow'}>
          <span
            aria-hidden="true"
            className={cn(
              'h-px w-6',
              isLight ? 'bg-brand-orchid/70' : 'bg-brand-blue/60'
            )}
          />
          {eyebrow}
        </span>
      ) : null}

      <Tag
        id={id}
        className={cn(
          'font-heading text-[1.9rem] leading-[1.15] sm:text-[2.3rem] lg:text-display-md',
          isLight ? 'text-white' : 'text-navy',
          align === 'center' && 'max-w-3xl'
        )}
      >
        {title}
      </Tag>

      {description ? (
        <p
          className={cn(
            'max-w-prose text-base leading-relaxed sm:text-[1.0625rem]',
            isLight ? 'text-navy-100' : 'text-navy-500'
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
