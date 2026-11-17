-- Voegt dossier toe op /projecten: Factuurlijn, een AI-spraakagent voor leveranciersvragen over
-- facturen (ElevenLabs Agents). Eenmalig uitvoeren in de Supabase SQL Editor, NA
-- projecten-2026-09.sql. Veilig om twee keer te draaien. Niet uitgelicht. De bestanden staan in
-- public/ (bewijs/factuurlijn/, covers/): deploy de site eerst, anders verwijzen de links nergens
-- naartoe. Alle facturen en bedrijven zijn fictief; de beller in de opnames is Tijn zelf.

begin;

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'factuurlijn',
  'Factuurlijn: een AI-spraakagent voor leveranciersvragen',
  $md$Ik bouwde een Nederlandstalige spraakagent die leveranciers vertelt wanneer hun factuur wordt betaald, maar pas na factuurnummer én bedrijfsnaam. De 8 vragen die ik kon testen gingen allemaal goed; 7 lastige vragen bleven ongetest omdat mijn credits op waren.$md$,
  $md$## Aanleiding

Leveranciers bellen de crediteurenadministratie vaak met dezelfde vraag: wanneer wordt mijn factuur betaald? Als toekomstig controller wilde ik weten of een AI-spraakagent die vragen kan afhandelen, zonder dat de interne beheersing zwakker wordt.

## Wat ik bouwde

- Een spraakagent in ElevenLabs Agents (model Gemini 3.5 Flash) voor het fictieve bedrijf Van Dijk Groothandel. Je spreekt hem via de browser.
- Een kennisbank met 12 fictieve facturen: open, goedgekeurd, betaald, geblokkeerd en één creditnota.
- Zes harde regels. Onder andere: eerst een factuurnummer én de bedrijfsnaam die erbij hoort, nooit lijsten of aantallen, nooit een IBAN-wijziging aannemen en niets verzinnen.
- Wat de agent niet zelf mag beantwoorden, wordt een terugbelverzoek. Naam, telefoonnummer en reden komen via Data Collection automatisch in de gespreksgeschiedenis.

## Testresultaat

Ik stelde vooraf 15 testvragen op, met per vraag het verwachte antwoord. Daarna bevroor ik de agent: tijdens de test veranderde ik niets meer.

| Uitkomst | Aantal |
|---|---|
| Goed | 8 |
| Fout | 0 |
| Niet getest (credits op) | 7 |

- 3 vragen stelde ik gesproken (zie de opnames), 5 in de chatmodus, omdat die goedkoper is.
- Niet getest zijn 2 lokvragen, 2 doorverwijzingen (een betwist bedrag en een IBAN-wijziging), een onbekend factuurnummer, een vraag buiten de onderwerpen en één spraakvraag. Juist dat zijn de lastigste vragen. Mijn doel van 13 van de 15 goed is daarom niet aangetoond.

## Wat me opviel

- **De lokvraag hield stand.** Op "welke facturen staan er nog open?" gaf de agent geen lijst en vroeg hij om een factuurnummer.
- **Hij gokt niet.** Zei ik "2024181" zonder streepje, dan vroeg hij het nummer opnieuw in plaats van te raden of ik 2024-118 of 2024-181 bedoelde.
- **De prompt sprak zichzelf tegen.** Volgens de ene regel vraagt hij een bedrijfsnaam niet opnieuw, volgens de stap voor het terugbelverzoek wel. In opname 2 vroeg hij hem daarom twee keer.
- **Er draait meer dan één model.** Bij één antwoord viel Gemini uit en antwoordde een reservemodel (GPT-4o). Dat antwoord was korter: alleen de vervaldatum, zonder status en bedrag.
- **Spraak is duur.** Een gesproken gesprek kostte ongeveer 10 credits per seconde. Mijn 10.000 gratis credits waren na het bouwen en testen op.

## Advies aan finance

1. **Regels horen in het systeem, niet alleen in de prompt.** Deze agent kent alle facturen; alleen de prompt houdt hem tegen. Een echte versie mag een factuur pas kunnen opvragen na een controle in de software zelf.
2. **Een AI neemt nooit een IBAN-wijziging aan.** Dat blijft schriftelijk, met een controle via een bekend telefoonnummer.
3. **Leg elk gesprek vast.** Door de gespreksgeschiedenis en de terugbelverzoeken is achteraf te controleren wat de agent heeft gezegd.

## Wat ik heb geleerd

- Een testset met vooraf vastgelegde antwoorden maakt "goed" en "fout" objectief. Zonder dat beoordeel je wat je wilt zien.
- Test de risicovolle vragen eerst. Ik begon met de standaardvragen, en juist de lokvragen en doorverwijzingen bleven liggen toen de credits op waren.
- Kosten horen bij het ontwerp. Met een budget per testvraag had ik de testronde beter kunnen plannen.$md$,
  '/covers/factuurlijn.jpg',
  array['AI', 'Interne beheersing'],
  'AI-agent',
  '2026-11-17',
  false,
  true,
  170
where not exists (select 1 from public.projects where slug = 'factuurlijn');

insert into public.project_attachments (project_id, file_name, file_url, file_type)
select p.id, v.file_name, v.file_url, v.file_type
from (
  values
    ('factuurlijn', 'Opname 1: open factuur, nummer zonder streepje', '/bewijs/factuurlijn/opname-1-open-factuur-2024-181.mp3', 'audio'),
    ('factuurlijn', 'Opname 2: lokvraag, geblokkeerde factuur en terugbelverzoek', '/bewijs/factuurlijn/opname-2-lokvraag-en-geblokkeerde-factuur.mp3', 'audio'),
    ('factuurlijn', 'Opname 3: creditnota, geen datum verzonnen', '/bewijs/factuurlijn/opname-3-creditnota-2024-230.mp3', 'audio'),
    ('factuurlijn', 'Testlog met alle 15 vragen (CSV)', '/bewijs/factuurlijn/testlog-factuurlijn.csv', 'document'),
    ('factuurlijn', 'Systeemprompt en openingszin', '/bewijs/factuurlijn/systeemprompt-factuurlijn.txt', 'document'),
    ('factuurlijn', 'Kennisbank: 12 fictieve facturen', '/bewijs/factuurlijn/kennisbank-facturen.txt', 'document')
) as v (slug, file_name, file_url, file_type)
join public.projects p on p.slug = v.slug
where not exists (select 1 from public.project_attachments a where a.project_id = p.id);

commit;
