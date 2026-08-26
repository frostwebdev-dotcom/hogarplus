# HogarPlus Solutions — bilingual demo site

Phase-1 demonstration website for **HogarPlus Solutions**, a home cleaning and
maintenance company serving northern and central New Jersey. Built for a client
presentation: the front end is complete and polished; no production backend,
email service or deployment is wired up yet.

## Stack

| | |
| --- | --- |
| Framework | Next.js 15 (App Router) · React 19 |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS 3.4 (`tailwind.config.ts`) |
| i18n | next-intl 4 — `/en` and `/es`, English default |
| Animation | Framer Motion 12 (reduced-motion aware) |
| Icons | Lucide React |
| Forms | React Hook Form + Zod + `@hookform/resolvers` |
| Fonts | `next/font/google` — Playfair Display (headings), Poppins (body) |

## Run it

```bash
npm install
npm run dev          # http://localhost:3000  → redirects to /en
```

Other scripts:

```bash
npm run build        # production build
npm start            # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

## Routes

`/` redirects to `/en`. Every page exists in both languages:

```
/en                /es
/en/about          /es/about
/en/services       /es/services
/en/gallery        /es/gallery
/en/book           /es/book
/en/contact        /es/contact
```

The language switcher preserves the current page — switching on `/en/services`
lands on `/es/services`.

## Where things live

```
app/[locale]/          routes (layout owns <html>, fonts, header/footer, JSON-LD)
components/
  layout/              Header, MobileNavigation, LanguageSwitcher, Footer, Logo
  home/                Hero, AboutPreview, ServicesSection, WhyChooseUs,
                       Testimonials, CountyLocator, BookingCTA
  services/            ServiceCard, ServiceChecklist
  gallery/             GalleryGrid, GalleryLightbox, GalleryTile
  booking/             BookingPanel (intake requirements)
  forms/               DemoContactForm, contact-schema
  ui/                  PrimaryButton, SectionHeading, PageHero, ValueBadge,
                       ClickToCallButton, GradientPanel, Reveal, Icon
i18n/                  routing, navigation, request config
messages/              en.json · es.json  ← all visible copy lives here
lib/                   site-config, metadata, structured-data, utils
data/                  services, counties, demo-content
```

**No visible text is hardcoded in a component.** Everything renders through
`next-intl`, so translation edits never require touching JSX.

## Brand source of truth

The visual identity and much of the written content come from two flyers the
client supplied. Both live in `public/brand/` and are documented in
`public/brand/README.md` — which file is used where, and what is still needed
(a transparent logo file, above all).

The Spanish copy for the "¿Quiénes somos?" paragraph, the four objectives and
the four general service lines is the client's own flyer text, used verbatim.
The English is a professional localization of the same wording.

The header, footer and mobile menu currently use a **temporary CSS/SVG
wordmark** that reproduces the flyer's lockup and motif — see
`components/layout/BrandMark.tsx`.

## Configuration

Contact details are confirmed and already set in `lib/site-config.ts`, so the
app runs correctly with no env file at all. Copy `.env.example` to `.env.local`
only to override something per environment:

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_PHONE_EN=
NEXT_PUBLIC_PHONE_ES=
NEXT_PUBLIC_EMAIL=
```

Every value has a working default, so nothing is missing to run the demo.

**The phone number is per language.** English and Spanish are two different
lines, so there is no `siteConfig.phone` — resolve one with `getPhone(locale)`
from `lib/site-config.ts`. Never hardcode a number in a component.

## Demo content — what must be replaced

The remaining placeholder material is centralised and marked:

- **`data/demo-content.ts`** — sample testimonials (anonymous role + county
  only, no invented identities or ratings) and gallery entries.
- **`messages/{en,es}.json`** — the "what's included" service checklists are
  written for the demo and carry a visible notice on the page plus
  `TODO(client)` comments in the components that render them.
- **`public/images/`** — six temporary stock photographs of *spaces*, listed
  with their sources in that folder's README.
- **`public/brand/README.md`**, **`public/images/README.md`** and
  **`public/videos/README.md`** — exactly what to supply and which config field
  to point at each asset.

Not placeholder material: **`public/illustrations/`** is original artwork drawn
for the client — the hero scene and the six service-card illustrations. The crew
is depicted as it is: Colombian, in branded T-shirts. See that folder's README
before editing any of it.

Deliberately **not** claimed anywhere: certifications, years in business,
customer counts, star ratings, guarantees, insurance, background checks,
pricing, business hours, or a street address. The JSON-LD in
`lib/structured-data.ts` carries only the confirmed name, website, phone, email,
New Jersey service area and service list.

## Hero video

The hero renders a complete composition built from the flyer's own visual
language — navy field, animated brand light blooms, an outlined house, a leaf
sprig and sparkles — by default. To use footage,
drop `public/videos/hero-cleaning.mp4` in place and set
`media.heroVideoEnabled: true` in `lib/site-config.ts`. The hero stays readable
if the file is missing, autoplay is blocked, or reduced motion is enabled.

## Accessibility

Skip link, semantic landmarks, keyboard-operable navigation, focus-trapped and
Escape-dismissible mobile menu and lightbox, focus restored to the triggering
element, `aria-live` announcements for the county locator and form results,
labelled inputs with localized error messages, and a visible focus ring
everywhere. All animation is gated on `prefers-reduced-motion`.

## Not in this phase

Real form delivery (the submit handler is a documented stub in
`DemoContactForm.tsx`), an online scheduling calendar, a CMS, analytics, and
deployment.

Booking is deliberately a phone-call flow: the visitor gives us a window of time
and a list of spaces (see `data/intake.ts`), and we call back to agree a visit.
