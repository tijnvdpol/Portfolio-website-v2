// Audit trail van mijn groei: alleen toevoegen, nooit aanpassen of verwijderen.
// Na elke grow & show komt er bovenaan een regel bij (hoger nummer = nieuwer).
//
// LET OP: de datums en sprintnummers hieronder zijn placeholders uit het ontwerp;
// vul ze zelf in. `evidence.href` mag een pad op de site of een externe link zijn.

export type AuditEntry = {
  number: string
  date: string
  sprint: string
  change: string
  evidence: { label: string; href: string }
}

export const auditTrail: AuditEntry[] = [
  {
    number: '0005',
    date: '[dd-mm-2026]',
    sprint: 'G&S [#]',
    change: 'Portfolio v3: opnieuw opgebouwd rond bewijslast',
    evidence: { label: 'site', href: '#dossiers' },
  },
  {
    number: '0004',
    date: '[dd-mm-2026]',
    sprint: 'G&S [#]',
    change: 'AI Wijzer gebouwd en live gezet',
    evidence: { label: 'D-03', href: '#dossiers' },
  },
  {
    number: '0003',
    date: '[dd-mm-2026]',
    sprint: 'G&S [#]',
    change: 'Onderzoek AI en de financial controller 2030 afgerond',
    evidence: { label: 'D-02', href: '#dossiers' },
  },
  {
    number: '0002',
    date: '[dd-mm-2026]',
    sprint: 'G&S [#]',
    change: 'Factuurscanner opgeleverd, 177 tests groen',
    evidence: { label: 'D-01', href: '#dossiers' },
  },
  {
    number: '0001',
    date: '[dd-mm-2026]',
    sprint: 'G&S [#]',
    change: 'DataCamp "Claude 101" afgerond (leerverhaal minor)',
    evidence: { label: 'certificaat', href: '#groei' },
  },
]

export const nextEntryNote = 'Volgende regel na de grow & show van [datum]'
