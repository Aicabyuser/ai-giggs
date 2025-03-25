
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, ArrowUpRight, Clock, CheckCircle, LockIcon } from "lucide-react";

export type PaymentRecord = {
  id: string;
  amount: number;
  date: Date;
  description: string;
  status: 'completed' | 'in_escrow' | 'pending';
  projectId: string;
};

interface PaymentHistoryProps {
  totalEscrow: number;
  paymentRecords: PaymentRecord[];
}

export const PaymentHistory = ({ totalEscrow, paymentRecords }: PaymentHistoryProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Escrow Status</CardTitle>
          <CardDescription>
            Currently held in escrow until project completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <LockIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold">${totalEscrow.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total in escrow</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            Record of all your transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paymentRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{record.description}</div>
                    <div className="text-xs text-muted-foreground">Project: {record.projectId}</div>
                  </TableCell>
                  <TableCell>${record.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      record.status === 'completed' ? 'default' : 
                      record.status === 'in_escrow' ? 'outline' : 
                      'secondary'
                    }>
                      {record.status === 'completed' && <CheckCircle className="mr-1 h-3 w-3" />}
                      {record.status === 'in_escrow' && <LockIcon className="mr-1 h-3 w-3" />}
                      {record.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                      {record.status.replace('_', ' ').charAt(0).toUpperCase() + record.status.replace('_', ' ').slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
