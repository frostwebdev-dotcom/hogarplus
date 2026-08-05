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
  /** Gradient preset used by the placeholder tile. */
  tone: 'blue' | 'purple' | 'orchid' | 'navy';
  /** Grid emphasis — `wide` spans two columns on large screens. */
  span?: 'wide' | 'tall';
};

export const demoGallery: DemoGalleryItem[] = [
  { id: 'g1', category: 'residential', captionKey: 'livingRoom', tone: 'blue', span: 'wide' },
  { id: 'g2', category: 'residential', captionKey: 'kitchen', tone: 'purple' },
  { id: 'g3', category: 'commercial', captionKey: 'office', tone: 'navy' },
  { id: 'g4', category: 'beforeAfter', captionKey: 'bathroom', tone: 'orchid' },
  { id: 'g5', category: 'residential', captionKey: 'bedroom', tone: 'orchid' },
  { id: 'g6', category: 'commercial', captionKey: 'lobby', tone: 'blue', span: 'wide' },
  { id: 'g7', category: 'beforeAfter', captionKey: 'pantry', tone: 'purple' },
  { id: 'g8', category: 'residential', captionKey: 'moveOut', tone: 'navy' }
];

export const galleryFilters: Array<'all' | GalleryCategory> = [
  'all',
  'residential',
  'commercial',
  'beforeAfter'
];
