import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop | homigo",
  description: "Smart-Home Komponenten und Bundles – passend zur homigo Beratung.",
  alternates: { canonical: "https://www.homigo.tech/shop" },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {children}
      </div>
    </div>
  );
}