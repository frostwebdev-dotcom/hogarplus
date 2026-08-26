import { useLocale, useTranslations } from 'next-intl';
import { CalendarCheck, Zap } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getPhone } from '@/lib/site-config';
import { Reveal } from '@/components/ui/Reveal';

export function BookingCTA() {
  const t = useTranslations('bookingCta');
  const phone = getPhone(useLocale() as Locale);

  return (
    <section className="section-tight bg-surface" aria-labelledby="booking-cta-heading">
      <div className="shell">
        <Reveal>
          <div className="relative isolate overflow-hidden rounded-panel bg-gradient-brand px-6 py-12 shadow-glow-purple sm:px-10 md:px-14 md:py-16">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-navy/30 blur-3xl" />
              <div className="absolute inset-0 grain opacity-70" />
            </div>

            <div className="on-dark flex flex-col items-center gap-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-pill border border-white/30 bg-white/15 px-4 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                <CalendarCheck aria-hidden="true" className="h-4 w-4" />
                {t('eyebrow')}
              </span>

              <h2
                id="booking-cta-heading"
                className="max-w-2xl font-heading text-[1.9rem] leading-[1.15] text-white sm:text-[2.3rem] lg:text-display-md"
              >
                {t('heading')}
              </h2>

              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-white/90">
                {t('description')}
              </p>

              <div className="mt-2 flex w-full flex-col items-center gap-4 sm:w-auto sm:flex-row">
                <Link
                  href="/book"
                  className="btn w-full bg-white text-navy shadow-card transition-transform hover:-translate-y-0.5 hover:shadow-card-hover sm:w-auto"
                >
                  {t('primaryCta')}
                </Link>

                <p className="text-[0.9375rem] text-white/90">
                  {t('secondaryPrefix')}{' '}
                  <a
                    href={phone.href}
                    className="font-semibold text-white underline decoration-white/60 decoration-2 underline-offset-4 transition-colors hover:decoration-white"
                  >
                    {phone.display}
                  </a>
                </p>
              </div>

              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-white/80">
                <Zap aria-hidden="true" className="h-4 w-4" />
                {t('trust')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
