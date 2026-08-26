'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu } from 'lucide-react';

import { Link, usePathname } from '@/i18n/navigation';
import { primaryNav } from '@/lib/navigation-items';
import { cn } from '@/lib/utils';
import { ClickToCallButton } from '@/components/ui/ClickToCallButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';
import { MobileNavigation } from './MobileNavigation';

const MENU_TRIGGER_ID = 'mobile-menu-trigger';

/**
 * Sticky site header.
 *
 * Navy, like the flyers — the supplied branding is designed for a deep navy
 * field, so the header gives it the same background rather than dropping a
 * navy logo onto white. Past 24px of scroll it compacts, deepens and gains a
 * shadow. Heights stay in sync with the `--header-height` custom properties in
 * `globals.css` so anchored headings are never hidden behind it.
 */
export function Header() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the menu if the route changes for any reason (e.g. locale switch).
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          'on-dark fixed inset-x-0 top-0 z-[60] transition-all duration-300 ease-brand',
          isScrolled
            ? 'border-b border-white/10 bg-navy-950/95 shadow-header backdrop-blur-md'
            : 'border-b border-white/[0.07] bg-navy/80 backdrop-blur-sm'
        )}
      >
        {/* Thin brand gradient hairline, echoing the flyer's divider rules. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-brand-purple/60 to-transparent"
        />

        <div
          className={cn(
            'shell-wide flex items-center justify-between gap-4 transition-[height] duration-300 ease-brand',
            isScrolled ? 'h-[var(--header-height-scrolled)]' : 'h-[var(--header-height)]'
          )}
        >
          <Logo markId="header-mark" />

          {/* Desktop navigation */}
          <nav aria-label={t('primaryLabel')} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {primaryNav.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.key}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={cn(
                        'relative inline-flex min-h-[2.5rem] items-center rounded-lg px-3 text-[0.9375rem] font-medium transition-colors duration-200',
                        isActive ? 'text-white' : 'text-navy-100/75 hover:text-white'
                      )}
                    >
                      {t(item.key)}
                      <span
                        aria-hidden="true"
                        className={cn(
                          'absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-brand transition-transform duration-300 ease-brand',
                          isActive ? 'scale-x-100' : 'scale-x-0'
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher tone="light" />
            <ClickToCallButton variant="button" tone="light" className="hidden xl:inline-flex" />
            <Link href="/book" className="btn-primary btn-sm">
              {tCommon('getEstimate')}
            </Link>
          </div>

          {/* Mobile actions.
              The language toggle stays visible here rather than living only
              inside the menu — a bilingual audience should never have to open
              a hamburger to find their own language. */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher tone="light" compact />
            <Link href="/book" className="btn-primary btn-sm hidden sm:inline-flex">
              {tCommon('getEstimate')}
            </Link>
            <button
              id={MENU_TRIGGER_ID}
              type="button"
              onClick={() => setIsMenuOpen(true)}
              aria-label={t('openMenu')}
              aria-expanded={isMenuOpen}
              aria-haspopup="dialog"
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/10"
            >
              <Menu aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileNavigation
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        triggerId={MENU_TRIGGER_ID}
      />
    </>
  );
}
