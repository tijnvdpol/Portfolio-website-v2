-- Alleen nodig als dossiers-nieuw-2026-11b.sql al is uitgevoerd: zet de verantwoording van het
-- vacature-onderzoek van een los md-bestand om naar de reader (/rapporten/...). Deploy de site eerst.
update public.project_attachments a
set file_name = 'Verantwoording zoekproces lezen',
    file_url = '/rapporten/verantwoording-vacatureanalyse-controllers',
    file_type = 'reader'
from public.projects p
where a.project_id = p.id
  and p.slug = 'onderzoek-vragen-werkgevers-om-ai'
  and a.file_url = '/bewijs/verantwoording-zoekproces-vacatureanalyse.md';
