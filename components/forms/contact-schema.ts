import { z } from 'zod';

import { services } from '@/data/services';
import { OTHER_SPACE, propertyTypes, spaceIds, spacesByPropertyType, timeWindows } from '@/data/intake';
import { locales } from '@/i18n/routing';

const serviceIds = services.map((service) => service.id) as [string, ...string[]];

/**
 * Contact form schema.
 *
 * Validation messages are *keys*, not sentences. The form resolves each key
 * against `contactPage.form.validation.*` at render time, so errors appear in
 * the visitor's language and stay in the translation files.
 */
export const contactSchema = z
  .object({
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

    /** Drives which space checklist applies — see `data/intake.ts`. */
    propertyType: z.enum(propertyTypes as unknown as [string, ...string[]], {
      errorMap: () => ({ message: 'propertyTypeRequired' })
    }),

    /** Morning / afternoon / evening. The exact hours live in the dictionary. */
    timeWindow: z.enum(timeWindows as unknown as [string, ...string[]], {
      errorMap: () => ({ message: 'timeWindowRequired' })
    }),

    spaces: z
      .array(z.enum(spaceIds as unknown as [string, ...string[]]))
      .min(1, { message: 'spacesRequired' }),

    /** Only meaningful when `spaces` includes "other"; required in that case. */
    otherSpace: z
      .string()
      .trim()
      .max(200, { message: 'otherSpaceMax' })
      .optional()
      .or(z.literal('')),

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
  })
  .superRefine((values, ctx) => {
    const allowed = spacesByPropertyType[values.propertyType as keyof typeof spacesByPropertyType];

    // The form clears the selection when the property type changes, so this
    // only ever fires for a payload assembled outside the UI.
    if (allowed && values.spaces.some((space) => !allowed.includes(space as never))) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['spaces'], message: 'spacesRequired' });
    }

    // "Other" without a description tells us nothing.
    if (values.spaces.includes(OTHER_SPACE) && !values.otherSpace?.trim()) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['otherSpace'], message: 'otherSpaceRequired' });
    }
  });

export type ContactFormValues = z.infer<typeof contactSchema>;
