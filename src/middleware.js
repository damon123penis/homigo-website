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

  // 0) Checkout/Cart/Payments niemals anfassen – weder redirect noch rewrite
  const isCheckoutOrCartPath =
    url.pathname.startsWith("/checkouts") ||
    url.pathname.startsWith("/cart") ||        // deckt /cart und /cart/c/... ab
    url.pathname.startsWith("/payments") ||
    url.pathname.startsWith("/wallets") ||
    url.pathname.startsWith("/account");

  if (isCheckoutOrCartPath) {
    return NextResponse.next();
  }

  // OPTIONAL: Wenn du "shop.homigo.tech" aktuell nur als "Store-Host" nutzen willst,
  // dann lass ihn sonst in Ruhe und mach KEINE Rückleitung zur Marketing-Seite.
  // Das war die Ursache für viele Loops/404s.

  // 1) MARKETING → /shop auf shop.homigo.tech leiten (nur für deine interne Shop-Seite)
  if (isMarketingHost && (url.pathname === "/shop" || url.pathname.startsWith("/shop/"))) {
    const target = new URL(`https://shop.homigo.tech${url.pathname}${url.search}`);
    return NextResponse.redirect(target, 308);
  }

  // 2) shop.homigo.tech Root optional auf /shop rewriten (nur wenn du das wirklich willst)
  if (isShopHost && url.pathname === "/") {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = "/shop";
    return NextResponse.rewrite(rewriteUrl);
  }

  // 3) WICHTIG: Entfernen! Das hat dir alles kaputt gemacht:
  // if (isShopHost && !(url.pathname === "/shop" || url.pathname.startsWith("/shop/"))) redirect zu www...

  return NextResponse.next();
}