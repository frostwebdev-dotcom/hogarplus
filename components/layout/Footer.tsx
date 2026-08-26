import { Globe, Mail, MapPin, Phone } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { footerNav } from '@/lib/navigation-items';
import { getPhone, siteConfig } from '@/lib/site-config';
import { services } from '@/data/services';
import { counties } from '@/data/counties';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Logo } from './Logo';

/**
 * Site footer.
 *
 * Contact details are the client's confirmed values and come exclusively from
 * `siteConfig` — nothing here is hardcoded. Business hours and a street address
 * are intentionally absent: neither has been confirmed, so neither is shown.
 */
export function Footer() {
  const t = useTranslations('footer');
  const phone = getPhone(useLocale() as Locale);
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services.items');

  const year = new Date().getFullYear();

  return (
    <footer className="on-dark relative isolate overflow-hidden bg-gradient-navy text-navy-100">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-brand-blue/20 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />
        <div className="absolute inset-0 grain opacity-50" />
      </div>

      <div className="shell py-14 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo markId="footer-mark" />

            {/* Flyer tagline, in the flyer's own accent colour. */}
            <p className="mt-5 font-heading text-lg italic leading-snug text-brand-orchid">
              {tCommon('brandTagline')}
            </p>

            <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-navy-100/85">
              {t('brandSummary')}
            </p>

            <Link href="/book" className="btn-primary btn-sm mt-6">
              {tCommon('getEstimate')}
            </Link>
          </div>

          {/* Explore */}
          <nav aria-labelledby="footer-explore" className="lg:col-span-2">
            <h2 id="footer-explore" className="font-heading text-base font-semibold text-white">
              {t('navTitle')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {footerNav.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-[0.9375rem] text-navy-100/80 transition-colors hover:text-white"
                  >
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <nav aria-labelledby="footer-services" className="lg:col-span-3">
            <h2 id="footer-services" className="font-heading text-base font-semibold text-white">
              {t('servicesTitle')}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {services.map((service) => (
                <li key={service.id}>
                  <Link
                    href={{ pathname: '/services', hash: service.slug }}
                    className="text-[0.9375rem] text-navy-100/80 transition-colors hover:text-white"
                  >
                    {tServices(`${service.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="font-heading text-base font-semibold text-white">{t('contactTitle')}</h2>
            <ul className="mt-4 flex flex-col gap-3 text-[0.9375rem]">
              <li>
                <a
                  href={phone.href}
                  className="inline-flex items-center gap-2.5 text-navy-100/85 transition-colors hover:text-white"
                >
                  <Phone aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-orchid" />
                  {phone.display}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.emailHref}
                  className="inline-flex items-start gap-2.5 break-all text-navy-100/85 transition-colors hover:text-white"
                >
                  <Mail aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-orchid" />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.url}
                  className="inline-flex items-start gap-2.5 break-all text-navy-100/85 transition-colors hover:text-white"
                >
                  <Globe aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-orchid" />
                  {siteConfig.websiteDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-navy-100/85">
                <MapPin aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand-orchid" />
                <span>{tCommon('serviceAreaShort')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Counties */}
        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="font-heading text-base font-semibold text-white">{t('areasTitle')}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {counties.map((county) => (
              <li key={county.id}>
                <Link
                  href={{ pathname: '/about', hash: 'coverage' }}
                  className="inline-flex rounded-pill border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-navy-100/85 transition-colors hover:border-white/40 hover:text-white"
                >
                  {county.name} {tCommon('county')}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-navy-100/70">{t('copyright', { year })}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              <li>
                {/* TODO(client): point at the real policy pages when they exist. */}
                <a
                  href="#"
                  title={t('legalNote')}
                  className="text-navy-100/70 transition-colors hover:text-white"
                >
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  title={t('legalNote')}
                  className="text-navy-100/70 transition-colors hover:text-white"
                >
                  {t('accessibility')}
                </a>
              </li>
            </ul>

            <LanguageSwitcher tone="light" />
          </div>
        </div>
      </div>
    </footer>
  );
}
