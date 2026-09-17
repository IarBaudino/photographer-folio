"use client";

import { useEffect, useState } from "react";
import {
  deleteInquiry,
  listInquiries,
  type Inquiry,
} from "@/lib/inquiries";
import { isFirebaseConfigured } from "@/lib/firebase-app";
import { AdminButton } from "./fields";

export function InquiriesSection() {
  const [items, setItems] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refresh() {
    setLoading(true);
    setError("");
    try {
      setItems(await listInquiries());
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudieron cargar las consultas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  if (!isFirebaseConfigured()) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant">
        Las consultas del formulario se van a guardar acá cuando Firebase esté
        conectado.
      </p>
    );
  }

  if (loading) {
    return (
      <p className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
        Cargando consultas…
      </p>
    );
  }

  if (error) {
    return <p className="font-label-sm text-label-sm text-error">{error}</p>;
  }

  if (!items.length) {
    return (
      <p className="font-body-md text-body-md text-on-surface-variant">
        Todavía no hay consultas.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {items.map((item) => (
        <article
          key={item.id}
          className="flex flex-col gap-3 border-b border-outline-variant/30 pb-6"
        >
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
            <h3 className="font-headline-sm text-headline-sm text-primary">
              {item.name}
            </h3>
            <span className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
              {item.createdAt
                ? item.createdAt.toLocaleString("es-AR")
                : "Sin fecha"}
            </span>
          </div>
          <a
            href={`mailto:${item.email}`}
            className="font-body-md text-body-md text-on-surface-variant hover:text-primary"
          >
            {item.email}
          </a>
          <p className="font-label-sm text-label-sm tracking-widest text-outline uppercase">
            {item.projectType}
          </p>
          <p className="font-body-md text-body-md whitespace-pre-wrap text-on-surface">
            {item.message}
          </p>
          <div>
            <AdminButton
              variant="danger"
              onClick={async () => {
                await deleteInquiry(item.id);
                setItems((current) => current.filter((row) => row.id !== item.id));
              }}
            >
              Eliminar
            </AdminButton>
          </div>
        </article>
      ))}
    </div>
  );
}
