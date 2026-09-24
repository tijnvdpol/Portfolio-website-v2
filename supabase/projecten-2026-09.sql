-- Vervangt de voorbeeldprojecten door de echte projecten (september 2026).
-- Eenmalig uitvoeren in de Supabase SQL Editor. Alles gebeurt in één transactie:
-- gaat er iets mis, dan blijft de database zoals hij was.
--
-- Bewijslast staat in project_attachments. file_type geeft het soort bewijs aan:
-- 'demo', 'github', 'reader' of 'document' (zie src/lib/evidence.ts).

begin;

-- 1. De drie voorbeeldprojecten uit seed.sql verwijderen (bijlagen gaan mee via on delete cascade).
delete from public.projects
where slug in (
  'overnameanalyse-fictieve-overname-retailketen',
  'financieel-model-waardering-saas-onderneming',
  'strategische-analyse-marktpositionering-retailketen'
);

-- 2. De nieuwe projecten.
insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
values
(
  'factuurscanner',
  'Factuurscanner: AI-factuurverwerking met interne beheersing',
  'Webapp die facturen (pdf of foto) met AI uitleest, controleert op signalen als duplicaten en afwijkende IBAN''s, en ze verwerkt via een goedkeuringsworkflow met functiescheiding en een audit trail.',
  $md$## Waarom dit project

Factuurverwerking is een van de finance-taken die het sterkst door AI verandert. In mijn [onderzoek naar AI en de financial controller](/projecten/onderzoek-ai-en-de-financial-controller-2030) vertelde een controller hoe een verkeerd herkend bedrag door twee goedkeuringen heen ging, omdat "niemand meer naar de pdf keek". Factuurscanner laat zien hoe het wél kan: AI doet het uitleeswerk, maar de beheersing eromheen is in de database afgedwongen.

## Wat de app doet

- **Scannen:** upload een pdf of foto. Google Gemini herkent leverancier, factuurnummer, datums, bedragen, btw-regels, IBAN, btw- en KvK-nummer.
- **Valideren:** IBAN (lengte per land en mod-97-controle), btw-nummer, KvK-nummer en vervaldatum worden direct gecontroleerd.
- **Signalen:** bij elke opslag bepaalt de database signalen zoals een mogelijk duplicaat, een afwijkend IBAN (kritiek), een nieuwe leverancier of een bedrag net onder de goedkeuringslimiet.
- **Coderingsvoorstel:** een voorstel voor de grootboekrekening, eerst op basis van historie en anders via AI, met een betrouwbaarheidspercentage.
- **Goedkeuringsworkflow:** rollen (invoerder, goedkeurder, controller, beheerder) met goedkeuringslimieten. Je kunt geen factuur goedkeuren die je zelf hebt ingevoerd of gecontroleerd, en niet zolang er een kritiek signaal openstaat.
- **Audit trail:** elke wijziging wordt vastgelegd. De log kan door niemand worden aangepast of verwijderd, ook niet via de SQL Editor.
- **Export:** goedgekeurde facturen en de audit log als CSV.

## Techniek

- React, TypeScript en Tailwind CSS (Vite), gehost op Vercel.
- Supabase: Postgres met Row Level Security per organisatie, Auth, Storage en een Edge Function die Gemini alleen server-side aanroept, met automatische terugval naar een ander model.
- Workflowregels, kolomrechten en triggers staan in de database, zodat ze niet via de frontend te omzeilen zijn.

## Kwaliteit

177 geautomatiseerde tests (Vitest, met databasetests op Postgres in WebAssembly via PGlite) voor onder meer validatie, signalen, functiescheiding, goedkeuringslimieten, RLS tussen organisaties en de onveranderbaarheid van de audit log. De ontwerpkeuzes (B1 t/m B50) staan gedocumenteerd in de repository.

## Wat ik ervan leerde

AO/IC-principes als functiescheiding en een sluitende audit trail zijn in software pas echt betrouwbaar als ze op het laagste niveau worden afgedwongen. Een knop verbergen in de interface is geen beheersmaatregel; een weigering in de database wel.$md$,
  '/covers/factuurscanner.jpg',
  array['Webapp', 'AI', 'Database', 'Interne beheersing'],
  'Webapplicatie',
  '2026-09-23',
  true,
  true,
  10
),
(
  'onderzoek-ai-en-de-financial-controller-2030',
  'Onderzoek: de impact van AI op de financial controller richting 2030',
  'Literatuur- en veldonderzoek naar hoe AI het werk van de Nederlandse financial controller verandert: taakanalyse, risico''s voor starters, een diepte-interview en een competentiematrix richting 2030.',
  $md$## Aanleiding

Vrijwel geen enkele hoogwaardige bron gaat specifiek over de financial controller in Nederland. Bestaande literatuur richt zich op accountants en auditors, op de financiële functie in brede zin of op de internationale markt. Dit onderzoek, uitgevoerd in de minor *Future-Proof met AI!* aan de Hogeschool Utrecht, overbrugt dat hiaat door deskresearch te combineren met veldonderzoek vanuit het perspectief van een startende hbo-controller.

## Aanpak

- **Deskresearch** op basis van peer-reviewed publicaties, beroepsorganisaties (NBA, NOREA, VRC, ACCA, IMA), Big Four- en consultancyonderzoek en institutionele bronnen (CBS, UWV, AFM/DNB, WEF, Europese Commissie).
- **Feitenclassificatie:** elke uitspraak is gemarkeerd als feit [F], interpretatie [I] of aanname [A].
- **Diepte-interview** met een ervaren financial controller, waarna literatuur en praktijk per hypothese zijn getrianguleerd.

## Belangrijkste bevindingen

- **Taakanalyse:** transactieverwerking, afletteren, consolidatie en standaardrapportages hebben een hoge AI-blootstelling; oordeelsvorming, stakeholdermanagement en advisering blijven richting 2030 mensenwerk.
- **De onderste sport van de ladder wordt smaller:** juist de instaptaken waarmee starters het vak leren, worden het eerst geautomatiseerd.
- **Verantwoordelijkheid zonder verklaarbaarheid:** toezichtnormen zijn technologieneutraal en artikel 4 van de AI-verordening verplicht tot AI-geletterdheid. "Het model zei het" is geen verweer.
- **"Glad juniorwerk":** het interview leverde een mechanisme op dat in de literatuur ontbreekt. AI-memo's van starters zijn netjes geformuleerd maar soms inhoudelijk hol, wat seniors méér reviewtijd kost.
- **Wat werkgevers zoeken:** geen prompt-vaardigheid, maar data kunnen herleiden tot de bron, het proces achter het cijfer begrijpen en cijfers helder uitleggen aan niet-financials.

## Resultaat

Een rapport van negen hoofdstukken met een geprioriteerde competentiematrix voor de controller richting 2030, een volledig uitgewerkt interview, een triangulatie van zeven hypothesen en een bronnenlijst in APA-stijl. De bevindingen zijn gepresenteerd met een lightning pitch van 60 seconden.

Het volledige rapport, inclusief het interview, de bronnen en de pitch, is hierboven onder **Bewijslast** te lezen of als PDF op te slaan.$md$,
  '/covers/onderzoek-ai-controller.jpg',
  array['Onderzoek', 'AI', 'Interne beheersing'],
  'Onderzoek',
  '2026-09-15',
  true,
  true,
  20
),
(
  'ai-wijzer',
  'AI Wijzer: welke AI-tool past bij jouw taak?',
  'Webapp die op basis van onafhankelijke benchmarkdata, actuele webresultaten en je eigen situatie (abonnementen, studentenstatus, budget) aanbeveelt welke AI-tool je het best kunt gebruiken.',
  $md$## Waarom dit project

Het aanbod aan AI-tools verandert elke maand. De vraag "welke AI moet ik hiervoor gebruiken?" krijg je zelden onderbouwd beantwoord: vaak is het een voorkeur of een advertentie. AI Wijzer geeft een advies dat te herleiden is tot data en bronnen, en dat rekening houdt met wat je al hebt.

## Hoe het werkt

1. **Classificatie:** een snelle Gemini-aanroep bepaalt de categorie van je vraag (tekst, code, beeld, video, spraak, enz.) en of er een verduidelijkende vraag nodig is.
2. **Benchmarkdata:** de server selecteert de top 15 van die categorie uit de onafhankelijke benchmarks van Artificial Analysis. De data wordt 24 uur gecachet; valt de bron uit, dan wordt de laatste versie gebruikt en als "mogelijk verouderd" gemarkeerd.
3. **Advies:** Gemini zoekt met Google Search actuele prijzen en beschikbaarheid op en geeft gestructureerde output volgens een vast schema. Het model kiest alleen een model-id; de scores en rangschikking komen van de server en kunnen dus niet worden verzonnen.
4. **Bronnen:** alle gebruikte bronnen worden samengevoegd en onder het advies getoond.

Je geeft zelf aan welke abonnementen je al hebt, of je een studentenlicentie hebt en wat je budget is. Daardoor krijg je een advies dat bij jouw situatie past.

## Techniek

- React en Tailwind CSS aan de voorkant, een Express-API aan de achterkant en gedeelde TypeScript-types en zod-schema's.
- API-sleutels blijven op de server; de browser ziet ze nooit.
- Rate limiting (15 verzoeken per 10 minuten per IP) en een cache voor identieke vragen houden de kosten beheersbaar.

## Wat ik ervan leerde

Een taalmodel is sterk in redeneren en samenvatten, maar zwak als bron van cijfers. Door de feiten (benchmarkscores) buiten het model te houden en het model alleen te laten kiezen en toelichten, wordt de uitkomst controleerbaar. Dat is hetzelfde principe als in finance: het cijfer moet herleidbaar zijn tot de bron.$md$,
  '/covers/ai-wijzer.jpg',
  array['Webapp', 'AI'],
  'AI-tool',
  '2026-09-20',
  true,
  true,
  30
),
(
  'dagboekje',
  'Dagboekje: dagboek en moodtracker met eigen database',
  'Persoonlijk dagboek met moodtracker: dagelijks schrijven, je stemming vastleggen en patronen terugzien in een kalender en statistieken. Met accounts en een beveiligde database.',
  $md$## Wat de app doet

- **Account:** registreren en inloggen met e-mail en wachtwoord; alle schermen zijn beveiligd.
- **Vandaag:** kies je stemming (vijf niveaus), optioneel je energieniveau, en schrijf een titel, tekst en tags. Je kunt de entry van vandaag zo vaak aanpassen als je wilt.
- **Kalender:** een maandoverzicht met per dag de kleur van je stemming. Klik op een dag om die entry te lezen, te bewerken of alsnog aan te vullen.
- **Statistieken:** een lijngrafiek van de laatste 30 dagen, gemiddelde stemming per week en maand, de verdeling van stemmingen, je huidige streak en de gemiddelde stemming per tag.
- **Archief:** alle entries op een rij, met zoeken en filteren op stemming of tag.
- Licht en donker thema, volledig Nederlands en geschikt voor mobiel.

## De database

Dagboekje is de opvolger van mijn [eerste Digitaal Dagboek](/projecten/digitaal-dagboek), dat alles in de browser opsloeg. Deze versie gebruikt een echte database in Supabase (Postgres):

- Eén tabel `entries` met een unieke combinatie van gebruiker en datum, zodat er maximaal één entry per dag is.
- Een trigger die `updated_at` automatisch bijwerkt.
- **Row Level Security:** iedere gebruiker kan alleen zijn eigen entries zien, toevoegen, wijzigen en verwijderen. Dat wordt door de database afgedwongen, niet door de app.

## Techniek

Vite, React, TypeScript, Tailwind CSS en Supabase (Auth en Postgres), gehost op Vercel.

## Wat ik ervan leerde

De stap van browseropslag naar een database met accounts lijkt klein, maar vraagt om nadenken over eigenaarschap van data: wie mag wat zien, en waar dwing je dat af? Net als bij autorisaties in een financieel systeem hoort die regel zo dicht mogelijk bij de data te liggen.$md$,
  '/covers/dagboekje.jpg',
  array['Webapp', 'Database'],
  'Webapplicatie',
  '2026-09-22',
  false,
  true,
  40
),
(
  'digitaal-dagboek',
  'Digitaal Dagboek: mijn eerste webapp',
  'Persoonlijke webapp om dagboekberichten vast te leggen, je stemming te registreren en patronen in je humeur door de tijd te ontdekken. De voorloper van Dagboekje.',
  $md$## Wat de app doet

- **Berichten schrijven:** leg dagelijkse ervaringen, gedachten en momenten van dankbaarheid vast, en bewerk of verwijder ze later.
- **Stemmingstrend:** bij ieder bericht registreer je een stemming. Een grafiek toont het verloop over een week, een maand of alle berichten, en je kunt filteren op lage of hoge stemming.
- **Terugblikken:** "Een tijd terug" laat zien wat je eerder schreef.
- **Zoeken en exporteren:** zoek op tekst of onderwerp en exporteer je berichten naar Excel.
- **Spreuk van de dag** als kleine dagelijkse inspiratie.

## Opzet

De berichten worden in de browser opgeslagen. Daardoor werkt de app direct en zonder account, maar staan je gegevens alleen op het apparaat waarop je schrijft.

## Wat ik ervan leerde

Dit was mijn eerste eigen webapp. Het liet me zien waar browseropslag ophoudt: geen synchronisatie tussen apparaten en geen echte beveiliging per gebruiker. Die beperkingen heb ik opgelost in de opvolger, [Dagboekje](/projecten/dagboekje), met accounts en een database.$md$,
  '/covers/digitaal-dagboek.jpg',
  array['Webapp', 'Datavisualisatie'],
  'Webapplicatie',
  '2026-09-15',
  false,
  true,
  50
);

-- 3. Bewijslast per project.
insert into public.project_attachments (project_id, file_name, file_url, file_type)
select p.id, v.file_name, v.file_url, v.file_type
from (
  values
    ('factuurscanner', 'Live applicatie', 'https://factuurscanner-psi.vercel.app/', 'demo'),
    ('factuurscanner', 'Broncode op GitHub', 'https://github.com/tijnvdpol/Factuurscanner', 'github'),
    ('factuurscanner', 'Ontwerpbeslissingen (B1 t/m B50)', 'https://github.com/tijnvdpol/Factuurscanner/blob/main/docs/beslissingen.md', 'document'),
    ('factuurscanner', 'Opleverrapport met testresultaten', 'https://github.com/tijnvdpol/Factuurscanner/blob/main/docs/RAPPORT-stap-2-3.md', 'document'),
    ('factuurscanner', 'Databasetests (functiescheiding, RLS, audit trail)', 'https://github.com/tijnvdpol/Factuurscanner/tree/main/supabase/tests', 'document'),

    ('onderzoek-ai-en-de-financial-controller-2030', 'Volledig rapport lezen', '/rapporten/ai-en-de-financial-controller-2030', 'reader'),
    ('onderzoek-ai-en-de-financial-controller-2030', 'Interactieve lightning pitch (eerste portfolio)', 'https://portfolio-website-six-phi-95.vercel.app/', 'document'),

    ('ai-wijzer', 'Live applicatie', 'https://ai-wijzer.vercel.app/', 'demo'),
    ('ai-wijzer', 'Broncode op GitHub', 'https://github.com/tijnvdpol/AI-wijzer', 'github'),
    ('ai-wijzer', 'Werking en architectuur', 'https://github.com/tijnvdpol/AI-wijzer#hoe-het-werkt', 'document'),
    ('ai-wijzer', 'Schema voor gestructureerde AI-output', 'https://github.com/tijnvdpol/AI-wijzer/blob/main/shared/schemas.ts', 'document'),

    ('dagboekje', 'Live applicatie', 'https://dagboekje-seven.vercel.app/', 'demo'),
    ('dagboekje', 'Broncode op GitHub', 'https://github.com/tijnvdpol/Dagboekje', 'github'),
    ('dagboekje', 'Databasemigratie met Row Level Security', 'https://github.com/tijnvdpol/Dagboekje/blob/main/supabase/migrations/20260922120000_create_entries.sql', 'document'),

    ('digitaal-dagboek', 'Live applicatie', 'https://google-studio-one.vercel.app/', 'demo'),
    ('digitaal-dagboek', 'Gepresenteerd in mijn eerste portfolio', 'https://portfolio-website-six-phi-95.vercel.app/', 'document')
) as v (slug, file_name, file_url, file_type)
join public.projects p on p.slug = v.slug;

commit;
