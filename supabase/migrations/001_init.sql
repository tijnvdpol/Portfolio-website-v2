-- Fase 2: kerntabellen voor projecten en bijlagen.
create extension if not exists pgcrypto;

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  content text not null default '',
  cover_image_url text,
  tags text[] not null default '{}',
  category text,
  project_date date,
  featured boolean not null default false,
  published boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint projects_slug_format check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);

create index projects_published_idx on public.projects (published);
create index projects_featured_idx on public.projects (featured) where featured = true;
create index projects_tags_idx on public.projects using gin (tags);

create table public.project_attachments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  created_at timestamptz not null default now()
);

create index project_attachments_project_id_idx on public.project_attachments (project_id);

-- updated_at automatisch bijwerken bij elke wijziging
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
before update on public.projects
for each row
execute function public.set_updated_at();
