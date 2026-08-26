# Image assets

## What is here now — TEMPORARY

Six free stock photographs of *spaces*, used so the gallery reads with real
imagery. They are not HogarPlus Solutions' own work and must be replaced before
launch.

| File | Source (Pexels) | Photographer |
| --- | --- | --- |
| `living-room.jpg` | pexels.com/photo/11671083 | Deno Wang |
| `kitchen.jpg` | pexels.com/photo/13009887 | Alesha |
| `bathroom.jpg` | pexels.com/photo/7005268 | Artbovich |
| `dining-area.jpg` | pexels.com/photo/7587743 | Artbovich |
| `office-workspace.jpg` | pexels.com/photo/5511098 | Mike van Schoonderwalt |
| `office-reception.jpg` | pexels.com/photo/6899544 | Artbovich |

Pexels License — free for commercial use, no attribution required.

**No people, on purpose.** The crew is Colombian and wears branded T-shirts, and
no stock library carries that convincingly. Rather than show a team that is not
theirs, the photographs carry the *rooms* and the original illustrations in
`public/illustrations/` carry the *people*. See that folder's README.

Replace a photo by dropping the client's file here and pointing the matching
`src` in `data/demo-content.ts` at it. An entry with no `src` falls back to a
branded gradient tile, so the layout never breaks.

## Still to supply

| File | Used by | Wire-up |
| --- | --- | --- |
| `logo.svg` | Header / Footer | `siteConfig.media.logo`, then swap the mark in `components/layout/Logo.tsx` |
| `og-default.png` (1200×630) | Open Graph / Twitter cards | `siteConfig.media.ogImage` |
| `hero-poster.jpg` | Hero video poster | `siteConfig.media.heroPoster` |
| gallery photos | Gallery grid + lightbox | set `src` on each entry in `data/demo-content.ts` |
| about panel photo | Homepage "Who We Are" | replace the `GradientPanel` in `components/home/AboutPreview.tsx` |

All local photographs should be rendered with `next/image`. No remote image
hosts are configured in `next.config.ts` — add one only if the client uses a CDN.
