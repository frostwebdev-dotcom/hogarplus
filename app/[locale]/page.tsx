import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import type { Locale } from '@/i18n/routing';
import { buildPageMetadata } from '@/lib/metadata';
import { Hero } from '@/components/home/Hero';
import { AboutPreview } from '@/components/home/AboutPreview';
import { Objectives } from '@/components/home/Objectives';
import { ServicesSection } from '@/components/home/ServicesSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Testimonials } from '@/components/home/Testimonials';
import { CountyLocator } from '@/components/home/CountyLocator';
import { BookingCTA } from '@/components/home/BookingCTA';

type PageProps = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata({ locale, path: '/', namespaceKey: 'home' });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <AboutPreview />
      <Objectives />
      <ServicesSection />
      <WhyChooseUs />
      <Testimonials />
      <CountyLocator />
      <BookingCTA />
    </>
  );
}
