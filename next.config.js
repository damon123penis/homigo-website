/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.shopify.com' },
    ],
  },

  async redirects() {
    return [
      // offiziell: /leistungen-im-detail -> /beratung
      {
        source: '/leistungen-im-detail',
        destination: '/beratung',
        permanent: true, // 308
      },
      // falls du noch die alte Journey-URL im Umlauf hast:
      {
        source: '/customerjourney',
        destination: '/beratung',
        permanent: true, // 308
      }
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;