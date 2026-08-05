import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Demo phase: all imagery is local (public/images). No remote patterns are
    // configured on purpose — add the client's CDN here when one is provided.
    formats: ['image/avif', 'image/webp']
  }
};

export default withNextIntl(nextConfig);
