// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // NICHT `/_next/` blocken – sonst kann Google die Seite nicht korrekt rendern
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://homigo.tech/sitemap.xml',
  };
}