import { useTranslations } from 'next-intl';
import { Check, Clock, ClipboardList, PhoneCall } from 'lucide-react';

import { propertyTypes, spacesByPropertyType, timeWindows } from '@/data/intake';
import { siteConfig } from '@/lib/site-config';
import { Reveal } from '@/components/ui/Reveal';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

/**
 * Intake requirements panel.
 *
 * There is no scheduling calendar in phase 1 — by design. Before a visit can be
 * quoted the client needs exactly two things from the visitor: the window of
 * time they want the work done in, and the list of spaces the job covers. This
 * panel states both up front so the request that arrives by form, email or
 * phone is already complete, and a phone call is all that remains.
 *
 * The options mirror `data/intake.ts`, the same source the contact form's
 * checklist is built from, so the two can never drift apart.
 */
export function BookingPanel() {
  const t = useTranslations('bookPage.request');
  const tIntake = useTranslations('intake');
  const tCommon = useTranslations('common');

  /*
   * "Email us" opens a message already containing the questions, so the
   * visitor only has to answer them.
   *
   * The three time windows are listed in full because they are a fixed choice.
   * The space checklist is NOT: at twenty items it would push the mailto URL
   * past the length some mail clients still truncate, so the email asks for the
   * spaces and the full checklist stays on the page above.
   */
  const emailBody = [
    t('email.intro'),
    '',
    t('email.timeHeading'),
    ...timeWindows.map(
      (slot) => `  - ${tIntake(`timeWindows.${slot}.label`)}: ${tIntake(`timeWindows.${slot}.hours`)}`
    ),
    '',
    t('email.propertyHeading'),
    ...propertyTypes.map((type) => `  - ${tIntake(`propertyTypes.${type}.label`)}`),
    '',
    t('email.spacesHeading'),
    '',
    t('email.contactHeading'),
    ''
  ].join('\n');

  const emailHref = `${siteConfig.emailHref}?subject=${encodeURIComponent(
    t('email.subject')
  )}&body=${encodeURIComponent(emailBody)}`;

  return (
    <Reveal className="w-full">
      <div className="overflow-hidden rounded-panel border border-navy-100 bg-white shadow-card">
        <div className="border-b border-navy-100 bg-surface px-6 py-5 sm:px-8">
          <p className="eyebrow">
            <ClipboardList aria-hidden="true" className="h-4 w-4" />
            {t('eyebrow')}
          </p>
          <h2 className="mt-2 font-heading text-2xl text-navy">{t('heading')}</h2>
        </div>

        <div className="flex flex-col gap-10 px-6 py-8 sm:px-8 sm:py-10">
          {/* 1 — window of time */}
          <section>
            <h3 className="flex items-center gap-2.5 font-heading text-lg font-semibold text-navy">
              <Clock aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-purple" />
              {t('timeWindowsTitle')}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-500">
              {t('timeWindowsBody')}
            </p>

            <ul className="mt-5 grid gap-3 sm:grid-cols-3">
              {timeWindows.map((slot) => (
                <li
                  key={slot}
                  className="rounded-card border border-navy-100/70 bg-surface px-4 py-4 text-center"
                >
                  <p className="font-heading text-base font-semibold text-navy">
                    {tIntake(`timeWindows.${slot}.label`)}
                  </p>
                  <p className="mt-1 text-sm text-navy-400">
                    {tIntake(`timeWindows.${slot}.hours`)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* 2 — spaces, one checklist per property type */}
          <section>
            <h3 className="flex items-center gap-2.5 font-heading text-lg font-semibold text-navy">
              <ClipboardList aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-purple" />
              {t('spacesTitle')}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-500">
              {t('spacesBody')}
            </p>

            <div className="mt-5 grid gap-6 md:grid-cols-2">
              {propertyTypes.map((type) => (
                <div
                  key={type}
                  className="rounded-card border border-navy-100/70 bg-surface p-5 sm:p-6"
                >
                  <p className="text-sm font-semibold uppercase tracking-[0.12em] text-navy-400">
                    {tIntake(`propertyTypes.${type}.heading`)}
                  </p>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {spacesByPropertyType[type].map((space) => (
                      <li
                        key={space}
                        className="flex items-start gap-2.5 text-[0.9375rem] leading-relaxed text-navy-600"
                      >
                        <Check
                          aria-hidden="true"
                          className="mt-1 h-4 w-4 shrink-0 text-brand-blue"
                        />
                        {tIntake(`spaces.${space}`)}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* 3 — what happens next */}
          <section className="rounded-card border border-brand-blue/25 bg-brand-blue/5 p-5 sm:p-6">
            <h3 className="flex items-center gap-2.5 font-heading text-lg font-semibold text-navy">
              <PhoneCall aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-purple" />
              {t('nextStepTitle')}
            </h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy-600">
              {t('nextStepBody')}
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <PrimaryButton href="/contact" withArrow>
                {t('formCta')}
              </PrimaryButton>
              <a href={emailHref} className="btn-secondary">
                {tCommon('emailUs')}
              </a>
            </div>
          </section>
        </div>
      </div>
    </Reveal>
  );
}
