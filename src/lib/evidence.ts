import type { ProjectAttachment } from '../types/database.types'

// Bewijslast staat in project_attachments. Links (geen upload) krijgen een van
// deze waarden als file_type; geüploade bestanden houden hun MIME-type.
export const EVIDENCE_TYPES = {
  demo: 'Live demo',
  reader: 'Rapport',
  github: 'Broncode',
  document: 'Documentatie',
} as const

export type EvidenceType = keyof typeof EVIDENCE_TYPES | 'bestand'

const ORDER: EvidenceType[] = ['demo', 'reader', 'github', 'document', 'bestand']

export function evidenceType(fileType: string | null): EvidenceType {
  return fileType && fileType in EVIDENCE_TYPES ? (fileType as EvidenceType) : 'bestand'
}

export function evidenceLabel(type: EvidenceType): string {
  return type === 'bestand' ? 'Bestand' : EVIDENCE_TYPES[type]
}

export function sortEvidence(attachments: ProjectAttachment[]): ProjectAttachment[] {
  return [...attachments].sort(
    (a, b) => ORDER.indexOf(evidenceType(a.file_type)) - ORDER.indexOf(evidenceType(b.file_type)),
  )
}

export function isInternalUrl(url: string): boolean {
  return url.startsWith('/') && !url.startsWith('//')
}

// Een pad op de site dat een pagina is (/rapporten/…), geen bestand (/bewijs/….pdf): bestanden
// moeten als gewone link openen, niet via de router.
export function isRouteUrl(url: string): boolean {
  return isInternalUrl(url) && !/.[a-z0-9]{2,5}([?#].*)?$/i.test(url)
}

export function displayUrl(url: string): string {
  if (isRouteUrl(url)) return 'Leesbaar op deze site'
  if (isInternalUrl(url)) return 'Bestand op deze site'
  try {
    const { host, pathname } = new URL(url)
    const path = pathname.replace(/\/$/, '')
    return path ? `${host}${path}` : host
  } catch {
    return url
  }
}
