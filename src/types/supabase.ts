export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          email: string
          full_name: string
          avatar_url: string | null
          role: 'client' | 'developer' | 'admin'
          bio: string | null
          location: string | null
          website: string | null
          company: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          email: string
          full_name: string
          avatar_url?: string | null
          role: 'client' | 'developer' | 'admin'
          bio?: string | null
          location?: string | null
          website?: string | null
          company?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          role?: 'client' | 'developer' | 'admin'
          bio?: string | null
          location?: string | null
          website?: string | null
          company?: string | null
        }
      }
      developer_profiles: {
        Row: {
          id: string
          user_id: string
          skills: string[]
          experience_level: number
          hourly_rate: number
          availability: string
          portfolio_urls: string[]
          github_url: string | null
          linkedin_url: string | null
          completed_projects: number
          success_rate: number
          rating: number
          specialties: string[]
          certifications: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skills: string[]
          experience_level: number
          hourly_rate: number
          availability: string
          portfolio_urls?: string[]
          github_url?: string | null
          linkedin_url?: string | null
          completed_projects?: number
          success_rate?: number
          rating?: number
          specialties?: string[]
          certifications?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skills?: string[]
          experience_level?: number
          hourly_rate?: number
          availability?: string
          portfolio_urls?: string[]
          github_url?: string | null
          linkedin_url?: string | null
          completed_projects?: number
          success_rate?: number
          rating?: number
          specialties?: string[]
          certifications?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string
          client_id: string
          developer_id: string | null
          status: 'open' | 'in_progress' | 'completed' | 'cancelled'
          budget: number
          timeline: string
          skills_required: string[]
          attachments: string[]
          start_date: string | null
          end_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description: string
          client_id: string
          developer_id?: string | null
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          budget: number
          timeline: string
          skills_required: string[]
          attachments?: string[]
          start_date?: string | null
          end_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string
          client_id?: string
          developer_id?: string | null
          status?: 'open' | 'in_progress' | 'completed' | 'cancelled'
          budget?: number
          timeline?: string
          skills_required?: string[]
          attachments?: string[]
          start_date?: string | null
          end_date?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 