/**
 * Single source of truth for the primary navigation.
 * `key` maps to `nav.<key>` in the message files — no visible text here.
 */
export type NavItem = {
  key: 'home' | 'about' | 'services' | 'gallery' | 'book' | 'contact';
  href: '/' | '/about' | '/services' | '/gallery' | '/book' | '/contact';
};

export const primaryNav: NavItem[] = [
  { key: 'home', href: '/' },
  { key: 'about', href: '/about' },
  { key: 'services', href: '/services' },
  { key: 'gallery', href: '/gallery' },
  { key: 'book', href: '/book' },
  { key: 'contact', href: '/contact' }
];

/** Footer "Explore" column omits Home (the logo already links there). */
export const footerNav: NavItem[] = primaryNav.filter((item) => item.key !== 'home');
