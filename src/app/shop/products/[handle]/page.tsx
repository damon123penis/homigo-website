import type { Metadata } from "next";
import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

type Money = { amount: string; currencyCode: string };
type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
};
type Metafield = { key: string; value: string | null };
type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage?: { url: string; altText?: string | null };
  variants: Variant[];
  metafields?: Metafield[];
};

function siteUrl(): string {
  // Prefer an explicit env var; fall back to Vercel URL; finally default to production domain.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://www.homigo.tech";
}

function shopifyEndpoint() {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN (or NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN)");
  return `https://${domain}/api/2024-07/graphql.json`;
}

function shopifyToken() {
  const token =
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
    process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN (or NEXT_PUBLIC_...)");
  return token;
}

async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        metafields(
          identifiers: [
            { namespace: "custom", key: "steuerregime" }
            { namespace: "custom", key: "steuerhinweis_anzeige" }
            { namespace: "custom", key: "zustand" }
            { namespace: "custom", key: "gtin" }
            { namespace: "custom", key: "mpn" }
          ]
        ) {
          key
          namespace
          type
          value
        }
        variants(first: 50) {
          edges {
            node {
              id
              title
              availableForSale
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(shopifyEndpoint(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyToken(),
    },
    body: JSON.stringify({ query, variables: { handle } }),
    cache: "no-store",
  });

  const json = await res.json();
  if (!res.ok || json.errors) return null;

  const p = json.data?.productByHandle;
  if (!p) return null;

  const variants: Variant[] = (p.variants?.edges || []).map((e: any) => e.node);
  const metafields: Metafield[] = p.metafields || [];

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    description: p.description,
    featuredImage: p.featuredImage || undefined,
    variants,
    metafields,
  };
}

function truncate(text: string, max = 160): string {
  const t = (text || "").trim().replace(/\s+/g, " ");
  if (!t) return "";
  return t.length <= max ? t : `${t.slice(0, max - 1)}…`;
}

export async function generateMetadata(
  { params }: { params: { handle: string } }
): Promise<Metadata> {
  const handle = decodeURIComponent(params.handle);

  const product = await fetchProductByHandle(handle);

  if (!product) {
    return {
      title: "Produkt nicht gefunden | homigo Shop",
      description: "Dieses Produkt ist nicht verfügbar.",
      robots: { index: false, follow: true },
    };
  }

  const canonicalUrl = `${siteUrl()}/shop/products/${product.handle}`;
  const title = `${product.title} | homigo Shop`;
  const description =
    truncate(product.description, 160) ||
    "Smart-Home-Komponenten und Bundles – kuratiert von homigo. Einfach auswählen und sicher checkouten.";

  const image = product.featuredImage?.url || `${siteUrl()}/images/Logo.png`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const handle = decodeURIComponent(params.handle);

  const product = await fetchProductByHandle(handle);
  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold text-slate-900">Produkt nicht gefunden</h1>
        <p className="mt-2 text-slate-600">Bitte prüfe die URL oder gehe zurück zum Shop.</p>
      </div>
    );
  }

  const mf = Object.fromEntries(
    (product.metafields || []).map((m) => [m.key, m.value])
  ) as {
    steuerregime?: string;
    steuerhinweis_anzeige?: string;
    zustand?: string;
    gtin?: string;
    mpn?: string;
  };

  const isDifferenz = mf.steuerregime === "differenz";
  const showTaxNotice = isDifferenz && mf.steuerhinweis_anzeige === "true";
  const primaryVariant = product.variants?.[0] ?? null;

  // Server-side config helpers
  function envString(name: string): string | undefined {
    const val = process.env[name];
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }
    return undefined;
  }
  // Read env vars
  const SHOP_RETURN_POLICY_URL = envString("SHOP_RETURN_POLICY_URL");
  const SHOP_RETURN_DAYS_RAW = envString("SHOP_RETURN_DAYS");
  const SHOP_RETURN_DAYS = SHOP_RETURN_DAYS_RAW && !isNaN(Number(SHOP_RETURN_DAYS_RAW)) ? parseInt(SHOP_RETURN_DAYS_RAW, 10) : undefined;
  const SHOP_SHIPPING_COUNTRY = envString("SHOP_SHIPPING_COUNTRY") || undefined;
  const SHOP_SHIPPING_COST = envString("SHOP_SHIPPING_COST");
  const SHOP_SHIPPING_CURRENCY = envString("SHOP_SHIPPING_CURRENCY") || primaryVariant?.price.currencyCode;
  const NEXT_PUBLIC_BRAND_NAME = envString("NEXT_PUBLIC_BRAND_NAME") || "homigo";

  const itemConditionUrl = (() => {
    const z = (mf.zustand || "").toLowerCase();
    if (!z) return undefined;

    // Basic mapping to Schema.org itemCondition URLs
    if (z.includes("neu")) return "https://schema.org/NewCondition";
    if (z.includes("refurb") || z.includes("generalüberholt") || z.includes("generalueberholt")) {
      return "https://schema.org/RefurbishedCondition";
    }
    // Treat "neuwertig" (like-new) and any other non-empty condition as used.
    return "https://schema.org/UsedCondition";
  })();

  const canonicalUrl = `${siteUrl()}/shop/products/${product.handle}`;
  const seoDescription =
    truncate(product.description, 160) ||
    "Smart-Home-Komponenten und Bundles – kuratiert von homigo. Einfach auswählen und sicher checkouten.";
  const seoImage = product.featuredImage?.url || `${siteUrl()}/images/Logo.png`;

  // Server Action: adds to cart via existing /api/cart route, preserving cookie-based cartId.
  async function addToCartAction(formData: FormData) {
    "use server";

    const merchandiseId = String(formData.get("merchandiseId") || "");
    const qtyRaw = String(formData.get("quantity") || "1");
    const quantity = Math.max(1, Number.parseInt(qtyRaw, 10) || 1);

    if (!merchandiseId) {
      redirect(`/shop/products/${encodeURIComponent(handle)}?error=missing_variant`);
    }

    // Call our API route on the same deployment.
    const base = siteUrl();
    const cookieHeader = cookies().toString();
    const userAgent = headers().get("user-agent") || "";

    const res = await fetch(`${base}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        cookie: cookieHeader,
        "user-agent": userAgent,
      },
      body: JSON.stringify({
        action: "add",
        merchandiseId,
        quantity,
      }),
      cache: "no-store",
    });

    if (!res.ok) {
      redirect(`/shop/products/${encodeURIComponent(handle)}?error=add_failed`);
    }

    // If the API returns a Set-Cookie (new cartId), persist it.
    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      // Best effort parsing: look for "cartId=..." in Set-Cookie
      const match = /(?:^|,\s*)cartId=([^;]+)/i.exec(setCookie);
      if (match?.[1]) {
        cookies().set("cartId", match[1], {
          httpOnly: true,
          sameSite: "lax",
          secure: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
        });
      }
    }

    redirect("/shop/cart");
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    url: canonicalUrl,
    name: product.title,
    description: product.description || seoDescription,
    image: product.featuredImage?.url ? [product.featuredImage.url] : [seoImage],
    sku: product.handle,
    brand: { "@type": "Brand", name: NEXT_PUBLIC_BRAND_NAME },
    ...(itemConditionUrl ? { itemCondition: itemConditionUrl } : null),
    ...(mf.gtin
      ? (mf.gtin.length === 13
          ? { gtin13: mf.gtin }
          : mf.gtin.length === 14
          ? { gtin14: mf.gtin }
          : { gtin: mf.gtin })
      : {}),
    ...(mf.mpn ? { mpn: mf.mpn } : {}),
    offers: primaryVariant
      ? {
          "@type": "Offer",
          priceCurrency: primaryVariant.price.currencyCode,
          price: primaryVariant.price.amount,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: primaryVariant.price.currencyCode,
            price: primaryVariant.price.amount,
            // For differenzbesteuerte Ware wird die USt. nicht separat ausgewiesen.
            // In strukturierten Daten modellieren wir das als "VAT not included".
            valueAddedTaxIncluded: !isDifferenz,
          },
          availability: primaryVariant.availableForSale
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
          url: canonicalUrl,
          ...(isDifferenz
            ? {
                description:
                  "Differenzbesteuerung nach § 25a UStG. Umsatzsteuer wird nicht separat ausgewiesen.",
              }
            : null),
          ...(SHOP_SHIPPING_COST && SHOP_SHIPPING_COUNTRY
            ? {
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingDestination: {
                    "@type": "DefinedRegion",
                    addressCountry: SHOP_SHIPPING_COUNTRY,
                  },
                  shippingRate: {
                    "@type": "MonetaryAmount",
                    value: SHOP_SHIPPING_COST,
                    currency: SHOP_SHIPPING_CURRENCY,
                  },
                },
              }
            : {}),
          ...((SHOP_RETURN_POLICY_URL || typeof SHOP_RETURN_DAYS === "number")
            ? {
                hasMerchantReturnPolicy: {
                  "@type": "MerchantReturnPolicy",
                  ...(SHOP_RETURN_POLICY_URL ? { url: SHOP_RETURN_POLICY_URL } : {}),
                  ...(typeof SHOP_RETURN_DAYS === "number" ? { merchantReturnDays: SHOP_RETURN_DAYS } : {}),
                  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
                },
              }
            : {}),
        }
      : undefined,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            {product.featuredImage?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="h-auto w-full rounded-xl object-cover"
              />
            ) : (
              <div className="flex aspect-square items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                Kein Bild
              </div>
            )}
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {mf.zustand && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Zustand: {mf.zustand.replace("_", " ")}
                </span>
              )}
              {isDifferenz && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Differenzbesteuert (§25a UStG)
                </span>
              )}
            </div>
            {product.description ? (
              <p className="mt-3 text-slate-600 leading-relaxed">{product.description}</p>
            ) : (
              <p className="mt-3 text-slate-600">Keine Beschreibung vorhanden.</p>
            )}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm font-medium text-slate-700">Variante</div>
                {primaryVariant ? (
                  <div className="text-lg font-semibold text-slate-900">
                    {Number(primaryVariant.price.amount).toFixed(2)} {primaryVariant.price.currencyCode}
                  </div>
                ) : null}
              </div>

              <form action={addToCartAction} className="mt-2">
                <select
                  name="merchandiseId"
                  defaultValue={primaryVariant?.id || ""}
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                      {v.title}
                      {!v.availableForSale ? " (nicht verfügbar)" : ""}
                    </option>
                  ))}
                </select>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Menge</label>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={1}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={!primaryVariant?.availableForSale}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      In den Warenkorb
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Hinweis: Der Checkout erfolgt sicher über Shopify.
                </p>
              </form>
            </div>
            {showTaxNotice && (
              <p className="mt-4 text-sm text-slate-600">
                Dieses Produkt unterliegt der Differenzbesteuerung nach § 25a UStG. Die Umsatzsteuer wird nicht separat ausgewiesen.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}