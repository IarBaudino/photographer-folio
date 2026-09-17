"use client";

import { useSite } from "@/content/site-context";
import { SmartImage } from "./SmartImage";
import { SectionFade } from "./SectionFade";

export function Hero() {
  const { hero, photographer } = useSite();
  const focusX = hero.focusX ?? 50;
  const focusY = hero.focusY ?? 50;

  return (
    <section className="relative flex min-h-[200px] w-full items-end overflow-hidden px-margin-mobile py-10 md:min-h-[240px] md:px-margin-tablet md:py-12 lg:min-h-[280px] lg:px-margin-desktop">
      <div className="absolute inset-0 z-0">
        <SmartImage
          src={hero.image}
          alt={hero.imageAlt}
          priority
          sizes="100vw"
          objectPosition={`${focusX}% ${focusY}%`}
          className="scale-105 opacity-40 contrast-125 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/70 to-surface/25" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent,rgb(19_19_19/0.2),#131313)]" />
        <SectionFade edge="bottom" />
      </div>

      <h1 className="font-headline-md relative z-10 text-[28px] leading-tight tracking-[0.01em] text-primary md:text-[40px] lg:text-[44px]">
        {photographer.name}
      </h1>
    </section>
  );
}
