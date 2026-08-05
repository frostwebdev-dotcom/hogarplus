'use client';

import { useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';

import { services } from '@/data/services';
import { locales, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { contactSchema, type ContactFormValues } from './contact-schema';

/**
 * Demo contact form.
 *
 * Phase 1 deliberately stops at the browser: values are validated with Zod and
 * a submission is simulated. No fake production endpoint is created.
 *
 * To connect a real backend later, replace the body of `submitContactRequest`
 * below with a `fetch('/api/contact')` call or a server action — nothing else
 * in this component needs to change.
 */
async function submitContactRequest(values: ContactFormValues): Promise<void> {
  // Simulated latency so the loading state is visible in the demo.
  await new Promise((resolve) => setTimeout(resolve, 900));
  if (process.env.NODE_ENV === 'development') {
    console.info('[demo] contact submission (not sent anywhere):', values);
  }
}

export function DemoContactForm() {
  const t = useTranslations('contactPage.form');
  const tServices = useTranslations('services.items');
  const activeLocale = useLocale() as Locale;

  const formId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    // Validate on blur first, then keep messages live as the user corrects them.
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: undefined,
      language: activeLocale,
      message: '',
      consent: false as unknown as true
    }
  });

  async function onSubmit(values: ContactFormValues) {
    await submitContactRequest(values);
    setIsSubmitted(true);
    // Move focus to the confirmation so screen-reader users land on it.
    window.setTimeout(() => successRef.current?.focus(), 60);
  }

  /** Maps a schema message key to the localized sentence. */
  function errorText(key?: string): string | undefined {
    return key ? t(`validation.${key}`) : undefined;
  }

  const fieldId = (name: string) => `${formId}-${name}`;
  const errorId = (name: string) => `${formId}-${name}-error`;

  const hasErrors = Object.keys(errors).length > 0;

  if (isSubmitted) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex flex-col items-start gap-4 rounded-panel border border-brand-blue/25 bg-white p-7 shadow-card sm:p-9"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand-soft text-brand-purple">
          <CheckCircle2 aria-hidden="true" className="h-7 w-7" />
        </span>

        <h3 className="font-heading text-2xl text-navy">{t('successTitle')}</h3>
        <p className="max-w-prose text-[0.9375rem] leading-relaxed text-navy-500">
          {t('successBody')}
        </p>

        <button
          type="button"
          onClick={() => {
            reset();
            setIsSubmitted(false);
          }}
          className="btn-secondary btn-sm mt-2"
        >
          {t('sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 rounded-panel border border-navy-100 bg-white p-6 shadow-card sm:p-8"
    >
      {/* Demo disclosure */}
      <p className="flex items-start gap-2.5 rounded-card border border-navy-100 bg-surface px-4 py-3 text-sm leading-relaxed text-navy-400">
        <Info aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />
        {t('demoNotice')}
      </p>

      {/* Error summary — announced after a failed submit. */}
      {hasErrors ? (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-card border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          <AlertCircle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" />
          {t('errorSummary')}
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id={fieldId('name')}
          label={t('labels.name')}
          note={t('required')}
          error={errorText(errors.name?.message)}
          errorId={errorId('name')}
        >
          <input
            id={fieldId('name')}
            type="text"
            autoComplete="name"
            placeholder={t('placeholders.name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? errorId('name') : undefined}
            className={inputClass(Boolean(errors.name))}
            {...register('name')}
          />
        </Field>

        <Field
          id={fieldId('email')}
          label={t('labels.email')}
          note={t('required')}
          error={errorText(errors.email?.message)}
          errorId={errorId('email')}
        >
          <input
            id={fieldId('email')}
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={t('placeholders.email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? errorId('email') : undefined}
            className={inputClass(Boolean(errors.email))}
            {...register('email')}
          />
        </Field>

        <Field
          id={fieldId('phone')}
          label={t('labels.phone')}
          note={t('optional')}
          error={errorText(errors.phone?.message)}
          errorId={errorId('phone')}
        >
          <input
            id={fieldId('phone')}
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={t('placeholders.phone')}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? errorId('phone') : undefined}
            className={inputClass(Boolean(errors.phone))}
            {...register('phone')}
          />
        </Field>

        <Field
          id={fieldId('service')}
          label={t('labels.service')}
          note={t('required')}
          error={errorText(errors.service?.message)}
          errorId={errorId('service')}
        >
          <select
            id={fieldId('service')}
            defaultValue=""
            aria-invalid={Boolean(errors.service)}
            aria-describedby={errors.service ? errorId('service') : undefined}
            className={inputClass(Boolean(errors.service))}
            {...register('service')}
          >
            <option value="" disabled>
              {t('placeholders.service')}
            </option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {tServices(`${service.id}.title`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      {/* Preferred language */}
      <fieldset className="flex flex-col gap-3">
        <legend className="text-sm font-semibold text-navy">
          {t('labels.language')}{' '}
          <span className="font-normal text-navy-400">({t('required')})</span>
        </legend>

        <div className="flex flex-wrap gap-3">
          {locales.map((locale) => (
            <label
              key={locale}
              className="flex min-h-[3rem] cursor-pointer items-center gap-3 rounded-xl border-2 border-navy-100 px-5 transition-colors has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue/5 hover:border-brand-blue/60"
            >
              <input
                type="radio"
                value={locale}
                className="h-4 w-4 accent-brand-blue"
                aria-describedby={errors.language ? errorId('language') : undefined}
                {...register('language')}
              />
              <span className="text-[0.9375rem] font-medium text-navy">
                {t(`languages.${locale}`)}
              </span>
            </label>
          ))}
        </div>

        {errors.language ? (
          <FieldError id={errorId('language')}>{errorText(errors.language.message)}</FieldError>
        ) : null}
      </fieldset>

      <Field
        id={fieldId('message')}
        label={t('labels.message')}
        note={t('required')}
        error={errorText(errors.message?.message)}
        errorId={errorId('message')}
      >
        <textarea
          id={fieldId('message')}
          rows={5}
          placeholder={t('placeholders.message')}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? errorId('message') : undefined}
          className={cn(inputClass(Boolean(errors.message)), 'min-h-[9rem] resize-y py-3')}
          {...register('message')}
        />
      </Field>

      {/* Consent */}
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-relaxed text-navy-600">
          <input
            type="checkbox"
            className="mt-1 h-5 w-5 shrink-0 accent-brand-blue"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? errorId('consent') : undefined}
            {...register('consent')}
          />
          <span>
            {t('labels.consent')} <span className="text-navy-400">({t('required')})</span>
          </span>
        </label>

        {errors.consent ? (
          <FieldError id={errorId('consent')}>{errorText(errors.consent.message)}</FieldError>
        ) : null}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full sm:w-auto sm:self-start">
        {isSubmitting ? (
          <>
            <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />
            {t('submitting')}
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-4 w-4" />
            {t('submit')}
          </>
        )}
      </button>
    </form>
  );
}

/* ─────────────────────────── small helpers ─────────────────────────── */

function inputClass(hasError: boolean): string {
  return cn(
    'w-full min-h-[3rem] rounded-xl border-2 bg-white px-4 text-[0.9375rem] text-navy',
    'placeholder:text-navy-300 transition-colors duration-200',
    'focus:border-brand-blue focus:outline-none',
    hasError ? 'border-red-300 focus:border-red-500' : 'border-navy-100'
  );
}

function Field({
  id,
  label,
  note,
  error,
  errorId,
  children
}: {
  id: string;
  label: string;
  /** Localized "required" / "optional" hint shown next to the label. */
  note: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-navy">
        {label} <span className="font-normal text-navy-400">({note})</span>
      </label>
      {children}
      {error ? <FieldError id={errorId}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="flex items-start gap-2 text-sm font-medium text-red-600">
      <AlertCircle aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      {children}
    </p>
  );
}
