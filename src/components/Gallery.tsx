"use client";

import { useEffect, useMemo, useState } from "react";
import { useSite } from "@/content/site-context";
import type { WorkItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";
import { SmartImage } from "./SmartImage";

export function Gallery() {
  const { gallery } = useSite();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<WorkItem | null>(null);

  useEffect(() => {
    if (!gallery.categories.some((category) => category.id === filter)) {
      setFilter("all");
    }
  }, [filter, gallery.categories]);

  const works = useMemo(
    () =>
      gallery.works.filter(
        (work) => filter === "all" || work.category === filter,
      ),
    [filter, gallery.works],
  );

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="w-full bg-surface px-margin-mobile py-16 md:px-margin-tablet md:py-editorial-gap-xl lg:px-margin-desktop"
    >
      <h2 id="galeria-heading" className="sr-only">
        Galería
      </h2>
      <nav className="font-label-sm text-label-sm flex flex-wrap items-center gap-x-4 gap-y-2 pb-6 tracking-widest text-on-surface-variant uppercase md:gap-6 md:pb-10">
        {gallery.categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => setFilter(category.id)}
            className={cn(
              "cursor-pointer transition-all hover:text-primary",
              filter === category.id
                ? "text-primary underline decoration-1 underline-offset-8"
                : "text-outline",
            )}
          >
            [ {category.label} ]
          </button>
        ))}
      </nav>

      <div className="columns-2 pt-4 [column-gap:0.4rem] md:pt-8 md:[column-gap:0.5rem]">
        {works.map((work) => (
          <button
            key={work.id}
            type="button"
            onClick={() => setSelected(work)}
            className="group mb-1.5 block w-full break-inside-avoid md:mb-2"
          >
            <div
              className={cn(
                "relative w-full overflow-hidden bg-surface-container-lowest",
                work.aspect,
              )}
            >
              <SmartImage
                src={work.src}
                alt={work.alt}
                sizes="(max-width: 768px) 100vw, 50vw"
                className={cn(
                  "transition-all duration-700 ease-out group-hover:scale-[1.015] group-hover:opacity-95",
                  work.grayscale && "contrast-110 grayscale",
                )}
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox work={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
