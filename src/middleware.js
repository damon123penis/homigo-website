import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req) {
  const url = req.nextUrl;

  // Never touch Shopify-hosted flows. These paths must pass through unchanged,
  // otherwise you'll create redirect loops / 404s when Shopify expects its own routing.
  const passthroughPrefixes = [
    "/checkouts",
    "/cart", // includes /cart/c/...
    "/payments",
    "/wallets",
    "/account",
    "/challenge",
    "/sessions",
  ];

  if (passthroughPrefixes.some((p) => url.pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // IMPORTANT:
  // Do not perform any cross-domain redirects here (e.g., marketing <-> shop subdomain).
  // Those were the root cause of ping-pong and 404s during checkout.
  // Let the application routing handle /shop normally.

  return NextResponse.next();
}