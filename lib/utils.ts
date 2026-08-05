export type ClassValue = string | number | null | undefined | false;

/** Minimal class-name joiner — avoids pulling in clsx/tailwind-merge for a demo. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
