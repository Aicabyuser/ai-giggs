
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { DollarSign, TrendingUp, LockIcon, ArrowUpRight } from "lucide-react";

export type EarningRecord = {
  id: string;
  projectId: string;
  projectTitle: string;
  amount: number;
  date: Date;
  status: 'paid' | 'pending' | 'in_escrow';
};

interface EarningsDashboardProps {
  totalEarnings: number;
  totalPending: number;
  totalInEscrow: number;
  earningsByMonth: Array<{
    month: string;
    amount: number;
  }>;
  recentEarnings: EarningRecord[];
}

export const EarningsDashboard = ({ 
  totalEarnings, 
  totalPending, 
  totalInEscrow, 
  earningsByMonth, 
  recentEarnings 
}: EarningsDashboardProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Earnings</CardDescription>
            <CardTitle className="text-3xl">${totalEarnings.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-500">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">Lifetime earnings</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending</CardDescription>
            <CardTitle className="text-3xl">${totalPending.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-yellow-500">
              <DollarSign className="h-4 w-4 mr-1" />
              <span className="text-sm">Awaiting payment</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Escrow</CardDescription>
            <CardTitle className="text-3xl">${totalInEscrow.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-blue-500">
              <LockIcon className="h-4 w-4 mr-1" />
              <span className="text-sm">Secured in escrow</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Earnings Over Time</CardTitle>
          <CardDescription>Your monthly earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={earningsByMonth}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Earnings']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest project payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentEarnings.map((earning) => (
                <TableRow key={earning.id}>
                  <TableCell>{earning.date.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="font-medium">{earning.projectTitle}</div>
                    <div className="text-xs text-muted-foreground">Project ID: {earning.projectId}</div>
                  </TableCell>
                  <TableCell>${earning.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={
                      earning.status === 'paid' ? 'default' : 
                      earning.status === 'in_escrow' ? 'outline' : 
                      'secondary'
                    }>
                      {earning.status.replace('_', ' ')}
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
