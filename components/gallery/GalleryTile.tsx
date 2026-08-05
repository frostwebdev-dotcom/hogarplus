import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

import type { DemoGalleryItem } from '@/data/demo-content';
import { GradientPanel } from '@/components/ui/GradientPanel';
import { cn } from '@/lib/utils';

/**
 * Renders a gallery item's visual.
 *
 * When `item.src` points at a real file we use `next/image` (lazy by default,
 * `priority` only for the first tile). When it is absent we render a branded
 * gradient placeholder so the grid still looks intentional rather than broken.
 *
 * Tiles are a fixed height, so portrait source images get centre-cropped.
 * `item.focal` overrides the crop anchor for photos whose subject is not in the
 * middle of the frame.
 */
export function GalleryTile({
  item,
  alt,
  priority = false,
  className,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
}: {
  item: DemoGalleryItem;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (item.src) {
    return (
      <Image
        src={item.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        style={item.focal ? { objectPosition: item.focal } : undefined}
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <GradientPanel tone={item.tone} className={cn('absolute inset-0 h-full w-full', className)}>
      {/* Decorative placeholder — the accessible name comes from the parent
          button/figure, so this block is hidden from assistive tech.
          The title is deliberately NOT repeated here: the caption overlay on
          top of the tile already shows it, and rendering both read as a bug. */}
      <div
        aria-hidden="true"
        className="relative flex h-full items-center justify-center p-6"
      >
        <ImageIcon className="h-9 w-9 text-white/60" />
      </div>
    </GradientPanel>
  );
}
