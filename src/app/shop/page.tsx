import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";
import type { Metadata } from "next";

export const revalidate = 60 * 30; // 30 Minuten

const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.homigo.tech";
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Shop | homigo",
    template: "%s | homigo",
  },
  description:
    "Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung. Versand aus Deutschland, klare Zustandsangaben und transparente Hinweise.",
  alternates: {
    canonical: "/shop",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/shop",
    title: "Shop | homigo",
    description:
      "Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.",
    siteName: "homigo",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop | homigo",
    description:
      "Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.",
  },
};

type CollectionsResp = {
  collections: {
    edges: { node: { id: string; handle: string; title: string; description?: string; image?: { url: string; altText?: string } } }[];
  };
};

export default async function ShopHome() {
  const data = await shopifyFetch<CollectionsResp>(GET_COLLECTIONS, { first: 20 });

  const canonicalUrl = `${SITE_URL}/shop`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "homigo Shop",
    url: canonicalUrl,
    description:
      "Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: data.collections.edges.map(({ node }, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: node.title,
        url: `${SITE_URL}/shop/collections/${encodeURIComponent(node.handle)}`,
      })),
    },
  };

  return (
    <div className="space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
        <p className="mt-2 text-slate-600">
          Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.collections.edges.map(({ node }) => (
          <Link
            key={node.id}
            href={`/shop/collections/${encodeURIComponent(node.handle)}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-50">
              {node.image?.url ? (
                <Image
                  src={node.image.url}
                  alt={node.image.altText || node.title}
                  width={800}
                  height={500}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                />
              ) : null}
            </div>
            <div className="mt-4">
              <div className="text-lg font-semibold text-slate-900">{node.title}</div>
              {node.description ? <div className="mt-1 text-sm text-slate-600 line-clamp-2">{node.description}</div> : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}