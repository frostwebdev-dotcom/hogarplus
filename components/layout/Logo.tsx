import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { BrandMark } from './BrandMark';

/**
 * Header / footer logo lockup.
 *
 * TEMPORARY: both the mark (`BrandMark`) and the wordmark below are a
 * CSS/SVG reconstruction of the client's flyer branding — "Hogar" in white,
 * "Plus" in the blue→purple→orchid gradient, "SOLUTIONS" letter-spaced beneath,
 * matching the flyer's typography. Replace with the official transparent logo
 * when it arrives; see `components/layout/BrandMark.tsx`.
 *
 * The lockup is designed for navy surfaces, which is where the header, footer
 * and page heroes all put it — the same context as the flyer.
 */
export function Logo({
  tone = 'light',
  className,
  markId = 'logo-mark'
}: {
  /** `light` = white text for navy surfaces (default); `dark` = navy text. */
  tone?: 'light' | 'dark';
  className?: string;
  markId?: string;
}) {
  const t = useTranslations('common');
  const isLight = tone === 'light';

  return (
    <Link
      href="/"
      className={cn('group flex items-center gap-2.5', className)}
      aria-label={`${t('brandName')} — ${t('brandSubtitle')}`}
    >
      <BrandMark
        gradientId={markId}
        className="h-10 w-10 shrink-0 transition-transform duration-300 ease-brand group-hover:scale-105 motion-reduce:transform-none sm:h-11 sm:w-11"
      />

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-heading text-[1.15rem] font-bold tracking-tight sm:text-[1.3rem]',
            isLight ? 'text-white' : 'text-navy'
          )}
        >
          Hogar<span className="text-gradient">Plus</span>
        </span>
        <span
          className={cn(
            // 0.75rem is the floor for readable text anywhere on the site.
            'mt-1 text-xs font-medium uppercase tracking-[0.28em]',
            isLight ? 'text-navy-100/80' : 'text-navy-400'
          )}
          aria-hidden="true"
        >
          Solutions
        </span>
      </span>
    </Link>
  );
}
