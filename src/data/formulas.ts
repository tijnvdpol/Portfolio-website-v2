// Kerncijfers op de homepage. Elke cel heeft een formule en een bron; de formulebalk
// toont die zodra iemand het cijfer aanwijst. Nieuw cijfer? Voeg hier een cel toe.

const REPO = 'https://github.com/tijnvdpol/Factuurscanner'

export type Mark = 'check' | 'match' | 'sum'

export type FormulaCell = {
  column: string // kolomletter in het raster (A, B, ...)
  address: string // celadres in de formulebalk (A1, B1, ...)
  formula: string
  result: string
  href: string
  value: string
  label: string
  mark: Mark
  markTilt: number // graden, licht gedraaid zoals met de hand gezet
}

export const formulaCells: FormulaCell[] = [
  {
    column: 'A',
    address: 'A1',
    formula: '=AANTAL(Factuurscanner/tests/*)',
    result: '→ 177',
    href: REPO,
    value: '177',
    label: 'geautomatiseerde tests in de Factuurscanner',
    mark: 'check',
    markTilt: -6,
  },
  {
    column: 'B',
    address: 'B1',
    formula: '=AANTAL.ALS(docs/beslissingen.md; "B*")',
    result: '→ 50',
    href: `${REPO}/blob/main/docs/beslissingen.md`,
    value: '50',
    label: 'vastgelegde ontwerpbeslissingen (B1 t/m B50)',
    mark: 'match',
    markTilt: -3,
  },
  {
    column: 'C',
    address: 'C1',
    formula: '=AANTAL({"invoerder"; "goedkeurder"; "controller"; "beheerder"})',
    result: '→ 4',
    href: `${REPO}/tree/main/supabase/tests`,
    value: '4',
    label: 'beheersrollen met eigen goedkeuringslimieten',
    mark: 'check',
    markTilt: -8,
  },
  {
    column: 'D',
    address: 'D1',
    formula: '=AANTAL(D-01:D-03)',
    result: '→ 3',
    href: '#dossiers',
    value: '3',
    label: 'opgeleverde projecten, elk met bewijslast',
    mark: 'sum',
    markTilt: -4,
  },
]

export const markLegend: { mark: Mark; text: string; tilt: number }[] = [
  { mark: 'check', text: 'gecontroleerd in de broncode', tilt: -6 },
  { mark: 'match', text: 'afgestemd met de documentatie', tilt: -2 },
  { mark: 'sum', text: 'nageteld', tilt: -4 },
]
