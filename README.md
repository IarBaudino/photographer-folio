# Portfolio PH

Template de landing para fotógrafos y fotógrafas. Sin carrito ni pagos.

## Arquitectura

- **Firebase Authentication** — login del panel (`/admin`)
- **Cloud Firestore** — contenido del sitio (bio, contacto, categorías, obras) y consultas del formulario
- **Supabase Storage** — archivos de imagen (hero, retrato, galería). Al subir se convierten a WebP comprimido; al borrar o reemplazar en el admin también se eliminan del bucket.

No se usa Firebase Storage.

## Cómo reutilizarlo

1. Cloná este repo para el nuevo cliente.
2. `src/content/site.ts` es el contenido inicial / fallback.
3. Copiá `.env.example` a `.env.local`.
4. Firebase: Authentication (email/contraseña) + Firestore. Publicá `firestore.rules`. Creá el usuario admin.
5. Supabase: bucket público `uploads`. Corré `supabase-storage.sql`. Pegá URL, anon y `service_role`.
6. Entrá a `/admin`, iniciá sesión y editá el sitio. Las fotos se suben como archivo.

Sin keys, el panel funciona en modo local y las fotos van a `public/uploads`.

## Panel

`/admin` — identidad, bio, contacto, categorías, obras y consultas.

## Scripts

```bash
npm install
npm run dev
npm run build
```
