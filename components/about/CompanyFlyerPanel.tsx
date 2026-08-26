import { useLocale, useTranslations } from 'next-intl';
import { Handshake, Sparkles, Target } from 'lucide-react';

import type { Locale } from '@/i18n/routing';
import { getPhone, siteConfig } from '@/lib/site-config';
import { BrandMark } from '@/components/layout/BrandMark';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * THE COMPANY FLYER, REBUILT AS A LOCALIZED PANEL
 * ─────────────────────────────────────────────────────────────────────────────
 * The client's flyer exists only as a JPEG with Spanish text baked into the
 * pixels (`siteConfig.brand.companyFlyer`), so on the English side it showed a
 * Spanish artifact that could not be translated, selected, searched or read
 * aloud by a screen reader.
 *
 * This redraws the same flyer — navy field, stacked logo, script tagline, and
 * the three pill-headed sections — as real markup. Every string comes from the
 * dictionaries, so it renders in the visitor's language, and none of the copy
 * is new: it is the same text already shown beside it on the About page.
 *
 * Sources, so nothing here can drift out of sync with the rest of the site:
 *   ¿Quiénes somos?    → `aboutPreview.{heading,body}`
 *   Nuestro objetivo   → `objectives.{eyebrow,items}`
 *   Nuestros servicios → `aboutPage.services.eyebrow` + `aboutPreview.highlights`
 *   Contact strip      → `getPhone(locale)`, `siteConfig.email`, `websiteDisplay`
 *
 * The original JPEG is still in `public/brand/` and is what a print shop should
 * be given; this is the on-screen equivalent, not a replacement for the artwork.
 */
export function CompanyFlyerPanel() {
  const locale = useLocale() as Locale;
  const tAbout = useTranslations('aboutPage');
  const tPreview = useTranslations('aboutPreview');
  const tObjectives = useTranslations('objectives');
  const tCommon = useTranslations('common');

  const phone = getPhone(locale);
  const objectives = [0, 1, 2, 3].map((i) => tObjectives(`items.${i}`));
  const serviceLines = [0, 1, 2, 3].map((i) => tPreview(`highlights.${i}`));

  return (
    <div className="on-dark overflow-hidden rounded-[calc(theme(borderRadius.panel)-2px)] bg-navy-950">
      {/* Decorative field, echoing the flyer's navy gradient and light blooms. */}
      <div className="relative isolate">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-navy" />
        <div
          aria-hidden="true"
          className="absolute -left-16 top-[-4rem] -z-10 h-56 w-56 rounded-full bg-brand-purple/25 blur-[80px]"
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-[-4rem] -z-10 h-56 w-56 rounded-full bg-brand-blue/25 blur-[80px]"
        />

        <div className="flex flex-col gap-7 px-6 py-9 sm:px-9 sm:py-11">
          {/* ── Masthead ─────────────────────────────────────────────── */}
          <div className="flex flex-col items-center gap-3 text-center">
            <BrandMark gradientId="flyer-panel-mark" className="h-14 w-14" />

            <p className="font-heading text-3xl leading-none text-white sm:text-4xl">
              Hogar<span className="text-brand-orchid">Plus</span>
            </p>
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.42em] text-navy-100/80">
              Solutions
            </p>

            <p className="mt-1 max-w-sm text-[0.9375rem] italic leading-relaxed text-brand-orchid/90">
              {tCommon('brandTagline')}
            </p>
          </div>

          {/* ── Who we are ───────────────────────────────────────────── */}
          <FlyerSection icon={<Handshake aria-hidden="true" className="h-5 w-5" />} label={tPreview('eyebrow')}>
            <p className="text-[0.9375rem] leading-relaxed text-navy-100">{tPreview('body')}</p>
          </FlyerSection>

          {/* ── Our objective ────────────────────────────────────────── */}
          <FlyerSection icon={<Target aria-hidden="true" className="h-5 w-5" />} label={tObjectives('eyebrow')}>
            <ul className="flex flex-col gap-2">
              {objectives.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-navy-100">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-orchid" />
                  {item}
                </li>
              ))}
            </ul>
          </FlyerSection>

          {/* ── Our services ─────────────────────────────────────────── */}
          <FlyerSection
            icon={<Sparkles aria-hidden="true" className="h-5 w-5" />}
            label={tAbout('services.eyebrow')}
          >
            <ul className="flex flex-col gap-2">
              {serviceLines.map((line) => (
                <li key={line} className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-navy-100">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                  {line}
                </li>
              ))}
            </ul>
          </FlyerSection>

          {/* ── Contact strip ────────────────────────────────────────── */}
          <div className="mt-1 flex flex-col items-center gap-2 border-t border-white/15 pt-6 text-center">
            <a
              href={phone.href}
              className="text-[1.0625rem] font-semibold text-white underline decoration-brand-orchid decoration-2 underline-offset-[6px] transition-colors hover:text-brand-orchid"
            >
              {phone.display}
            </a>
            <a href={siteConfig.emailHref} className="break-all text-sm text-navy-100 hover:text-white">
              {siteConfig.email}
            </a>
            <p className="text-sm text-navy-100/80">{siteConfig.websiteDisplay}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** One pill-headed block, matching the flyer's section styling. */
function FlyerSection({
  icon,
  label,
  children
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <p className="inline-flex w-fit items-center gap-2 rounded-pill bg-gradient-brand px-4 py-1.5 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white shadow-glow">
        {label}
      </p>

      <div className="flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-brand-orchid"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </section>
  );
}
