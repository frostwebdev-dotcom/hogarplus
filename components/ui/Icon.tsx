import {
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  Handshake,
  Heart,
  Home,
  MapPin,
  Search,
  Settings2,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
  UserRound,
  type LucideIcon
} from 'lucide-react';

/**
 * String → Lucide component registry.
 *
 * Data files (`data/services.ts`, value lists) reference icons by *key* rather
 * than by component so those modules stay plain serialisable data and can cross
 * the server/client boundary without complaint.
 */
export const iconRegistry = {
  home: Home,
  building: Building2,
  sparkles: Sparkles,
  boxes: Boxes,
  truck: Truck,
  settings: Settings2,
  user: UserRound,
  shield: ShieldCheck,
  calendar: CalendarClock,
  search: Search,
  handshake: Handshake,
  mapPin: MapPin,
  check: CheckCircle2,
  heart: Heart,
  target: Target
} satisfies Record<string, LucideIcon>;

export type IconKey = keyof typeof iconRegistry;

export function getIcon(key: IconKey): LucideIcon {
  return iconRegistry[key];
}
