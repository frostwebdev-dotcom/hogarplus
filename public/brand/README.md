# Brand assets

Supplied by the client as two flyer images. The originals were copied here
unmodified (and remain untouched wherever the client sent them from).

| File | Source | Where it is used |
| --- | --- | --- |
| `hogarplus-brand-flyer.jpeg` | Client flyer 1 — logo, contact block, tagline (1254×1254) | Homepage "Who We Are" panel (`components/home/AboutPreview.tsx`), Open Graph / Twitter card image |
| `hogarplus-company-flyer.jpeg` | Client flyer 2 — ¿Quiénes somos?, Nuestro objetivo, Nuestros servicios (627×918) | About page story section (`app/[locale]/about/page.tsx`) |
| `hogarplus-logo-lockup.jpeg` | Crop of flyer 1 (860×610), stacked mark + wordmark on navy | Available for large navy brand panels. **Not** used in the header — see below. |

All three are rendered with `next/image` and carry descriptive alt text drawn
from the translation files, so nothing the flyers say is locked inside a JPEG —
every line also exists as real HTML on the page.

## Logo status — action needed

The client has **not** supplied a standalone logo file, only artwork baked into
JPEG flyers on a navy background.

For this demo the header, footer and mobile menu use a **temporary CSS/SVG
wordmark** (`components/layout/Logo.tsx` + `components/layout/BrandMark.tsx`):

- "Hogar" in white, "Plus" in the blue → purple → orchid gradient
- "SOLUTIONS" in uppercase with wide letter spacing
- a vector redraw of the flyer's house + leaf + sparkle mark

This was necessary because the cropped JPEG lockup (a) carries a solid navy
rectangle that cannot sit on light surfaces, and (b) is a stacked composition
that does not scale down cleanly to a ~44px horizontal header slot. The flyer
artwork itself is instead shown at a size where it looks its best — as framed
figures on the homepage and About page.

**Please request from the client for production:** a transparent **SVG** (first
choice) or a high-resolution transparent **PNG** of the logo, ideally in both a
stacked and a horizontal lockup. Once supplied, replace `BrandMark`/`Logo` with
the real file and point `siteConfig.brand.logoLockup` at it.

The logo is never stretched, distorted, recoloured or auto-traced anywhere in
the project.

## Also still needed

- Real project photography for the gallery (`data/demo-content.ts`)
- A dedicated 1200×630 Open Graph image (currently the square brand flyer)
- Optional hero video — see `public/videos/README.md`
