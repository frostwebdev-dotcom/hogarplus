'use client';

import { useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Info, Maximize2 } from 'lucide-react';

import { demoGallery, galleryFilters, type GalleryCategory } from '@/data/demo-content';
import { cn } from '@/lib/utils';
import { GalleryLightbox } from './GalleryLightbox';
import { GalleryTile } from './GalleryTile';

type Filter = 'all' | GalleryCategory;

export function GalleryGrid() {
  const t = useTranslations('galleryPage');
  const shouldReduceMotion = useReducedMotion();

  const [filter, setFilter] = useState<Filter>('all');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  /** Remembers which thumbnail opened the lightbox so focus can return there. */
  const lastTriggerId = useRef<string | null>(null);

  const visibleItems = useMemo(
    () => (filter === 'all' ? demoGallery : demoGallery.filter((item) => item.category === filter)),
    [filter]
  );

  function open(index: number) {
    lastTriggerId.current = visibleItems[index].id;
    setActiveIndex(index);
  }

  function close() {
    setActiveIndex(null);
    const id = lastTriggerId.current;
    if (id) {
      // Wait for the exit animation before restoring focus.
      window.setTimeout(() => triggerRefs.current[id]?.focus(), 80);
    }
  }

  function step(direction: -1 | 1) {
    setActiveIndex((current) => {
      if (current === null) return current;
      const next = (current + direction + visibleItems.length) % visibleItems.length;
      lastTriggerId.current = visibleItems[next].id;
      return next;
    });
  }

  return (
    <>
      {/* Filters */}
      <div role="group" aria-label={t('filtersLabel')} className="flex flex-wrap justify-center gap-2.5">
        {galleryFilters.map((value) => {
          const isActive = value === filter;
          return (
            <button
              key={value}
              type="button"
              onClick={() => {
                setFilter(value);
                setActiveIndex(null);
              }}
              aria-pressed={isActive}
              className={cn(
                'min-h-[2.75rem] rounded-pill border-2 px-5 text-[0.9375rem] font-semibold transition-all duration-200 ease-brand',
                isActive
                  ? 'border-transparent bg-gradient-brand text-white shadow-glow'
                  : 'border-navy-100 bg-white text-navy-600 hover:border-brand-blue hover:text-brand-blue'
              )}
            >
              {t(`filters.${value}`)}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {visibleItems.length === 0 ? (
        <p className="mt-12 text-center text-navy-400">{t('empty')}</p>
      ) : (
        // Fixed row height (rather than a per-tile aspect ratio) so the
        // two-column `wide` tiles sit flush with their neighbours instead of
        // leaving a gap above the shorter cards in the same row.
        <ul className="mt-10 grid auto-rows-[14rem] gap-5 sm:auto-rows-[15rem] sm:grid-cols-2 lg:auto-rows-[16.5rem] lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleItems.map((item, index) => (
              <motion.li
                key={item.id}
                layout={!shouldReduceMotion}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={cn(item.span === 'wide' && 'lg:col-span-2')}
              >
                <button
                  type="button"
                  ref={(node) => {
                    triggerRefs.current[item.id] = node;
                  }}
                  onClick={() => open(index)}
                  className="group relative block h-full w-full overflow-hidden rounded-card shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <span className="sr-only">
                    {t('openItem')}: {t(`items.${item.captionKey}.title`)}
                  </span>

                  <span className="absolute inset-0 block">
                    <GalleryTile
                      item={item}
                      priority={index === 0}
                      alt={t(`items.${item.captionKey}.alt`)}
                      title={t(`items.${item.captionKey}.title`)}
                      className="transition-transform duration-500 ease-brand group-hover:scale-[1.04] motion-reduce:transform-none"
                    />
                  </span>

                  {/* Caption overlay */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-navy-950/85 via-navy-950/40 to-transparent p-5 text-left"
                  >
                    <span className="flex flex-col gap-1">
                      <span className="font-heading text-base font-semibold text-white sm:text-lg">
                        {t(`items.${item.captionKey}.title`)}
                      </span>
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-white/70">
                        {t(`filters.${item.category}`)}
                      </span>
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Maximize2 className="h-4 w-4" />
                    </span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      )}

      {/* Honest disclosure that the tiles are placeholders. */}
      <p className="mx-auto mt-8 flex max-w-2xl items-start gap-2.5 rounded-card border border-navy-100 bg-white px-5 py-4 text-sm leading-relaxed text-navy-400">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
        {t('placeholderNote')}
      </p>

      <GalleryLightbox
        items={visibleItems}
        activeIndex={activeIndex}
        onClose={close}
        onPrevious={() => step(-1)}
        onNext={() => step(1)}
      />
    </>
  );
}
