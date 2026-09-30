import { stampOverrides } from '../data/dossierStamps'
import { evidenceType, sortEvidence } from './evidence'
import { formatMonthYear } from './format'
import { supabase } from './supabaseClient'
import type {
  DossierEvidence,
  DossierStamp,
  Project,
  ProjectAttachment,
} from '../types/database.types'

// De dossiers: alle gepubliceerde projecten, met stempel en onderbouwing. De homepage toont
// alleen de uitgelichte, /projecten toont ze allemaal in dezelfde opbouw.
// Dit staat bewust los van lib/projects.ts, zodat de detailpagina's niet
// afhangen van migrations/004_dossier.sql.

export type Dossier = Project & {
  number: string // 'D-01', 'D-02', ... uitgelichte dossiers eerst, daarna de rest
  evidence: DossierEvidence[]
  stamp: DossierStamp | null
}

const BASE_COLUMNS =
  'id, slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order, created_at, updated_at'

// Postgres: 'undefined_column'. De dossierkolommen bestaan pas na migrations/004_dossier.sql.
const UNDEFINED_COLUMN = '42703'

type DossierRow = Project & {
  dossier_evidence?: DossierEvidence[]
  dossier_stamp?: DossierStamp | null
  project_attachments?: ProjectAttachment[]
}

const STAMP_TILTS = [-6, 4, -3, 5]

// Zonder ingevulde onderbouwing of stempel (dossier_evidence / dossier_stamp) leiden we ze af
// uit de bewijslast van het project: de bijlagen worden onderbouwingsregels, en het stempel
// zegt LIVE als er een live demo is (anders AFGEROND).
function deriveEvidence(attachments: ProjectAttachment[]): DossierEvidence[] {
  return sortEvidence(attachments).map((a) => ({ label: a.file_name, href: a.file_url }))
}

function deriveStamp(row: DossierRow, index: number): DossierStamp | null {
  const attachments = row.project_attachments ?? []
  const live = attachments.some((a) => evidenceType(a.file_type) === 'demo')
  return {
    label: 'STATUS',
    value: live ? 'LIVE' : 'AFGEROND',
    detail: formatMonthYear(row.project_date)?.toUpperCase().replace('.', '') ?? '',
    tilt: STAMP_TILTS[index % STAMP_TILTS.length],
  }
}

// Uitgelichte dossiers staan voorop, zodat hun nummer op de homepage en op /projecten gelijk is.
function toDossiers(rows: DossierRow[]): Dossier[] {
  const ordered = [...rows.filter((row) => row.featured), ...rows.filter((row) => !row.featured)]
  return ordered.map((row, index) => ({
    ...row,
    number: `D-${String(index + 1).padStart(2, '0')}`,
    evidence: row.dossier_evidence?.length
      ? row.dossier_evidence
      : deriveEvidence(row.project_attachments ?? []),
    stamp: row.dossier_stamp ?? stampOverrides[row.slug] ?? deriveStamp(row, index),
  }))
}

export async function listDossiers(): Promise<Dossier[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`${BASE_COLUMNS}, dossier_evidence, dossier_stamp, project_attachments (*)`)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (!error) return toDossiers(data as DossierRow[])
  if (error.code !== UNDEFINED_COLUMN) throw error

  // Migratie nog niet uitgevoerd: toon de dossiers zonder stempel en onderbouwing.
  const fallback = await supabase
    .from('projects')
    .select(`${BASE_COLUMNS}, project_attachments (*)`)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (fallback.error) throw fallback.error
  return toDossiers(fallback.data as DossierRow[])
}
