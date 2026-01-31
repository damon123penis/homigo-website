// src/app/agb/page.tsx
import type { Metadata } from "next";
import { getPage } from "@/lib/content";

export const dynamic = "force-static";
export const revalidate = false;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPage("agb");
  return {
    title: page.title || "AGB | homigo",
    description: page.seoDescription || "Allgemeine Geschäftsbedingungen von homigo",
    robots: { index: true, follow: true },
  };
}

export default async function AgbPage() {
  const page = await getPage("agb");

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        {page.title || "Allgemeine Geschäftsbedingungen"}
      </h1>

      <article
        className="prose prose-slate max-w-none
                   prose-headings:scroll-mt-24
                   prose-a:text-emerald-600
                   prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />

      {page.updated && (
        <p className="mt-10 text-sm text-slate-500">Stand: {page.updated}</p>
      )}
    </main>
  );
}