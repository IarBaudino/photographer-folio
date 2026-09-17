-- Correr en Supabase → SQL Editor
-- Bucket público para las fotos del portfolio

insert into storage.buckets (id, name, public)
values ('uploads', 'uploads', true)
on conflict (id) do update set public = true;

create policy "Lectura pública de fotos"
on storage.objects for select
using (bucket_id = 'uploads');

create policy "Subida con service role o anon"
on storage.objects for insert
with check (bucket_id = 'uploads');
