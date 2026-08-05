import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, Check } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/lib/site-config';
import { Reveal } from '@/components/ui/Reveal';

/**
 * "Who We Are / ¿Quiénes Somos?" preview.
 *
 * The body copy is the client's own flyer text (Spanish verbatim from
 * `hogarplus-company-flyer.jpeg`, with a professional English localization).
 * The four highlights are the flyer's general service statements — they set up
 * the brand story; the six detailed services live in their own section.
 *
 * The brand flyer artwork is shown as a framed figure with descriptive alt
 * text, never as a background image, so none of its content is lost.
 */
export function AboutPreview() {
  const t = useTranslations('aboutPreview');

  const highlights = [0, 1, 2, 3].map((index) => t(`highlights.${index}`));

  return (
    <section className="section bg-surface" aria-labelledby="about-preview-heading">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Brand flyer artwork */}
          <Reveal className="order-1 lg:order-none" distance={28}>
            <figure className="relative">
              {/* Soft gradient border, echoing the flyer's divider rules. */}
              <div className="rounded-panel bg-gradient-brand p-[2px] shadow-card-hover">
                <div className="overflow-hidden rounded-[calc(theme(borderRadius.panel)-2px)] bg-navy-950">
                  <Image
                    src={siteConfig.brand.brandFlyer}
                    alt={t('flyerAlt')}
                    width={siteConfig.brand.brandFlyerSize.width}
                    height={siteConfig.brand.brandFlyerSize.height}
                    sizes="(min-width: 1024px) 46vw, 92vw"
                    className="h-auto w-full"
                  />
                </div>
              </div>
              <figcaption className="mt-3 text-center text-sm text-navy-400">
                {t('flyerCaption')}
              </figcaption>
            </figure>
          </Reveal>

          {/* Copy */}
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-4">
              <span className="eyebrow">
                <span aria-hidden="true" className="h-px w-6 bg-brand-blue/60" />
                {t('eyebrow')}
              </span>
              <h2
                id="about-preview-heading"
                className="font-heading text-[1.9rem] leading-[1.15] text-navy sm:text-[2.3rem] lg:text-display-md"
              >
                {t('heading')}
              </h2>
              <p className="max-w-prose text-base leading-relaxed text-navy-500 sm:text-[1.0625rem]">
                {t('body')}
              </p>
            </Reveal>

            <Reveal>
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-purple">
                {t('highlightsTitle')}
              </h3>
            </Reveal>

            <Reveal as="ul" className="flex flex-col gap-3">
              {highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-navy-600 sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-brand-soft text-brand-purple"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span>{highlight}</span>
                </li>
              ))}
            </Reveal>

            <Reveal>
              <Link href="/about" className="link-underline inline-flex items-center gap-2 text-base">
                {t('cta')}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
