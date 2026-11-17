-- Voegt dossier toe op /projecten: onderzoek naar welke bedrijfs- en persoonsgegevens een controller
-- in ChatGPT, Claude of Copilot mag invoeren (stoplicht). Eenmalig uitvoeren in de Supabase SQL
-- Editor, NA projecten-2026-09.sql. Veilig om twee keer te draaien. Niet uitgelicht. De bestanden
-- staan in public/ (presentaties/, covers/): deploy de site eerst, anders verwijzen de links nergens
-- naartoe.

begin;

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'onderzoek-ai-chatbot-stoplicht',
  'Onderzoek: welke gegevens mag je als controller in een AI-chatbot zetten?',
  $md$Ik deelde 18 soorten financiële gegevens in met een stoplicht: groen mag, oranje alleen zakelijk of geanonimiseerd, rood nooit. Elke kleur is onderbouwd met de AVG, de AI Act of de MAR en met de voorwaarden van ChatGPT, Claude en Copilot.$md$,
  $md$## Aanleiding

Als controller werk je met salarissen, debiteurenlijsten, budgetten en ongepubliceerde cijfers. Tegelijk is het verleidelijk om zo'n bestand even in een chatbot te plakken. Ik wilde weten wat wel en niet mag, zodat ik AI kan gebruiken zonder de AVG, de EU AI Act of het beleid van mijn werkgever te schenden.

## Aanpak

- Vooral primaire bronnen: de wetteksten van de AVG, de UAVG, de AI Act en de Marktmisbruikverordening, publicaties van de Autoriteit Persoonsgegevens en de officiële privacy- en voorwaardenpagina's van OpenAI, Anthropic en Microsoft.
- Per chatbot het verschil tussen een privéaccount (gratis of betaald) en een zakelijk account: training, bewaartermijn, verwerkersovereenkomst en opslag in de EU.
- Het bronnenonderzoek deed ik met de onderzoeksfunctie van Claude. Peildatum: 17 november 2026.

## Resultaat

| Kleur | Betekenis | Voorbeelden |
|---|---|---|
| Groen | Mag in elk account | Gepubliceerde jaarrekening, marktdata, vakvragen, fictieve data |
| Oranje | Alleen via een zakelijk account of na echte anonimisering | Budgetten, kostprijzen, omzet per afdeling, debiteuren die B.V. zijn |
| Rood | Nooit | Salarissen met namen, BSN, IBAN, verzuim, koersgevoelige cijfers, M&A |

- **Een zakelijk account maakt oranje groen, maar rood blijft rood.** Alleen bij een zakelijk account is de aanbieder verwerker met een verwerkersovereenkomst (art. 28 AVG). Een betaald Plus- of Pro-abonnement op je eigen naam telt als privé.
- **Zakelijk is niet automatisch rechtmatig.** De AP oordeelde in juli 2026 dat de inzet van Microsoft 365 Copilot zoals gemeente Haarlemmermeer die beschreef de AVG zou schenden.
- **Twee gegevenssoorten hangen af van wie erin staat.** Een debiteurenlijst met eenmanszaken is rood, want dat zijn persoonsgegevens. Ongepubliceerde cijfers zijn alleen rood vanwege voorwetenschap als het bedrijf beursgenoteerd is.

## Advies aan finance

1. **Privacy:** anonimiseer in drie stappen voordat je iets invoert, en gebruik voor oranje gegevens alleen het account dat IT heeft goedgekeurd.
2. **Bias:** controleer elk getal tegen de bron en laat AI nooit alleen beslissen over mensen.
3. **Transparantie:** vermeld in rapportages wanneer en waarvoor je AI hebt gebruikt.

## Kritische noot

Ik ben geen jurist en voorwaarden veranderen vaak; alles geldt per 17 november 2026. Een paar details over aanbieders komen uit secundaire bronnen. En niet alles wat juridisch mag, is ook goed: een "geanonimiseerd" model om ontslagkandidaten te zoeken kan binnen de regels vallen en toch oneerlijk uitpakken.

## Wat ik heb geleerd

- Het verschil tussen geanonimiseerd en gepseudonimiseerd is groot: zolang iemand de sleutel heeft, blijven het persoonsgegevens.
- De vraag is niet alleen welke tool je gebruikt, maar ook met welk account en waarvoor.
- Een stoplicht werkt alleen als het snel te lezen is. Daarom staat de onderbouwing achter elke kleur, en niet ervoor.$md$,
  '/covers/onderzoek-ai-chatbot-stoplicht.jpg',
  array['Onderzoek', 'AI', 'Interne beheersing'],
  'Onderzoek',
  '2026-11-17',
  false,
  true,
  180
where not exists (select 1 from public.projects where slug = 'onderzoek-ai-chatbot-stoplicht');

insert into public.project_attachments (project_id, file_name, file_url, file_type)
select p.id, v.file_name, v.file_url, v.file_type
from (
  values
    ('onderzoek-ai-chatbot-stoplicht', 'Interactief stoplicht: mag dit in de chatbot?', '/presentaties/stoplicht-ai-chatbots.html', 'document')
) as v (slug, file_name, file_url, file_type)
join public.projects p on p.slug = v.slug
where not exists (select 1 from public.project_attachments a where a.project_id = p.id);

commit;
