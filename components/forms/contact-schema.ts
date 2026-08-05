import { z } from 'zod';

import { services } from '@/data/services';
import { locales } from '@/i18n/routing';

const serviceIds = services.map((service) => service.id) as [string, ...string[]];

/**
 * Contact form schema.
 *
 * Validation messages are *keys*, not sentences. The form resolves each key
 * against `contactPage.form.validation.*` at render time, so errors appear in
 * the visitor's language and stay in the translation files.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'nameMin' })
    .max(80, { message: 'nameMax' }),

  email: z.string().trim().email({ message: 'emailInvalid' }),

  // Optional, but must look like a phone number when provided.
  phone: z
    .string()
    .trim()
    .max(32, { message: 'phoneInvalid' })
    .regex(/^[\d\s()+.-]{7,}$/, { message: 'phoneInvalid' })
    .optional()
    .or(z.literal('')),

  service: z.enum(serviceIds, { errorMap: () => ({ message: 'serviceRequired' }) }),

  language: z.enum(locales as unknown as [string, ...string[]], {
    errorMap: () => ({ message: 'languageRequired' })
  }),

  message: z
    .string()
    .trim()
    .min(10, { message: 'messageMin' })
    .max(2000, { message: 'messageMax' }),

  consent: z.literal(true, {
    errorMap: () => ({ message: 'consentRequired' })
  })
});

export type ContactFormValues = z.infer<typeof contactSchema>;
