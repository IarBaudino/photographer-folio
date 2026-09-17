"use client";

import Link from "next/link";
import { useSite } from "@/content/site-context";
import { SectionFade } from "./SectionFade";

export function Footer() {
  const site = useSite();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-surface">
      <SectionFade edge="top" />
      <div className="flex w-full flex-col items-center justify-between gap-6 px-margin-mobile py-10 text-center md:flex-row md:px-margin-tablet md:py-editorial-gap-md md:text-left lg:px-margin-desktop">
        <div className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
          {site.photographer.name} © {year} — Archivo fotográfico
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 md:justify-end md:gap-editorial-gap-sm">
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
