import { useTranslations } from 'next-intl';
import { Info } from 'lucide-react';

import { demoTestimonials } from '@/data/demo-content';
import { Reveal, RevealGroup } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TestimonialCard } from './TestimonialCard';

export function Testimonials() {
  const t = useTranslations('testimonials');

  return (
    <section className="section bg-surface" aria-labelledby="testimonials-heading">
      <div className="shell">
        <SectionHeading
          id="testimonials-heading"
          eyebrow={t('eyebrow')}
          title={t('heading')}
          description={t('description')}
          className="mx-auto max-w-3xl"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">
          {demoTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </RevealGroup>

        {/* Visible, honest disclosure that these are placeholders. Remove this
            block at the same time the sample quotes are replaced. */}
        <Reveal className="mt-8 flex justify-center">
          <p className="flex max-w-2xl items-start gap-2.5 rounded-card border border-navy-100 bg-white/70 px-5 py-4 text-sm leading-relaxed text-navy-400">
            <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
            {t('sampleNotice')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
