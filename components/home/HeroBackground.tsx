'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

import { siteConfig } from '@/lib/site-config';

/**
 * Hero background layer.
 *
 * The video is strictly an enhancement. Underneath it sits a complete,
 * intentionally designed composition built from the flyer's own visual
 * language — a navy field, animated blue/purple/orchid light blooms, a large
 * outlined house, a leaf sprig and four-point sparkles — plus a dark overlay
 * that guarantees text contrast.
 *
 * The flyer image itself is deliberately NOT used as a full-bleed background:
 * it contains small embedded text that would be unreadable and inaccessible at
 * viewport scale. It appears instead as a framed, alt-described figure on the
 * About page.
 *
 * Failure modes all resolve to that composition:
 *  1. no video configured           → nothing is mounted, nothing is requested
 *  2. the file does not exist       → `error` event, video stays hidden
 *  3. autoplay is blocked           → `play()` rejects, video stays hidden
 *  4. `prefers-reduced-motion`      → the video is never mounted at all
 *  5. small / metered mobile device → `preload="none"` until it can play
 */
export function HeroBackground({ label }: { label: string }) {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  const showVideo = siteConfig.media.heroVideoEnabled && !shouldReduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion) return;

    // Autoplay may be rejected (Low Power Mode, data saver, user setting).
    // Treat that exactly like a missing file: keep the designed composition.
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      attempt.catch(() => setIsVideoReady(false));
    }
  }, [shouldReduceMotion]);

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-20 overflow-hidden bg-navy-950">
      {/* Base gradient — always present, always sufficient. */}
      <div className="absolute inset-0 bg-gradient-navy" />

      {/* Animated brand light blooms. */}
      <div className="absolute -left-32 top-[-6rem] h-[26rem] w-[26rem] rounded-full bg-brand-blue/30 blur-[110px] animate-float-slow motion-reduce:animate-none" />
      <div className="absolute right-[-8rem] top-16 h-[30rem] w-[30rem] rounded-full bg-brand-purple/30 blur-[120px] animate-float-slower motion-reduce:animate-none" />
      <div className="absolute bottom-[-10rem] left-1/3 h-[24rem] w-[24rem] rounded-full bg-brand-orchid/25 blur-[110px] animate-float-slow motion-reduce:animate-none [animation-delay:3s]" />

      {showVideo ? (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            isVideoReady ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          aria-label={label}
          onCanPlay={() => setIsVideoReady(true)}
          onError={() => setIsVideoReady(false)}
        >
          <source src={siteConfig.media.heroVideoWebm} type="video/webm" />
          <source src={siteConfig.media.heroVideoMp4} type="video/mp4" />
        </video>
      ) : null}

      {/* Readability overlay — sits above the video, below the motif and copy.
          It is intentionally heavy: it is what guarantees text contrast when a
          video is playing. */}
      <div className="absolute inset-0 bg-gradient-hero-overlay" />

      {/* Flyer motif: oversized house outline, leaf sprig and sparkles, drawn
          ON TOP of the overlay so it stays visible without weakening contrast.
          Still inside the `-z-20` layer, so it never sits above the copy. */}
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMaxYMid slice"
        className="absolute inset-y-0 right-0 h-full w-full opacity-40 sm:w-[78%] lg:w-[62%]"
      >
        <defs>
          <linearGradient id="hero-motif" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#2A7DFF" />
            <stop offset="55%" stopColor="#845EF7" />
            <stop offset="100%" stopColor="#C06CFF" />
          </linearGradient>
        </defs>

        <g
          stroke="url(#hero-motif)"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        >
          <path d="M232 152 L300 92 L368 152" />
          <path d="M256 150 L300 111 L344 150" />
          <path d="M266 148 V196" />
          <path d="M232 198 C258 181, 292 206, 322 188" />
        </g>

        <g fill="url(#hero-motif)" opacity="0.85">
          <path d="M320 186c0-13 10-22 23-22-.6 13-10 22-23 22Z" />
          <path d="M323 190c9-9 22-10 34-3-9 10-23 12-34 3Z" />
          <path d="M352 68c1.4 9 4.6 12 12.6 13.8-8 1.8-11.2 4.8-12.6 13.8-1.4-9-4.6-12-12.6-13.8 8-1.8 11.2-4.8 12.6-13.8Z" />
          <path d="M378 104c.9 5.6 2.9 7.5 7.9 8.6-5 1.1-7 3-7.9 8.6-.9-5.6-2.9-7.5-7.9-8.6 5-1.1 7-3 7.9-8.6Z" />
          <path d="M212 118c1.1 7 3.7 9.4 9.9 10.8-6.2 1.4-8.8 3.8-9.9 10.8-1.1-7-3.7-9.4-9.9-10.8 6.2-1.4 8.8-3.8 9.9-10.8Z" />
        </g>
      </svg>

      <div className="absolute inset-0 grain opacity-60" />
    </div>
  );
}
