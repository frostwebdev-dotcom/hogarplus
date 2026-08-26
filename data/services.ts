/**
 * Service catalogue — structure only.
 *
 * All human-readable copy (titles, descriptions, "what's included" checklists)
 * lives in `messages/en.json` and `messages/es.json` under the `services`
 * namespace, keyed by the `id` below. This file only describes *shape*: order,
 * icon, route slug and how many checklist items to read from the dictionary.
 */

export type ServiceId =
  | 'residential'
  | 'commercial'
  | 'deep'
  | 'organization'
  | 'moveInOut'
  | 'custom';

/** Icon keys are resolved to Lucide components in `components/ui/Icon.tsx`. */
export type ServiceIconKey =
  | 'home'
  | 'building'
  | 'sparkles'
  | 'boxes'
  | 'truck'
  | 'settings';

export type Service = {
  id: ServiceId;
  icon: ServiceIconKey;
  /** Anchor used on the Services page, e.g. /en/services#deep-cleaning */
  slug: string;
  /** Number of bullet points to read from `services.items.<id>.highlights`. */
  highlightCount: number;
  /** Number of checklist rows to read from `services.items.<id>.included`. */
  includedCount: number;
  /** Marks the card that gets the subtle "most requested" emphasis. */
  featured?: boolean;
  /**
   * Card illustration under `public/illustrations`. Original artwork, drawn in
   * the brand palette — the figures are the client's own crew: warm-toned,
   * dark-haired, in branded T-shirts rather than maid uniforms.
   */
  illustration: string;
};

export const services: Service[] = [
  {
    id: 'residential',
    icon: 'home',
    slug: 'residential-cleaning',
    illustration: '/illustrations/service-residential.svg',
    highlightCount: 3,
    includedCount: 5,
    featured: true
  },
  {
    id: 'commercial',
    icon: 'building',
    slug: 'commercial-cleaning',
    illustration: '/illustrations/service-commercial.svg',
    highlightCount: 3,
    includedCount: 5
  },
  {
    id: 'deep',
    icon: 'sparkles',
    slug: 'deep-cleaning',
    illustration: '/illustrations/service-deep.svg',
    highlightCount: 3,
    includedCount: 5
  },
  {
    id: 'organization',
    icon: 'boxes',
    slug: 'home-organization',
    illustration: '/illustrations/service-organization.svg',
    highlightCount: 3,
    includedCount: 5
  },
  {
    id: 'moveInOut',
    icon: 'truck',
    slug: 'move-in-move-out',
    illustration: '/illustrations/service-move.svg',
    highlightCount: 3,
    includedCount: 5
  },
  {
    id: 'custom',
    icon: 'settings',
    slug: 'customized-plans',
    illustration: '/illustrations/service-custom.svg',
    highlightCount: 3,
    includedCount: 5
  }
];
