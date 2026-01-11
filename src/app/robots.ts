// src/app/robots.ts
import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homigo.tech';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Wichtig: `/_next/` NICHT blockieren – sonst kann Google Assets nicht sauber laden.
        // API-Routen und Warenkorb sollen nicht indexiert werden.
        disallow: ['/api/', '/shop/cart', '/shop/cart/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}