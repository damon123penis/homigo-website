import React from "react";

export const metadata = {
  title: "homigo CMS",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <iframe
      src="/admin/index.html"
      className="fixed inset-0 h-full w-full border-0"
      title="homigo CMS"
    />
  );
}