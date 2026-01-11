const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const SHOPIFY_API_VERSION = process.env.SHOPIFY_API_VERSION || "2024-07";

if (!SHOPIFY_STORE_DOMAIN) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
if (!SHOPIFY_STOREFRONT_ACCESS_TOKEN) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");

const endpoint = `https://${SHOPIFY_STORE_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, any>,
  opts?: RequestInit & { cache?: RequestCache }
) {
  console.log("[shopifyFetch]", {
    domain: SHOPIFY_STORE_DOMAIN,
    tokenLength: SHOPIFY_STOREFRONT_ACCESS_TOKEN?.length,
    apiVersion: SHOPIFY_API_VERSION,
  });
  // Merge headers safely (also fixes TS typing issues when env vars are optional types)
  const headers = new Headers(opts?.headers);
  headers.set("Content-Type", "application/json");

  // Shopify hat zwei Token-Typen:
  // - Public Storefront token: meist ein Hex-String (für client- und serverseitige Requests)
  // - Private token (z. B. `shpat_...` / delegate tokens): nur serverseitig, anderer Header
  // Docs: private/delegate tokens -> `Shopify-Storefront-Private-Token`
  const token = SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
  if (token.startsWith("shpat_") || token.startsWith("shppa_")) {
    headers.set("Shopify-Storefront-Private-Token", token);
  } else {
    headers.set("X-Shopify-Storefront-Access-Token", token);
  }

  // Hinweis: Für buyer-traffic empfiehlt Shopify zusätzlich `Shopify-Storefront-Buyer-IP`.
  // Beim Build/SSG haben wir keinen Buyer-IP-Kontext – das ist ok.
  // Wenn du es später für echte Requests setzen willst, kannst du es über `opts.headers` durchreichen.
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