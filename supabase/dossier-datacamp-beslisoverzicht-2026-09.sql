-- Voegt het beslisoverzicht "Claude inzetten of niet" toe als bewijslast bij het DataCamp-dossier.
-- De link gaat naar de ingebouwde pdf-reader (/documenten/…), met een downloadknop. Eenmalig uitvoeren in de Supabase SQL Editor, NA dossier-datacamp-2026-09.sql.
-- Veilig om twee keer te draaien. Het pdf-bestand staat in public/bewijs/.

begin;

insert into public.project_attachments (project_id, file_name, file_url, file_type)
select
  p.id,
  'Beslisoverzicht: Claude inzetten of niet',
  '/documenten/beslisoverzicht-claude-inzetten-of-niet',
  'document'
from public.projects p
where p.slug = 'datacamp-claude-101'
  and not exists (
    select 1 from public.project_attachments a
    where a.project_id = p.id
      and a.file_url = '/documenten/beslisoverzicht-claude-inzetten-of-niet'
  );

update public.projects
set content = content || E'\n\nBij de onderbouwing staat ook het beslisoverzicht "Claude inzetten of niet" (pdf), dat bij deze cursus hoort.'
where slug = 'datacamp-claude-101'
  and content not like '%beslisoverzicht%';

commit;
