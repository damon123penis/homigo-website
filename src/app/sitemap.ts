// src/app/sitemap.ts
import type { MetadataRoute } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.homigo.tech';
const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function fetchProductHandles(): Promise<{ handle: string; updatedAt?: string }[]> {
  if (!SHOPIFY_STORE_DOMAIN || !SHOPIFY_STOREFRONT_ACCESS_TOKEN) return [];

  const query = /* GraphQL */ `
    query ProductHandles($first: Int!) {
      products(first: $first) {
        edges {
          node {
            handle
            updatedAt
          }
        }
      }
    }
  `;

  const res = await fetch(
    `https://${SHOPIFY_STORE_DOMAIN}/api/2024-07/graphql.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({ query, variables: { first: 250 } }),
      cache: 'no-store',
    }
  );

  const json = await res.json();
  if (!res.ok || json.errors) return [];

  return (json.data?.products?.edges || []).map((e: any) => ({
    handle: e.node.handle,
    updatedAt: e.node.updatedAt,
  }));
}

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
      url: `${baseUrl}/kontakt`,
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
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/shop/cart`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ];

  const products = await fetchProductHandles();

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/shop/products/${p.handle}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...productPages];
}