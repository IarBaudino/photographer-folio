import { getClientAuth } from "./auth";
import { compressImageFile } from "./compress-image";

async function authHeaders(): Promise<HeadersInit> {
  const token = await getClientAuth()?.currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readJson<T>(response: Response) {
  const text = await response.text();
  if (!text) {
    if (response.status === 413) {
      throw new Error("La imagen es demasiado pesada para el servidor.");
    }
    throw new Error(
      "El servidor no respondió. En el deploy hace falta Supabase (URL y service_role) en las variables de entorno.",
    );
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    throw new Error("El servidor devolvió un error inesperado al subir.");
  }
}

export async function uploadFiles(files: File[], folder: string) {
  const urls: string[] = [];

  for (const file of files) {
    const compressed = await compressImageFile(file, folder);
    const form = new FormData();
    form.append("files", compressed);
    form.append("folder", folder);

    const response = await fetch("/api/upload", {
      method: "POST",
      headers: await authHeaders(),
      body: form,
    });

    const payload = await readJson<{ urls?: string[]; error?: string }>(response);
    if (!response.ok || !payload.urls?.length) {
      throw new Error(payload.error ?? "No se pudieron subir los archivos.");
    }
    urls.push(...payload.urls);
  }

  return urls;
}

export async function uploadFile(file: File, folder: string) {
  const [url] = await uploadFiles([file], folder);
  return url;
}

export async function deleteFiles(urls: string[]) {
  const unique = [...new Set(urls.filter(Boolean))];
  if (!unique.length) return;

  const response = await fetch("/api/upload", {
    method: "DELETE",
    headers: {
      ...(await authHeaders()),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ urls: unique }),
  });

  const payload = await readJson<{ error?: string }>(response);
  if (!response.ok) {
    throw new Error(payload.error ?? "No se pudieron borrar los archivos.");
  }
}
