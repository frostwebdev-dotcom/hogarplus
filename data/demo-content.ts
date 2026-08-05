/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ⚠️  SAMPLE / DEMO CONTENT — NOT CLIENT-APPROVED  ⚠️
 * ─────────────────────────────────────────────────────────────────────────────
 * Everything in this file is placeholder material created purely so the demo
 * looks complete. It contains NO real customers, NO real reviews, NO ratings,
 * NO certifications and NO performance claims.
 *
 * Testimonial authors are described only by an anonymous role + county label
 * (e.g. "Residential Client — Union County") precisely so that nothing here can
 * be mistaken for a verified identity.
 *
 * TODO(client): replace with approved testimonials, real photography and final
 * flyer copy before launch. Delete any entry that is not replaced.
 * ─────────────────────────────────────────────────────────────────────────────
 */

/** Marker exported so UI can render a "sample content" note during the demo. */
export const IS_DEMO_CONTENT = true;

/* ─────────────────────────── Testimonials ─────────────────────────── */

export type DemoTestimonial = {
  id: string;
  /** Key into `testimonials.samples.<id>.quote` in the message files. */
  quoteKey: string;
  /** Key into `testimonials.roles.<roleKey>` — anonymous role descriptor. */
  roleKey: 'residential' | 'commercial' | 'moveOut';
  /** County display name, appended to the role label by the component. */
  county: string;
  /** Two initials for the avatar chip. Not a real person's initials. */
  initials: string;
};

export const demoTestimonials: DemoTestimonial[] = [
  { id: 'one', quoteKey: 'one', roleKey: 'residential', county: 'Union', initials: 'RC' },
  { id: 'two', quoteKey: 'two', roleKey: 'commercial', county: 'Hudson', initials: 'CC' },
  { id: 'three', quoteKey: 'three', roleKey: 'moveOut', county: 'Bergen', initials: 'MC' }
];

/* ───────────────────────────── Gallery ───────────────────────────── */

export type GalleryCategory = 'residential' | 'commercial' | 'beforeAfter';

export type DemoGalleryItem = {
  id: string;
  category: GalleryCategory;
  /**
   * Local image path under /public. When the file is absent the grid renders a
   * branded gradient placeholder instead — the layout never breaks.
   * TODO(client): supply real photography and point these at it.
   */
  src?: string;
  /** Key into `gallery.items.<captionKey>` for title + alt text. */
  captionKey: string;
  /**
   * `object-position` for the tile crop. Tiles are a fixed height, so portrait
   * photos are centre-cropped by default; set this when the subject sits off
   * centre. e.g. `'center 30%'`.
   */
  focal?: string;
  /** Gradient preset used by the placeholder tile. */
  tone: 'blue' | 'purple' | 'orchid' | 'navy';
  /** Grid emphasis — `wide` spans two columns on large screens. */
  span?: 'wide' | 'tall';
};

/**
 * ⚠️ TEMPORARY STOCK PHOTOGRAPHY ⚠️
 *
 * The first four entries use free stock photos so the client can see how the
 * gallery reads with real imagery. They are NOT photographs of HogarPlus
 * Solutions' own work, and they do not show the client's team, clients or
 * properties. They must be replaced before launch.
 *
 * Source: Pexels (Pexels License — free for commercial use, no attribution
 * required). Downloaded to `public/images/`:
 *   team-bedroom.jpg      pexels.com/photo/9462341  (Liliana Drew)
 *   surface-detail.jpg    pexels.com/photo/6195198  (Tima Miroshnichenko)
 *   detail-dusting.jpg    pexels.com/photo/6195292  (Tima Miroshnichenko)
 *   cleaning-supplies.jpg pexels.com/photo/5217900  (Anna Shvets)
 *
 * The remaining entries have no `src` and fall back to the branded gradient
 * placeholder, which is what every tile will look like until real photos
 * arrive. Point `src` at the client's own files to replace them.
 */
export const demoGallery: DemoGalleryItem[] = [
  {
    id: 'g1',
    category: 'residential',
    captionKey: 'teamBedroom',
    src: '/images/team-bedroom.jpg',
    tone: 'blue',
    span: 'wide'
  },
  {
    id: 'g2',
    category: 'residential',
    captionKey: 'surfaceDetail',
    src: '/images/surface-detail.jpg',
    tone: 'purple'
  },
  {
    id: 'g3',
    category: 'residential',
    captionKey: 'detailDusting',
    src: '/images/detail-dusting.jpg',
    // Portrait source; the figure sits in the lower-middle of the frame.
    focal: 'center 55%',
    tone: 'orchid'
  },
  {
    id: 'g4',
    category: 'residential',
    captionKey: 'supplies',
    src: '/images/cleaning-supplies.jpg',
    // Portrait source; the bottles occupy the bottom two thirds.
    focal: 'center 70%',
    tone: 'navy'
  },
  { id: 'g5', category: 'commercial', captionKey: 'office', tone: 'navy' },
  { id: 'g6', category: 'commercial', captionKey: 'lobby', tone: 'blue', span: 'wide' },
  { id: 'g7', category: 'beforeAfter', captionKey: 'bathroom', tone: 'orchid' },
  { id: 'g8', category: 'beforeAfter', captionKey: 'pantry', tone: 'purple' }
];

export const galleryFilters: Array<'all' | GalleryCategory> = [
  'all',
  'residential',
  'commercial',
  'beforeAfter'
];
