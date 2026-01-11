import type { Metadata } from "next";
import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/client";

type Money = { amount: string; currencyCode: string };
type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  sku?: string | null;
};
type Metafield = { key: string; value: string | null };
type Product = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  featuredImage?: { url: string; altText?: string | null };
  variants: Variant[];
  metafields?: Metafield[];
  vendor?: string;
};

function siteUrl(): string {
  // Prefer an explicit env var; fall back to Vercel URL; finally default to production domain.
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://www.homigo.tech";
}
async function fetchProductByHandle(handle: string): Promise<Product | null> {
  const query = /* GraphQL */ `
    query ProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        handle
        title
        vendor
        descriptionHtml
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

            { namespace: "custom", key: "garantie" }

            { namespace: "custom", key: "funkstandard" }
            { namespace: "custom", key: "frequenz" }

            { namespace: "custom", key: "hub_erforderlich" }
            { namespace: "custom", key: "hub_kompatibilitaet" }

            { namespace: "custom", key: "oecosysteme" }
            { namespace: "custom", key: "thread" }
            { namespace: "custom", key: "matter" }
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
              sku
            }
          }
        }
      }
    }
  `;

  type Resp = {
    productByHandle: {
      id: string;
      handle: string;
      title: string;
      vendor: string;
      descriptionHtml: string;
      featuredImage?: { url: string; altText?: string | null } | null;
      metafields?: Array<
        | {
            key: string;
            namespace: string;
            type: string;
            value: string | null;
          }
        | null
      > | null;
      variants?: {
        edges: Array<{
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            price: { amount: string; currencyCode: string };
            sku: string | null;
          };
        }>;
      } | null;
    } | null;
  };

  let data: Resp;
  try {
    data = await shopifyFetch<Resp>(query, { handle }, { cache: "no-store" });
  } catch {
    return null;
  }

  const p = data?.productByHandle;
  if (!p) return null;

  const variants: Variant[] = (p.variants?.edges || []).map((e) => e.node);
  const metafields: Metafield[] = (p.metafields || [])
    .filter((m): m is NonNullable<typeof m> => Boolean(m && typeof m.key === "string"))
    .map((m) => ({
      key: m.key,
      value: m.value,
    }));

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage || undefined,
    variants,
    metafields,
    vendor: p.vendor,
  };
}

function stripHtml(html: string): string {
  return (html || "")
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
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
    truncate(stripHtml(product.descriptionHtml), 160) ||
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
  (product.metafields || [])
    .filter((m): m is Metafield => Boolean(m && typeof m.key === "string"))
    .map((m) => [m.key, m.value])
) as {
  steuerregime?: string;
  steuerhinweis_anzeige?: string;
  zustand?: string;
  gtin?: string;
  mpn?: string;

  garantie?: string;

  funkstandard?: string;
  frequenz?: string;

  hub_erforderlich?: string;
  hub_kompatibilitaet?: string;
  hub_kompatibilitat?: string;

  oecosysteme?: string;
  thread?: string;
  matter?: string;
};

  const isDifferenz = mf.steuerregime === "differenz";
  const showTaxNotice = isDifferenz && mf.steuerhinweis_anzeige === "true";
  const primaryVariant = (product.variants && product.variants.length > 0) ? product.variants[0] : null;
  const hasMultipleVariants = (product.variants?.length || 0) > 1;
  const isSoldOut = !primaryVariant || !primaryVariant.availableForSale;

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

  function conditionLabel(raw?: string): string | undefined {
    if (!raw) return undefined;
    const z = raw.toLowerCase();
    if (
  z === "like_new" ||
  z === "likenew" ||
  z.includes("neuwertig") ||
  z === "wie neu" ||
  z === "wieneu"
) return "Neuwertig";
    if (z === "new" || z.includes("neu")) return "Neu";
    if (z === "refurbished" || z.includes("generalüberholt") || z.includes("generalueberholt")) return "Generalüberholt";
    if (z === "used" || z.includes("gebraucht")) return "Gebraucht";
    // Fallback: prettify snake_case
    return raw.replace(/_/g, " ");
  }

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
    truncate(stripHtml(product.descriptionHtml), 160) ||
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
    description: stripHtml(product.descriptionHtml) || seoDescription,
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

  // Details & Kompatibilität reusable box
  function DetailsCompatibilityBox() {
    const hasAny =
      product.vendor ||
      primaryVariant?.sku ||
      mf.garantie ||
      mf.gtin ||
      mf.mpn ||
      mf.funkstandard ||
      mf.frequenz ||
      mf.hub_erforderlich ||
      mf.hub_kompatibilitaet ||
      mf.hub_kompatibilitat ||
      mf.oecosysteme ||
      mf.thread ||
      mf.matter;
    if (!hasAny) return null;
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-sm font-semibold text-slate-900">Details &amp; Kompatibilität</div>
        <p className="mt-2 text-sm text-slate-600">
          Technische Daten und Hinweise zur Einbindung – damit du schnell prüfen kannst, ob es zu deinem Setup passt.
        </p>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.vendor ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Hersteller</dt>
              <dd className="mt-1 text-sm text-slate-800">{product.vendor}</dd>
            </div>
          ) : null}

          {primaryVariant?.sku ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">SKU</dt>
              <dd className="mt-1 text-sm text-slate-800">{primaryVariant.sku}</dd>
            </div>
          ) : null}

          {mf.gtin ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">GTIN</dt>
              <dd className="mt-1 text-sm text-slate-800">{mf.gtin}</dd>
            </div>
          ) : null}

          {mf.mpn ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">MPN</dt>
              <dd className="mt-1 text-sm text-slate-800">{mf.mpn}</dd>
            </div>
          ) : null}

          {mf.garantie ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Garantie</dt>
              <dd className="mt-1 text-sm text-slate-800">
                {Number.isFinite(Number(mf.garantie)) ? `${mf.garantie} Monate` : mf.garantie}
              </dd>
            </div>
          ) : null}

          {mf.funkstandard ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Funkstandard</dt>
              <dd className="mt-1 text-sm text-slate-800">{mf.funkstandard}</dd>
            </div>
          ) : null}

          {mf.frequenz ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Frequenz</dt>
              <dd className="mt-1 text-sm text-slate-800">{mf.frequenz}</dd>
            </div>
          ) : null}

          {typeof mf.hub_erforderlich === "string" && mf.hub_erforderlich.length > 0 ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Hub erforderlich</dt>
              <dd className="mt-1 text-sm text-slate-800">
                {mf.hub_erforderlich.toLowerCase() === "true"
                  ? "Ja"
                  : mf.hub_erforderlich.toLowerCase() === "false"
                  ? "Nein"
                  : mf.hub_erforderlich}
              </dd>
            </div>
          ) : null}

          {typeof mf.thread === "string" && mf.thread.length > 0 ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Thread</dt>
              <dd className="mt-1 text-sm text-slate-800">
                {mf.thread.toLowerCase() === "true"
                  ? "Ja"
                  : mf.thread.toLowerCase() === "false"
                  ? "Nein"
                  : mf.thread}
              </dd>
            </div>
          ) : null}

          {typeof mf.matter === "string" && mf.matter.length > 0 ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Matter</dt>
              <dd className="mt-1 text-sm text-slate-800">
                {mf.matter.toLowerCase() === "true"
                  ? "Ja"
                  : mf.matter.toLowerCase() === "false"
                  ? "Nein"
                  : mf.matter}
              </dd>
            </div>
          ) : null}

          {(mf.hub_kompatibilitaet || mf.hub_kompatibilitat) ? (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-slate-500">Hub-Kompatibilität</dt>
              <dd className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                {mf.hub_kompatibilitaet || mf.hub_kompatibilitat}
              </dd>
            </div>
          ) : null}

          {mf.oecosysteme ? (
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-slate-500">Ökosysteme</dt>
              <dd className="mt-1 text-sm text-slate-800 whitespace-pre-line">{mf.oecosysteme}</dd>
            </div>
          ) : null}
        </dl>

        {(mf.funkstandard || mf.hub_erforderlich || mf.hub_kompatibilitaet || mf.hub_kompatibilitat || mf.oecosysteme || mf.thread || mf.matter) ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            Tipp: Wenn du unsicher bist, ob das Gerät mit deinem Hub (z. B. Zigbee-Gateway) oder deinem System (Home Assistant,
            Apple Home, Alexa, Google Home) kompatibel ist, schreib uns kurz – wir prüfen es.
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 items-start">
          <div className="self-start">
            <div className="inline-block rounded-2xl border border-slate-200 bg-white p-4">
              {product.featuredImage?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText || product.title}
                  className="h-auto w-auto max-w-full max-h-[520px] rounded-xl object-contain"
                />
              ) : (
                <div className="flex h-[320px] w-[320px] items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                  Kein Bild
                </div>
              )}
            </div>
            <div className="mt-6 hidden md:block">
              <DetailsCompatibilityBox />
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
            <div className="mt-2 flex flex-wrap gap-2">
              {mf.zustand && (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Zustand: {conditionLabel(mf.zustand)}
                </span>
              )}
              {isDifferenz && (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Differenzbesteuert (§25a UStG)
                </span>
              )}
              {isSoldOut && (
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
                  Ausverkauft
                </span>
              )}
            </div>
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              {isSoldOut ? (
  <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
    <span className="font-semibold">Ausverkauft.</span> Dieses Produkt ist aktuell nicht verfügbar.
    Wenn du willst, schreib uns kurz – wir informieren dich bei Verfügbarkeit.
  </div>
) : null}
              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm font-medium text-slate-700">{hasMultipleVariants ? "Variante" : "Preis"}</div>
                {primaryVariant ? (
                  <div className="text-lg font-semibold text-slate-900">
                    {Number(primaryVariant.price.amount).toFixed(2)} {primaryVariant.price.currencyCode}
                  </div>
                ) : null}
              </div>

              <form action={addToCartAction} className="mt-2">
                {hasMultipleVariants ? (
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
                ) : (
                  <input type="hidden" name="merchandiseId" value={primaryVariant?.id || ""} />
                )}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Menge</label>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      defaultValue={1}
                      disabled={isSoldOut}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      type="submit"
                      disabled={isSoldOut}
                      className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {isSoldOut ? "Ausverkauft" : "In den Warenkorb"}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Hinweis: Der Checkout erfolgt sicher über Shopify.
                </p>
              </form>
            </div>
            <div className="mt-6 md:hidden">
              <DetailsCompatibilityBox />
            </div>
            {product.descriptionHtml ? (
              <div
                className="mt-3 text-slate-600 leading-relaxed prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
              />
            ) : (
              <p className="mt-3 text-slate-600">Keine Beschreibung vorhanden.</p>
            )}
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