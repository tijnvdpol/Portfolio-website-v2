// Audit trail van mijn groei: alleen toevoegen, nooit aanpassen of verwijderen.
// Chronologisch: oudste regel bovenaan. Na elke grow & show komt er onderaan een regel bij
// (hoger nummer = nieuwer).
// `evidence.href` mag een pad op de site of een externe link zijn.

export type AuditEntry = {
  number: string
  date: string
  sprint: string
  change: string
  evidence: { label: string; href: string }
}

export const auditTrail: AuditEntry[] = [
  {
    number: '0001',
    date: '15-09-2026',
    sprint: 'G&S 1',
    change: 'Onderzoek AI en de financial controller 2030 afgerond',
    evidence: { label: 'D-02', href: '/projecten' },
  },
  {
    number: '0002',
    date: '20-09-2026',
    sprint: 'G&S 2',
    change: 'DataCamp "Claude 101" afgerond (leerverhaal minor)',
    evidence: { label: 'D-06', href: '/projecten/datacamp-claude-101' },
  },
  {
    number: '0003',
    date: '21-09-2026',
    sprint: 'G&S 2',
    change: 'AI Wijzer gebouwd en live gezet',
    evidence: { label: 'D-03', href: '/projecten' },
  },
  {
    number: '0004',
    date: '22-09-2026',
    sprint: 'G&S 2',
    change: 'Factuurscanner opgeleverd, 177 tests groen',
    evidence: { label: 'D-01', href: '/projecten' },
  },
  {
    number: '0005',
    date: '30-09-2026',
    sprint: 'G&S 2',
    change: 'Portfolio v3: opnieuw opgebouwd rond bewijslast',
    evidence: { label: 'site', href: '/projecten' },
  },
  {
    number: '0006',
    date: '01-11-2026',
    sprint: 'G&S 5',
    change: 'Onderzoek juridische grenzen folderscanner Superunie afgerond, met presentatie',
    evidence: { label: 'D-09', href: '/projecten/onderzoek-juridische-grenzen-folderscanner' },
  },
  {
    number: '0007',
    date: '01-11-2026',
    sprint: 'G&S 5',
    change: 'AI-kloon opgeleverd: chatbot die alleen uit eigen documenten antwoordt',
    evidence: { label: 'D-07', href: '/projecten/ai-kloon' },
  },
  {
    number: '0008',
    date: '01-11-2026',
    sprint: 'G&S 5',
    change: 'Website Supermarkt Hisar live gezet',
    evidence: { label: 'D-08', href: '/projecten/supermarkt-hisar' },
  },
  {
    number: '0009',
    date: '04-11-2026',
    sprint: 'G&S 5',
    change: 'Pet your dog gebouwd tot en met fase 3: eigen hond uit een foto',
    evidence: { label: 'D-10', href: '/projecten/pet-your-dog' },
  },
  {
    number: '0010',
    date: '04-11-2026',
    sprint: 'G&S 5',
    change: 'Pi-simulator live gezet, met pro-modus en 51 testbestanden',
    evidence: { label: 'D-11', href: '/projecten/pi-simulator' },
  },
  {
    number: '0011',
    date: '04-11-2026',
    sprint: 'G&S 5',
    change: 'Vacatureanalyse afgerond: 13 van 75 vacatures voor controllers noemen AI',
    evidence: { label: 'D-12', href: '/projecten/onderzoek-vragen-werkgevers-om-ai' },
  },
  {
    number: '0012',
    date: '04-11-2026',
    sprint: 'G&S 5',
    change: 'Cover toegevoegd aan elk dossier',
    evidence: { label: 'site', href: '/projecten' },
  },
  {
    number: '0013',
    date: '12-11-2026',
    sprint: 'G&S 5',
    change: 'Onderzoek AI-factuurinjectie afgerond: 0 van 27 keer misleid, 12 van 27 keer opgemerkt',
    evidence: { label: 'D-13', href: '/projecten/onderzoek-ai-factuurinjectie' },
  },
]

export const nextEntryNote =
  'Volgende regel na de grow & show van 12-11-2026, daarna elke twee weken op donderdag'
