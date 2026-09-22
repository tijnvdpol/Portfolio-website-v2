-- Fase 2: storage bucket voor coverafbeeldingen en bijlagen.
-- Publiek leesbaar (zodat afbeeldingen/bijlagen op de site tonen),
-- alleen ingelogde gebruikers mogen uploaden/wijzigen/verwijderen.

insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do nothing;

create policy "Public read access to project-media"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'project-media');

create policy "Authenticated can upload to project-media"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'project-media');

create policy "Authenticated can update project-media"
on storage.objects
for update
to authenticated
using (bucket_id = 'project-media')
with check (bucket_id = 'project-media');

create policy "Authenticated can delete from project-media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'project-media');
