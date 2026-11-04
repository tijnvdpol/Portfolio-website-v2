-- Zet de covers (public/covers/) bij de dossiers die er nog geen hadden. Eenmalig uitvoeren in de
-- Supabase SQL Editor, nadat de site is gedeployd. Dossiers die al een cover hebben, blijven
-- ongemoeid, dus je kunt dit veilig twee keer draaien.
update public.projects p
set cover_image_url = v.cover
from (
  values
    ('datacamp-claude-101', '/covers/datacamp-claude-101.jpg'),
    ('ai-kloon', '/covers/ai-kloon.jpg'),
    ('supermarkt-hisar', '/covers/supermarkt-hisar.jpg'),
    ('onderzoek-juridische-grenzen-folderscanner', '/covers/onderzoek-juridische-grenzen-folderscanner.jpg'),
    ('pet-your-dog', '/covers/pet-your-dog.jpg'),
    ('pi-simulator', '/covers/pi-simulator.jpg'),
    ('onderzoek-vragen-werkgevers-om-ai', '/covers/onderzoek-vragen-werkgevers-om-ai.jpg')
) as v (slug, cover)
where p.slug = v.slug
  and p.cover_image_url is null;
