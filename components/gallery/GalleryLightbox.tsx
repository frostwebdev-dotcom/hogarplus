'use client';

import { useCallback, useEffect, useId, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

import type { DemoGalleryItem } from '@/data/demo-content';
import { GalleryTile } from './GalleryTile';

type GalleryLightboxProps = {
  items: DemoGalleryItem[];
  /** Index into `items`, or `null` when the lightbox is closed. */
  activeIndex: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

/**
 * Custom lightbox — no third-party dependency.
 *
 * Accessibility contract:
 *  - `role="dialog" aria-modal="true"` with a localized label
 *  - Escape closes, ArrowLeft / ArrowRight move between images
 *  - focus moves to the close button on open and is trapped while open
 *  - focus returns to the thumbnail that opened it (handled by GalleryGrid)
 *  - background scrolling is locked without a layout shift
 *  - the current position is announced via a live region
 */
export function GalleryLightbox({
  items,
  activeIndex,
  onClose,
  onPrevious,
  onNext
}: GalleryLightboxProps) {
  const t = useTranslations('galleryPage');
  const shouldReduceMotion = useReducedMotion();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const isOpen = activeIndex !== null;
  const item = isOpen ? items[activeIndex] : undefined;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          event.preventDefault();
          onClose();
          return;
        case 'ArrowLeft':
          event.preventDefault();
          onPrevious();
          return;
        case 'ArrowRight':
          event.preventDefault();
          onNext();
          return;
        case 'Tab': {
          if (!dialogRef.current) return;
          const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
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
          return;
        }
        default:
      }
    },
    [onClose, onNext, onPrevious]
  );

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener('keydown', handleKeyDown);

    const { body } = document;
    const previousOverflow = body.style.overflow;
    const previousPadding = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPadding;
      window.clearTimeout(focusTimer);
    };
  }, [isOpen, handleKeyDown]);

  const duration = shouldReduceMotion ? 0 : 0.25;

  return (
    <AnimatePresence>
      {isOpen && item ? (
        <motion.div
          key="lightbox"
          className="on-dark fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration }}
        >
          <div
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('lightbox.label')}
            aria-describedby={titleId}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex w-full max-w-4xl flex-col gap-4"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between gap-4">
              <p aria-live="polite" className="text-sm font-medium text-white/80">
                {t('lightbox.counter', {
                  current: (activeIndex ?? 0) + 1,
                  total: items.length
                })}
              </p>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label={t('lightbox.close')}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white/60 hover:bg-white/10"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            {/* Image stage */}
            <figure className="relative overflow-hidden rounded-panel bg-navy-900 shadow-card-hover">
              <div className="relative aspect-[16/10] w-full">
                <GalleryTile
                  item={item}
                  priority
                  sizes="(min-width: 1024px) 900px, 100vw"
                  alt={t(`items.${item.captionKey}.alt`)}
                />
              </div>

              <figcaption
                id={titleId}
                className="flex flex-col gap-1 border-t border-white/10 bg-navy-950/80 px-5 py-4"
              >
                <span className="font-heading text-lg text-white">
                  {t(`items.${item.captionKey}.title`)}
                </span>
                <span className="text-sm text-navy-100/70">
                  {t(`filters.${item.category}`)}
                </span>
              </figcaption>
            </figure>

            {/* Controls */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={onPrevious}
                aria-label={t('lightbox.previous')}
                className="btn-ghost-light btn-sm"
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4" />
                <span className="hidden sm:inline">{t('lightbox.previous')}</span>
              </button>

              <p className="hidden text-xs text-white/50 sm:block">{t('lightbox.hint')}</p>

              <button
                type="button"
                onClick={onNext}
                aria-label={t('lightbox.next')}
                className="btn-ghost-light btn-sm"
              >
                <span className="hidden sm:inline">{t('lightbox.next')}</span>
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
