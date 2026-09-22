import { supabase } from './supabaseClient'
import type { Project } from '../types/database.types'

const PROJECT_COLUMNS =
  'id, slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order, created_at, updated_at'

export async function listAllProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}
