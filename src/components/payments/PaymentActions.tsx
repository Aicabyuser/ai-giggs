
import React from 'react';
import { Button } from "@/components/ui/button";
import { PaymentDetails, EscrowService } from '@/services/EscrowService';
import { useToast } from "@/hooks/use-toast";
import { Link } from 'react-router-dom';
import { DollarSign, Shield, CheckCircle, AlertTriangle, RefreshCw, FileCheck } from 'lucide-react';

interface PaymentActionsProps {
  payment: PaymentDetails;
  userRole: 'client' | 'developer' | 'admin';
  onPaymentUpdated: () => void;
}

export const PaymentActions = ({ payment, userRole, onPaymentUpdated }: PaymentActionsProps) => {
  const { toast } = useToast();

  const handleFundEscrow = () => {
    // In a real app, this would open a payment modal/form
    const success = EscrowService.fundEscrow(payment.projectId);
    
    if (success) {
      toast({
        title: "Payment Successful",
        description: "Funds have been placed in escrow",
        variant: "default",
      });
      onPaymentUpdated();
    } else {
      toast({
        title: "Payment Failed",
        description: "There was an issue processing your payment",
        variant: "destructive",
      });
    }
  };

  const handleReleaseEscrow = () => {
    const success = EscrowService.releaseEscrow(payment.projectId);
    
    if (success) {
      toast({
        title: "Funds Released",
        description: "Payment has been released to the developer",
        variant: "default",
      });
      onPaymentUpdated();
    } else {
      toast({
        title: "Action Failed",
        description: "There was an issue releasing the funds",
        variant: "destructive",
      });
    }
  };

  const handleRefundEscrow = () => {
    const success = EscrowService.refundEscrow(payment.projectId);
    
    if (success) {
      toast({
        title: "Funds Refunded",
        description: "Payment has been refunded to the client",
        variant: "default",
      });
      onPaymentUpdated();
    } else {
      toast({
        title: "Action Failed",
        description: "There was an issue refunding the payment",
        variant: "destructive",
      });
    }
  };

  const handleDisputeEscrow = () => {
    const success = EscrowService.disputeEscrow(payment.projectId);
    
    if (success) {
      toast({
        title: "Dispute Filed",
        description: "An admin will review your case",
        variant: "default",
      });
      onPaymentUpdated();
    } else {
      toast({
        title: "Action Failed",
        description: "There was an issue filing the dispute",
        variant: "destructive",
      });
    }
  };

  // Different actions based on payment status and user role
  if (payment.status === 'pending') {
    if (userRole === 'client') {
      return (
        <Button onClick={handleFundEscrow} className="w-full">
          <DollarSign className="mr-2 h-4 w-4" />
          Fund Escrow
        </Button>
      );
    }
    return <div className="text-sm text-muted-foreground text-center">Waiting for client to fund escrow</div>;
  }

  if (payment.status === 'in_escrow') {
    const isDelivered = payment.verification?.developerDelivered;
    
    if (userRole === 'developer' && !isDelivered) {
      return (
        <Button asChild className="w-full">
          <Link to={`/project/${payment.projectId}/verification/developer`}>
            <FileCheck className="mr-2 h-4 w-4" />
            Submit Deliverables
          </Link>
        </Button>
      );
    }
    
    if (userRole === 'client' && isDelivered && !payment.verification?.clientVerified) {
      return (
        <Button asChild className="w-full">
          <Link to={`/project/${payment.projectId}/verification/client`}>
            <CheckCircle className="mr-2 h-4 w-4" />
            Verify Deliverables
          </Link>
        </Button>
      );
    }
    
    if (userRole === 'admin') {
      return (
        <div className="space-y-2">
          <Button onClick={handleReleaseEscrow} className="w-full" variant="default">
            <CheckCircle className="mr-2 h-4 w-4" />
            Release Payment
          </Button>
          <Button onClick={handleRefundEscrow} className="w-full" variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refund Client
          </Button>
        </div>
      );
    }
    
    if (userRole === 'client' && !isDelivered) {
      return (
        <Button onClick={handleDisputeEscrow} className="w-full" variant="outline">
          <AlertTriangle className="mr-2 h-4 w-4" />
          File Dispute
        </Button>
      );
    }
    
    if (userRole === 'developer' && isDelivered) {
      return (
        <div className="flex items-center justify-center space-x-2">
          <Shield className="h-4 w-4 text-blue-500" />
          <span className="text-sm">Waiting for client verification</span>
        </div>
      );
    }
    
    return (
      <div className="flex items-center justify-center space-x-2">
        <Shield className="h-4 w-4 text-blue-500" />
        <span className="text-sm">Funds Secured in Escrow</span>
      </div>
    );
  }

  if (payment.status === 'verified') {
    if (userRole === 'admin') {
      return (
        <Button onClick={handleReleaseEscrow} className="w-full" variant="default">
          <CheckCircle className="mr-2 h-4 w-4" />
          Release Payment
        </Button>
      );
    }
    
    return (
      <div className="text-sm text-purple-600 text-center flex items-center justify-center">
        <FileCheck className="h-4 w-4 mr-1" />
        Verified, awaiting payment release
      </div>
    );
  }

  // For completed statuses, just show a message
  const statusMessages = {
    released: "Payment has been released to the developer",
    refunded: "Payment has been refunded to the client",
    disputed: "This payment is under review by admins"
  };

  return (
    <div className="text-sm text-muted-foreground text-center">
      {statusMessages[payment.status as keyof typeof statusMessages]}
    </div>
  );
};
