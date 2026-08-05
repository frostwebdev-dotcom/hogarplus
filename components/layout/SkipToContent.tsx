import { useTranslations } from 'next-intl';

/**
 * First focusable element on the page. Stays visually hidden until it receives
 * keyboard focus, then appears above the header.
 */
export function SkipToContent() {
  const t = useTranslations('common');

  return (
    <a
      href="#main-content"
      className="sr-only-focusable fixed left-4 top-4 z-[100] rounded-pill bg-navy px-5 py-3 text-sm font-semibold text-white shadow-glow focus-visible:ring-offset-surface"
    >
      {t('skipToContent')}
    </a>
  );
}
