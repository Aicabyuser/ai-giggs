import { Profile } from './profile';

export interface Skill {
  id: string;
  name: string;
  category: string;
  created_at: string;
}

export interface DeveloperSkill {
  developer_id: string;
  skill_id: string;
  proficiency_level: number;
  created_at: string;
  skill?: Skill;
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

export interface Availability {
  developer_id: string;
  is_available: boolean;
  available_hours: number;
  preferred_work_type: ('full-time' | 'part-time' | 'contract')[];
  updated_at: string;
}

export interface DeveloperProfile extends Profile {
  skills: DeveloperSkill[];
  reviews: Review[];
  availability: Availability;
  average_rating: number;
  total_reviews: number;
  completed_projects: number;
  active_projects: number;
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