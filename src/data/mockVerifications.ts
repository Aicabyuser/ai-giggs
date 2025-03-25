
import { v4 as uuidv4 } from 'uuid';

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

export const mockVerifications: VerificationRequest[] = [
  {
    id: uuidv4(),
    userName: 'John Dev',
    userEmail: 'john.dev@example.com',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: 'Identity Verification',
    documents: ['ID Card.pdf', 'Proof of Address.pdf'],
    notes: 'Requesting verification for higher tier projects.',
    status: 'pending',
    createdAt: new Date('2023-06-15')
  },
  {
    id: uuidv4(),
    userName: 'Sarah Johnson',
    userEmail: 'sarah.j@example.com',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: 'Company Registration',
    documents: ['Business License.pdf', 'Tax Registration.pdf', 'Company Registration.pdf'],
    notes: 'Registering my AI consulting company.',
    status: 'pending',
    createdAt: new Date('2023-06-14')
  },
  {
    id: uuidv4(),
    userName: 'Michael Chen',
    userEmail: 'michael.c@example.com',
    userAvatar: 'https://randomuser.me/api/portraits/men/67.jpg',
    type: 'Academic Credentials',
    documents: ['PhD Certificate.pdf', 'Research Papers.zip'],
    status: 'approved',
    createdAt: new Date('2023-06-10')
  },
  {
    id: uuidv4(),
    userName: 'Elena Rodriguez',
    userEmail: 'elena.r@example.com',
    userAvatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    type: 'Professional Certification',
    documents: ['AWS Certification.pdf', 'Google AI Certificate.pdf'],
    status: 'rejected',
    notes: 'Certificates appear to be expired. Please provide current certifications.',
    createdAt: new Date('2023-06-08')
  }
];
