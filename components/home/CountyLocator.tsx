'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight, MapPin } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { counties } from '@/data/counties';
import type { CountyId } from '@/lib/site-config';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

/**
 * Simplified New Jersey silhouette.
 *
 * Traced clockwise from Port Jervis using the same linear lon/lat projection
 * documented in `data/counties.ts`, so the outline and the county dots share
 * one coordinate space. It is an illustration, not survey data — and it loads
 * no mapping library, which keeps this section at zero extra kilobytes.
 */
const NJ_OUTLINE = [
  'M 54.6 3.5', // Port Jervis — north-west corner
  'L 97.3 17.3', // straight New York border, running south-east
  'L 90.8 26.9', // Hudson River opposite Manhattan
  'L 89.2 31.5', // Bayonne
  'L 78.4 36.9', // Raritan Bay inlet
  'L 91.9 38.1', // Sandy Hook
  'L 89.5 48.0',
  'L 88.0 58.0', // Barnegat
  'L 84.0 68.0',
  'L 74.0 80.0', // Atlantic coast
  'L 60.0 90.0',
  'L 43.2 96.9', // Cape May
  'L 36.2 86.5', // Delaware Bay
  'L 20.5 79.6',
  'L 9.2 72.3', // Salem
  'L 15.1 63.5',
  'L 30.8 58.1', // Camden
  'L 50.3 47.3', // Trenton
  'L 41.1 41.5', // Lambertville
  'L 27.6 29.2', // Phillipsburg
  'L 33.5 23.8', // Belvidere
  'Z'
].join(' ');

export function CountyLocator() {
  const t = useTranslations('serviceArea');
  const tCommon = useTranslations('common');

  const [selectedId, setSelectedId] = useState<CountyId>('essex');
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const selected = counties.find((county) => county.id === selectedId) ?? counties[0];

  /** Left/Right/Home/End move between chips, matching a toolbar pattern. */
  function handleChipKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    const keys = ['ArrowRight', 'ArrowLeft', 'ArrowDown', 'ArrowUp', 'Home', 'End'];
    if (!keys.includes(event.key)) return;

    event.preventDefault();
    let nextIndex = index;

    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
      nextIndex = (index + 1) % counties.length;
    } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
      nextIndex = (index - 1 + counties.length) % counties.length;
    } else if (event.key === 'Home') {
      nextIndex = 0;
    } else if (event.key === 'End') {
      nextIndex = counties.length - 1;
    }

    const next = counties[nextIndex];
    setSelectedId(next.id);
    chipRefs.current[next.id]?.focus();
  }

  return (
    <section className="section bg-white" aria-labelledby="service-area-heading">
      <div className="shell">
        <SectionHeading
          id="service-area-heading"
          eyebrow={t('eyebrow')}
          title={t('heading')}
          description={t('description')}
          className="mx-auto max-w-3xl"
        />

        <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12">
          {/* Map panel */}
          <Reveal className="order-2 lg:order-none">
            <div className="relative overflow-hidden rounded-panel border border-navy-100 bg-gradient-to-br from-navy-50 via-white to-surface p-6 shadow-card sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-blue/10 blur-3xl"
              />

              <svg
                viewBox="-6 -6 112 112"
                role="img"
                aria-label={t('mapLabel')}
                className="mx-auto h-auto w-full max-w-[21rem]"
              >
                <defs>
                  <linearGradient id="nj-fill" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2A7DFF" stopOpacity="0.16" />
                    <stop offset="55%" stopColor="#845EF7" stopOpacity="0.14" />
                    <stop offset="100%" stopColor="#C06CFF" stopOpacity="0.12" />
                  </linearGradient>
                  <linearGradient id="nj-stroke" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#2A7DFF" />
                    <stop offset="100%" stopColor="#C06CFF" />
                  </linearGradient>
                </defs>

                <path
                  d={NJ_OUTLINE}
                  fill="url(#nj-fill)"
                  stroke="url(#nj-stroke)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />

                {/* Dots are decorative: the chips below are the interactive,
                    keyboard-operable control, so nothing here takes focus. */}
                {counties.map((county) => {
                  const isSelected = county.id === selected.id;
                  return (
                    <g key={county.id} className="pointer-events-none">
                      {isSelected ? (
                        <circle
                          cx={county.point.x}
                          cy={county.point.y}
                          r="7"
                          fill="#2A7DFF"
                          opacity="0.16"
                        />
                      ) : null}
                      <circle
                        cx={county.point.x}
                        cy={county.point.y}
                        r={isSelected ? 3.2 : 2}
                        fill={isSelected ? '#2A7DFF' : '#7995D6'}
                        stroke="#FFFFFF"
                        strokeWidth="0.9"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Name of the current selection, flipped away from the edge. */}
                <text
                  x={selected.point.x + (selected.point.x > 62 ? -6 : 6)}
                  y={selected.point.y + 1.6}
                  textAnchor={selected.point.x > 62 ? 'end' : 'start'}
                  className="fill-navy font-body text-[5.5px] font-semibold"
                >
                  {selected.name}
                </text>
              </svg>

              <p className="mt-4 text-center text-xs text-navy-400">{t('mapCaption')}</p>
            </div>
          </Reveal>

          {/* Chips + info */}
          <Reveal className="order-1 flex flex-col gap-6 lg:order-none" delay={0.08}>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-navy-400">
                {t('selectPrompt')}
              </h3>

              <div
                role="group"
                aria-label={t('selectPrompt')}
                className="mt-4 flex flex-wrap gap-2.5"
              >
                {counties.map((county, index) => {
                  const isSelected = county.id === selected.id;
                  return (
                    <button
                      key={county.id}
                      type="button"
                      ref={(node) => {
                        chipRefs.current[county.id] = node;
                      }}
                      onClick={() => setSelectedId(county.id)}
                      onKeyDown={(event) => handleChipKeyDown(event, index)}
                      aria-pressed={isSelected}
                      className={cn(
                        'min-h-[2.75rem] rounded-pill border-2 px-4 text-[0.9375rem] font-semibold transition-all duration-200 ease-brand',
                        isSelected
                          ? 'border-transparent bg-gradient-brand text-white shadow-glow'
                          : 'border-navy-100 bg-white text-navy-600 hover:border-brand-blue hover:text-brand-blue'
                      )}
                    >
                      {county.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Info panel — announced when the selection changes. */}
            <div
              aria-live="polite"
              className="rounded-panel border border-navy-100 bg-surface p-6 shadow-card sm:p-7"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-purple">
                {t(`regions.${selected.region}`)}
              </p>

              <h3 className="mt-2 flex items-center gap-2.5 font-heading text-2xl text-navy">
                <MapPin aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-blue" />
                {selected.name} {tCommon('county')}
              </h3>

              <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-500">
                {t(`counties.${selected.id}`)}
              </p>

              <p className="mt-5 border-t border-navy-100 pt-5 text-sm leading-relaxed text-navy-400">
                {t('note')}{' '}
                <Link href="/contact" className="link-underline inline-flex items-center gap-1">
                  {t('noteCta')}
                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
