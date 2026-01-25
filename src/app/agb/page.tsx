import type { Metadata } from "next";
import React from "react";
import { getPage } from "@/lib/content";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage("agb");

  return {
    title: page.title ? `${page.title} | homigo` : "homigo",
    description: page.seoDescription || "",
    robots: { index: true, follow: true },
  };
}

export default async function ContentPage({ params }: Props) {
  const page = await getPage(params.slug);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* HERO */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8">
        <h1 className="text-3xl font-bold text-slate-900">
          {page.title || "AGB | homigo"}
        </h1>
        {page.updated ? (
          <p className="mt-2 text-sm text-slate-600">{page.updated}</p>
        ) : null}
      </div>

      {/* CONTENT */}
      <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
        <article
          className="
            prose prose-slate max-w-none
            prose-headings:scroll-mt-24
            prose-p:my-3
            prose-ul:my-3 prose-ol:my-3
            prose-li:my-1
            prose-a:text-slate-900 prose-a:underline
          "
          dangerouslySetInnerHTML={{ __html: page.html }}
        />
      </div>
    </div>
  );
}