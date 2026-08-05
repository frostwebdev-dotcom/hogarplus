import { useTranslations } from 'next-intl';
import { CalendarClock, ExternalLink, Info, Phone } from 'lucide-react';

import { siteConfig } from '@/lib/site-config';
import { GradientPanel } from '@/components/ui/GradientPanel';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Scheduling panel.
 *
 * Renders the Calendly embed when `NEXT_PUBLIC_CALENDLY_URL` is set, and an
 * elegant branded placeholder when it is not. It never throws and never shows a
 * broken frame — the demo is fully presentable with no scheduling URL at all.
 *
 * The embed is a plain `<iframe>` rather than Calendly's widget script so the
 * page ships no third-party JavaScript and needs no CSP changes for the demo.
 */
export function BookingPanel() {
  const t = useTranslations('bookPage.scheduler');
  const tCommon = useTranslations('common');
  const { calendlyUrl } = siteConfig;

  return (
    <Reveal className="w-full">
      <div className="overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card">
        <div className="border-b border-navy-100 bg-surface px-6 py-5 sm:px-8">
          <p className="eyebrow">
            <CalendarClock aria-hidden="true" className="h-4 w-4" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-heading text-2xl text-navy">{t('heading')}</h2>
        </div>

        {calendlyUrl ? (
          <div className="bg-white">
            <iframe
              src={calendlyUrl}
              title={t('frameTitle')}
              loading="lazy"
              className="h-[42rem] w-full border-0"
            />
            <div className="border-t border-navy-100 px-6 py-4 sm:px-8">
              <a
                href={calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-2 text-sm"
              >
                {t('openInNewTab')}
                <ExternalLink aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        ) : (
          <GradientPanel tone="navy" className="min-h-[26rem] p-6 sm:p-10">
            <div className="on-dark relative flex h-full flex-col items-center justify-center gap-5 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                <CalendarClock aria-hidden="true" className="h-8 w-8" />
              </span>

              <h3 className="font-heading text-2xl text-white sm:text-3xl">
                {t('placeholderTitle')}
              </h3>

              <p className="max-w-lg text-[0.9375rem] leading-relaxed text-navy-100">
                {t('placeholderBody')}
              </p>

              <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                <a href={siteConfig.phoneHref} className="btn bg-white text-navy hover:-translate-y-0.5">
                  <Phone aria-hidden="true" className="h-4 w-4" />
                  {tCommon('callNow')}
                </a>
                <a href={siteConfig.emailHref} className="btn-ghost-light">
                  {tCommon('emailUs')}
                </a>
              </div>

              {/* Developer-facing note; harmless and useful during the demo. */}
              <p className="mt-4 flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-2 text-xs text-white/60">
                <Info aria-hidden="true" className="h-3.5 w-3.5" />
                {t('placeholderNote')}
              </p>
            </div>
          </GradientPanel>
        )}
      </div>
    </Reveal>
  );
}
