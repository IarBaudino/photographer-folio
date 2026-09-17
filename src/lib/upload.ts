import { getClientAuth } from "./auth";

async function authHeaders(): Promise<HeadersInit> {
  const token = await getClientAuth()?.currentUser?.getIdToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function uploadFiles(files: File[], folder: string) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  form.append("folder", folder);

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: await authHeaders(),
    body: form,
  });

  const payload = (await response.json()) as { urls?: string[]; error?: string };
  if (!response.ok || !payload.urls?.length) {
    throw new Error(payload.error ?? "No se pudieron subir los archivos.");
  }

  return payload.urls;
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

  const payload = (await response.json()) as { error?: string };
  if (!response.ok) {
    throw new Error(payload.error ?? "No se pudieron borrar los archivos.");
  }
}
