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

/**
 * Before-and-after pairs are deliberately not a category: the client does not
 * publish them.
 */
export type GalleryCategory = 'residential' | 'commercial';

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
 * These are free stock photographs of *spaces* — living rooms, kitchens,
 * bathrooms, offices. They are not HogarPlus Solutions' own work and show none
 * of the client's team, clients or properties. They must be replaced before
 * launch.
 *
 * Deliberately no people: the team is Colombian and wears branded T-shirts, and
 * no stock library carries that convincingly. Rather than show a crew that is
 * not theirs, the photographs carry the rooms and the illustrations in
 * `public/illustrations/` carry the people.
 *
 * Source: Pexels (Pexels License — free for commercial use, no attribution
 * required). Downloaded to `public/images/`:
 *   living-room.jpg       pexels.com/photo/11671083  (Deno Wang)
 *   kitchen.jpg           pexels.com/photo/13009887  (Alesha)
 *   bathroom.jpg          pexels.com/photo/7005268   (Artbovich)
 *   dining-area.jpg       pexels.com/photo/7587743   (Artbovich)
 *   office-workspace.jpg  pexels.com/photo/5511098   (Mike van Schoonderwalt)
 *   office-reception.jpg  pexels.com/photo/6899544   (Artbovich)
 *
 * Point each `src` at the client's own files to replace them. An entry with no
 * `src` falls back to the branded gradient placeholder; the layout never breaks.
 */
export const demoGallery: DemoGalleryItem[] = [
  {
    id: 'g1',
    category: 'residential',
    captionKey: 'livingRoom',
    src: '/images/living-room.jpg',
    tone: 'blue',
    span: 'wide'
  },
  { id: 'g2', category: 'residential', captionKey: 'kitchen', src: '/images/kitchen.jpg', tone: 'purple' },
  { id: 'g3', category: 'residential', captionKey: 'bathroom', src: '/images/bathroom.jpg', tone: 'orchid' },
  {
    id: 'g4',
    category: 'residential',
    captionKey: 'diningArea',
    src: '/images/dining-area.jpg',
    tone: 'navy'
  },
  {
    id: 'g5',
    category: 'commercial',
    captionKey: 'workspace',
    src: '/images/office-workspace.jpg',
    tone: 'navy'
  },
  {
    id: 'g6',
    category: 'commercial',
    captionKey: 'reception',
    src: '/images/office-reception.jpg',
    tone: 'blue',
    span: 'wide'
  }
];

export const galleryFilters: Array<'all' | GalleryCategory> = ['all', 'residential', 'commercial'];
