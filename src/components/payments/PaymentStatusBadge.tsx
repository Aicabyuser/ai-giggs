
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Clock, AlertTriangle, CheckCircle, XCircle, FileCheck } from 'lucide-react';

interface PaymentStatusBadgeProps {
  status: 'pending' | 'in_escrow' | 'released' | 'refunded' | 'disputed' | 'verified';
}

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  const statusConfig = {
    pending: {
      label: 'Pending Payment',
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      icon: <Clock className="h-3.5 w-3.5 mr-1" />
    },
    in_escrow: {
      label: 'In Escrow',
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: <ShieldCheck className="h-3.5 w-3.5 mr-1" />
    },
    verified: {
      label: 'Verified',
      color: 'bg-purple-100 text-purple-800 border-purple-200',
      icon: <FileCheck className="h-3.5 w-3.5 mr-1" />
    },
    released: {
      label: 'Released',
      color: 'bg-green-100 text-green-800 border-green-200',
      icon: <CheckCircle className="h-3.5 w-3.5 mr-1" />
    },
    refunded: {
      label: 'Refunded',
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: <XCircle className="h-3.5 w-3.5 mr-1" />
    },
    disputed: {
      label: 'Disputed',
      color: 'bg-red-100 text-red-800 border-red-200',
      icon: <AlertTriangle className="h-3.5 w-3.5 mr-1" />
    },
  };

  const config = statusConfig[status];

  return (
    <Badge className={`flex items-center font-normal px-2 py-1 ${config.color}`} variant="outline">
      {config.icon}
      {config.label}
    </Badge>
  );
};
