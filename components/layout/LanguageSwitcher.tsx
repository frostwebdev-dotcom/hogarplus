'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Globe, Loader2 } from 'lucide-react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type LanguageSwitcherProps = {
  tone?: 'dark' | 'light';
  /** `segmented` = pill toggle (header/footer); `stacked` = full-width rows (mobile menu). */
  layout?: 'segmented' | 'stacked';
  className?: string;
};

const SHORT_LABEL_KEY: Record<Locale, 'englishShort' | 'spanishShort'> = {
  en: 'englishShort',
  es: 'spanishShort'
};

const FULL_LABEL_KEY: Record<Locale, 'english' | 'spanish'> = {
  en: 'english',
  es: 'spanish'
};

const SWITCH_LABEL_KEY: Record<Locale, 'switchToEnglish' | 'switchToSpanish'> = {
  en: 'switchToEnglish',
  es: 'switchToSpanish'
};

/**
 * Locale toggle that preserves the current route.
 *
 * `usePathname()` from `@/i18n/navigation` returns the pathname *without* the
 * locale prefix, so replacing the same pathname under a different locale lands
 * on the translated equivalent of whatever page the user is currently on.
 */
export function LanguageSwitcher({
  tone = 'dark',
  layout = 'segmented',
  className
}: LanguageSwitcherProps) {
  const t = useTranslations('nav');
  const activeLocale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isLight = tone === 'light';

  function switchTo(nextLocale: Locale) {
    if (nextLocale === activeLocale) return;
    startTransition(() => {
      // `pathname` here is locale-stripped (e.g. `/services`), so replacing it
      // under a different locale lands on the same page in the other language.
      router.replace(pathname, { locale: nextLocale });
    });
  }

  if (layout === 'stacked') {
    return (
      <div className={cn('flex flex-col gap-2', className)}>
        <span
          className={cn(
            'text-xs font-semibold uppercase tracking-[0.14em]',
            isLight ? 'text-navy-100/70' : 'text-navy-400'
          )}
        >
          {t('languageLabel')}
        </span>
        <div className="grid grid-cols-2 gap-2" role="group" aria-label={t('languageLabel')}>
          {locales.map((locale) => {
            const isActive = locale === activeLocale;
            return (
              <button
                key={locale}
                type="button"
                lang={locale}
                onClick={() => switchTo(locale)}
                aria-current={isActive ? 'true' : undefined}
                aria-label={t(SWITCH_LABEL_KEY[locale])}
                className={cn(
                  'min-h-[3rem] rounded-xl border-2 px-4 text-sm font-semibold transition-colors duration-200',
                  isActive
                    ? 'border-transparent bg-gradient-brand text-white shadow-glow'
                    : isLight
                      ? 'border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10'
                      : 'border-navy-100 bg-white text-navy hover:border-brand-blue hover:text-brand-blue'
                )}
              >
                {t(FULL_LABEL_KEY[locale])}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t('languageLabel')}
      className={cn(
        'relative flex items-center gap-0.5 rounded-pill border p-1',
        isLight ? 'border-white/25 bg-white/10' : 'border-navy-100 bg-surface',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn('ml-2 mr-1 hidden sm:inline', isLight ? 'text-white/70' : 'text-navy-400')}
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Globe className="h-4 w-4" />
        )}
      </span>

      {locales.map((locale) => {
        const isActive = locale === activeLocale;
        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            onClick={() => switchTo(locale)}
            aria-current={isActive ? 'true' : undefined}
            aria-label={t(SWITCH_LABEL_KEY[locale])}
            className={cn(
              'min-h-[2.25rem] min-w-[2.75rem] rounded-pill px-3 text-sm font-semibold transition-all duration-200',
              isActive
                ? 'bg-gradient-brand text-white shadow-sm'
                : isLight
                  ? 'text-white/75 hover:bg-white/10 hover:text-white'
                  : 'text-navy-400 hover:bg-white hover:text-navy'
            )}
          >
            {t(SHORT_LABEL_KEY[locale])}
          </button>
        );
      })}
    </div>
  );
}
