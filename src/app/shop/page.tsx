import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS } from "@/lib/shopify/queries";

export const revalidate = 60 * 30; // 30 Minuten

type CollectionsResp = {
  collections: {
    edges: { node: { id: string; handle: string; title: string; description?: string; image?: { url: string; altText?: string } } }[];
  };
};

export default async function ShopHome() {
  const data = await shopifyFetch<CollectionsResp>(GET_COLLECTIONS, { first: 20 });

  return (
    <div className="space-y-8">
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
            href={`/shop/collections/${node.handle}`}
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