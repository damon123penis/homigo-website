// src/app/feeds/idealo.csv/route.ts
import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN || "").trim();
const STOREFRONT_TOKEN = (process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || "").trim();
const API_VERSION = (process.env.SHOPIFY_API_VERSION || "2024-07").trim();

// feste Vorgaben
const BASE_URL = "https://www.homigo.tech";
const SHIPPING_COST = "5.99";
const SHIPPING_COMMENT = "Versandkostenfrei ab 34,90€ Bestellwert!";
const DELIVERY_TEXT = "Lieferung in 1-3 Werktagen";

// ------------------------------------------------------------
// Shopify GraphQL
// ------------------------------------------------------------
async function shopifyFetch(query: string, variables?: any) {
  if (!SHOPIFY_DOMAIN) {
    throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  }
  if (!STOREFRONT_TOKEN) {
    throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");
  }

  // Shopify token types:
  // - Public Storefront token -> header: X-Shopify-Storefront-Access-Token
  // - Private / delegate token (often starts with shpat_/shppa_) -> header: Shopify-Storefront-Private-Token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STOREFRONT_TOKEN.startsWith("shpat_") || STOREFRONT_TOKEN.startsWith("shppa_")) {
    headers["Shopify-Storefront-Private-Token"] = STOREFRONT_TOKEN;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = STOREFRONT_TOKEN;
  }

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });

  let json: any = null;
  try {
    json = await res.json();
  } catch {
    // ignore
  }

  if (!res.ok || json?.errors) {
    const details = json?.errors?.[0]?.message
      ? String(json.errors[0].message)
      : `${res.status} ${res.statusText}`;
    const hint = res.status === 401
      ? " (Unauthorized: check token type/header and that the token is valid for Storefront API)"
      : "";
    throw new Error(`Shopify API error: ${details}${hint}`);
  }

  return json?.data;
}

// ------------------------------------------------------------
// CSV helpers (RFC 4180)
// ------------------------------------------------------------
function csvEscape(value: unknown): string {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) {
    return `"${s.replace(/"/g, '""')}"`;
  }
  return s;
}

function csvRow(values: unknown[]) {
  return values.map(csvEscape).join(",");
}

// ------------------------------------------------------------
// idealo mappings
// ------------------------------------------------------------
function normalizeText(v: unknown): string {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");
}

function mapIdealoConditionType(shopifyZustand: unknown): "NEW" | "AS_NEW" | "REFURBISHED" | "USED" | "" {
  const z = normalizeText(shopifyZustand);
  if (!z) return "";

  // Shopify values: neu, wie neu, generalüberholt, gebraucht
  if (z === "neu") return "NEW";
  if (z === "wie neu" || z === "wieneu" || z === "as new") return "AS_NEW";
  if (z === "generaluberholt" || z === "generalüberholt" || z === "refurbished") return "REFURBISHED";
  if (z === "gebraucht" || z === "used") return "USED";

  return "";
}

function mapIdealoConditionQuality(
  shopifyZustandsqualitat: unknown
): "EXCELLENT" | "VERY_GOOD" | "GOOD" | "ACCEPTABLE" | "" {
  const q = normalizeText(shopifyZustandsqualitat);
  if (!q) return "";

  // Shopify values: Exzellent (neu), Sehr gut, Gut, Akzeptabel
  if (q.startsWith("exzellent")) return "EXCELLENT";
  if (q === "sehr gut" || q === "sehrgut" || q === "very good") return "VERY_GOOD";
  if (q === "gut" || q === "good") return "GOOD";
  if (q === "akzeptabel" || q === "acceptable") return "ACCEPTABLE";

  return "";
}

// ------------------------------------------------------------
// Route
// ------------------------------------------------------------
export async function GET() {
  try {
    const data = await shopifyFetch(`
      query Products {
        products(first: 250) {
          edges {
            node {
              title
              handle
              vendor
              productType
              collections(first: 10) {
                edges {
                  node {
                    title
                  }
                }
              }
              steuerregime: metafield(namespace: "custom", key: "steuerregime") {
                value
              }
              zustand: metafield(namespace: "custom", key: "zustand") {
                value
              }
              zustandsqualitat: metafield(namespace: "custom", key: "zustandsqualitat") {
                value
              }
              category_path: metafield(namespace: "custom", key: "category_path") {
                value
              }
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 100) {
                edges {
                  node {
                    id
                    sku
                    price {
                      amount
                    }
                    barcode
                    availableForSale
                    quantityAvailable
                    image {
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    `);

    const productEdges = Array.isArray(data?.products?.edges) ? data.products.edges : [];

    // idealo Header
    const rows: string[] = [];
    rows.push(
      csvRow([
        "sku",
        "brand",
        "title",
        "price",
        "url",
        "imageUrl",
        "delivery",
        "deliveryCosts",
        "deliveryComment",
        "eans",
        "packagingUnit",
        "categoryPath",
        "conditionType",
        "condition",
      ])
    );

    for (const edge of productEdges) {
      const product = edge?.node;
      if (!product) continue;

      const steuerregime = product.steuerregime?.value;
      const conditionType = mapIdealoConditionType(product.zustand?.value);
      const condition = mapIdealoConditionQuality(product.zustandsqualitat?.value);

      // idealo expects a full path with hierarchy levels. Shopify collections are not hierarchical by default,
      // so we support a manual full path via metafield `custom.category_path` (recommended).
      // Fallback: join all assigned collection titles with " > " (best-effort, not true hierarchy).
      const categoryPathOverride = String(product.category_path?.value || "").trim();

      const collectionTitles =
        Array.isArray(product.collections?.edges)
          ? product.collections.edges
              .map((e: any) => String(e?.node?.title || "").trim())
              .filter((t: string) => t.length > 0)
          : [];

      const uniqueCollectionTitles = Array.from(new Set(collectionTitles));

      const productType = String(product.productType || "").trim();

      const categoryPath = (
        categoryPathOverride ||
        (uniqueCollectionTitles.length ? uniqueCollectionTitles.join(" > ") : "") ||
        productType ||
        "Shop"
      ).trim();

      const productTitle = String(product.title || "").trim();
      const handle = String(product.handle || "").trim();
      if (!productTitle || !handle) continue;

      const vendor = String(product.vendor || "homigo").trim() || "homigo";

      const productImage =
        Array.isArray(product.images?.edges) && product.images.edges.length > 0
          ? product.images.edges[0]?.node?.url || ""
          : "";

      const variantEdges = Array.isArray(product.variants?.edges) ? product.variants.edges : [];

      for (const vEdge of variantEdges) {
        const variant = vEdge?.node;
        if (!variant) continue;

        // Skip variants that are not sellable (optional, but usually desired for comparison shopping)
        if (variant.availableForSale === false) continue;

        const variantId = String(variant.id || "");
        const sku = String(variant.sku || "").trim() || variantId;

        const amountRaw = variant.price?.amount;
        const price = typeof amountRaw === "string" || typeof amountRaw === "number" ? String(amountRaw) : "";
        if (!price) continue;

        const priceNum = Number.parseFloat(price);
        const deliveryCosts = Number.isFinite(priceNum) && priceNum > 34.90 ? "0" : SHIPPING_COST;

        const title =
          productTitle +
          (steuerregime === "differenz" ? " | Differenzbesteuerung nach §25a UStG" : "");

        const imageUrl = String(variant.image?.url || productImage || "");
        const ean = String(variant.barcode || "");

        rows.push(
          csvRow([
            sku, // sku (Pflicht)
            vendor, // brand
            title,
            price, // Dezimalpunkt!
            `${BASE_URL}/shop/products/${handle}?variant=${encodeURIComponent(variantId)}`,
            imageUrl,
            DELIVERY_TEXT,
            deliveryCosts,
            SHIPPING_COMMENT,
            ean,
            "1", // Varianten einzeln
            categoryPath,
            conditionType,
            condition,
          ])
        );
      }
    }

    return new NextResponse(rows.join("\n"), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (e: any) {
    const msg = e?.message ? String(e.message) : "Unknown error";
    return new NextResponse(`idealo feed error: ${msg}\n`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }
}