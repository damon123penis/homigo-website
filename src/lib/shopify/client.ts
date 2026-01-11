const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2025-01";

if (!SHOPIFY_STORE_DOMAIN) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>,
  opts?: RequestInit & { cache?: RequestCache }
) {
  // Merge headers safely (also fixes TS typing issues when env vars are optional types)
  const headers = new Headers(opts?.headers);
  headers.set("Content-Type", "application/json");
  headers.set("X-Shopify-Storefront-Access-Token", SHOPIFY_STOREFRONT_ACCESS_TOKEN!);

  // Avoid letting opts overwrite our required headers/body/method by controlling merge order
  const res = await fetch(endpoint, {
    ...opts,
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
    // Für <50 Produkte: aggressive Caching-Strategie sinnvoll
    cache: opts?.cache ?? "force-cache",
  });

  const json = await res.json();
  if (!res.ok || json.errors) {
    const msg = JSON.stringify({ status: res.status, errors: json.errors, variables });
    throw new Error(`Shopify Storefront API error: ${msg}`);
  }
  return json.data as T;
}