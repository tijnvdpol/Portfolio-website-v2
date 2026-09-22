import { supabase } from './supabaseClient'
import type { ProjectWithAttachments } from './projects'
import type {
  Project,
  ProjectAttachment,
  ProjectAttachmentInsert,
  ProjectInsert,
  ProjectUpdate,
} from '../types/database.types'

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

export async function getProjectById(id: string): Promise<ProjectWithAttachments | null> {
  const { data, error } = await supabase
    .from('projects')
    .select(`${PROJECT_COLUMNS}, project_attachments (*)`)
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data as ProjectWithAttachments | null
}

export async function isSlugTaken(slug: string, excludeId?: string): Promise<boolean> {
  let query = supabase.from('projects').select('id').eq('slug', slug)
  if (excludeId) query = query.neq('id', excludeId)

  const { data, error } = await query
  if (error) throw error
  return (data?.length ?? 0) > 0
}

export async function createProject(input: ProjectInsert): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .insert(input)
    .select(PROJECT_COLUMNS)
    .single()

  if (error) throw error
  return data
}

export async function updateProject(id: string, input: ProjectUpdate): Promise<Project> {
  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select(PROJECT_COLUMNS)
    .single()

  if (error) throw error
  return data
}

export async function deleteProject(id: string): Promise<void> {
  const { error } = await supabase.from('projects').delete().eq('id', id)
  if (error) throw error
}

export async function addAttachment(
  projectId: string,
  attachment: Omit<ProjectAttachmentInsert, 'project_id' | 'id' | 'created_at'>,
): Promise<ProjectAttachment> {
  const { data, error } = await supabase
    .from('project_attachments')
    .insert({ project_id: projectId, ...attachment })
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteAttachment(id: string): Promise<void> {
  const { error } = await supabase.from('project_attachments').delete().eq('id', id)
  if (error) throw error
}
