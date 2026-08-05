# Image assets

Nothing here yet — the demo renders branded gradient placeholders instead of
broken image frames.

When the client supplies photography and brand files, add them here and wire
them up:

| File | Used by | Wire-up |
| --- | --- | --- |
| `logo.svg` | Header / Footer | `siteConfig.media.logo`, then swap the mark in `components/layout/Logo.tsx` |
| `og-default.png` (1200×630) | Open Graph / Twitter cards | `siteConfig.media.ogImage` |
| `hero-poster.jpg` | Hero video poster | `siteConfig.media.heroPoster` |
| gallery photos | Gallery grid + lightbox | set `src` on each entry in `data/demo-content.ts` |
| about panel photo | Homepage "Who We Are" | replace the `GradientPanel` in `components/home/AboutPreview.tsx` |

All local images should be rendered with `next/image`. No remote image hosts are
configured in `next.config.ts` — add one only if the client uses a CDN.
