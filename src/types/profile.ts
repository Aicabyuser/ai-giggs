import { Database } from './supabase';

export interface Profile {
  id: string;
  full_name: string;
  bio?: string;
  location?: string;
  website?: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  avatar_url?: string;
  role: 'client' | 'developer' | 'admin';
  company?: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  created_at: string;
  updated_at: string;
  client_id: string;
  developer_id?: string;
  client?: Profile;
  developer?: Profile;
}

export interface Review {
  id: string;
  reviewer_id: string;
  reviewee_id: string;
  project_id: string;
  rating: number;
  comment?: string;
  created_at: string;
  updated_at: string;
  reviewer?: Profile;
  project?: Project;
}

export interface ProfileFormData {
  full_name: string;
  bio?: string;
  location?: string;
  website?: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  avatar_url?: string;
  company?: string;
}

export type Role = 'client' | 'developer' | 'admin';

export interface ProfileUpdateResponse {
  success: boolean;
  error?: string;
  data?: Profile;
} 