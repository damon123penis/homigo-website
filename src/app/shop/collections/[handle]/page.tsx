import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTION_BY_HANDLE } from "@/lib/shopify/queries";
import { formatEUR } from "@/lib/shopify/money";
import type { Metadata } from "next";

// Always render fresh in the shop while products/collections are changing frequently.
// This prevents stale listings when new products are added in Shopify.
export const dynamic = "force-dynamic";

type Resp = {
  collection: null | {
    id: string;
    handle: string;
    title: string;
    description?: string;
    image?: { url: string; altText?: string };
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          featuredImage?: { url: string; altText?: string };
          priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
        };
      }[];
    };
  };
};

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const handle = decodeURIComponent(params.handle);
  const canonicalHandle = encodeURIComponent(handle);

  return {
    title: `Kategorie | ${handle} | homigo`,
    alternates: { canonical: `https://www.homigo.tech/shop/collections/${canonicalHandle}` },
  };
}

export default async function CollectionPage({ params }: { params: { handle: string } }) {
  const handle = decodeURIComponent(params.handle);
  const data = await shopifyFetch<Resp>(
    GET_COLLECTION_BY_HANDLE,
    { handle, first: 50 },
    { cache: "no-store" }
  );

  if (!data.collection) {
    return <div className="text-slate-700">Kategorie nicht gefunden.</div>;
  }

  const c = data.collection;

  return (
    <div className="space-y-8">
      {c.image?.url ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="relative h-[180px] w-full bg-slate-50 sm:h-[220px] md:h-[260px] lg:h-[300px]">
            <Image
              src={c.image.url}
              alt={c.image.altText || c.title}
              fill
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold text-slate-900">{c.title}</h1>
        {c.description ? <p className="text-slate-600 max-w-3xl">{c.description}</p> : null}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {c.products.edges.map(({ node }) => (
          <Link
            key={node.id}
            href={`/shop/products/${encodeURIComponent(node.handle)}`}
            className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="aspect-square overflow-hidden rounded-xl bg-slate-50">
              {node.featuredImage?.url ? (
                <Image
                  src={node.featuredImage.url}
                  alt={node.featuredImage.altText || node.title}
                  width={800}
                  height={800}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                />
              ) : null}
            </div>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div className="text-base font-semibold text-slate-900">{node.title}</div>
              <div className="text-sm font-semibold text-slate-900 whitespace-nowrap">
                {formatEUR(node.priceRange.minVariantPrice.amount)}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}