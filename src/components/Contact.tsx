"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { useSite } from "@/content/site-context";
import { isFirebaseConfigured } from "@/lib/firebase-app";
import { submitInquiry } from "@/lib/inquiries";

type Status = "idle" | "sending" | "sent" | "error";

export function Contact() {
  const { contact, photographer } = useSite();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    try {
      await submitInquiry({
        name: String(data.get("nombre") ?? ""),
        email: String(data.get("email") ?? ""),
        projectType: String(data.get("tipo-proyecto") ?? ""),
        message: String(data.get("mensaje") ?? ""),
        photographer: photographer.name,
      });
      form.reset();
      setStatus("sent");
      window.setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
      className="w-full bg-surface px-margin-mobile pt-editorial-gap-xl pb-editorial-gap-md md:px-margin-tablet lg:px-margin-desktop"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-gutter-desktop">
        <div className="flex flex-col justify-between lg:col-span-5">
          <div>
            <h2 className="font-display-xl text-display-xl-mobile md:text-display-xl mb-6 leading-none tracking-tighter text-primary">
              {contact.title}
            </h2>
            <p className="font-headline-sm text-headline-sm mb-12 leading-snug font-normal text-on-surface-variant">
              {contact.subtitle}
            </p>
          </div>
          <div className="flex flex-col gap-6 bg-surface-container-low p-8">
            <div>
              <span className="font-label-sm text-label-sm mb-1 block tracking-widest text-outline uppercase">
                Correo directo
              </span>
              <a
                href={`mailto:${photographer.email}`}
                className="font-headline-sm text-headline-sm text-primary transition-colors hover:text-outline"
              >
                {photographer.email}
              </a>
            </div>
            <div className="h-px w-full bg-outline-variant/40" />
            <div>
              <span className="font-label-sm text-label-sm mb-1 block tracking-widest text-outline uppercase">
                Instagram
              </span>
              <a
                href={photographer.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="font-label-md text-label-md tracking-widest text-on-surface-variant transition-colors hover:text-primary"
              >
                {photographer.instagram}
              </a>
            </div>
            <div className="h-px w-full bg-outline-variant/40" />
            <div>
              <span className="font-label-sm text-label-sm mb-1 block tracking-widest text-outline uppercase">
                Disponibilidad actual
              </span>
              <p className="font-body-sm text-body-sm flex items-center gap-2 text-primary">
                <span className="inline-block h-2 w-2 rounded-full bg-primary" />
                {contact.availabilityNote}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center lg:col-span-7">
          <form className="flex flex-col gap-8" onSubmit={onSubmit}>
            <Field label="Nombre Completo *" htmlFor="nombre">
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                placeholder="Ej. Clara De la Torre"
                className="field-input"
              />
            </Field>
            <Field label="Correo Electrónico *" htmlFor="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="nombre@estudio.com"
                className="field-input"
              />
            </Field>
            <Field label="Tipo de Proyecto" htmlFor="tipo-proyecto">
              <select
                id="tipo-proyecto"
                name="tipo-proyecto"
                className="field-input cursor-pointer appearance-none"
                defaultValue={contact.projectTypes[0]?.value}
              >
                {contact.projectTypes.map((type) => (
                  <option
                    key={type.value}
                    value={type.value}
                    className="bg-surface-container-high text-primary"
                  >
                    {type.label}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Visión o Consulta *" htmlFor="mensaje">
              <textarea
                id="mensaje"
                name="mensaje"
                required
                rows={4}
                placeholder="Contame sobre los tiempos, locaciones y la atmósfera que buscas plasmar..."
                className="field-input resize-none"
              />
            </Field>
            <div className="flex items-center justify-between pt-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="font-label-md text-label-md cursor-pointer bg-primary px-8 py-4 tracking-[0.2em] text-on-primary uppercase transition-all duration-300 hover:bg-surface hover:text-primary hover:outline hover:outline-1 hover:outline-primary disabled:cursor-wait disabled:opacity-60"
              >
                {status === "sending" ? "Enviando…" : "Enviar consulta →"}
              </button>
              <span className="font-label-sm text-label-sm tracking-widest text-on-surface-variant">
                {status === "sent"
                  ? isFirebaseConfigured()
                    ? "Mensaje transmitido."
                    : "Demo: configurá Firebase para guardar consultas."
                  : status === "error"
                    ? "No se pudo enviar. Probá de nuevo."
                    : null}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div className="relative flex flex-col gap-2">
      <label
        htmlFor={htmlFor}
        className="font-label-sm text-label-sm tracking-widest text-outline uppercase"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
