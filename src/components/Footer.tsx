"use client";

import Link from "next/link";
import { useSite } from "@/content/site-context";

export function Footer() {
  const site = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-surface-container-lowest">
      <div className="flex w-full flex-col items-center justify-between gap-6 px-margin-mobile py-editorial-gap-md md:flex-row md:px-margin-tablet lg:px-margin-desktop">
        <div className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
          {site.photographer.name} © {year} — Archivo fotográfico
        </div>
        <div className="flex items-center gap-editorial-gap-sm">
          <a
            href={site.photographer.instagramUrl}
            target="_blank"
            rel="noreferrer"
            className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            Instagram
          </a>
          <a
            href={`mailto:${site.photographer.email}`}
            className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            Email
          </a>
          <a
            href="#top"
            className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            Volver arriba
          </a>
          <Link
            href="/admin"
            className="font-label-sm text-label-sm tracking-widest text-on-surface-variant uppercase transition-colors hover:text-primary"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
