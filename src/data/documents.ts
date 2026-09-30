// Pdf's die volledig op de site te lezen zijn via /documenten/:slug (ingebouwde reader met
// downloadknop). Het bestand staat in public/bewijs/. Koppel een document aan een dossier door
// in de bewijslast van dat project een link naar /documenten/<slug> te zetten.

export type SiteDocument = {
  slug: string
  projectSlug: string // het dossier waar de "terug"-link naartoe gaat
  title: string
  subtitle: string
  file: string // pad in public/
  downloadName: string
}

export const documents: SiteDocument[] = [
  {
    slug: 'beslisoverzicht-claude-inzetten-of-niet',
    projectSlug: 'datacamp-claude-101',
    title: 'Beslisoverzicht: Claude inzetten of niet',
    subtitle:
      'Mijn overzicht van wanneer ik Claude wel en niet inzet, per taak uit mijn studie Finance & Control. Bewijslast bij de DataCamp-cursus Claude 101.',
    file: '/bewijs/beslisoverzicht-claude-inzetten-of-niet.pdf',
    downloadName: 'Beslisoverzicht Claude inzetten of niet.pdf',
  },
]

export function findDocument(slug: string | undefined): SiteDocument | undefined {
  return documents.find((doc) => doc.slug === slug)
}
