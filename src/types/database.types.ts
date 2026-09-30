// Handmatig geschreven Supabase database types (geen Supabase CLI beschikbaar).
// Houd dit bestand in sync met supabase/migrations/001_init.sql.
// Homepage-dossier: onderbouwingsregels (met optionele link) en de stempel per project.
// Zie supabase/migrations/004_dossier.sql.
export type DossierEvidence = {
  label: string
  href?: string
}

export type DossierStamp = {
  label: string
  value: string
  detail: string
  tilt: number
}

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
          dossier_evidence: DossierEvidence[]
          dossier_stamp: DossierStamp | null
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
          dossier_evidence?: DossierEvidence[]
          dossier_stamp?: DossierStamp | null
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
          dossier_evidence?: DossierEvidence[]
          dossier_stamp?: DossierStamp | null
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

type DossierColumns = 'dossier_evidence' | 'dossier_stamp'

// Project zoals de publieke pagina's en het admin-formulier het kennen (zonder dossierkolommen).
export type Project = Omit<Database['public']['Tables']['projects']['Row'], DossierColumns>
export type ProjectDossier = Database['public']['Tables']['projects']['Row']
export type ProjectInsert = Database['public']['Tables']['projects']['Insert']
export type ProjectUpdate = Database['public']['Tables']['projects']['Update']

export type ProjectAttachment = Database['public']['Tables']['project_attachments']['Row']
export type ProjectAttachmentInsert =
  Database['public']['Tables']['project_attachments']['Insert']
