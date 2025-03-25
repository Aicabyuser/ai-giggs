
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileCheck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EscrowSummary } from '@/components/payments/EscrowSummary';
import { PaymentActions } from '@/components/payments/PaymentActions';
import { EscrowService, PaymentDetails } from '@/services/EscrowService';
import { useToast } from '@/hooks/use-toast';

// Mock verification data
const mockVerifications = {
  "1": {
    clientVerified: true,
    clientVerifiedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    adminVerified: false,
    developerDelivered: true,
    developerDeliveredAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    deliverables: [
      { name: "Source Code", url: "#", verified: true },
      { name: "Documentation", url: "#", verified: true },
      { name: "Test Results", url: "#", verified: false },
    ]
  },
  "2": {
    clientVerified: false,
    adminVerified: false,
    developerDelivered: true,
    developerDeliveredAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    deliverables: [
      { name: "ML Model", url: "#", verified: false },
      { name: "API Documentation", url: "#", verified: false },
    ]
  }
};

const AdminEscrowVerification = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [verification, setVerification] = useState<any>(null);

  useEffect(() => {
    if (projectId) {
      // In a real app, these would be API calls
      const projectPayments = EscrowService.getProjectPayments(projectId);
      if (projectPayments.length > 0) {
        setPayment(projectPayments[0]);
      }
      
      if (mockVerifications[projectId as keyof typeof mockVerifications]) {
        setVerification(mockVerifications[projectId as keyof typeof mockVerifications]);
      }
    }
  }, [projectId]);

  const handlePaymentUpdated = () => {
    if (projectId) {
      const projectPayments = EscrowService.getProjectPayments(projectId);
      if (projectPayments.length > 0) {
        setPayment(projectPayments[0]);
      }
    }
  };

  const handleVerifyDeliverable = (index: number) => {
    if (verification && verification.deliverables) {
      const updatedVerification = {...verification};
      updatedVerification.deliverables[index].verified = true;
      setVerification(updatedVerification);
      
      toast({
        title: "Deliverable Verified",
        description: `${verification.deliverables[index].name} has been verified`,
      });
    }
  };

  const handleAdminVerify = () => {
    if (verification) {
      const updatedVerification = {...verification, adminVerified: true};
      setVerification(updatedVerification);
      
      toast({
        title: "Project Verified",
        description: "You've verified this project as complete",
      });
    }
  };

  if (!payment || !verification) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <p>Loading payment details...</p>
        </div>
      </div>
    );
  }

  const allDeliverablesVerified = verification.deliverables.every((d: any) => d.verified);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/admin-dashboard" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold">Project Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify project completion and release payment
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EscrowSummary payment={payment} />
          
          <Card>
            <CardHeader>
              <CardTitle>Deliverables Verification</CardTitle>
              <CardDescription>
                Verify each deliverable before releasing payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="deliverables">
                <TabsList className="mb-4">
                  <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                  <TabsTrigger value="status">Verification Status</TabsTrigger>
                </TabsList>
                
                <TabsContent value="deliverables" className="space-y-4">
                  {verification.deliverables.map((deliverable: any, index: number) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h4 className="font-medium">{deliverable.name}</h4>
                        <a href={deliverable.url} className="text-sm text-blue-600 hover:underline">
                          View File
                        </a>
                      </div>
                      
                      {deliverable.verified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <Button size="sm" onClick={() => handleVerifyDeliverable(index)}>
                          Verify
                        </Button>
                      )}
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="status">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Developer Delivered</h4>
                        <p className="text-sm text-muted-foreground">
                          {verification.developerDelivered 
                            ? `Delivered ${new Date(verification.developerDeliveredAt).toLocaleDateString()}`
                            : 'Not yet delivered'}
                        </p>
                      </div>
                      
                      {verification.developerDelivered ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Completed</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <Clock className="h-5 w-5 mr-1" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Client Verified</h4>
                        <p className="text-sm text-muted-foreground">
                          {verification.clientVerified 
                            ? `Verified on ${new Date(verification.clientVerifiedAt).toLocaleDateString()}`
                            : 'Awaiting client verification'}
                        </p>
                      </div>
                      
                      {verification.clientVerified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <Clock className="h-5 w-5 mr-1" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Admin Verification</h4>
                        <p className="text-sm text-muted-foreground">
                          {verification.adminVerified 
                            ? 'Verified by admin'
                            : 'Awaiting admin verification'}
                        </p>
                      </div>
                      
                      {verification.adminVerified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <Clock className="h-5 w-5 mr-1" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>
                Verify project and release payment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {verification.adminVerified ? (
                <div className="flex items-center justify-center bg-green-50 p-4 rounded-md text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Project verified by admin
                </div>
              ) : (
                <Button 
                  onClick={handleAdminVerify} 
                  className="w-full"
                  disabled={!verification.clientVerified || !allDeliverablesVerified}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Verify Project
                </Button>
              )}
              
              <Separator />
              
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Payment Release</h4>
                <PaymentActions 
                  payment={payment} 
                  userRole="admin" 
                  onPaymentUpdated={handlePaymentUpdated} 
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Verification Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${verification.developerDelivered ? 'text-green-500' : 'text-gray-400'}`}>
                    {verification.developerDelivered ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Developer has delivered all files</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${allDeliverablesVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {allDeliverablesVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">All deliverables have been verified</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${verification.clientVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {verification.clientVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Client has verified completion</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${verification.adminVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {verification.adminVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Admin has verified the project</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminEscrowVerification;
