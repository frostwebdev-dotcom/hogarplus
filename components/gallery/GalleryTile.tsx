import Image from 'next/image';
import { ImageIcon } from 'lucide-react';

import type { DemoGalleryItem } from '@/data/demo-content';
import { GradientPanel } from '@/components/ui/GradientPanel';
import { cn } from '@/lib/utils';

/**
 * Renders a gallery item's visual.
 *
 * When `item.src` points at a real file we use `next/image` (lazy by default,
 * `priority` only for the first tile). When it is absent — which is the case for
 * the whole demo set — we render a branded gradient placeholder so the grid
 * still looks intentional rather than broken.
 */
export function GalleryTile({
  item,
  alt,
  title,
  priority = false,
  className,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw'
}: {
  item: DemoGalleryItem;
  alt: string;
  title: string;
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
        className={cn('object-cover', className)}
      />
    );
  }

  return (
    <GradientPanel tone={item.tone} className={cn('absolute inset-0 h-full w-full', className)}>
      {/* Decorative placeholder — the accessible name comes from the parent
          button/figure, so this block is hidden from assistive tech. */}
      <div
        aria-hidden="true"
        className="relative flex h-full flex-col items-center justify-center gap-3 p-6 text-center"
      >
        <ImageIcon className="h-8 w-8 text-white/70" />
        <p className="font-heading text-lg leading-snug text-white">{title}</p>
      </div>
    </GradientPanel>
  );
}
