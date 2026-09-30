-- Zet de bewijslast "Beslisoverzicht: Claude inzetten of niet" om van een los pdf-bestand naar
-- de ingebouwde reader (/documenten/…). Alleen nodig als je dossier-datacamp-beslisoverzicht-2026-09.sql
-- al had uitgevoerd VOOR deze wijziging. Eenmalig uitvoeren in de Supabase SQL Editor; veilig om
-- twee keer te draaien.

begin;

update public.project_attachments
set
  file_name = 'Beslisoverzicht: Claude inzetten of niet',
  file_url = '/documenten/beslisoverzicht-claude-inzetten-of-niet'
where file_url = '/bewijs/beslisoverzicht-claude-inzetten-of-niet.pdf';

commit;
