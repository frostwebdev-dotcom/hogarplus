import type { Locale } from '@/i18n/routing';

/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Every contact detail, URL and brand asset path the site depends on lives here.
 * No component may hardcode a phone number, email address or website URL.
 *
 * NOTE: the phone number is per-language and is NOT on `siteConfig`. Call
 * `getPhone(locale)` instead — see below.
 *
 * The contact details below are CONFIRMED — they come directly from the client's
 * brand flyer (`public/brand/hogarplus-brand-flyer.jpeg`). Environment variables
 * can still override them per-deployment, but the defaults are real values, not
 * placeholders.
 */

const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  phoneEn: process.env.NEXT_PUBLIC_PHONE_EN,
  phoneEs: process.env.NEXT_PUBLIC_PHONE_ES,
  email: process.env.NEXT_PUBLIC_EMAIL
};

/* ── Confirmed business details (source: client brand flyer) ─────────────── */

/**
 * The English line and the Spanish line are DIFFERENT NUMBERS. There is no
 * single "site phone number" — always resolve one through `getPhone(locale)`
 * so a visitor is never handed the wrong line.
 */
const PHONE_BY_LOCALE: Record<Locale, { display: string; e164: string }> = {
  en: { display: '(908) 540-5734', e164: '+19085405734' },
  es: { display: '(862) 423-3186', e164: '+18624233186' }
};

const EMAIL = 'HogarPlusSolution@gmail.com';
const WEBSITE_DISPLAY = 'www.HogarPlusSolution.com';
const WEBSITE_URL = 'https://www.hogarplussolution.com';

const email = env.email?.trim() || EMAIL;
const siteUrl = (env.siteUrl?.trim() || WEBSITE_URL).replace(/\/$/, '');

/** Strips formatting so a display number is safe inside a `tel:` href. */
function toTelHref(value: string): string {
  const digits = value.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

const PHONE_ENV_OVERRIDE: Record<Locale, string | undefined> = {
  en: env.phoneEn,
  es: env.phoneEs
};

export type PhoneLine = {
  /** Formatted for display, e.g. `(908) 540-5734`. */
  display: string;
  /** Ready for an anchor, e.g. `tel:+19085405734`. */
  href: string;
};

/**
 * The phone line for a given language.
 *
 * Server and client components alike can reach the active locale with
 * next-intl's `useLocale()`; route handlers and metadata already have it.
 */
export function getPhone(locale: Locale): PhoneLine {
  const override = PHONE_ENV_OVERRIDE[locale]?.trim();
  if (override) return { display: override, href: `tel:${toTelHref(override)}` };

  const line = PHONE_BY_LOCALE[locale];
  return { display: line.display, href: `tel:${line.e164}` };
}

export const siteConfig = {
  name: 'HogarPlus Solutions',
  shortName: 'HogarPlus',
  url: siteUrl,

  email,
  emailHref: `mailto:${email}`,
  websiteDisplay: WEBSITE_DISPLAY,

  /**
   * Brand assets supplied by the client.
   *
   * `brandFlyer`   — square logo / contact / tagline flyer
   * `companyFlyer` — portrait flyer with the "¿Quiénes somos?", objectives and
   *                  services copy that drives the About page
   * `logoLockup`   — a crop of the stacked logo lockup taken from the brand
   *                  flyer. Navy background, so only ever place it on navy.
   *
   * TODO(client): request a transparent SVG (or high-resolution transparent PNG)
   * of the logo for production. The JPEG crop is fine for large brand panels but
   * cannot be placed on light surfaces or scaled down to header size cleanly.
   */
  brand: {
    brandFlyer: '/brand/hogarplus-brand-flyer.jpeg',
    brandFlyerSize: { width: 1254, height: 1254 },
    companyFlyer: '/brand/hogarplus-company-flyer.jpeg',
    companyFlyerSize: { width: 627, height: 918 },
    logoLockup: '/brand/hogarplus-logo-lockup.jpeg',
    logoLockupSize: { width: 860, height: 610 }
  },

  /**
   * Hero background video.
   *
   * TO ENABLE: drop `hero-cleaning.mp4` (and optionally `.webm`) into
   * `public/videos/` and flip `heroVideoEnabled` to `true`.
   *
   * Defaults to `false` so the demo never requests a file that isn't there. The
   * animated navy/gradient composition with house, leaf and sparkle motifs is
   * the designed fallback and is used whenever the video is unavailable,
   * blocked by autoplay policy, or reduced motion is enabled.
   */
  media: {
    heroVideoEnabled: false,
    heroVideoMp4: '/videos/hero-cleaning.mp4',
    heroVideoWebm: '/videos/hero-cleaning.webm',
    ogImage: '/brand/hogarplus-brand-flyer.jpeg'
  },


  /**
   * Social profiles. Empty on purpose — an empty array emits no `sameAs`
   * entries in structured data rather than inventing accounts.
   */
  social: [] as Array<{ label: string; href: string }>,

  /**
   * Counties served — the client's confirmed list, and the ONLY ones served.
   * Adding a county here without the client's say-so is a factual claim about
   * where they work, so treat this list as client-supplied data.
   */
  counties: [
    'essex',
    'union',
    'passaic',
    'morris',
    'sussex',
    'warren',
    'hunterdon',
    'somerset',
    'middlesex'
  ] as const
} as const;

export type CountyId = (typeof siteConfig.counties)[number];
export type SiteConfig = typeof siteConfig;
