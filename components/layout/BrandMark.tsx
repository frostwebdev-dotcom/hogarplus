/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TEMPORARY LOGO — CSS/SVG reconstruction of the client's flyer mark
 * ─────────────────────────────────────────────────────────────────────────────
 * The client supplied the logo only as artwork baked into two JPEG flyers. A
 * crop of that artwork lives at `siteConfig.brand.logoLockup` and is used at
 * large sizes on the About page, but a JPEG on a navy plate cannot be scaled
 * down to header size cleanly, and the flyer lockup is stacked (mark above
 * wordmark) rather than horizontal.
 *
 * So this component redraws the flyer's motif as vector: an outlined pitched
 * house with a four-pane window, a leaf sprig on a sweeping stem, and three
 * four-point sparkles — stroked with the brand blue→purple→orchid gradient,
 * exactly as on the flyer. It is deliberately a *single coherent mark*, not a
 * pile of stock icons.
 *
 * TODO(client): replace this with the official transparent SVG (or a
 * high-resolution transparent PNG) as soon as it is provided. See
 * `public/brand/README.md`.
 */
export function BrandMark({
  className,
  gradientId = 'brandmark-gradient'
}: {
  className?: string;
  /** Must be unique per rendered instance — SVG gradient ids are global. */
  gradientId?: string;
}) {
  const sparkleId = `${gradientId}-sparkle`;

  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradientId} x1="4" y1="56" x2="60" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A7DFF" />
          <stop offset="55%" stopColor="#845EF7" />
          <stop offset="100%" stopColor="#C06CFF" />
        </linearGradient>
        <linearGradient id={sparkleId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#845EF7" />
          <stop offset="100%" stopColor="#C06CFF" />
        </linearGradient>
      </defs>

      <g stroke={`url(#${gradientId})`} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
        {/* Outer roof line, open at the left eave — as on the flyer */}
        <path d="M9 30.5 L32 11 L55 30.5" />
        {/* Inner roof line */}
        <path d="M17 30 L32 17.5 L47 30" />
        {/* Left wall dropping to the sweeping ground stroke */}
        <path d="M20.5 28.5 V44" />
        {/* Sweeping stem that becomes the leaf stalk */}
        <path d="M9 44.5 C18 39.5, 30 47.5, 41 41.5" />
      </g>

      {/* Four-pane window */}
      <g fill="#3B6BF0">
        <rect x="26.5" y="25.5" width="4.6" height="4.6" rx="1" />
        <rect x="33" y="25.5" width="4.6" height="4.6" rx="1" />
        <rect x="26.5" y="32" width="4.6" height="4.6" rx="1" />
        <rect x="33" y="32" width="4.6" height="4.6" rx="1" />
      </g>

      {/* Leaf pair sitting on the stem */}
      <g fill={`url(#${gradientId})`} opacity="0.95">
        <path d="M40 40.5c0-4.4 3.3-7.6 7.8-7.6-.2 4.5-3.4 7.6-7.8 7.6Z" />
        <path d="M41 41.6c3.1-3.1 7.6-3.3 11.4-1-2.9 3.4-7.6 4-11.4 1Z" />
      </g>

      {/* Sparkles — four-point stars, matching the flyer */}
      <g fill={`url(#${sparkleId})`}>
        <path d="M52 12c.5 3.1 1.6 4.2 4.4 4.8-2.8.6-3.9 1.7-4.4 4.8-.5-3.1-1.6-4.2-4.4-4.8 2.8-.6 3.9-1.7 4.4-4.8Z" />
        <path d="M57.5 24c.3 1.9 1 2.5 2.7 2.9-1.7.4-2.4 1-2.7 2.9-.3-1.9-1-2.5-2.7-2.9 1.7-.4 2.4-1 2.7-2.9Z" />
        <path d="M8 33c.4 2.4 1.3 3.2 3.4 3.7-2.1.5-3 1.3-3.4 3.7-.4-2.4-1.3-3.2-3.4-3.7 2.1-.5 3-1.3 3.4-3.7Z" />
      </g>
    </svg>
  );
}
