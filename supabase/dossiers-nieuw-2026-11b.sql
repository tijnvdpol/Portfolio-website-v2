-- Voegt drie dossiers toe (D-10 t/m D-12 op /projecten): Pet your dog, Pi-simulator en het
-- onderzoek "Vragen werkgevers om AI?" (75 vacatures voor controllers).
-- Eenmalig uitvoeren in de Supabase SQL Editor, NA projecten-2026-09.sql. Veilig om twee keer
-- te draaien: bestaat een dossier al, dan gebeurt er niets.
--
-- Niet uitgelicht, dus alleen zichtbaar op /projecten. De stempels staan in
-- src/data/dossierStamps.ts. De bestanden staan in public/ (presentaties/ en bewijs/): deploy
-- de site eerst, anders verwijzen de links nog nergens naartoe.

begin;

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'pet-your-dog',
  'Pet your dog: een 3D-Tamagotchi van je eigen hond',
  'Mobile-first webapp (PWA) waarin je een foto van je hond uploadt en een gestileerde 3D-hond terugkrijgt die je verzorgt en aait. Een AI-model leest het uiterlijk uit de foto, de meters rekenen door zonder server-timers.',
  $md$## Waarom dit project

Een Tamagotchi van je eigen hond: je uploadt een foto en krijgt een gestileerde 3D-versie terug die op de echte lijkt, die je dagelijks verzorgt en aait. Uitgangspunt is dat de hond nooit doodgaat of weggaat: verwaarlozing is grappig (mokken, een gesloopte sok), nooit schuldgevoel.

## Wat de app doet

- **Aaien:** vegen over de hond geeft kwispelen en een trilletje, met een eigen reactie per zone (kop, rug, buik).
- **Verzorgen:** meters voor honger, energie en blijheid, met knoppen om te voeren en te laten slapen.
- **Beledigd, dan blij:** na een tijd weg te zijn geweest draait de hond zich eerst om en is daarna extra blij.
- **Jouw hond:** een foto wordt geanalyseerd en bepaalt vachtkleur, aftekening, oorvorm, staart, snuit en bouw. Alles is daarna handmatig bij te stellen in het paneel "Maak Max na", met drie lichaamssjablonen (groot, middel, klein).
- **Karakter:** een korte vragenlijst (energie, speelsheid, knuffelig, eigenwijs) beïnvloedt hoe snel de meters dalen.
- **Accounts en PWA:** inloggen met magic link of wachtwoord, zodat je op twee apparaten dezelfde hond ziet, en installeerbaar op het beginscherm.

## Hoe het werkt

1. **Meters zonder server-timer:** per meter staat alleen de laatste waarde en het tijdstip in de database. Bij openen rekent de app de huidige waarde uit: huidig = max(0, opgeslagen − daalsnelheid × uren sinds update). Dat is goedkoop, werkt offline en is gedekt door unit-tests.
2. **Foto-analyse:** de foto gaat naar een privé Storage-bucket. Een Edge Function stuurt hem naar een vision-model met een vast JSON-schema (alleen toegestane waarden voor oren, aftekening, bouw enzovoort). Het resultaat wordt gevalideerd en opgeslagen.
3. **Model:** de hond is volledig parametrisch in code opgebouwd (React Three Fiber), dus er is geen extern 3D-model of licentie nodig. Het JSON-resultaat wordt omgezet naar kleuren en vormparameters.

## Techniek

- React, TypeScript en Vite, met React Three Fiber en drei voor 3D, Zustand voor de spelstatus en Tailwind CSS voor de mobiele interface.
- Supabase: Postgres met Row Level Security op elke tabel (getest met twee gebruikers), Auth, Storage en Edge Functions. De API-sleutel van het model staat alleen als secret in de Edge Function.
- PWA met vite-plugin-pwa, gehost op Vercel met automatische deploys.

## Status

Fase 1 (hond leeft), fase 2 (hond onthoudt) en fase 3 (jouw hond) zijn gebouwd. De foto-analyse is getest op alles behalve de modelaanroep zelf, want die wacht nog op de API-sleutel als secret. Fase 4 (bal gooien, trucjes, XP en levels) en fase 5 staan nog op de planning.

## Wat ik ervan leerde

Door elke beslissing die ertoe doet in de database te leggen (rechten, meters, de vaste vorm van de AI-uitvoer) in plaats van in de interface, blijft de app voorspelbaar. Het AI-model mag de foto lezen, maar kan alleen waarden teruggeven die het schema toestaat.$md$,
  null,
  array['Webapp', 'AI', 'Database'],
  'Webapplicatie',
  '2026-11-04',
  false,
  true,
  130
where not exists (select 1 from public.projects where slug = 'pet-your-dog');

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'pi-simulator',
  'Pi-simulator: een virtuele Raspberry Pi in je browser',
  'Sleep een led, knop, buzzer of sensor naar een 3D-werkbank, verbind ze met de pinnen van de Pi en programmeer ze in Python, zonder echte hardware. In de pro-modus met breadboard, weerstanden en kortsluiting.',
  $md$## Waarom dit project

Een Raspberry Pi leren programmeren kost hardware, en een verkeerd aangesloten led kan echt kapotgaan. De Pi-simulator draait volledig in de browser: je bouwt de schakeling, schrijft de Python-code en ziet meteen wat er gebeurt. Alle teksten zijn Nederlands, voor beginners.

## Wat de simulator doet

- **Simpel of Pro:** in de simpele modus zitten onderdelen direct op een pin. In de pro-modus bouw je zoals in het echt, met breadboard, jumperdraden en weerstanden.
- **3D-werkbank:** de Pi (85 × 56 mm, 40 pinnen met de juiste pinout) en alle onderdelen staan in 3D. Onderdelen sleep je uit een bak, aansluiten gaat via het pinmenu, en ook met alleen het toetsenbord is te werken.
- **Python-editor:** CodeMirror met een console en Nederlandse uitleg bij fouten, met regelnummer.
- **Onderdelen:** led, knop, buzzer, temperatuursensor en potmeter, met een nagebouwde `gpiozero` zodat dezelfde code later op een echte Pi werkt.
- **Waarschuwingen en kortsluiting:** een pin zonder onderdeel, een led zonder weerstand of een verkeerd aangesloten onderdeel geeft een melding. Een led zonder weerstand brandt door, en bij kortsluiting stopt het programma.
- **Delen:** projecten worden bewaard in de browser, zijn te downloaden en te delen via een link waarin het hele project zit.

## Hoe het werkt

1. **Python in de browser:** Pyodide draait in een Web Worker. Hoofdthread en worker delen een `SharedArrayBuffer`, zodat knoppen en sensoren leesbaar zijn terwijl Python in een `while True` met `sleep` zit. Stop beëindigt de worker, ook bij een oneindige lus.
2. **Schakelingsanalyse:** de pro-modus bouwt uit breadboard, draden en onderdelen netten (union-find) en rekent die door met een kleine gelijkstroom-oplosser (nodale analyse). Een led is een diode met een drempel van 2,0 V, dus de stroom volgt uit de weerstandswaarde.
3. **Gescheiden lagen:** werkbankstaat, 3D-weergave, schakelingsanalyse en Python-motor zijn losse modules. Alleen de werkbank bepaalt of een schakeling klopt.

## Techniek

- React, TypeScript, Vite en Tailwind CSS, met three en react-three-fiber voor 3D.
- Pyodide, een eigen `gpiozero` in Python en CodeMirror 6. Pyodide en lettertypes worden zelf gehost vanwege de vereiste cross-origin-isolatie.
- 51 testbestanden met Vitest, waaronder tests van de Python-code in Pyodide, plus rooktests in een echte browser met Playwright. Een test bewaakt dat er geen kleuren buiten het thema staan.
- Statisch gehost op Vercel, zonder backend en zonder accounts.

## Wat ik ervan leerde

Een simulator is alleen nuttig als de regels erachter kloppen. Door de schakelingsanalyse als apart, puur testbaar stuk te bouwen, kon ik elke regel (stroom, doorbranden, kortsluiting) los controleren. Dat lijkt op hoe je in finance een berekening eerst afzonderlijk toetst voordat je haar in een rapportage gebruikt.$md$,
  null,
  array['Webapp', 'Onderwijs'],
  'Webapplicatie',
  '2026-11-04',
  false,
  true,
  140
where not exists (select 1 from public.projects where slug = 'pi-simulator');

insert into public.projects
  (slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order)
select
  'onderzoek-vragen-werkgevers-om-ai',
  'Onderzoek: vragen werkgevers al om AI bij controllers?',
  'Analyse van 75 actuele vacatures voor (junior) controllers in Nederland, in drie rondes via drie soorten bronnen: 13 van de 75 (17%) noemen AI, terwijl Excel, ERP en Power BI veel vaker gevraagd worden.',
  $md$## Vraag

In mijn eerdere onderzoek zetten de beroepsorganisaties AI-geletterdheid hoog, terwijl de controller die ik sprak AI niet in zijn top drie zette. Wat vragen werkgevers zelf? Ik las 75 actuele vacatures voor (junior) controllers in Nederland uit, verdeeld over vijf sectoren: retail, industrie, zakelijke dienstverlening, zorg en overheid, en automotive en sportvoeding.

## Antwoord in het kort

**AI maakt je nog niet aanneembaar, datavaardigheid wel.**

- **AI is zeldzaam:** 13 van de 75 vacatures (17%) noemen AI, meestal als interesse of om processen te automatiseren. 62 vacatures noemen het niet.
- **Basisvaardigheden domineren:** een ERP-systeem staat in 52% van de vacatures, Excel in 45%, Power BI of BI in 33% en automatiseren in 31%. SQL en Python komen in geen enkele vacature voor.
- **Automatiseren is bijna twee keer zo vaak genoemd als AI.** In de praktijk heet het automatiseren, niet AI.
- **Per sector:** AI komt in elke batch voor, het vaakst in de industrie (5 van de 15). Geen enkele overheidsvacature en geen enkele grote retailer noemt AI. AI wordt vooral gevraagd bij kleinere en snelgroeiende organisaties.
- **Beheersing van AI vraagt niemand:** nergens staan de AI-verordening, governance of een AI-register. Dat is ook een kans, want er is weinig concurrentie.

## Aanpak

1. **Ronde 1, websearch (25 vacatures):** vooral wervingsbureaus, want Indeed, LinkedIn en Werkzoeken.nl waren niet te openen. 12% noemde AI.
2. **Ronde 2, Indeed en Nationale Vacaturebank (25):** via de browser. 20% noemde AI.
3. **Ronde 3, LinkedIn (25):** vaker direct van werkgevers en internationale bedrijven, met een exacte plaatsingsdatum. Ook 20%.

Van elke vacature staan functie, organisatie, sector, datum, genoemde software en vaardigheden en een letterlijk citaat in de Excel, zodat elk cijfer is terug te leiden naar de bron.

## Betrouwbaarheid en beperkingen

- **De bron kleurt de uitkomst:** wervingsbureaus gaven 12%, Indeed en LinkedIn 20%.
- **Datums klopten niet altijd:** bij vijf vacatures van Robert Half stond oktober 2026 in het overzicht, terwijl de pagina zelf 2024 zei. Dat is alleen te zien door de bron zelf te openen.
- **Dubbele vacatures** (dezelfde klant via twee bureaus) zijn eruit gehaald, en de twijfelgevallen staan in de verantwoording.
- Vacatures beschrijven wat werkgevers vragen, niet wat controllers doen, en het interview uit het eerdere onderzoek is één respondent.
- De zoekrondes zijn uitgevoerd met AI en niet per vacature een tweede keer gecontroleerd.

## Wat ik ervan leerde

Een AI-assistent kan snel veel vacatures lezen, maar kijkt niet vanzelf kritisch naar zijn bron. Pas door dezelfde vraag via drie bronnen te stellen en de verschillen te verantwoorden, werd duidelijk dat de bron de uitkomst beïnvloedde.$md$,
  null,
  array['Onderzoek', 'AI', 'Data-analyse'],
  'Onderzoek',
  '2026-11-04',
  false,
  true,
  150
where not exists (select 1 from public.projects where slug = 'onderzoek-vragen-werkgevers-om-ai');

-- Bewijslast. Per dossier alleen als er nog geen bewijslast is, zodat een tweede run niets dubbel zet.
insert into public.project_attachments (project_id, file_name, file_url, file_type)
select p.id, v.file_name, v.file_url, v.file_type
from (
  values
    ('pet-your-dog', 'Live applicatie', 'https://pet-your-dog.vercel.app/', 'demo'),
    ('pet-your-dog', 'Broncode op GitHub', 'https://github.com/tijnvdpol/Pet-your-dog', 'github'),

    ('pi-simulator', 'Live simulator', 'https://pi-simulator-nine.vercel.app/', 'demo'),
    ('pi-simulator', 'Broncode op GitHub', 'https://github.com/tijnvdpol/PI-simulator', 'github'),

    ('onderzoek-vragen-werkgevers-om-ai', 'Interactieve uitkomst: "Vragen werkgevers om AI?"', '/presentaties/vragen-werkgevers-om-ai.html', 'document'),
    ('onderzoek-vragen-werkgevers-om-ai', 'Vacatureanalyse met alle 75 vacatures (Excel)', '/bewijs/vacatureanalyse-controllers-ai.xlsx', 'document'),
    ('onderzoek-vragen-werkgevers-om-ai', 'Verantwoording zoekproces lezen', '/rapporten/verantwoording-vacatureanalyse-controllers', 'reader')
) as v (slug, file_name, file_url, file_type)
join public.projects p on p.slug = v.slug
where not exists (select 1 from public.project_attachments a where a.project_id = p.id);

commit;
