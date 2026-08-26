'use client';

import { useCallback, useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';

import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav } from '@/lib/navigation-items';
import { siteConfig } from '@/lib/site-config';
import { cn } from '@/lib/utils';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { ClickToCallButton } from '@/components/ui/ClickToCallButton';

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
  /** Id of the trigger button, so the panel can point back at it. */
  triggerId: string;
};

/**
 * Slide-in mobile menu.
 *
 * Accessibility contract:
 *  - rendered as a labelled `role="dialog" aria-modal="true"`
 *  - Escape closes it
 *  - focus moves into the panel on open and returns to the trigger on close
 *  - Tab is trapped inside the panel while it is open
 *  - background scrolling is locked, without the layout shifting
 */
export function MobileNavigation({ isOpen, onClose, triggerId }: MobileNavigationProps) {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  /* Escape to close + focus trap. */
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);

    // Lock scroll without a layout jump caused by the disappearing scrollbar.
    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    // Move focus into the panel once it has mounted.
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, handleKeyDown]);

  /* Return focus to the hamburger when the menu closes. */
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !isOpen) {
      document.getElementById(triggerId)?.focus();
    }
    wasOpen.current = isOpen;
  }, [isOpen, triggerId]);

  const duration = shouldReduceMotion ? 0 : 0.32;

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          key="mobile-nav"
          className="fixed inset-0 z-[70] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
        >
          {/* Backdrop — clicking it closes the menu. It is decorative; the
              Escape key and the close button are the accessible paths. */}
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/60 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { x: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="on-dark absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-navy-950 shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <span id={titleId} className="sr-only">
                {t('menuTitle')}
              </span>
              <div onClick={onClose}>
                <Logo markId="mobile-mark" />
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('closeMenu')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <nav
              aria-label={t('primaryLabel')}
              className="flex-1 overflow-y-auto overscroll-contain px-5 py-6"
            >
              <ul className="flex flex-col gap-1">
                {primaryNav.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.li
                      key={item.key}
                      initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.3,
                        delay: shouldReduceMotion ? 0 : 0.08 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={isActive ? 'page' : undefined}
                        className={cn(
                          'flex min-h-[3.25rem] items-center rounded-xl px-4 font-heading text-lg font-semibold transition-colors',
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-navy-100/80 hover:bg-white/5 hover:text-white'
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="/book"
                  onClick={onClose}
                  className="btn-primary w-full"
                >
                  {tCommon('getEstimate')}
                </Link>

                <ClickToCallButton variant="button" tone="light" className="w-full justify-center" />

                <LanguageSwitcher layout="stacked" tone="light" className="mt-2" />
              </div>
            </nav>

            <div className="border-t border-white/10 px-5 py-4">
              <p className="text-sm text-navy-100/70">{tCommon('serviceAreaShort')}</p>
              <a
                href={siteConfig.emailHref}
                className="mt-1 inline-block break-all text-sm font-medium text-brand-orchid hover:text-white"
              >
                {siteConfig.email}
              </a>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
