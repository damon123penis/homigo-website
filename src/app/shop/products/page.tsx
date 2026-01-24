import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCTS } from "@/lib/shopify/queries";

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
  title: "Alle Produkte | homigo Shop",
  description:
    "Alle Smart-Home Produkte im homigo Shop – Hardware, Bundles und Services. Filtere per Suche und finde kompatible Komponenten.",
  alternates: { canonical: "/shop/products" },
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
    url: "/shop/products",
    title: "Alle Produkte | homigo Shop",
    description:
      "Alle Smart-Home Produkte im homigo Shop – Hardware, Bundles und Services.",
    siteName: "homigo",
    locale: "de_DE",
  },
};

type ProductsResp = {
  search: {
    productFilters?: Array<{
      id: string;
      label: string;
      type: string;
      values: Array<{
        id?: string | null;
        label: string;
        count?: number | null;
        input: string;
      }>;
    }>;
    edges: Array<{
      node:
        | {
            id: string;
            handle: string;
            title: string;
            vendor?: string | null;
            featuredImage?: { url: string; altText?: string | null } | null;
            priceRange?: {
              minVariantPrice?: { amount: string; currencyCode: string } | null;
            } | null;
          }
        | null;
    }>;
  };
};

function money(amount?: string, currency?: string) {
  if (!amount || !currency) return null;
  const n = Number(amount);
  if (!Number.isFinite(n)) return null;
  return `${n.toFixed(2)} ${currency}`;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[] | undefined>;
}) {
  const q = typeof searchParams?.q === "string" ? searchParams.q.trim() : "";

  // Shopify search syntax: simple freetext over title/vendor.
  const shopifyQuery = q ? `title:*${q}* OR vendor:*${q}*` : undefined;

  // Filters coming from Shopify Search & Discovery storefront filters.
  // We roundtrip the `values.input` JSON via query param `f` (repeatable).
  const fRaw = searchParams?.f;
  const selectedF: string[] = Array.isArray(fRaw)
    ? fRaw.filter((v): v is string => typeof v === "string" && v.length > 0)
    : typeof fRaw === "string" && fRaw.length > 0
      ? [fRaw]
      : [];

  const decodedFilters = selectedF
    .map((v) => {
      try {
        const json = decodeURIComponent(v);
        return JSON.parse(json);
      } catch {
        try {
          return JSON.parse(v);
        } catch {
          return null;
        }
      }
    })
    .filter((v): v is Record<string, any> => Boolean(v && typeof v === "object"));

  // Optional price range filter.
  const priceMinRaw = typeof searchParams?.price_min === "string" ? searchParams.price_min.trim() : "";
  const priceMaxRaw = typeof searchParams?.price_max === "string" ? searchParams.price_max.trim() : "";
  const priceMin = priceMinRaw !== "" && !Number.isNaN(Number(priceMinRaw)) ? Number(priceMinRaw) : undefined;
  const priceMax = priceMaxRaw !== "" && !Number.isNaN(Number(priceMaxRaw)) ? Number(priceMaxRaw) : undefined;

  const filters: Record<string, any>[] = [...decodedFilters];
  if (typeof priceMin === "number" || typeof priceMax === "number") {
    filters.push({
      price: {
        ...(typeof priceMin === "number" ? { min: priceMin } : {}),
        ...(typeof priceMax === "number" ? { max: priceMax } : {}),
      },
    });
  }

  const data = await shopifyFetch<ProductsResp>(
    GET_PRODUCTS,
    { first: 50, query: shopifyQuery || "*", productFilters: filters.length ? filters : undefined },
    { cache: "no-store" }
  );

  const products = (data.search.edges || []).map((e) => e.node).filter((n): n is NonNullable<typeof n> => Boolean(n));

  const selectedSet = new Set(selectedF);
  const filterDefs = data.search.productFilters || [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900">
            <span>Dein Amigo fürs Smart Home</span>
            <span className="flex items-center gap-2">
              <span>homigo Shop</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-7 w-7 text-emerald-600"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
              </svg>
            </span>
          </h1>
          <p className="mt-1 text-slate-600">
            {q ? (
              <>
                Ergebnisse für <span className="font-semibold text-slate-900">„{q}“</span>
              </>
            ) : (
              <>Stöbere durch alle Produkte im homigo Shop.</>
            )}
          </p>
        </div>
      </div>

      <form action="/shop/products" method="GET" className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr,auto] lg:items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700">Suche</label>
            <input
              name="q"
              defaultValue={q}
              placeholder="Suchen (z. B. Sensor, Aqara, Zigbee)…"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-emerald-700 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800"
          >
            Anwenden
          </button>
        </div>

        {filterDefs.length ? (
          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {filterDefs.map((f) => {
              if (f?.type === "PRICE_RANGE") {
                return (
                  <div key={f.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                    <div className="text-sm font-semibold text-slate-900">{f.label || "Preis"}</div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Min</label>
                        <input
                          name="price_min"
                          inputMode="decimal"
                          defaultValue={priceMinRaw}
                          placeholder="0"
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-slate-600">Max</label>
                        <input
                          name="price_max"
                          inputMode="decimal"
                          defaultValue={priceMaxRaw}
                          placeholder="999"
                          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900"
                        />
                      </div>
                    </div>
                  </div>
                );
              }

              const values = Array.isArray(f?.values) ? f.values : [];
              if (!values.length) return null;

              return (
                <div key={f.id} className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
                  <div className="text-sm font-semibold text-slate-900">{f.label}</div>
                  <div className="mt-3 space-y-2">
{values.map((v) => {
  const inputStr = typeof v?.input === "string" ? v.input : "";
  if (!inputStr) return null;

  const encoded = encodeURIComponent(inputStr);
  const checked = selectedSet.has(encoded);
  const count = typeof v?.count === "number" ? v.count : undefined;

  return (
    <label
      key={v.id || inputStr}
      className="flex items-center justify-between gap-3 text-sm text-slate-800"
    >
      <span className="flex items-center gap-2">
        <input
          type="checkbox"
          name="f"
          value={encoded}
          defaultChecked={checked}
          className="h-4 w-4 rounded border-slate-300"
        />
        <span>{v.label}</span>
      </span>

      {typeof count === "number" ? (
        <span className="text-xs text-slate-500">{count}</span>
      ) : null}
    </label>
  );
})}
                  </div>
                </div>
              );
            })}

            <div className="lg:col-span-3 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                {selectedF.length || priceMinRaw || priceMaxRaw ? (
                  <>
                    Aktive Filter:{" "}
                    <span className="font-semibold text-slate-900">
                      {selectedF.length + (priceMinRaw || priceMaxRaw ? 1 : 0)}
                    </span>
                  </>
                ) : (
                  <>Keine Filter aktiv.</>
                )}
              </div>
              {selectedF.length || priceMinRaw || priceMaxRaw ? (
                <Link
                  href={q ? `/shop/products?q=${encodeURIComponent(q)}` : "/shop/products"}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Filter zurücksetzen
                </Link>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/60 p-4 text-sm text-slate-600">
            Hinweis: Für deinen Shop sind aktuell keine Storefront-Filter verfügbar. Prüfe in Shopify die App „Search & Discovery"
            sowie die Filter-Konfiguration für den Online-Shop.
          </div>
        )}
      </form>

      {products.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700">
          Keine Produkte gefunden.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const price = p.priceRange?.minVariantPrice;
            return (
              <Link
                key={p.id}
                href={`/shop/products/${encodeURIComponent(p.handle)}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                  <div
                    className="relative overflow-hidden rounded-lg"
                    style={{ aspectRatio: "16 / 10" }}
                  >
                    {p.featuredImage?.url ? (
                      <Image
                        src={p.featuredImage.url}
                        alt={p.featuredImage.altText || p.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 33vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-400">
                        Kein Produktbild
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-lg font-semibold text-slate-900">{p.title}</div>
                  <div className="mt-1 flex items-center justify-between gap-3">
                    <div className="text-sm text-slate-600">{p.vendor || " "}</div>
                    <div className="text-sm font-semibold text-slate-900">
                      {money(price?.amount, price?.currencyCode) || ""}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <p className="text-xs text-slate-500">
        Hinweis: Checkout erfolgt über Shopify. Preise in EUR (sofern so im Shop gepflegt).
      </p>
    </div>
  );
}