import { useTranslations } from 'next-intl';

import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function LocaleNotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="flex min-h-[60vh] items-center bg-surface pt-[var(--header-height)]">
      <div className="shell flex flex-col items-center gap-6 py-20 text-center">
        <p className="font-heading text-display-lg text-gradient">404</p>
        <h1 className="font-heading text-[1.9rem] text-navy sm:text-[2.3rem]">{t('title')}</h1>
        <p className="max-w-prose text-navy-500">{t('description')}</p>
        <PrimaryButton href="/" withArrow>
          {t('cta')}
        </PrimaryButton>
      </div>
    </section>
  );
}
