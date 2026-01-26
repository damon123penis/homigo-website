import { NextResponse } from "next/server";

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)"],
};

export function middleware(req) {
  const host = req.headers.get("host") || "";
  const url = req.nextUrl;

  const isShopHost = host === "shop.homigo.tech" || host.startsWith("shop.homigo.tech:");
  const isMarketingHost =
    host === "www.homigo.tech" ||
    host === "homigo.tech" ||
    host.endsWith(".vercel.app");

  // IMPORTANT: Never redirect/rewrite Shopify checkout/cart/session/account paths.
  // If these are touched by middleware, you will get 301 loops, Shopify interstitial redirects, or 404s.
  const isCheckoutPath =
    url.pathname.startsWith("/checkouts") ||
    url.pathname.startsWith("/cart") ||
    url.pathname.startsWith("/payments") ||
    url.pathname.startsWith("/wallets") ||
    url.pathname.startsWith("/account") ||
    url.pathname.startsWith("/challenge") ||
    url.pathname.startsWith("/sessions");

  if (isCheckoutPath) return NextResponse.next();

  // 1) MARKETING → Shop weiterleiten (nur für /shop Pfad)
  if (isMarketingHost && (url.pathname === "/shop" || url.pathname.startsWith("/shop/"))) {
    const target = new URL(`https://shop.homigo.tech${url.pathname}${url.search}`, req.url);
    return NextResponse.redirect(target, 308);
  }

  // 2) SHOP host: Root "/" intern auf "/shop" rewriten
  if (isShopHost && url.pathname === "/") {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = "/shop";
    return NextResponse.rewrite(rewriteUrl);
  }

  // 3) SHOP host: Alles außerhalb von /shop zurück zur Marketing-Seite
  // (Checkout-Pfade sind oben bereits ausgeschlossen.)
  if (isShopHost && !(url.pathname === "/shop" || url.pathname.startsWith("/shop/"))) {
    const target = new URL(`https://www.homigo.tech${url.pathname}${url.search}`, req.url);
    return NextResponse.redirect(target, 308);
  }

  return NextResponse.next();
}