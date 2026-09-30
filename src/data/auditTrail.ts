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
]

export const nextEntryNote =
  'Volgende regel na de grow & show van 01-10-2026, daarna elke twee weken op donderdag'
