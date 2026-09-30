-- Voegt de DataCamp-cursus "Claude 101" toe als dossier (D-06 op /projecten).
-- Eenmalig uitvoeren in de Supabase SQL Editor, NA projecten-2026-09.sql. Veilig om twee keer
-- te draaien: bestaat het dossier al, dan gebeurt er niets.
--
-- Het dossier is niet uitgelicht, dus het staat alleen op /projecten en niet op de homepage.
-- De stempel staat in src/data/dossierStamps.ts (slug 'datacamp-claude-101').

begin;

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'datacamp-claude-101',
  'DataCamp Claude 101: certificaat behaald',
  'Online cursus Claude 101 van DataCamp, afgerond als leerverhaal binnen de minor Futureproof met AI.',
  $md$## Wat het is

Claude 101 is een online cursus van DataCamp. Ik rondde hem af op 20 september 2026, als leerverhaal binnen de minor Futureproof met AI.

## Bewijs

Het behaalde certificaat (statement of accomplishment) staat online en is te openen via de link bij de onderbouwing.$md$,
  null,
  array['AI', 'Cursus'],
  'Cursus',
  '2026-09-20',
  false,
  true,
  60
where not exists (select 1 from public.projects where slug = 'datacamp-claude-101');

insert into public.project_attachments (project_id, file_name, file_url, file_type)
select
  p.id,
  'DataCamp-certificaat Claude 101',
  'https://www.datacamp.com/completed/statement-of-accomplishment/course/e357d823277f3c96ffc6883687c06afc7b65ef8f?utm_medium=organic_social&utm_campaign=sharewidget&utm_content=soa',
  'document'
from public.projects p
where p.slug = 'datacamp-claude-101'
  and not exists (select 1 from public.project_attachments a where a.project_id = p.id);

commit;
