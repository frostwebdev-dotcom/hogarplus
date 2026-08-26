/**
 * Service-request intake — structure only.
 *
 * Before we quote anything we need two things from the visitor: the window of
 * time they want us on site, and which spaces the job covers. The spaces
 * differ by property type, so each type carries its own ordered list.
 *
 * As with `services.ts`, all human-readable copy lives in `messages/en.json`
 * and `messages/es.json` — here under the `intake` namespace, keyed by the ids
 * below. This file only describes *shape*: the options and the order they
 * appear in.
 */

export type PropertyTypeId = 'residential' | 'commercial';

export type TimeWindowId = 'morning' | 'afternoon' | 'evening';

export type SpaceId =
  // Residential
  | 'bedrooms'
  | 'living'
  | 'dining'
  | 'kitchen'
  | 'bathrooms'
  | 'homeOffice'
  | 'hallways'
  | 'laundry'
  | 'sunroom'
  // Commercial
  | 'reception'
  | 'executiveOffices'
  | 'workstations'
  | 'conference'
  | 'kitchenette'
  | 'restrooms'
  | 'serverRooms'
  | 'corridors'
  | 'storage'
  // Shared — always last in both lists.
  | 'other';

export const propertyTypes = ['residential', 'commercial'] as const satisfies readonly PropertyTypeId[];

/**
 * The three windows the client operates in. `hours` is display-only and is
 * repeated in the translation files so each language can format it naturally.
 */
export const timeWindows = ['morning', 'afternoon', 'evening'] as const satisfies readonly TimeWindowId[];

const RESIDENTIAL_SPACES = [
  'bedrooms',
  'living',
  'dining',
  'kitchen',
  'bathrooms',
  'homeOffice',
  'hallways',
  'laundry',
  'sunroom',
  'other'
] as const satisfies readonly SpaceId[];

const COMMERCIAL_SPACES = [
  'reception',
  'executiveOffices',
  'workstations',
  'conference',
  'kitchenette',
  'restrooms',
  'serverRooms',
  'corridors',
  'storage',
  'other'
] as const satisfies readonly SpaceId[];

/** Ordered space checklist for each property type. */
export const spacesByPropertyType: Record<PropertyTypeId, readonly SpaceId[]> = {
  residential: RESIDENTIAL_SPACES,
  commercial: COMMERCIAL_SPACES
};

/** Every space id exactly once — used to build the form schema's enum. */
export const spaceIds: SpaceId[] = Array.from(
  new Set<SpaceId>([...RESIDENTIAL_SPACES, ...COMMERCIAL_SPACES])
);

/** The free-text escape hatch; rendered last and paired with a text input. */
export const OTHER_SPACE: SpaceId = 'other';
