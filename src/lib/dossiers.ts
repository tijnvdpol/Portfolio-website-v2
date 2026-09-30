import { supabase } from './supabaseClient'
import type { DossierEvidence, DossierStamp, Project } from '../types/database.types'

// De dossiers op de homepage: de uitgelichte projecten, met stempel en onderbouwing.
// Dit staat bewust los van lib/projects.ts, zodat /projecten en de detailpagina's niet
// afhangen van migrations/004_dossier.sql.

export type Dossier = Project & {
  number: string // 'D-01', 'D-02', ... op volgorde van sort_order
  evidence: DossierEvidence[]
  stamp: DossierStamp | null
}

const BASE_COLUMNS =
  'id, slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order, created_at, updated_at'

// Postgres: 'undefined_column'. De dossierkolommen bestaan pas na migrations/004_dossier.sql.
const UNDEFINED_COLUMN = '42703'

function toDossiers(
  rows: (Project & { dossier_evidence?: DossierEvidence[]; dossier_stamp?: DossierStamp | null })[],
): Dossier[] {
  return rows.map((row, index) => ({
    ...row,
    number: `D-${String(index + 1).padStart(2, '0')}`,
    evidence: row.dossier_evidence ?? [],
    stamp: row.dossier_stamp ?? null,
  }))
}

export async function listDossiers(): Promise<Dossier[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(`${BASE_COLUMNS}, dossier_evidence, dossier_stamp`)
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (!error) return toDossiers(data)
  if (error.code !== UNDEFINED_COLUMN) throw error

  // Migratie nog niet uitgevoerd: toon de dossiers zonder stempel en onderbouwing.
  const fallback = await supabase
    .from('projects')
    .select(BASE_COLUMNS)
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (fallback.error) throw fallback.error
  return toDossiers(fallback.data)
}
