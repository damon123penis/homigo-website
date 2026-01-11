import { NextRequest, NextResponse } from "next/server";

const CART_COOKIE = "homigo_cart_id";
const COOKIE_SECURE = process.env.NODE_ENV === "production";

function shopifyEndpoint() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  if (!domain) throw new Error("Missing SHOPIFY_STORE_DOMAIN");
  return `https://${domain}/api/2024-07/graphql.json`;
}

function shopifyHeaders() {
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error("Missing SHOPIFY_STOREFRONT_ACCESS_TOKEN");

  // Shopify token types:
  // - Public Storefront token -> header: X-Shopify-Storefront-Access-Token
  // - Private / delegate token (often starts with shpat_/shppa_) -> header: Shopify-Storefront-Private-Token
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token.startsWith("shpat_") || token.startsWith("shppa_")) {
    headers["Shopify-Storefront-Private-Token"] = token;
  } else {
    headers["X-Shopify-Storefront-Access-Token"] = token;
  }

  return headers;
}


async function shopifyFetch<T>(query: string, variables?: Record<string, any>) {
  const res = await fetch(shopifyEndpoint(), {
    method: "POST",
    headers: shopifyHeaders(),
    body: JSON.stringify({ query, variables }),
    // Cart should be fresh
    cache: "no-store",
  });

  const json = await res.json().catch(() => null);

  if (!res.ok || (json as any)?.errors) {
    const firstMsg = (json as any)?.errors?.[0]?.message;
    const msg = firstMsg || `Shopify error (${res.status}): ${res.statusText}`;

    console.error("[cart][shopify]", {
      status: res.status,
      statusText: res.statusText,
      message: msg,
      // Avoid logging sensitive IDs/tokens; variables can include IDs, so only log keys.
      variableKeys: variables ? Object.keys(variables) : [],
    });

    throw new Error(msg);
  }

  return (json as any).data as T;
}

const CART_FRAGMENT = /* GraphQL */ `
  fragment CartFields on Cart {
    id
    checkoutUrl
    createdAt
    updatedAt
    totalQuantity
    cost {
      subtotalAmount { amount currencyCode }
      totalAmount { amount currencyCode }
      totalTaxAmount { amount currencyCode }
    }
    lines(first: 50) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount { amount currencyCode }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              availableForSale
              price { amount currencyCode }
              product {
                handle
                title
              }
              image {
                url
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CART = /* GraphQL */ `
  mutation CreateCart($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const GET_CART = /* GraphQL */ `
  query GetCart($id: ID!) {
    cart(id: $id) { ...CartFields }
  }
  ${CART_FRAGMENT}
`;

const ADD_LINES = /* GraphQL */ `
  mutation AddLines($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const UPDATE_LINES = /* GraphQL */ `
  mutation UpdateLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

const REMOVE_LINES = /* GraphQL */ `
  mutation RemoveLines($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart { ...CartFields }
      userErrors { field message }
    }
  }
  ${CART_FRAGMENT}
`;

function extractCartLines(cart: any) {
  const edges = cart?.lines?.edges ?? [];
  return edges.map((e: any) => e.node);
}

function jsonResponse(data: any, init?: Parameters<typeof NextResponse.json>[1]) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Cache-Control": "no-store",
      ...(init?.headers || {}),
    },
  });
}

async function ensureCart(cartId: string | undefined | null) {
  if (!cartId) return null;

  try {
    const data = await shopifyFetch<{ cart: any }>(GET_CART, { id: cartId });
    return data.cart ?? null;
  } catch {
    // cartId might be invalid/expired – treat as no cart
    return null;
  }
}

/**
 * GET /api/cart
 * Returns current cart (if cookie exists), otherwise { cart: null }.
 */
export async function GET(req: NextRequest) {
  const cartId = req.cookies.get(CART_COOKIE)?.value;
  const cart = await ensureCart(cartId);

  return jsonResponse({
    cart: cart
      ? {
          ...cart,
          lines: extractCartLines(cart),
        }
      : null,
  });
}

/**
 * POST /api/cart
 * Body:
 *  - action: "add" | "update" | "remove" | "clear"
 *  - add: { merchandiseId, quantity }
 *  - update: { lineId, quantity }
 *  - remove: { lineId }
 */
export async function POST(req: NextRequest) {
  const cartIdCookie = req.cookies.get(CART_COOKIE)?.value;

  const reqId = req.headers.get("x-vercel-id") || crypto.randomUUID();
  const userAgent = req.headers.get("user-agent") || "";
  console.info("[cart][in]", {
    reqId,
    method: "POST",
    cartCookiePresent: Boolean(cartIdCookie),
    cartCookieName: CART_COOKIE,
    ua: userAgent,
  });

  let body: any = null;
  try {
    body = await req.json();
    console.info("[cart][body]", {
      reqId,
      action: body?.action,
      // Do not log full IDs; just log whether they exist.
      hasMerchandiseId: Boolean(body?.merchandiseId),
      quantity: body?.quantity,
      hasLineId: Boolean(body?.lineId),
    });
  } catch {
    return jsonResponse({ error: "Invalid JSON body" }, { status: 400 });
  }

  const action = body?.action;
  if (!action) return jsonResponse({ error: "Missing action" }, { status: 400 });

  let cart = await ensureCart(cartIdCookie);
  let newCartId: string | undefined = cart?.id;

  try {
    switch (action) {
      case "add": {
        const merchandiseId = body?.merchandiseId;
        const quantity = Number(body?.quantity ?? 1);

        if (!merchandiseId || !Number.isFinite(quantity) || quantity < 1) {
          return jsonResponse(
            { error: "Invalid merchandiseId/quantity" },
            { status: 400 }
          );
        }

        if (!cart) {
          const created = await shopifyFetch<{
            cartCreate: { cart: any; userErrors: { message: string }[] };
          }>(CREATE_CART, {
            lines: [{ merchandiseId, quantity }],
          });

          const errs = created.cartCreate.userErrors || [];
          if (errs.length)
            return jsonResponse({ error: errs[0].message }, { status: 400 });

          cart = created.cartCreate.cart;
          newCartId = cart?.id;
        } else {
          const added = await shopifyFetch<{
            cartLinesAdd: { cart: any; userErrors: { message: string }[] };
          }>(ADD_LINES, {
            cartId: cart.id,
            lines: [{ merchandiseId, quantity }],
          });

          const errs = added.cartLinesAdd.userErrors || [];
          if (errs.length)
            return jsonResponse({ error: errs[0].message }, { status: 400 });

          cart = added.cartLinesAdd.cart;
          newCartId = cart?.id;
        }
        break;
      }

      case "update": {
        const lineId = body?.lineId;
        const quantity = Number(body?.quantity);

        if (!cart) return jsonResponse({ error: "No active cart" }, { status: 400 });
        if (!lineId || !Number.isFinite(quantity) || quantity < 0) {
          return jsonResponse({ error: "Invalid lineId/quantity" }, { status: 400 });
        }

        // If quantity = 0 -> remove
        if (quantity === 0) {
          const removed = await shopifyFetch<{
            cartLinesRemove: { cart: any; userErrors: { message: string }[] };
          }>(REMOVE_LINES, { cartId: cart.id, lineIds: [lineId] });

          const errs = removed.cartLinesRemove.userErrors || [];
          if (errs.length)
            return jsonResponse({ error: errs[0].message }, { status: 400 });

          cart = removed.cartLinesRemove.cart;
          newCartId = cart?.id;
        } else {
          const updated = await shopifyFetch<{
            cartLinesUpdate: { cart: any; userErrors: { message: string }[] };
          }>(UPDATE_LINES, {
            cartId: cart.id,
            lines: [{ id: lineId, quantity }],
          });

          const errs = updated.cartLinesUpdate.userErrors || [];
          if (errs.length)
            return jsonResponse({ error: errs[0].message }, { status: 400 });

          cart = updated.cartLinesUpdate.cart;
          newCartId = cart?.id;
        }
        break;
      }

      case "remove": {
        const lineId = body?.lineId;

        if (!cart) return jsonResponse({ error: "No active cart" }, { status: 400 });
        if (!lineId) return jsonResponse({ error: "Missing lineId" }, { status: 400 });

        const removed = await shopifyFetch<{
          cartLinesRemove: { cart: any; userErrors: { message: string }[] };
        }>(REMOVE_LINES, { cartId: cart.id, lineIds: [lineId] });

        const errs = removed.cartLinesRemove.userErrors || [];
        if (errs.length)
          return jsonResponse({ error: errs[0].message }, { status: 400 });

        cart = removed.cartLinesRemove.cart;
        newCartId = cart?.id;
        break;
      }

      case "clear": {
        if (!cart) return jsonResponse({ cart: null });

        const lineIds = extractCartLines(cart).map((l: any) => l.id);
        if (lineIds.length === 0) {
          return jsonResponse({ cart: { ...cart, lines: [] } });
        }

        const cleared = await shopifyFetch<{
          cartLinesRemove: { cart: any; userErrors: { message: string }[] };
        }>(REMOVE_LINES, { cartId: cart.id, lineIds });

        const errs = cleared.cartLinesRemove.userErrors || [];
        if (errs.length)
          return jsonResponse({ error: errs[0].message }, { status: 400 });

        cart = cleared.cartLinesRemove.cart;
        newCartId = cart?.id;
        break;
      }

      default:
        return jsonResponse(
          { error: `Invalid action: ${String(action)}` },
          { status: 400 }
        );
    }

    const resp = jsonResponse({
      cart: cart
        ? {
            ...cart,
            lines: extractCartLines(cart),
          }
        : null,
    });

    // Set cookie only if we have a cart id (created or existing)
    if (typeof newCartId === "string" && newCartId.length > 0) {
      resp.cookies.set({
        name: CART_COOKIE,
        value: newCartId,
        httpOnly: true,
        sameSite: "lax",
        secure: COOKIE_SECURE,
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
      });
    }

    console.info("[cart][out]", {
      reqId,
      action,
      cartIdReturned: typeof newCartId === "string" ? `len:${newCartId.length}` : null,
      totalQuantity: cart?.totalQuantity ?? null,
      lineCount: cart ? extractCartLines(cart).length : 0,
    });

    return resp;
  } catch (e: any) {
    console.error("[cart][error]", {
      reqId,
      message: e?.message || "Server error",
      name: e?.name,
    });
    return jsonResponse({ error: e?.message || "Server error", reqId }, { status: 500 });
  }
}