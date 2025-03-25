
import { ReactNode } from 'react';

export type PaymentStatus = 'pending' | 'in_escrow' | 'released' | 'refunded' | 'disputed' | 'verified';
export type ProjectStatus = 'inquiry' | 'proposal' | 'in_progress' | 'completed';

export interface Attachment {
  id: number | string;
  name: string;
  size: string;
  type: string;
  file?: File;
}

export interface Message {
  id: number;
  sender: 'user' | 'developer';
  content: string;
  time: string;
  attachments: Attachment[];
}

export interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  project: string;
  status: ProjectStatus;
  paymentStatus: PaymentStatus | null;
}

export interface FileTypeIconProps {
  className?: string;
  label: string;
}

export interface FileTypeIconMap {
  [key: string]: {
    color: string;
    label: string;
  };
}
