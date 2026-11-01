-- Voegt drie dossiers toe (D-07 t/m D-09 op /projecten): AI-kloon, Supermarkt Hisar en het
-- onderzoek naar de juridische grenzen van de folderscanner voor Superunie.
-- Eenmalig uitvoeren in de Supabase SQL Editor, NA projecten-2026-09.sql. Veilig om twee keer
-- te draaien: bestaat een dossier al, dan gebeurt er niets.
--
-- Niet uitgelicht, dus alleen zichtbaar op /projecten. De stempels staan in
-- src/data/dossierStamps.ts. Het rapport staat in src/data/reports.ts, de presentatie in
-- public/presentaties/ en de risicomatrix in public/bewijs/ (deploy de site eerst, anders
-- verwijzen de links nog nergens naartoe).
-- De projectdatum (2026-11-01) is een schatting: pas hem aan als het dossier ouder is.

begin;

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'ai-kloon',
  'AI-kloon: een chatbot die alleen uit je eigen documenten antwoordt',
  'Webapp waarin je eigen documenten uploadt en daarna vragen stelt aan een kloon van jezelf. Elk antwoord toont de bronnen waaruit het komt, en het is altijd zichtbaar dat je met een AI praat.',
  $md$## Waarom dit project

Een taalmodel dat zomaar antwoordt, is moeilijk te controleren. De AI-kloon werkt andersom: hij antwoordt alleen op basis van de documenten die jij hebt toegevoegd, en laat bij elk antwoord zien welke bronnen daarvoor zijn gebruikt. Zo kun je een antwoord herleiden en nalopen, vergelijkbaar met hoe je in finance een cijfer terugvolgt naar de onderliggende boeking.

## Wat de app doet

- **Inloggen:** accounts met e-mail en wachtwoord. Iedere gebruiker ziet alleen de eigen kennis.
- **Uploaden:** voeg documenten toe in een dropzone en volg per bestand de verwerkingsstatus.
- **Kennisbank:** een overzicht van alle documenten met zoeken en filteren op bestandstype.
- **Chat:** stel een vraag en krijg een antwoord met genummerde bronnen. De chat meldt duidelijk dat het om een AI-kloon gaat.
- **Instellingen:** de systeemprompt, het gebruikte model en de naam van de kloon staan in de database en zijn dus aan te passen zonder code.

## Hoe het werkt (RAG)

1. **Verwerken:** een Edge Function leest het geüploade bestand, knipt de tekst in stukken met overlap en zet elk stuk om in een embedding (Gemini).
2. **Opslaan:** de stukken staan in Postgres met pgvector, met een index voor snel zoeken op gelijkenis.
3. **Antwoorden:** bij een vraag controleert een tweede Edge Function de login, zoekt de best passende stukken via een SQL-functie en laat een Gemini-model daaruit een antwoord opstellen, met de bronnen erbij.

## Techniek

- React, TypeScript en Vite, met een eigen ontwerp uit Google Stitch vertaald naar CSS-tokens, gehost op Vercel.
- Supabase: Postgres met pgvector, Row Level Security per gebruiker, Auth, Storage en Edge Functions.
- De browser praat alleen met Supabase. API-sleutels van het taalmodel staan uitsluitend als secrets in de Edge Functions.

## Wat ik ervan leerde

Een chatbot is pas betrouwbaar als de herkomst van het antwoord zichtbaar is. Door de kennis, de rechten en de systeemprompt in de database te leggen in plaats van in de interface, is het gedrag van de kloon controleerbaar en aanpasbaar.$md$,
  null,
  array['Webapp', 'AI', 'Database'],
  'Webapplicatie',
  '2026-11-01',
  false,
  true,
  100
where not exists (select 1 from public.projects where slug = 'ai-kloon');

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'supermarkt-hisar',
  'Supermarkt Hisar: website voor een familiesupermarkt in Leerdam',
  'Eenpagina-website voor Supermarkt Hisar, een familiebedrijf sinds 1994: assortiment, openingstijden met live status, route, contactgegevens, Google-reviews en links naar Instagram en Facebook.',
  $md$## Waarom dit project

Supermarkt Hisar is een familiebedrijf aan de Tiendweg in Leerdam. Klanten willen vooral snel weten of de winkel open is, wat er in het assortiment zit en hoe ze er komen. De website beantwoordt precies die vragen, op de telefoon als eerste.

## Wat de site doet

- **Open of gesloten:** bovenaan staat of de winkel nu open is en wanneer hij weer opent, op basis van de openingstijden.
- **Assortiment:** brood en bakkerij, groente en fruit, halal vlees, zuivel, baklava en levensmiddelen, met producten uit onder meer Turkije, Iran, Syrië en Marokko.
- **Verhaal:** de geschiedenis van de winkel sinds 1994 als tijdlijn.
- **Reviews:** de Google-beoordeling (4,4 uit 17 beoordelingen) met uitgelichte reacties.
- **Bezoeken:** adres met kopieerknop, routeplanner, belknop en openingstijden per dag, inclusief de verwijzing naar Instagram voor afwijkende tijden rond feestdagen.
- **Aanbiedingen en nieuws:** via Instagram en Facebook, zodat de eigenaar niets op de site hoeft bij te werken.

## Techniek

Een snelle, compacte site die op Vercel staat, met een eigen vormgeving die past bij de winkel: warm, duidelijk en zonder afleiding.

## Wat ik ervan leerde

Een website voor een kleine ondernemer moet vooral de praktische vragen van klanten beantwoorden en weinig onderhoud vragen. Alles wat vaak verandert, zoals aanbiedingen, blijft daarom op de social media van de winkel.$md$,
  null,
  array['Webapp'],
  'Website',
  '2026-11-01',
  false,
  true,
  110
where not exists (select 1 from public.projects where slug = 'supermarkt-hisar');

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'onderzoek-juridische-grenzen-folderscanner',
  'Onderzoek: mag Superunie supermarktfolders automatisch scannen?',
  'Juridisch en ethisch onderzoek voor Superunie naar een interne folderscanner: auteursrecht, databankenrecht, gebruiksvoorwaarden van tien ketens, AI Act en mededingingsrecht, met een risicomatrix en concrete eisen.',
  $md$## Vraag

Superunie wil een tool die automatisch artikelnaam, prijs en kortingspercentage uit de folders van Nederlandse supermarkten haalt, om aanbiedingen te vergelijken. Welke juridische en ethische grenzen gelden, en hoe blijft de tool zonder risico voor Superunie?

## Antwoord in het kort

De tool mag, binnen strikte grenzen:

- **Feiten zijn vrij:** artikelnaam, prijs en kortingspercentage zijn auteursrechtelijk niet beschermd. De kopie die nodig is om ze te lezen valt onder de tekst- en datamining-uitzondering, mits er geen voorbehoud is gemaakt en de kopie direct wordt gewist. Bij geen van de tien onderzochte ketens is zo'n machineleesbaar voorbehoud gevonden.
- **Jumbo en Dirk overslaan:** zij verbieden scraping met robots uitdrukkelijk in hun voorwaarden. De tool laat die twee ketens links liggen tot er schriftelijke toestemming is.
- **Mededinging is het zwaarste risico:** Superunie vertegenwoordigt concurrerende supermarkten met samen ongeveer een kwart van de markt. Prijzen per onderneming verzamelen en met leden delen is volgens de ACM uitdrukkelijk niet toegestaan. De output blijft daarom bij Superunie-inkoop.
- **Mens beslist:** de tool levert signalen, een mens controleert elke "goede deal". De AI leest alleen het actiemechanisme, de korting wordt in code berekend ("2e halve prijs" is 25%, niet 50%).

## Opbouw van het onderzoek

1. **Wet- en regelgeving:** auteursrecht, databankenrecht, gebruiksvoorwaarden en robots.txt van tien ketens, EU AI Act, mededingingsrecht (art. 101 VWEU, ACM-Leidraad) en overige gebieden als merkenrecht, AVG en computervredebreuk.
2. **Ethisch kader en risicomatrix:** transparantie, juistheid, bias, menselijke controle en eerlijkheid tegenover de bronnen, met een risicomatrix van kans en impact, maatregel en restrisico per risico.
3. **Aanbevelingen:** eisen in drie niveaus (moet, zou moeten, kan), een managementsamenvatting en een toetsingsformulier voor de compliance officer.

Elke juridische claim heeft een bron en een markering voor de stevigheid: vaststaand, interpretatie of nog te verifiëren. Het onderzoek is een studentenonderzoek en geen juridisch advies.

## Presentatie

Voor de Grow en Show is een presentatie gemaakt, "Mag dit eigenlijk wel?": een nagemaakte folder in het midden met links en rechts de juridische labels en onderaan wat de tool daarom anders doet. De presentatie staat in de bewijslast.

## Wat ik ervan leerde

Het grootste risico zat niet waar ik het eerst zocht. Auteursrecht bleek goed te regelen; de echte grens ligt bij wat een branchevereniging met de uitkomst doet. Bij dataprojecten in finance is het dus even belangrijk om te bepalen wie de data mag zien als om te bepalen of je ze mag verzamelen.$md$,
  null,
  array['Onderzoek', 'AI', 'Interne beheersing'],
  'Onderzoek',
  '2026-11-01',
  false,
  true,
  120
where not exists (select 1 from public.projects where slug = 'onderzoek-juridische-grenzen-folderscanner');

-- Bewijslast. Per dossier alleen als er nog geen bewijslast is, zodat een tweede run niets dubbel zet.
insert into public.project_attachments (project_id, file_name, file_url, file_type)
select p.id, v.file_name, v.file_url, v.file_type
from (
  values
    ('ai-kloon', 'Live applicatie', 'https://ai-kloon.vercel.app/', 'demo'),
    ('ai-kloon', 'Broncode op GitHub', 'https://github.com/tijnvdpol/AI-kloon', 'github'),

    ('supermarkt-hisar', 'Live website', 'https://supermarkt-hisar.vercel.app/', 'demo'),
    ('supermarkt-hisar', 'Broncode op GitHub', 'https://github.com/tijnvdpol/Supermarkt-Hisar', 'github'),

    ('onderzoek-juridische-grenzen-folderscanner', 'Volledig rapport lezen', '/rapporten/juridische-grenzen-folderscanner-superunie', 'reader'),
    ('onderzoek-juridische-grenzen-folderscanner', 'Presentatie Grow en Show: "Mag dit eigenlijk wel?"', '/presentaties/folderscanner-risicos.html', 'document'),
    ('onderzoek-juridische-grenzen-folderscanner', 'Risicomatrix (csv)', '/bewijs/risicomatrix-folderscanner-superunie.csv', 'document')
) as v (slug, file_name, file_url, file_type)
join public.projects p on p.slug = v.slug
where not exists (select 1 from public.project_attachments a where a.project_id = p.id);

commit;
