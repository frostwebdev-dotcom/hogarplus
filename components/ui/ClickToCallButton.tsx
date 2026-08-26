import { Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import type { Locale } from '@/i18n/routing';
import { getPhone } from '@/lib/site-config';
import { cn } from '@/lib/utils';

type ClickToCallButtonProps = {
  /**
   * `button`  — pill button, used in the header and mobile menu
   * `inline`  — text link with an icon, used inside prose and the hero
   * `card`    — full-width contact card action
   */
  variant?: 'button' | 'inline' | 'card';
  tone?: 'dark' | 'light';
  className?: string;
  /** Renders the number itself rather than the localized "Call us" label. */
  showNumber?: boolean;
};

export function ClickToCallButton({
  variant = 'button',
  tone = 'dark',
  className,
  showNumber = true
}: ClickToCallButtonProps) {
  const t = useTranslations('common');
  const phone = getPhone(useLocale() as Locale);
  const label = showNumber ? phone.display : t('callUs');

  const base =
    'inline-flex items-center gap-2 font-semibold transition-colors duration-200 ease-brand';

  const styles: Record<NonNullable<ClickToCallButtonProps['variant']>, string> = {
    button: cn(
      'min-h-[2.75rem] rounded-pill border-2 px-4 text-sm',
      tone === 'light'
        ? 'border-white/35 text-white hover:border-white/70 hover:bg-white/10'
        : 'border-navy-100 text-navy hover:border-brand-blue hover:text-brand-blue'
    ),
    inline: cn(
      'text-[0.95rem] underline-offset-4 hover:underline',
      tone === 'light' ? 'text-white' : 'text-brand-blue hover:text-brand-purple'
    ),
    card: cn(
      'text-lg',
      tone === 'light' ? 'text-white' : 'text-navy hover:text-brand-blue'
    )
  };

  return (
    <a
      href={phone.href}
      className={cn(base, styles[variant], className)}
      aria-label={`${t('callUs')}: ${phone.display}`}
    >
      <Phone aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
