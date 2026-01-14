import type { Metadata } from "next";
import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify/client";
import { GET_PRODUCT_BY_HANDLE } from "@/lib/shopify/queries";

type Money = { amount: string; currencyCode: string };

type ProductImage = { url: string; altText?: string | null };

type Variant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  sku?: string | null;
  barcode?: string | null;
  quantityAvailable?: number | null;
  image?: ProductImage | null;
};

type Metafield = { key: string; value: string | null };

type Product = {
  id: string;
  handle: string;
  title: string;
  descriptionHtml: string;
  vendor?: string;
  featuredImage?: { url: string; altText?: string | null };
  images: ProductImage[];
  variants: Variant[];
  metafields?: Metafield[];
};

function siteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;

  return "https://www.homigo.tech";
}

async function fetchProductByHandle(handle: string): Promise<Product | null> {
  type Resp = {
    productByHandle:
      | {
          id: string;
          handle: string;
          title: string;
          vendor?: string | null;
          descriptionHtml: string;
          featuredImage?: { url: string; altText?: string | null } | null;
          images?: { edges: Array<{ node: { url: string; altText?: string | null } }> } | null;
          variants?:
            | {
                edges: Array<{
                  node: {
                    id: string;
                    title: string;
                    availableForSale: boolean;
                    price: { amount: string; currencyCode: string };
                    sku?: string | null;
                    barcode?: string | null;
                    quantityAvailable?: number | null;
                    image?: { url: string; altText?: string | null } | null;
                  };
                }>;
              }
            | null;
          metafields?:
            | Array<
                | {
                    key: string;
                    namespace: string;
                    type: string;
                    value: string | null;
                  }
                | null
              >
            | null;
        }
      | null;
  };

  let data: Resp;
  try {
    data = await shopifyFetch<Resp>(GET_PRODUCT_BY_HANDLE, { handle }, { cache: "no-store" });
  } catch {
    return null;
  }

  const p = data?.productByHandle;
  if (!p) return null;

  const variants: Variant[] = (p.variants?.edges || []).map((e) => e.node);

  const metafields: Metafield[] = (p.metafields || [])
    .filter((m): m is NonNullable<typeof m> => Boolean(m && typeof m.key === "string"))
    .map((m) => ({ key: m.key, value: m.value }));

  const images: ProductImage[] = (p.images?.edges || [])
    .map((e) => e.node)
    .filter((img): img is ProductImage => Boolean(img?.url));

  return {
    id: p.id,
    handle: p.handle,
    title: p.title,
    vendor: p.vendor ?? undefined,
    descriptionHtml: p.descriptionHtml,
    featuredImage: p.featuredImage ?? undefined,
    images,
    variants,
    metafields,
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

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: { handle: string };
  searchParams?: Record<string, string | string[] | undefined>;
}) {
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

  const p = product;

  const mf = Object.fromEntries(
    (p.metafields || [])
      .filter((m): m is Metafield => Boolean(m && typeof m.key === "string"))
      .map((m) => [m.key, m.value])
  ) as {
    steuerregime?: string;
    steuerhinweis_anzeige?: string;
    zustand?: string;
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

  const primaryVariant = p.variants && p.variants.length > 0 ? p.variants[0] : null;

  // Shopify hat häufig genau 1 Variante "Default Title" -> das ist faktisch "keine Variante" fürs UI
  const hasRealVariantChoice = (() => {
    const count = p.variants?.length || 0;
    if (count <= 1) {
      const only = p.variants?.[0];
      if (!only) return false;
      return only.title.trim().toLowerCase() !== "default title";
    }
    return true;
  })();

  const selectedVariantId =
    typeof searchParams?.variant === "string" ? searchParams.variant : undefined;

  const selectedVariant = selectedVariantId
    ? p.variants.find((v) => v.id === selectedVariantId) || null
    : null;

  const displayVariant = selectedVariant || primaryVariant;

  const isSoldOut = !displayVariant || !displayVariant.availableForSale;
  const qtyAvail = displayVariant?.quantityAvailable;
  const hasStockLimit = typeof qtyAvail === "number" && Number.isFinite(qtyAvail);

  // Server-side config helpers
  function envString(name: string): string | undefined {
    const val = process.env[name];
    if (typeof val === "string") {
      const trimmed = val.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    }
    return undefined;
  }

  const SHOP_RETURN_POLICY_URL = envString("SHOP_RETURN_POLICY_URL");
  const SHOP_RETURN_DAYS_RAW = envString("SHOP_RETURN_DAYS");
  const SHOP_RETURN_DAYS =
    SHOP_RETURN_DAYS_RAW && !isNaN(Number(SHOP_RETURN_DAYS_RAW))
      ? parseInt(SHOP_RETURN_DAYS_RAW, 10)
      : undefined;

  const SHOP_SHIPPING_COUNTRY = envString("SHOP_SHIPPING_COUNTRY") || undefined;
  const SHOP_SHIPPING_COST = envString("SHOP_SHIPPING_COST");
  const SHOP_SHIPPING_CURRENCY =
    envString("SHOP_SHIPPING_CURRENCY") || displayVariant?.price.currencyCode || "EUR";

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
    )
      return "Neuwertig";
    if (z === "new" || z.includes("neu")) return "Neu";
    if (
      z === "refurbished" ||
      z.includes("generalüberholt") ||
      z.includes("generalueberholt")
    )
      return "Generalüberholt";
    if (z === "used" || z.includes("gebraucht")) return "Gebraucht";
    return raw.replace(/_/g, " ");
  }

  const itemConditionUrl = (() => {
    const z = (mf.zustand || "").toLowerCase();
    if (!z) return undefined;
    if (z.includes("neu")) return "https://schema.org/NewCondition";
    if (z.includes("refurb") || z.includes("generalüberholt") || z.includes("generalueberholt")) {
      return "https://schema.org/RefurbishedCondition";
    }
    return "https://schema.org/UsedCondition";
  })();

  const canonicalUrl = `${siteUrl()}/shop/products/${p.handle}`;
  const seoDescription =
    truncate(stripHtml(p.descriptionHtml), 160) ||
    "Smart-Home-Komponenten und Bundles – kuratiert von homigo. Einfach auswählen und sicher checkouten.";
  const seoImage = p.featuredImage?.url || `${siteUrl()}/images/Logo.png`;

  // Gallery: variant image -> featured -> remaining product images (dedup by url)
  const gallery: ProductImage[] = (() => {
    const out: ProductImage[] = [];
    const seen = new Set<string>();

    const push = (img?: ProductImage | null) => {
      if (!img?.url) return;
      if (seen.has(img.url)) return;
      seen.add(img.url);
      out.push(img);
    };

    push(displayVariant?.image ?? null);
    push(p.featuredImage ?? null);
    for (const img of p.images || []) push(img);

    return out;
  })();

  const imgParam = typeof searchParams?.img === "string" ? searchParams.img : "0";
  const imgIndex = Math.max(0, Math.min(gallery.length - 1, Number.parseInt(imgParam, 10) || 0));
  const activeImage = gallery[imgIndex] || p.featuredImage || null;

  const buildProductUrl = (next: { variant?: string; img?: number } = {}) => {
    const url = new URL(`${siteUrl()}/shop/products/${encodeURIComponent(p.handle)}`);
    const v = next.variant ?? selectedVariantId;
    if (v) url.searchParams.set("variant", v);
    if (typeof next.img === "number") url.searchParams.set("img", String(next.img));
    return url.pathname + url.search;
  };

  // Server Action: adds to cart via existing /api/cart route, preserving cookie-based homigo_cart_id.
  async function addToCartAction(formData: FormData) {
    "use server";

    const merchandiseId = String(formData.get("merchandiseId") || "");
    const qtyRaw = String(formData.get("quantity") || "1");
    const quantity = Math.max(1, Number.parseInt(qtyRaw, 10) || 1);

    if (!merchandiseId) {
      redirect(`/shop/products/${encodeURIComponent(handle)}?error=missing_variant`);
    }

    // Build origin from the current request (important for Preview/Prod on Vercel).
    // Using siteUrl() here can point to the wrong environment and make the internal API call fail.
    const h = headers();
    const proto = h.get("x-forwarded-proto") ?? "https";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const base = host ? `${proto}://${host}` : siteUrl();
    const cookieHeader = cookies().toString();
    const userAgent = h.get("user-agent") || "";

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

    const setCookie = res.headers.get("set-cookie");
    if (setCookie) {
      const match = /(?:^|,\s*)homigo_cart_id=([^;]+)/i.exec(setCookie);
      if (match?.[1]) {
        cookies().set("homigo_cart_id", match[1], {
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
    name: p.title,
    description: stripHtml(p.descriptionHtml) || seoDescription,
    image: activeImage?.url ? [activeImage.url] : [seoImage],
    sku: p.handle,
    brand: { "@type": "Brand", name: NEXT_PUBLIC_BRAND_NAME },
    ...(itemConditionUrl ? { itemCondition: itemConditionUrl } : null),
    ...(displayVariant?.barcode
      ? displayVariant?.barcode.length === 13
        ? { gtin13: displayVariant?.barcode }
        : displayVariant?.barcode.length === 14
        ? { gtin14: displayVariant?.barcode }
        : { gtin: displayVariant?.barcode }
      : {}),
    ...(mf.mpn ? { mpn: mf.mpn } : {}),
    offers: displayVariant
      ? {
          "@type": "Offer",
          priceCurrency: displayVariant.price.currencyCode,
          price: displayVariant.price.amount,
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            priceCurrency: displayVariant.price.currencyCode,
            price: displayVariant.price.amount,
            valueAddedTaxIncluded: !isDifferenz,
          },
          availability: displayVariant.availableForSale
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
                  ...(typeof SHOP_RETURN_DAYS === "number"
                    ? { merchantReturnDays: SHOP_RETURN_DAYS }
                    : {}),
                  returnPolicyCategory:
                    "https://schema.org/MerchantReturnFiniteReturnWindow",
                },
              }
            : {}),
        }
      : undefined,
  };

  function DetailsCompatibilityBox() {
    const hasAny =
      p.vendor ||
      displayVariant?.sku ||
      mf.garantie ||
      displayVariant?.barcode ||
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
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-sm font-semibold text-slate-900">
          Details &amp; Kompatibilität
        </div>
        <p className="mt-2 text-sm text-slate-600">
          Technische Daten und Hinweise zur Einbindung – damit du schnell prüfen kannst,
          ob es zu deinem Setup passt.
        </p>

        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {p.vendor ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">Hersteller</dt>
              <dd className="mt-1 text-sm text-slate-800">{p.vendor}</dd>
            </div>
          ) : null}

          {displayVariant?.sku ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">SKU</dt>
              <dd className="mt-1 text-sm text-slate-800">{displayVariant.sku}</dd>
            </div>
          ) : null}

          {displayVariant?.barcode ? (
            <div>
              <dt className="text-xs font-medium text-slate-500">GTIN</dt>
              <dd className="mt-1 text-sm text-slate-800">{displayVariant?.barcode}</dd>
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
              <dd className="mt-1 text-sm text-slate-800 whitespace-pre-line">
                {mf.oecosysteme}
              </dd>
            </div>
          ) : null}
        </dl>

        {(mf.funkstandard ||
          mf.hub_erforderlich ||
          mf.hub_kompatibilitaet ||
          mf.hub_kompatibilitat ||
          mf.oecosysteme ||
          mf.thread ||
          mf.matter) ? (
          <div className="mt-4 rounded-xl bg-slate-50 p-4 text-xs text-slate-600">
            Tipp: Wenn du unsicher bist, ob das Gerät mit deinem Hub oder deinem System (Home Assistant,
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
          {/* LEFT: Image + Details box (desktop below image) */}
          <div className="self-start">
            <div className="inline-block rounded-2xl border border-slate-200 bg-white p-4">
              {activeImage?.url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={activeImage.url}
                  alt={activeImage.altText || p.title}
                  className="h-auto w-auto max-w-full max-h-[520px] rounded-xl object-contain"
                />
              ) : (
                <div className="flex h-[320px] w-[320px] items-center justify-center rounded-xl bg-slate-50 text-slate-400">
                  Kein Bild
                </div>
              )}

              {gallery.length > 1 ? (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                  {gallery.map((img, idx) => {
                    const href = buildProductUrl({ img: idx });
                    const isActive = idx === imgIndex;

                    return (
                      <a
                        key={`${img.url}-${idx}`}
                        href={href}
                        className={`shrink-0 rounded-xl border bg-white p-1 transition ${
                          isActive
                            ? "border-emerald-500 ring-2 ring-emerald-500/20"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        aria-label={`Bild ${idx + 1} anzeigen`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={img.url}
                          alt={img.altText || p.title}
                          className="h-16 w-16 rounded-lg object-cover"
                          loading="lazy"
                        />
                      </a>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {/* Desktop: Details box under image */}
            <div className="mt-6 hidden md:block">
              <DetailsCompatibilityBox />
            </div>
          </div>

          {/* RIGHT: Title + badges + checkout + (mobile details box) + description */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{p.title}</h1>

            <div className="mt-2 flex flex-wrap gap-2">
              {mf.zustand ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                  Zustand: {conditionLabel(mf.zustand)}
                </span>
              ) : null}

              {isDifferenz ? (
                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">
                  Differenzbesteuert (§25a UStG)
                </span>
              ) : null}

              {isSoldOut ? (
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-medium text-rose-800">
                  Ausverkauft
                </span>
              ) : null}
            </div>

            {/* Checkout box directly after badges */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
              {isSoldOut ? (
                <div className="mb-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-900">
                  <span className="font-semibold">Ausverkauft.</span> Dieses Produkt ist aktuell nicht verfügbar.
                  Wenn du willst, schreib uns kurz – wir informieren dich bei Verfügbarkeit.
                </div>
              ) : null}

              <div className="flex items-baseline justify-between gap-4">
                <div className="text-sm font-medium text-slate-700">Preis</div>
                {displayVariant ? (
                  <div className="text-lg font-semibold text-slate-900">
                    {Number(displayVariant.price.amount).toFixed(2)}{" "}
                    {displayVariant.price.currencyCode}
                  </div>
                ) : null}
              </div>

              {/* Variant selection only if there is a real choice */}
              {hasRealVariantChoice ? (
                <form
                  method="GET"
                  action={`/shop/products/${encodeURIComponent(p.handle)}`}
                  className="mt-3"
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-slate-700">
                      Option wählen
                    </label>

                    <div className="flex gap-2">
                      <select
                        name="variant"
                        defaultValue={displayVariant?.id || primaryVariant?.id || ""}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      >
                        {p.variants.map((v) => (
                          <option key={v.id} value={v.id} disabled={!v.availableForSale}>
                            {v.title}
                            {!v.availableForSale ? " (nicht verfügbar)" : ""}
                          </option>
                        ))}
                      </select>

                      <button
                        type="submit"
                        className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                      >
                        Anzeigen
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}

              <form action={addToCartAction} className="mt-2">
                <input
                  type="hidden"
                  name="merchandiseId"
                  value={displayVariant?.id || ""}
                />

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Menge
                    </label>
                    <input
                      name="quantity"
                      type="number"
                      min={1}
                      max={hasStockLimit ? (qtyAvail as number) : undefined}
                      defaultValue={1}
                      disabled={isSoldOut}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                    />
                      {hasStockLimit ? (
                        <div className="mt-2 text-xs text-slate-600">
                          Verfügbar: <span className="font-semibold text-slate-900">{qtyAvail}</span>
                        </div>
                      ) : null}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-transparent mb-2 select-none"
                      aria-hidden="true"
                    >
                      Menge
                    </label>

                    <button
                      type="submit"
                      disabled={
                        isSoldOut ||
                        !displayVariant?.id ||
                        (hasStockLimit && (qtyAvail as number) <= 0)
                      }
                      className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {isSoldOut ? "Ausverkauft" : "In den Warenkorb"}
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-500">
                  Hinweis: Der Checkout erfolgt sicher über Shopify.
                </p>
                {showTaxNotice ? (
                  <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <span className="font-semibold">Hinweis zur Differenzbesteuerung:</span> Dieses Produkt unterliegt der Differenzbesteuerung nach § 25a UStG. Die Umsatzsteuer wird nicht separat ausgewiesen.
                  </div>
                ) : null}
              </form>
            </div>

            {/* Mobile: Details box under checkout */}
            <div className="mt-6 md:hidden">
              <DetailsCompatibilityBox />
            </div>

            {/* Description after checkout */}
            {p.descriptionHtml ? (
              <div
                className="mt-6 prose prose-slate max-w-none"
                dangerouslySetInnerHTML={{ __html: p.descriptionHtml }}
              />
            ) : (
              <p className="mt-6 text-slate-600">Keine Beschreibung vorhanden.</p>
            )}

          </div>
        </div>
      </div>
    </>
  );
}