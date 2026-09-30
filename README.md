# Portfolio website v2

Persoonlijke portfolio site van Tijn van der Pol (Finance & Control) met een beveiligde
`/admin`-omgeving om projecten te beheren zonder code aan te passen.

## Stack

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`)
- [React Router](https://reactrouter.com/)
- [Supabase](https://supabase.com/) (Postgres, Auth, Storage) via `@supabase/supabase-js`
- `react-markdown` + `remark-gfm` voor de markdown-inhoud van projecten
- `react-helmet-async` voor per-pagina SEO (titel + meta description)

## Installatie

```bash
npm install
cp .env.example .env
```

Vul in `.env` je Supabase-projectgegevens in (zie *Project Settings → API* in het Supabase
dashboard):

| Variabele                 | Omschrijving                                  |
| -------------------------- | ---------------------------------------------- |
| `VITE_SUPABASE_URL`        | Project URL, bijv. `https://xxxx.supabase.co` |
| `VITE_SUPABASE_ANON_KEY`   | De publieke **anon** key (nooit de service role key) |

Start de ontwikkelserver:

```bash
npm run dev
```

## Database opzetten (Supabase)

De migraties staan in `supabase/migrations/` en zijn in volgorde te draaien via de **SQL
Editor** in het Supabase dashboard, of via de [Supabase CLI](https://supabase.com/docs/guides/cli):

1. `001_init.sql` — tabellen `projects` en `project_attachments`
2. `002_rls.sql` — Row Level Security policies
3. `003_storage.sql` — storage bucket `project-media` + policies
4. `004_dossier.sql` — kolommen `dossier_evidence` en `dossier_stamp` op `projects`
   (onderbouwing en stempel per dossier op de homepage)

Optioneel: `supabase/seed.sql` voor drie voorbeeldprojecten.

`supabase/projecten-2026-09.sql` vervangt die voorbeeldprojecten door de echte projecten
(Factuurscanner, het onderzoek naar AI en de financial controller, AI Wijzer, Dagboekje en
Digitaal Dagboek), inclusief bewijslast. Eenmalig uitvoeren in de SQL Editor; het script draait
in één transactie.

Na `004_dossier.sql`: `supabase/dossiers-2026-09.sql` vult stempel en onderbouwing van de drie
uitgelichte projecten (D-01 t/m D-03). Zonder deze migratie werkt de homepage nog steeds, maar
zonder stempels en onderbouwing bij de dossiers.

Daarnaast eenmalig in het dashboard:

- **Authentication → Sign In / Providers → Email**: zet "Allow new users to sign up" uit
  (er is maar één beheerder; registratie hoeft niet open te staan).
- **Authentication → Users → Add user**: maak je eigen admin-account aan (e-mail + wachtwoord,
  met "Auto Confirm User" aangevinkt).

## Een nieuw project toevoegen

1. Ga naar `/admin/login` en log in met je Supabase-account.
2. Klik op **Nieuw project**, vul titel, samenvatting en (optioneel) de markdown-inhoud in —
   de slug wordt automatisch gegenereerd op basis van de titel, maar is aanpasbaar.
3. Upload eventueel een coverafbeelding.
4. Sla op. Je komt automatisch op de bewerkpagina van het project, waar je nu ook bewijslast
   kunt toevoegen: bestanden uploaden (bijv. een PDF of Excel-bestand) of links toevoegen van het
   soort *Live demo*, *Broncode*, *Rapport* of *Documentatie*.
5. Vink **Gepubliceerd** aan zodra het project zichtbaar mag zijn voor bezoekers, en
   **Uitgelicht op home** als het op de homepage mag verschijnen.

Projecten verwijderen kan vanuit het dashboard (`/admin`), met een bevestigingsvraag.

### Bewijslast en rapporten

Bewijslast staat in `project_attachments`; `file_type` bepaalt het soort (`demo`, `github`,
`reader`, `document`, of het MIME-type bij een upload). Zie `src/lib/evidence.ts`.

Een rapport dat volledig op de site te lezen is, staat als markdown in `src/content/rapporten/`
en wordt geregistreerd in `src/data/reports.ts`. Het is dan te lezen op `/rapporten/<slug>` (met
inhoudsopgave en een knop om af te drukken of als PDF op te slaan). Voeg daarna bij het project
een link van het soort *Rapport* toe naar `/rapporten/<slug>`.

Coverafbeeldingen van de huidige projecten staan in `public/covers/`.

### Homepage ("Controledossier")

De homepage staat los van `PublicLayout` (`components/dossier/DossierLayout.tsx`, alleen route `/`).
De teksten en cijfers staan in `src/data/`, niet in de componenten:

| Bestand | Inhoud |
| ------- | ------ |
| `home.ts` | hero, demo, navigatie, over mij, contact |
| `formulas.ts` | kerncijfers met formule en bron (voedt de formulebalk) |
| `auditTrail.ts` | de audit trail van mijn groei; regel toevoegen na elke grow & show |
| `bijlagen.ts` | de vijf polaroids (foto's in `public/bijlagen/`) |

Dossiers (D-01, D-02, ...) komen uit de uitgelichte projecten in Supabase; stempel en
onderbouwing staan in `dossier_stamp` en `dossier_evidence`. De datum "gewijzigd" komt uit de
laatste commit (`vite.config.ts`).

## Mapstructuur

```
src/
  components/       herbruikbare UI-componenten (+ components/admin voor het beheerformulier)
  pages/            route-pagina's (+ pages/admin voor de beheeromgeving)
  lib/              Supabase-client, data-functies, auth, slug- en storage-helpers
  hooks/            React-hooks die dataophaling en auth-state scheiden van de UI
  types/            database-types
supabase/
  migrations/       SQL-migraties
  seed.sql          voorbeeldprojecten
```

## Deployment op Vercel

1. Importeer de GitHub-repository in Vercel (framework preset: Vite).
2. Zet de environment variables `VITE_SUPABASE_URL` en `VITE_SUPABASE_ANON_KEY` in
   **Project Settings → Environment Variables**.
3. `vercel.json` in deze repo zorgt voor de juiste SPA-routing (alle routes vallen terug op
   `index.html`, zodat bijv. `/projecten/mijn-project` en `/admin` direct werken).
4. Build command en output directory worden automatisch gedetecteerd (`npm run build` →
   `dist`).

## Scripts

| Commando            | Omschrijving                          |
| -------------------- | -------------------------------------- |
| `npm run dev`         | Ontwikkelserver starten               |
| `npm run build`       | Productiebuild (`tsc -b && vite build`) |
| `npm run preview`     | Lokale preview van de productiebuild  |
