import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";

export const dynamic = "force-dynamic";

const SITE_URL = (() => {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "https://www.homigo.tech";
})();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Alle Kategorien | homigo Shop",
  description: "Alle Kategorien im homigo Shop – finde schnell die passende Produktgruppe.",
  alternates: { canonical: "/shop/collections" },
  robots: { index: true, follow: true },
};

type CollectionsResp = {
  collections: {
    edges: Array<{
      node: {
        id: string;
        handle: string;
        title: string;
        description?: string | null;
        image?: { url: string; altText?: string | null } | null;
      };
    }>;
  };
};

export default async function CollectionsIndexPage() {
  const data = await shopifyFetch<CollectionsResp>(
    GET_COLLECTIONS,
    { first: 50 },
    { cache: "no-store" }
  );

  const items = data.collections.edges.map((e) => e.node);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Alle Kategorien</h1>
        <p className="mt-1 text-slate-600">Wähle eine Kategorie, um passende Produkte zu sehen.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <Link
            key={c.id}
            href={`/shop/collections/${encodeURIComponent(c.handle)}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
              <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: "16 / 10" }}>
                {c.image?.url ? (
                  <Image
                    src={c.image.url}
                    alt={c.image.altText || c.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-400">
                    Kein Kategoriebild
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4">
              <div className="text-lg font-semibold text-slate-900">{c.title}</div>
              {c.description ? (
                <div className="mt-1 text-sm text-slate-600 line-clamp-2">{c.description}</div>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}