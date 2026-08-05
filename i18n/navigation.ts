import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Always import `Link`, `useRouter`,
 * `usePathname` and `redirect` from here — never from `next/link` or
 * `next/navigation` — so every href automatically keeps its locale prefix.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
