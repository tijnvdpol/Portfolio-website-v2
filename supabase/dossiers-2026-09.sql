-- Vult stempel en onderbouwing van de drie uitgelichte projecten (D-01 t/m D-03 op de homepage).
-- Eenmalig uitvoeren in de Supabase SQL Editor, NA migrations/004_dossier.sql en
-- projecten-2026-09.sql. Het dossiernummer volgt uit de volgorde (sort_order) van de
-- uitgelichte projecten: 10 = D-01, 20 = D-02, 30 = D-03.

begin;

update public.projects
set
  dossier_evidence = jsonb_build_array(
    jsonb_build_object('label', 'Live applicatie', 'href', 'https://factuurscanner-psi.vercel.app/'),
    jsonb_build_object('label', 'Broncode op GitHub', 'href', 'https://github.com/tijnvdpol/Factuurscanner'),
    jsonb_build_object('label', 'Databasetests (SoD, RLS, audit trail)', 'href', 'https://github.com/tijnvdpol/Factuurscanner/tree/main/supabase/tests'),
    jsonb_build_object('label', 'Ontwerpbeslissingen B1 t/m B50', 'href', 'https://github.com/tijnvdpol/Factuurscanner/blob/main/docs/beslissingen.md')
  ),
  dossier_stamp = jsonb_build_object('label', 'OORDEEL', 'value', 'GOEDKEUREND', 'detail', '177/177 TESTS', 'tilt', -6)
where slug = 'factuurscanner';

update public.projects
set
  dossier_evidence = jsonb_build_array(
    jsonb_build_object('label', 'Literatuuronderzoek en taakanalyse'),
    jsonb_build_object('label', 'Diepte-interview met een controller'),
    jsonb_build_object('label', 'Competentiematrix richting 2030')
  ),
  dossier_stamp = jsonb_build_object('label', 'STATUS', 'value', 'AFGEROND', 'detail', 'SEP 2026', 'tilt', 4)
where slug = 'onderzoek-ai-en-de-financial-controller-2030';

update public.projects
set
  dossier_evidence = jsonb_build_array(
    jsonb_build_object('label', 'Onafhankelijke benchmarkdata'),
    jsonb_build_object('label', 'Actuele webresultaten'),
    jsonb_build_object('label', 'Live applicatie', 'href', 'https://ai-wijzer.vercel.app/')
  ),
  dossier_stamp = jsonb_build_object('label', 'STATUS', 'value', 'LIVE', 'detail', 'SEP 2026', 'tilt', -3)
where slug = 'ai-wijzer';

commit;
