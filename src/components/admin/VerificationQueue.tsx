
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockVerifications } from '@/data/mockVerifications';
import { useToast } from "@/hooks/use-toast";
import { VerificationRequest } from '@/data/mockVerifications';
import { useIsMobile } from '@/hooks/use-mobile';

export function VerificationQueue() {
  const [verifications, setVerifications] = useState<VerificationRequest[]>(mockVerifications);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const pendingVerifications = verifications.filter(v => v.status === 'pending');
  const completedVerifications = verifications.filter(v => v.status !== 'pending');

  const handleApprove = (id: string) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, status: 'approved' } : v)
    );
    
    toast({
      title: "Verification Approved",
      description: "The verification request has been approved."
    });
  };

  const handleReject = (id: string) => {
    setVerifications(prev => 
      prev.map(v => v.id === id ? { ...v, status: 'rejected' } : v)
    );
    
    toast({
      title: "Verification Rejected",
      description: "The verification request has been rejected."
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Verification Queue</h2>
      
      <Tabs defaultValue="pending" className="w-full">
        <TabsList className={isMobile ? "w-full" : ""}>
          <TabsTrigger value="pending" className={isMobile ? "flex-1" : ""}>Pending ({pendingVerifications.length})</TabsTrigger>
          <TabsTrigger value="completed" className={isMobile ? "flex-1" : ""}>Completed ({completedVerifications.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4 mt-4">
          {pendingVerifications.length === 0 ? (
            <p className="text-muted-foreground">No pending verification requests.</p>
          ) : (
            pendingVerifications.map((request) => (
              <VerificationCard 
                key={request.id} 
                request={request} 
                onApprove={handleApprove} 
                onReject={handleReject} 
              />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4 mt-4">
          {completedVerifications.map((request) => (
            <VerificationCard 
              key={request.id} 
              request={request} 
              completed
            />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface VerificationCardProps {
  request: VerificationRequest;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  completed?: boolean;
}

function VerificationCard({ request, onApprove, onReject, completed = false }: VerificationCardProps) {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader>
        <div className={`flex ${isMobile ? "flex-col gap-4" : "items-center justify-between"}`}>
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={request.userAvatar} alt={request.userName} />
              <AvatarFallback>{request.userName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{request.userName}</CardTitle>
              <CardDescription>{request.userEmail}</CardDescription>
            </div>
          </div>
          
          {completed ? (
            <Badge variant={request.status === 'approved' ? 'default' : 'destructive'}>
              {request.status === 'approved' ? 'Approved' : 'Rejected'}
            </Badge>
          ) : null}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Verification Type</h4>
            <p>{request.type}</p>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Submitted Documents</h4>
            <ul className="list-disc pl-5 space-y-1">
              {request.documents.map((doc, index) => (
                <li key={index}>
                  <a href="#" className="text-blue-600 hover:underline">{doc}</a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Additional Notes</h4>
            <p className="text-muted-foreground">{request.notes || 'No additional notes provided.'}</p>
          </div>
        </div>
      </CardContent>
      
      {!completed && onApprove && onReject && (
        <CardFooter className={`${isMobile ? "flex-col gap-2" : "flex justify-end"} space-x-2`}>
          <Button variant="outline" onClick={() => onReject(request.id)} className={isMobile ? "w-full" : ""}>
            Reject
          </Button>
          <Button onClick={() => onApprove(request.id)} className={isMobile ? "w-full" : ""}>
            Approve
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
