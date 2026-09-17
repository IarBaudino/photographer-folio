"use client";

import { useState } from "react";
import type { SiteConfig } from "@/content/types";
import { uniqueSlug } from "@/lib/slug";
import { AdminButton, AdminField, SaveRow } from "./fields";
import { useSectionSave } from "./use-section-save";

export function CategoriesSection({
  site,
  onSaved,
}: {
  site: SiteConfig;
  onSaved: (next: SiteConfig) => void;
}) {
  const [draft, setDraft] = useState(site);
  const [label, setLabel] = useState("");
  const [error, setError] = useState("");
  const { save, saving, message } = useSectionSave(onSaved, site);

  function rename(id: string, nextLabel: string) {
    setDraft({
      ...draft,
      gallery: {
        ...draft.gallery,
        categories: draft.gallery.categories.map((category) =>
          category.id === id ? { ...category, label: nextLabel } : category,
        ),
      },
    });
  }

  function remove(id: string) {
    if (id === "all") return;
    const used = draft.gallery.works.filter((work) => work.category === id).length;
    if (used > 0) {
      setError(`Hay ${used} obra(s) en esta categoría. Cambialas antes de eliminarla.`);
      return;
    }
    setError("");
    setDraft({
      ...draft,
      gallery: {
        ...draft.gallery,
        categories: draft.gallery.categories.filter((category) => category.id !== id),
      },
    });
  }

  function add() {
    const nextLabel = label.trim();
    if (!nextLabel) return;
    const id = uniqueSlug(
      nextLabel,
      draft.gallery.categories.map((category) => category.id),
    );
    if (id === "all") return;
    setDraft({
      ...draft,
      gallery: {
        ...draft.gallery,
        categories: [...draft.gallery.categories, { id, label: nextLabel }],
      },
    });
    setLabel("");
    setError("");
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        {draft.gallery.categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between gap-4 border-b border-outline-variant/30 pb-3"
          >
            <input
              className="field-input"
              value={category.label}
              disabled={category.id === "all"}
              onChange={(event) => rename(category.id, event.target.value)}
            />
            {category.id === "all" ? (
              <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
                Fija
              </span>
            ) : (
              <AdminButton variant="danger" onClick={() => remove(category.id)}>
                Eliminar
              </AdminButton>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-end gap-4">
        <AdminField label="Nueva categoría" htmlFor="new-cat">
          <input
            id="new-cat"
            className="field-input"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                add();
              }
            }}
          />
        </AdminField>
        <AdminButton variant="ghost" onClick={add}>
          + Crear
        </AdminButton>
      </div>

      {error ? (
        <p className="font-label-sm text-label-sm text-error">{error}</p>
      ) : null}

      <SaveRow onSave={() => save(draft)} saving={saving} message={message} />
    </div>
  );
}
