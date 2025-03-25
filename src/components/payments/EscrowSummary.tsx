
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { PaymentDetails } from '@/services/EscrowService';
import { DollarSign, Calendar, User } from 'lucide-react';

interface EscrowSummaryProps {
  payment: PaymentDetails;
}

export const EscrowSummary = ({ payment }: EscrowSummaryProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Escrow Payment</h3>
            <PaymentStatusBadge status={payment.status} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">${payment.amount.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Created</p>
                <p className="font-medium">{payment.createdAt.toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <User className="h-5 w-5 mr-2 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Updated</p>
                <p className="font-medium">{payment.updatedAt.toLocaleDateString()}</p>
              </div>
            </div>
          </div>
          
          {payment.verification && (
            <div className="pt-2 border-t">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Client Verification</p>
                  <p className="font-medium">
                    {payment.verification.clientVerified 
                      ? `Verified on ${payment.verification.clientVerifiedAt?.toLocaleDateString()}` 
                      : 'Pending'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground">Developer Delivery</p>
                  <p className="font-medium">
                    {payment.verification.developerDelivered 
                      ? `Delivered on ${payment.verification.developerDeliveredAt?.toLocaleDateString()}` 
                      : 'Pending'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
