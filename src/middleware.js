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

  // Marketing-Domain: /shop und /shop/* auf shop.homigo.tech umleiten
  if (isMarketingHost && url.pathname === "/shop") {
    return NextResponse.redirect(new URL("https://shop.homigo.tech", url), 308);
  }

  if (isMarketingHost && url.pathname.startsWith("/shop/")) {
    const rest = url.pathname.replace(/^\/shop\//, "");
    return NextResponse.redirect(new URL(`https://shop.homigo.tech/${rest}`, url), 308);
  }

  // Shop-Subdomain: Root "/" -> intern "/shop" (URL bleibt clean; kein Redirect)
  if (isShopHost && url.pathname === "/") {
    const rewriteUrl = url.clone();
    rewriteUrl.pathname = "/shop";
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}