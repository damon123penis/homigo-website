// src/app/feeds/idealo.csv/route.ts
import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = (process.env.SHOPIFY_STORE_DOMAIN || "").trim();
const STOREFRONT_TOKEN = (process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || "").trim();
const API_VERSION = (process.env.SHOPIFY_API_VERSION || "2024-07").trim();

// feste Vorgaben
const BASE_URL = "https://www.homigo.tech";
const SHIPPING_COST = "5.99";
const SHIPPING_COMMENT = "Versandkostenfrei ab 50€ Bestellwert";
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

  const res = await fetch(`https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
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
    throw new Error(`Shopify API error: ${details}`);
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
              metafield(namespace: "custom", key: "steuerregime") {
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
      ])
    );

    for (const edge of productEdges) {
      const product = edge?.node;
      if (!product) continue;

      const steuerregime = product.metafield?.value;
      const isDifferenz = steuerregime === "differenz";

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

        const title =
          productTitle +
          (isDifferenz ? " | Differenzbesteuerung nach §25a UStG" : "");

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
            SHIPPING_COST,
            SHIPPING_COMMENT,
            ean,
            "1", // Varianten einzeln
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