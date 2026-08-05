# Hero background video

Drop the client's hero footage here:

- `hero-cleaning.mp4` — required (H.264, ~8–15 s loop, no audio track)
- `hero-cleaning.webm` — optional, served first when the browser supports it

Recommended encode: 1920×1080, 24–30 fps, **under 4 MB**. The video is purely
decorative — the hero renders a complete brand gradient when the file is
missing, when autoplay is blocked, or when the visitor prefers reduced motion.

Paths are configured in `lib/site-config.ts` → `siteConfig.media`.
