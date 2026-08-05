/**
 * ─────────────────────────────────────────────────────────────────────────────
 * CENTRAL SITE CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────────
 * Every contact detail, URL and brand asset path the site depends on lives here.
 * No component may hardcode a phone number, email address or website URL.
 *
 * The contact details below are CONFIRMED — they come directly from the client's
 * brand flyer (`public/brand/hogarplus-brand-flyer.jpeg`). Environment variables
 * can still override them per-deployment, but the defaults are real values, not
 * placeholders.
 */

const env = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  phone: process.env.NEXT_PUBLIC_PHONE,
  email: process.env.NEXT_PUBLIC_EMAIL,
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL
};

/* ── Confirmed business details (source: client brand flyer) ─────────────── */
const PHONE_DISPLAY = '(862) 423-3186';
const PHONE_E164 = '+18624233186';
const EMAIL = 'HogarPlusSolution@gmail.com';
const WEBSITE_DISPLAY = 'www.HogarPlusSolution.com';
const WEBSITE_URL = 'https://www.hogarplussolution.com';

const phone = env.phone?.trim() || PHONE_DISPLAY;
const email = env.email?.trim() || EMAIL;
const siteUrl = (env.siteUrl?.trim() || WEBSITE_URL).replace(/\/$/, '');

/** Strips formatting so a display number is safe inside a `tel:` href. */
function toTelHref(value: string): string {
  const digits = value.replace(/[^\d+]/g, '');
  if (digits.startsWith('+')) return digits;
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

export const siteConfig = {
  name: 'HogarPlus Solutions',
  shortName: 'HogarPlus',
  url: siteUrl,

  phone,
  phoneHref: `tel:${env.phone?.trim() ? toTelHref(env.phone.trim()) : PHONE_E164}`,
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

  /** Empty string means "not configured" — the booking page handles that. */
  calendlyUrl: env.calendlyUrl?.trim() || '',

  /**
   * Social profiles. Empty on purpose — an empty array emits no `sameAs`
   * entries in structured data rather than inventing accounts.
   */
  social: [] as Array<{ label: string; href: string }>,

  /** Counties served, in the order the client listed them. */
  counties: [
    'union',
    'hudson',
    'bergen',
    'passaic',
    'morris',
    'sussex',
    'somerset',
    'middlesex',
    'monmouth'
  ] as const,

  flags: {
    hasCalendly: Boolean(env.calendlyUrl?.trim())
  }
} as const;

export type CountyId = (typeof siteConfig.counties)[number];
export type SiteConfig = typeof siteConfig;
