import { useTranslations } from 'next-intl';

import { demoTestimonials } from '@/data/demo-content';
import { RevealGroup } from '@/components/ui/Reveal';
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
          className="mx-auto max-w-3xl"
        />

        <RevealGroup as="ul" className="mt-12 grid gap-6 md:grid-cols-3 lg:mt-14">
          {demoTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
