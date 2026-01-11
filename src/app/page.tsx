import Link from "next/link";
import Image from "next/image";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_COLLECTIONS, GET_PRODUCTS } from "@/lib/shopify/queries";

type CollectionsResp = {
  collections: {
    edges: { node: { id: string; handle: string; title: string; description?: string; image?: { url: string; altText?: string } } }[];
  };
};

type ProductsResp = {
  products: {
    edges: {
      node: {
        id: string;
        handle: string;
        title: string;
        vendor?: string | null;
        featuredImage?: { url: string; altText?: string | null } | null;
        priceRange?: { minVariantPrice?: { amount: string; currencyCode: string } | null } | null;
      };
    }[];
  };
};

export default async function ShopHome({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const viewParam = typeof searchParams?.view === "string" ? searchParams.view : "collections";
  const view = viewParam === "products" ? "products" : "collections";

  const q = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";
  const productQuery =
    q.length >= 2 ? `title:*${q}* OR product_type:*${q}* OR vendor:*${q}*` : undefined;

  const collectionsData =
    view !== "products" ? await shopifyFetch<CollectionsResp>(GET_COLLECTIONS, { first: 20 }) : null;

  const productsData =
    view === "products"
      ? await shopifyFetch<ProductsResp>(
          GET_PRODUCTS,
          { first: 60, query: productQuery },
          { cache: "no-store" }
        )
      : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Shop</h1>
        <p className="mt-2 text-slate-600">
          Smart-Home Hardware, Bundles und Services – passend zu deiner Beratung.
        </p>
      </div>

      {view === "products" ? (
        <>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Produkte</h2>
              <p className="mt-1 text-sm text-slate-600">
                {q ? (
                  <>
                    Suchergebnisse für <span className="font-semibold">{q}</span>
                  </>
                ) : (
                  <>Alle Produkte (neueste zuerst)</>
                )}
              </p>
            </div>
            <Link
              href="/shop?view=collections"
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Zu den Kategorien
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(productsData?.products.edges ?? []).map(({ node }) => {
              const price = node.priceRange?.minVariantPrice;
              return (
                <Link
                  key={node.id}
                  href={`/shop/products/${encodeURIComponent(node.handle)}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-xl bg-slate-50">
                    {node.featuredImage?.url ? (
                      <Image
                        src={node.featuredImage.url}
                        alt={node.featuredImage.altText || node.title}
                        width={800}
                        height={500}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition"
                      />
                    ) : null}
                  </div>
                  <div className="mt-4">
                    <div className="text-lg font-semibold text-slate-900">{node.title}</div>
                    {node.vendor ? <div className="mt-1 text-sm text-slate-600">{node.vendor}</div> : null}
                    {price?.amount ? (
                      <div className="mt-2 text-sm font-semibold text-slate-900">
                        {Number(price.amount).toFixed(2)} {price.currencyCode}
                      </div>
                    ) : null}
                  </div>
                </Link>
              );
            })}
          </div>

          {(productsData?.products.edges?.length ?? 0) === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
              Keine Produkte gefunden.
            </div>
          ) : null}
        </>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(collectionsData?.collections.edges ?? []).map(({ node }) => (
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
                {node.description ? (
                  <div className="mt-1 text-sm text-slate-600 line-clamp-2">{node.description}</div>
                ) : null}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}