"use client";

import { useSite } from "@/content/site-context";
import { cn } from "@/lib/cn";
import { SmartImage } from "./SmartImage";

export function About() {
  const { about } = useSite();

  return (
    <section
      id="sobre-mi"
      className="w-full bg-surface-container-lowest px-margin-mobile py-editorial-gap-xl md:px-margin-tablet lg:px-margin-desktop"
    >
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12 lg:gap-gutter-desktop">
        <div className="mx-auto flex w-1/2 max-w-[220px] flex-col md:max-w-none lg:col-span-5 lg:mx-0 lg:w-full">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container">
            <SmartImage
              src={about.portrait}
              alt={about.portraitAlt}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover contrast-110 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent opacity-60" />
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7 lg:pl-8">
          <div className="mb-4">
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg tracking-tight text-primary uppercase">
              {about.title}
            </h2>
          </div>
          <p className="font-body-lg text-body-lg mb-8 leading-relaxed text-on-surface">
            {about.bio}
          </p>
          <div className="flex flex-col gap-6 bg-surface-container/30 p-8">
            {about.rows.map((row, index) => (
              <div key={`${row.label}-${index}`}>
                <div className="flex flex-col justify-between gap-2 pb-4 sm:flex-row sm:items-baseline">
                  <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "font-body-md text-body-md text-right",
                      row.muted ? "text-on-surface" : "text-primary",
                    )}
                  >
                    {row.value}
                  </span>
                </div>
                {index < about.rows.length - 1 ? (
                  <div className="h-px w-full bg-outline-variant/30" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
