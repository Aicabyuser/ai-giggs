
export interface VerificationRequest {
  id: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  type: string;
  documents: string[];
  notes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface ProjectVerification {
  id: string;
  projectId: string;
  projectName: string;
  clientName: string;
  developerName: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: Date;
  documents: string[];
  notes?: string;
}
