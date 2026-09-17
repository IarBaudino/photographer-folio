"use client";

import { useSite } from "@/content/site-context";
import { cn } from "@/lib/cn";
import { SmartImage } from "./SmartImage";
import { SectionFade } from "./SectionFade";

export function About() {
  const { about } = useSite();

  return (
    <section
      id="sobre-mi"
      className="relative w-full bg-surface pt-0 pb-16 md:pb-24 lg:px-margin-desktop lg:py-editorial-gap-xl"
    >
      <SectionFade edge="top" />
      <SectionFade edge="bottom" />
      <div className="relative z-0 grid grid-cols-1 lg:grid-cols-12 lg:items-center lg:gap-12 lg:gap-gutter-desktop">
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-surface-container sm:aspect-[4/5] lg:aspect-[3/4]">
            <SmartImage
              src={about.portrait}
              alt={about.portraitAlt}
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover contrast-110 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface from-15% via-surface/55 via-45% to-transparent lg:from-surface/40 lg:via-transparent" />
          </div>
        </div>

        <div className="relative z-10 -mt-20 flex flex-col px-margin-mobile md:-mt-16 md:px-margin-tablet lg:col-span-7 lg:mt-0 lg:px-0 lg:pl-8">
          <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg mb-4 tracking-tight text-primary uppercase">
            {about.title}
          </h2>
          <p className="font-body-lg text-body-lg mb-8 leading-relaxed text-on-surface">
            {about.bio}
          </p>
          <div className="flex flex-col gap-5 bg-surface-container/30 px-5 py-6 md:gap-6 md:p-8">
            {about.rows.map((row, index) => (
              <div key={`${row.label}-${index}`}>
                <div className="flex flex-col gap-1 pb-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-2">
                  <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
                    {row.label}
                  </span>
                  <span
                    className={cn(
                      "font-body-md text-body-md sm:text-right",
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
