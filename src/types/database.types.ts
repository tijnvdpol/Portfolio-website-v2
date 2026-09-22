// Handmatig geschreven Supabase database types (geen Supabase CLI beschikbaar).
// Houd dit bestand in sync met supabase/migrations/001_init.sql.
export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          slug: string
          title: string
          summary: string
          content: string
          cover_image_url: string | null
          tags: string[]
          category: string | null
          project_date: string | null
          featured: boolean
          published: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          summary: string
          content?: string
          cover_image_url?: string | null
          tags?: string[]
          category?: string | null
          project_date?: string | null
          featured?: boolean
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          summary?: string
          content?: string
          cover_image_url?: string | null
          tags?: string[]
          category?: string | null
          project_date?: string | null
          featured?: boolean
          published?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      project_attachments: {
        Row: {
          id: string
          project_id: string
          file_name: string
          file_url: string
          file_type: string | null
          created_at: string
        }
        Insert: {
          id?: string
          project_id: string
          file_name: string
          file_url: string
          file_type?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          project_id?: string
          file_name?: string
          file_url?: string
          file_type?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'project_attachments_project_id_fkey'
            columns: ['project_id']
            isOneToOne: false
            referencedRelation: 'projects'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

export type Project = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type ProjectAttachment = Database['public']['Tables']['project_attachments']['Row']
export type ProjectAttachmentInsert =
  Database['public']['Tables']['project_attachments']['Insert']
