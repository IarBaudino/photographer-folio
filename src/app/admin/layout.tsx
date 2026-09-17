import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Admin — Portfolio",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface px-margin-mobile py-16 md:px-margin-tablet lg:px-margin-desktop">
      <header className="mb-12 flex items-baseline justify-between gap-4">
        <Link
          href="/admin"
          className="font-headline-sm text-headline-sm tracking-tight text-primary"
        >
          Panel
        </Link>
        <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
          Administración
        </span>
      </header>
      {children}
    </div>
  );
}
