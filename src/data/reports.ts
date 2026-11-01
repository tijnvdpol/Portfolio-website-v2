// Rapporten die volledig op de site te lezen zijn via /rapporten/:slug.
// De tekst staat als markdown in src/content/rapporten/ en wordt pas geladen als de reader opent.

export type Report = {
  slug: string
  projectSlug: string
  title: string
  subtitle: string
  author: string
  program: string
  date: string
  version: string
  readingGuide: { code: string; label: string; meaning: string }[]
  caveat: string
  load: () => Promise<string>
}

export const reports: Report[] = [
  {
    slug: 'ai-en-de-financial-controller-2030',
    projectSlug: 'onderzoek-ai-en-de-financial-controller-2030',
    title: 'De impact van AI op het beroep van financial controller in Nederland richting 2030',
    subtitle:
      'Empirisch en theoretisch onderzoek naar taaktransformatie, bronnentriangulatie en de paradox van de startende financial',
    author: 'Tijn van der Pol',
    program: 'Minor Future-Proof met AI! — Hogeschool Utrecht',
    date: 'September 2026',
    version: '1.0 (definitief)',
    readingGuide: [
      {
        code: '[F]',
        label: 'Feit',
        meaning: 'Direct herleidbaar tot een geciteerde wetenschappelijke of institutionele bron.',
      },
      {
        code: '[I]',
        label: 'Interpretatie',
        meaning:
          'Beredeneerde synthese op basis van meerdere bronnen; de bronnen formuleren dit niet letterlijk zo.',
      },
      {
        code: '[A]',
        label: 'Aanname',
        meaning: 'Niet met een bron te onderbouwen; expliciet gemarkeerd als eigen inschatting.',
      },
    ],
    caveat:
      'Vrijwel geen enkele hoogwaardige bron gaat specifiek over "de financial controller in Nederland". De beschikbare literatuur gaat over accountants en auditors, de financiële functie als geheel, controllers internationaal of de Nederlandse arbeidsmarkt in het algemeen. Elke uitspraak over de Nederlandse financial controller is dus per definitie een extrapolatie. Dat is het belangrijkste kennishiaat en de reden voor het veldonderzoek in hoofdstuk 6 en 7.',
    load: () =>
      import('../content/rapporten/ai-en-de-financial-controller-2030.md?raw').then(
        (module) => module.default,
      ),
  },
  {
    slug: 'juridische-grenzen-folderscanner-superunie',
    projectSlug: 'onderzoek-juridische-grenzen-folderscanner',
    title: 'Superunie mag folders scannen, binnen strikte grenzen',
    subtitle:
      'Juridisch en ethisch onderzoek naar een interne folderscanner: auteursrecht, databankenrecht, gebruiksvoorwaarden, AI Act, mededingingsrecht, een risicomatrix en aanbevelingen.',
    author: 'Tijn van der Pol',
    program: 'Finance & Control (hbo) — opdrachtgever Superunie',
    date: 'November 2026',
    version: '1.0 (peildatum 1 november 2026)',
    readingGuide: [
      {
        code: '[V]',
        label: 'Vaststaand',
        meaning: 'Wettekst of vaste rechtspraak, met artikel, zaaknummer of ECLI.',
      },
      {
        code: '[I]',
        label: 'Interpretatie',
        meaning: 'Eigen toepassing op de folderscanner of een grijs gebied.',
      },
      {
        code: '[T]',
        label: 'Te verifiëren',
        meaning:
          'Bron niet volledig nagelezen: de vindplaats is de standaardvindplaats, maar tekst, randnummer of ECLI moet nog worden gecontroleerd.',
      },
    ],
    caveat:
      'Dit is een studentenonderzoek en geen juridisch advies. Websitevoorwaarden, robots.txt-bestanden en rechtspraak kunnen na de peildatum veranderen. Laat de conclusies over mededinging en het scrapen van specifieke ketens vóór ingebruikname toetsen door de compliance officer of een externe jurist van Superunie.',
    load: () =>
      import('../content/rapporten/juridische-grenzen-folderscanner-superunie.md?raw').then(
        (module) => module.default,
      ),
  },
]

export function findReport(slug: string | undefined): Report | undefined {
  return reports.find((report) => report.slug === slug)
}
