
// Mock service for escrow functionality
// In a real application, this would connect to your payment processor API

export interface PaymentDetails {
  projectId: string;
  amount: number;
  clientId: string;
  developerId: string;
  status: 'pending' | 'in_escrow' | 'verified' | 'released' | 'refunded' | 'disputed';
  createdAt: Date;
  updatedAt: Date;
  verification?: {
    clientVerified: boolean;
    clientVerifiedAt?: Date;
    adminVerified: boolean;
    adminVerifiedAt?: Date;
    developerDelivered: boolean;
    developerDeliveredAt?: Date;
    deliverables: Array<{
      name: string;
      url: string;
      verified: boolean;
    }>;
  };
}

// Mock database for escrow payments
const escrowPayments: Record<string, PaymentDetails> = {};

export const EscrowService = {
  // Create a new escrow payment
  createEscrow: (projectId: string, amount: number, clientId: string, developerId: string): string => {
    const paymentId = `payment_${Date.now()}`;
    
    escrowPayments[paymentId] = {
      projectId,
      amount,
      clientId,
      developerId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      verification: {
        clientVerified: false,
        adminVerified: false,
        developerDelivered: false,
        deliverables: []
      }
    };
    
    return paymentId;
  },
  
  // Fund an escrow from client
  fundEscrow: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment) return false;
    
    payment.status = 'in_escrow';
    payment.updatedAt = new Date();
    return true;
  },
  
  // Mark project as delivered by developer
  markAsDelivered: (paymentId: string, deliverables: Array<{name: string, url: string}>): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || payment.status !== 'in_escrow' || !payment.verification) return false;
    
    payment.verification.developerDelivered = true;
    payment.verification.developerDeliveredAt = new Date();
    payment.verification.deliverables = deliverables.map(d => ({ ...d, verified: false }));
    payment.updatedAt = new Date();
    return true;
  },
  
  // Client verifies project completion
  clientVerifyProject: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || payment.status !== 'in_escrow' || !payment.verification || !payment.verification.developerDelivered) return false;
    
    payment.verification.clientVerified = true;
    payment.verification.clientVerifiedAt = new Date();
    payment.updatedAt = new Date();
    return true;
  },
  
  // Admin verifies project and deliverables
  adminVerifyProject: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || payment.status !== 'in_escrow' || !payment.verification || !payment.verification.clientVerified) return false;
    
    payment.verification.adminVerified = true;
    payment.verification.adminVerifiedAt = new Date();
    payment.status = 'verified';
    payment.updatedAt = new Date();
    return true;
  },
  
  // Admin verifies specific deliverable
  verifyDeliverable: (paymentId: string, deliverableIndex: number): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || !payment.verification || !payment.verification.deliverables || 
        deliverableIndex >= payment.verification.deliverables.length) return false;
    
    payment.verification.deliverables[deliverableIndex].verified = true;
    payment.updatedAt = new Date();
    return true;
  },
  
  // Release funds to developer
  releaseEscrow: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || (payment.status !== 'in_escrow' && payment.status !== 'verified')) return false;
    
    payment.status = 'released';
    payment.updatedAt = new Date();
    return true;
  },
  
  // Refund funds to client
  refundEscrow: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || payment.status !== 'in_escrow') return false;
    
    payment.status = 'refunded';
    payment.updatedAt = new Date();
    return true;
  },
  
  // Mark escrow as disputed
  disputeEscrow: (paymentId: string): boolean => {
    const payment = escrowPayments[paymentId];
    if (!payment || payment.status !== 'in_escrow') return false;
    
    payment.status = 'disputed';
    payment.updatedAt = new Date();
    return true;
  },
  
  // Get payment details
  getPaymentDetails: (paymentId: string): PaymentDetails | null => {
    return escrowPayments[paymentId] || null;
  },
  
  // Get all payments for a project
  getProjectPayments: (projectId: string): PaymentDetails[] => {
    return Object.values(escrowPayments).filter(p => p.projectId === projectId);
  },
  
  // Get all payments for a client
  getClientPayments: (clientId: string): PaymentDetails[] => {
    return Object.values(escrowPayments).filter(p => p.clientId === clientId);
  },
  
  // Get all payments for a developer
  getDeveloperPayments: (developerId: string): PaymentDetails[] => {
    return Object.values(escrowPayments).filter(p => p.developerId === developerId);
  }
};
