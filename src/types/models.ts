export interface Developer {
  id: string;
  name: string;
  bio: string;
  skills: string[];
  experienceLevel: number;
  hourlyRate: number;
  availability: string;
  rating: number;
  portfolio: string[];
  completedProjects: number;
  joinedDate: string;
  location: string;
  languages: string[];
  certifications: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  budget: number;
  skills: string[];
  duration: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  clientId: string;
  developerId?: string;
  createdAt: string;
  deadline?: string;
  requirements: string[];
  attachments: string[];
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
  projects: string[];
  rating: number;
  joinedDate: string;
  location: string;
  preferredLanguages: string[];
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: string[];
  projectId?: string;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  status: 'pending' | 'completed' | 'refunded';
  timestamp: string;
  clientId: string;
  developerId: string;
  escrowId: string;
} 