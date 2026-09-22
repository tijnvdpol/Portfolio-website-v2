import { supabase } from './supabaseClient'
import type { Project, ProjectAttachment } from '../types/database.types'

export type ProjectWithAttachments = Project & {
  project_attachments: ProjectAttachment[]
}

const PROJECT_COLUMNS =
  'id, slug, title, summary, content, cover_image_url, tags, category, project_date, featured, published, sort_order, created_at, updated_at'

export async function listPublishedProjects(options?: { tag?: string }): Promise<Project[]> {
  let query = supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (options?.tag) {
    query = query.contains('tags', [options.tag])
  }

  const { data, error } = await query

  if (error) throw error
  return data
}

export async function listFeaturedProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select(PROJECT_COLUMNS)
    .eq('published', true)
    .eq('featured', true)
    .order('sort_order', { ascending: true })
    .order('project_date', { ascending: false })

  if (error) throw error
  return data
}

export async function getProjectBySlug(slug: string): Promise<ProjectWithAttachments | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`${PROJECT_COLUMNS}, project_attachments (*)`)
    .eq('slug', slug)
    .eq('published', true)
    .maybeSingle()

  if (error) throw error
  return data as ProjectWithAttachments | null
}

export async function listAllTags(): Promise<string[]> {
  const { data, error } = await supabase.from('projects').select('tags').eq('published', true)

  if (error) throw error

  const tagSet = new Set<string>()
  for (const row of data) {
    for (const tag of row.tags) tagSet.add(tag)
  }
  return Array.from(tagSet).sort((a, b) => a.localeCompare(b))
}
