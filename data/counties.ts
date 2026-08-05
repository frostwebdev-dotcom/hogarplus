import type { CountyId } from '@/lib/site-config';

/**
 * New Jersey coverage map.
 *
 * `point` places each county inside the stylised silhouette drawn by
 * `CountyLocator`. Coordinates are county centroids projected with the same
 * simple linear mapping used for the outline itself:
 *
 *   x = (longitude + 75.70) / 1.85 * 100
 *   y = (41.45 - latitude)  / 2.60 * 100
 *
 * That keeps the dots in believable relative positions. It is an illustration,
 * not survey data, and nothing in the app performs geographic calculations
 * with it.
 *
 * County names are proper nouns and identical in both languages; the short
 * descriptive line for each one lives in the translation files under
 * `serviceArea.counties.<id>`.
 */
export type County = {
  id: CountyId;
  /** Display name without the word "County" — the UI adds it, localized. */
  name: string;
  point: { x: number; y: number };
  /** Region grouping used for the small label above the info panel. */
  region: 'north' | 'central';
};

export const counties: County[] = [
  { id: 'sussex', name: 'Sussex', point: { x: 52.4, y: 11.9 }, region: 'north' },
  { id: 'passaic', name: 'Passaic', point: { x: 75.7, y: 16.2 }, region: 'north' },
  { id: 'bergen', name: 'Bergen', point: { x: 87.5, y: 18.8 }, region: 'north' },
  { id: 'morris', name: 'Morris', point: { x: 62.2, y: 22.7 }, region: 'north' },
  { id: 'hudson', name: 'Hudson', point: { x: 86.8, y: 27.7 }, region: 'north' },
  { id: 'union', name: 'Union', point: { x: 75.7, y: 30.4 }, region: 'north' },
  { id: 'somerset', name: 'Somerset', point: { x: 58.9, y: 34.2 }, region: 'central' },
  { id: 'middlesex', name: 'Middlesex', point: { x: 69.7, y: 38.8 }, region: 'central' },
  { id: 'monmouth', name: 'Monmouth', point: { x: 78.4, y: 44.6 }, region: 'central' }
];

export const countyById = new Map(counties.map((county) => [county.id, county]));
