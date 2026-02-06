// src/app/feeds/idealo.csv/route.ts
import { NextResponse } from "next/server";

const SHOPIFY_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-07";

// feste Vorgaben
const BASE_URL = "https://www.homigo.tech";
const SHIPPING_COST = "5.99";
const SHIPPING_COMMENT = "Versandkostenfrei ab 50€ Bestellwert";
const DELIVERY_TEXT = "Lieferung in 1-3 Werktagen";

// ------------------------------------------------------------
// Shopify GraphQL
// ------------------------------------------------------------
async function shopifyFetch(query: string, variables?: any) {
  const res = await fetch(
    `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    }
  );

  const json = await res.json();
  if (!res.ok || json.errors) {
    throw new Error("Shopify API error");
  }
  return json.data;
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

  for (const { node: product } of data.products.edges) {
    const steuerregime = product.metafield?.value;
    const isDifferenz = steuerregime === "differenz";

    for (const { node: variant } of product.variants.edges) {
      const title =
        product.title +
        (isDifferenz
          ? " | Differenzbesteuerung nach §25a UStG"
          : "");

      rows.push(
        csvRow([
          variant.sku || variant.id, // sku (Pflicht)
          product.vendor || "homigo", // brand
          title,
          variant.price.amount, // Dezimalpunkt!
          `${BASE_URL}/shop/products/${product.handle}?variant=${encodeURIComponent(
            variant.id
          )}`,
          variant.image?.url ||
            product.images.edges[0]?.node.url ||
            "",
          DELIVERY_TEXT,
          SHIPPING_COST,
          SHIPPING_COMMENT,
          variant.barcode || "",
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
}