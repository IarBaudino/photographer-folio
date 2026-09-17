"use client";

import { useState } from "react";
import type { SiteConfig } from "@/content/types";
import { unusedImageUrls } from "@/lib/managed-images";
import { saveSiteContent } from "@/lib/site-content";
import { deleteFiles } from "@/lib/upload";

export function useSectionSave(
  onSaved: (next: SiteConfig) => void,
  previous: SiteConfig,
) {
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function save(next: SiteConfig) {
    setSaving(true);
    setMessage("");
    try {
      await saveSiteContent(next);
      const unused = unusedImageUrls(previous, next);
      if (unused.length) {
        try {
          await deleteFiles(unused);
        } catch {
          onSaved(next);
          setMessage("Guardado. Algunas imágenes no se pudieron borrar del almacenamiento.");
          return;
        }
      }
      onSaved(next);
      setMessage("Guardado.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "No se pudo guardar.");
    } finally {
      setSaving(false);
    }
  }

  return { save, saving, message };
}
