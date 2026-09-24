-- Tags van de projecten met hoofdletters en een kleinere, vaste set:
-- Webapp, AI, Database, Interne beheersing, Onderzoek, Datavisualisatie.
-- Eenmalig uitvoeren in de Supabase SQL Editor (na projecten-2026-09.sql).

begin;

update public.projects set tags = array['Webapp', 'AI', 'Database', 'Interne beheersing']
where slug = 'factuurscanner';

update public.projects set tags = array['Onderzoek', 'AI', 'Interne beheersing']
where slug = 'onderzoek-ai-en-de-financial-controller-2030';

update public.projects set tags = array['Webapp', 'AI']
where slug = 'ai-wijzer';

update public.projects set tags = array['Webapp', 'Database']
where slug = 'dagboekje';

update public.projects set tags = array['Webapp', 'Datavisualisatie']
where slug = 'digitaal-dagboek';

commit;
