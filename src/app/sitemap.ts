// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

/**
 * Sitemap for the marketing site (homigo.tech).
 *
 * IMPORTANT:
 * - The shop lives on a separate (Shopify-managed) domain/subdomain (e.g. shop.homigo.tech)
 * - Therefore, we do NOT list /shop/* URLs here to avoid duplicate indexing and mixed-domain sitemaps.
 * - Shopify will provide its own sitemap on the shop domain.
 */
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homigo.tech';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/beratung`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/smart-home-generator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: `${baseUrl}/widerruf`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];

  return staticPages;
}