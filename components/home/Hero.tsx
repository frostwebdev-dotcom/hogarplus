'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import { Phone, Sparkles } from 'lucide-react';

import { Link } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';
import { getPhone, siteConfig } from '@/lib/site-config';
import { HeroBackground } from './HeroBackground';

export function Hero() {
  const t = useTranslations('hero');
  const phone = getPhone(useLocale() as Locale);
  const shouldReduceMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1, delayChildren: 0.05 } }
  };

  const item: Variants = shouldReduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
      };

  return (
    <section
      className="on-dark relative isolate flex min-h-[38rem] items-center overflow-hidden
                 pb-20 pt-[calc(var(--header-height)+3rem)]
                 md:min-h-[42rem] lg:min-h-[46rem] lg:pb-28 lg:pt-[calc(var(--header-height)+4.5rem)]"
      aria-labelledby="hero-heading"
    >
      <HeroBackground label={t('videoLabel')} />

      <div className="shell relative grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
        <motion.div
          className="max-w-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Trust label */}
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-2 text-[0.8125rem] font-semibold uppercase tracking-[0.1em] text-white/90 backdrop-blur-sm"
          >
            <Sparkles aria-hidden="true" className="h-4 w-4 shrink-0 text-brand-orchid" />
            {t('eyebrow')}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item}
            className="mt-6 font-heading text-[2.35rem] leading-[1.1] text-white
                       sm:text-display-sm md:text-display-md lg:text-display-lg"
          >
            {t('headline')}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-navy-100 sm:text-lg"
          >
            {t('body')}
          </motion.p>

          {/* Calls to action */}
          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <Link href="/book" className="btn-primary w-full sm:w-auto">
              {t('primaryCta')}
            </Link>
            <Link href="/services" className="btn-ghost-light w-full sm:w-auto">
              {t('secondaryCta')}
            </Link>
          </motion.div>

          {/* Click-to-call — the flyer leads with the phone number, so does this. */}
          <motion.p variants={item} className="mt-6">
            <a
              href={phone.href}
              className="inline-flex items-center gap-2.5 text-[1.0625rem] font-semibold text-white underline decoration-brand-orchid decoration-2 underline-offset-[6px] transition-colors hover:text-brand-orchid"
            >
              <Phone aria-hidden="true" className="h-[1.1rem] w-[1.1rem] shrink-0" />
              {t('phoneCta')}
            </a>
          </motion.p>

          {/* Tagline in the flyer's script-like accent treatment. */}
          <motion.p
            variants={item}
            className="mt-8 flex items-center gap-3 text-sm text-navy-100/80 sm:text-[0.9375rem]"
          >
            <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-brand-blue to-brand-orchid" />
            {siteConfig.name} · New Jersey
          </motion.p>
        </motion.div>

        {/*
          Original illustration of the crew. Hidden below `lg`, where the hero
          is already tall and the copy has to carry the screen on its own.
        */}
        <motion.div
          className="hidden lg:block"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- an inline SVG asset; next/image adds nothing to a vector and would need dangerouslyAllowSVG. */}
          <img
            src="/illustrations/team-hero.svg"
            alt={t('illustrationAlt')}
            width={640}
            height={560}
            className="mx-auto h-auto w-full max-w-[34rem]"
          />
        </motion.div>
      </div>

      {/* Scroll indicator — decorative, hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex"
      >
        <span className="flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-white/55">
          {t('scrollHint')}
          <span className="flex h-8 w-5 items-start justify-center rounded-full border border-white/40 p-1">
            <span className="h-1.5 w-1 rounded-full bg-white/70 animate-scroll-hint motion-reduce:animate-none" />
          </span>
        </span>
      </div>
    </section>
  );
}
