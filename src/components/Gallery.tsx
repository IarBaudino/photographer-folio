"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSite } from "@/content/site-context";
import type { WorkItem } from "@/content/types";
import { cn } from "@/lib/cn";
import { Lightbox } from "./Lightbox";
import { MaterialIcon } from "./MaterialIcon";
import { SmartImage } from "./SmartImage";

export function Gallery() {
  const { gallery } = useSite();
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<WorkItem | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const rows = useMemo(() => {
    const mid = Math.ceil(works.length / 2);
    return [works.slice(0, mid), works.slice(mid)].filter((row) => row.length);
  }, [works]);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: 0 });
    updateArrows();
  }, [works, updateArrows]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      const goingRight = event.deltaY > 0;
      const atStart = el.scrollLeft <= 8;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      if ((goingRight && atEnd) || (!goingRight && atStart)) return;
      event.preventDefault();
      el.scrollLeft += event.deltaY;
    };

    el.addEventListener("scroll", updateArrows, { passive: true });
    el.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("resize", updateArrows);

    return () => {
      el.removeEventListener("scroll", updateArrows);
      el.removeEventListener("wheel", onWheel);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows, works.length]);

  function scrollByPage(direction: -1 | 1) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: "smooth" });
  }

  return (
    <section
      id="galeria"
      aria-labelledby="galeria-heading"
      className="w-full bg-surface py-10 md:py-14"
    >
      <h2 id="galeria-heading" className="sr-only">
        Galería
      </h2>
      <nav className="font-label-sm text-label-sm flex flex-wrap items-center gap-x-4 gap-y-2 px-margin-mobile pb-5 tracking-widest text-on-surface-variant uppercase md:gap-6 md:px-margin-tablet md:pb-7 lg:px-margin-desktop">
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

      <div className="relative">
        {canPrev ? (
          <button
            type="button"
            aria-label="Fotos anteriores"
            onClick={() => scrollByPage(-1)}
            className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary backdrop-blur-sm transition-opacity hover:bg-surface md:left-4 md:h-12 md:w-12"
          >
            <MaterialIcon name="chevron_left" className="text-[22px]" />
          </button>
        ) : null}
        {canNext ? (
          <button
            type="button"
            aria-label="Fotos siguientes"
            onClick={() => scrollByPage(1)}
            className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-surface/80 text-primary backdrop-blur-sm transition-opacity hover:bg-surface md:right-4 md:h-12 md:w-12"
          >
            <MaterialIcon name="chevron_right" className="text-[22px]" />
          </button>
        ) : null}

        <div
          ref={scrollerRef}
          className="overflow-x-auto px-margin-mobile pt-2 pb-2 md:px-margin-tablet lg:px-margin-desktop"
        >
          <div className="flex w-max flex-col gap-1.5 md:gap-2">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex snap-x snap-mandatory gap-1.5 md:gap-2">
                {row.map((work) => (
                  <button
                    key={work.id}
                    type="button"
                    onClick={() => setSelected(work)}
                    className="group inline-flex h-[48vh] shrink-0 cursor-pointer items-stretch p-0 md:h-[56vh]"
                  >
                    <SmartImage
                      src={work.src}
                      alt={work.alt}
                      fill={false}
                      className={cn(
                        "h-full w-auto max-w-none",
                        "transition-all duration-700 ease-out group-hover:opacity-95",
                        work.grayscale && "contrast-110 grayscale",
                      )}
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox work={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
