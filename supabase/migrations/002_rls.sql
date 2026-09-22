-- Fase 2: Row Level Security. Anonieme bezoekers zien alleen gepubliceerde
-- projecten; alleen ingelogde gebruikers (de beheerder) mogen schrijven en
-- ook concepten (published = false) lezen.

alter table public.projects enable row level security;
alter table public.project_attachments enable row level security;

-- projects: lezen
create policy "Public can read published projects"
on public.projects
for select
to anon, authenticated
using (published = true);

create policy "Authenticated can read all projects"
on public.projects
for select
to authenticated
using (true);

-- projects: schrijven (alleen ingelogd)
create policy "Authenticated can insert projects"
on public.projects
for insert
to authenticated
with check (true);

create policy "Authenticated can update projects"
on public.projects
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated can delete projects"
on public.projects
for delete
to authenticated
using (true);

-- project_attachments: lezen (alleen bijlagen van gepubliceerde projecten,
-- tenzij ingelogd)
create policy "Public can read attachments of published projects"
on public.project_attachments
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.projects p
    where p.id = project_attachments.project_id
      and p.published = true
  )
);

create policy "Authenticated can read all attachments"
on public.project_attachments
for select
to authenticated
using (true);

-- project_attachments: schrijven (alleen ingelogd)
create policy "Authenticated can insert attachments"
on public.project_attachments
for insert
to authenticated
with check (true);

create policy "Authenticated can update attachments"
on public.project_attachments
for update
to authenticated
using (true)
with check (true);

create policy "Authenticated can delete attachments"
on public.project_attachments
for delete
to authenticated
using (true);
