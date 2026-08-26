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

/* Ordered north to south, which is also how the locator reads down the map. */
export const counties: County[] = [
  { id: 'sussex', name: 'Sussex', point: { x: 52.4, y: 11.9 }, region: 'north' },
  { id: 'passaic', name: 'Passaic', point: { x: 75.7, y: 16.2 }, region: 'north' },
  { id: 'warren', name: 'Warren', point: { x: 38.4, y: 22.7 }, region: 'north' },
  { id: 'morris', name: 'Morris', point: { x: 62.2, y: 22.7 }, region: 'north' },
  { id: 'essex', name: 'Essex', point: { x: 78.4, y: 25.4 }, region: 'north' },
  { id: 'hunterdon', name: 'Hunterdon', point: { x: 42.7, y: 33.8 }, region: 'central' },
  { id: 'somerset', name: 'Somerset', point: { x: 58.9, y: 34.2 }, region: 'central' },
  { id: 'middlesex', name: 'Middlesex', point: { x: 69.7, y: 38.8 }, region: 'central' }
];

export const countyById = new Map(counties.map((county) => [county.id, county]));
