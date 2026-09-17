"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { site as fallbackSite } from "@/content/site";
import type { SiteConfig } from "@/content/types";
import { subscribeSiteContent } from "@/lib/site-content";

const SiteContext = createContext<SiteConfig>(fallbackSite);

export function SiteProvider({
  initial,
  children,
}: {
  initial: SiteConfig;
  children: ReactNode;
}) {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    setValue(initial);
  }, [initial]);

  useEffect(() => {
    return subscribeSiteContent(setValue);
  }, []);

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  return useContext(SiteContext);
}
