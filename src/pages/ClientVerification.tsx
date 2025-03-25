
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, FileCheck, Clock, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { EscrowSummary } from '@/components/payments/EscrowSummary';
import { useAuth } from '@/hooks/useAuth';
import { EscrowService, PaymentDetails } from '@/services/EscrowService';

// Mock project data
const mockProjects = {
  "1": {
    id: "1",
    title: "Machine Learning Data Pipeline",
    description: "Build a scalable data pipeline for machine learning model training",
    client: { id: "client1", name: "Acme AI Solutions" },
    developer: { id: "dev1", name: "Alex Johnson" },
    budget: 5000,
    status: "active",
  },
};

const ClientVerification = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState<any>(null);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (projectId) {
      // In a real app, these would be API calls
      if (mockProjects[projectId as keyof typeof mockProjects]) {
        setProject(mockProjects[projectId as keyof typeof mockProjects]);
      }
      
      // Check for existing payment
      const projectPayments = EscrowService.getProjectPayments(projectId);
      if (projectPayments.length > 0) {
        setPayment(projectPayments[0]);
      }
    }
  }, [projectId]);

  const handleToggleVerification = (deliverableId: string) => {
    setVerificationStatus(prev => ({
      ...prev,
      [deliverableId]: !prev[deliverableId]
    }));
  };

  const handleVerifyProject = () => {
    if (!payment || !projectId) {
      toast({
        title: "Error",
        description: "Payment information not found",
        variant: "destructive",
      });
      return;
    }
    
    setIsVerifying(true);
    
    // Call API to verify project
    const success = EscrowService.clientVerifyProject(projectId);
    
    if (success) {
      toast({
        title: "Project Verified",
        description: "You have confirmed this project as complete",
      });
      
      // Get updated payment details
      const updatedPayment = EscrowService.getProjectPayments(projectId)[0];
      setPayment(updatedPayment);
      
      // Navigate to project details page
      setTimeout(() => {
        navigate(`/project/${projectId}`);
      }, 2000);
    } else {
      toast({
        title: "Verification Failed",
        description: "There was an issue verifying the project",
        variant: "destructive",
      });
    }
    
    setIsVerifying(false);
  };

  const allDeliverablesVerified = payment?.verification?.deliverables && 
    Object.keys(verificationStatus).length >= payment.verification.deliverables.length &&
    Object.values(verificationStatus).every(status => status === true);

  if (!project || !payment) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

  const isAlreadyVerified = payment.verification?.clientVerified;

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to={`/project/${projectId}`} className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Project
          </Link>
        </Button>
        
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-muted-foreground mt-1">{project.description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EscrowSummary payment={payment} />
          
          {!payment.verification?.developerDelivered ? (
            <Card>
              <CardContent className="p-6">
                <Alert className="bg-yellow-50 text-yellow-800 border-yellow-200">
                  <Clock className="h-4 w-4" />
                  <AlertTitle>Waiting for Developer</AlertTitle>
                  <AlertDescription>
                    The developer has not submitted deliverables yet.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          ) : isAlreadyVerified ? (
            <Card>
              <CardHeader>
                <CardTitle>Project Verified</CardTitle>
                <CardDescription>
                  You have confirmed this project as complete
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Alert className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Verification Complete</AlertTitle>
                  <AlertDescription>
                    An admin will now review the project for final approval.
                  </AlertDescription>
                </Alert>
                
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Deliverables</h3>
                  {payment.verification?.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h4 className="font-medium">{deliverable.name}</h4>
                        <a href={deliverable.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Deliverable
                        </a>
                      </div>
                      
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span>Verified</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Verify Project Completion</CardTitle>
                <CardDescription>
                  Review and verify the deliverables submitted by the developer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Submitted Deliverables</h3>
                  {payment.verification?.deliverables.map((deliverable, index) => (
                    <div key={index} className="flex justify-between items-center border-b pb-3">
                      <div>
                        <h4 className="font-medium">{deliverable.name}</h4>
                        <a href={deliverable.url} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                          View Deliverable
                        </a>
                      </div>
                      
                      <Button 
                        variant={verificationStatus[deliverable.name] ? "outline" : "default"}
                        size="sm"
                        onClick={() => handleToggleVerification(deliverable.name)}
                        className="flex items-center"
                      >
                        {verificationStatus[deliverable.name] ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                            Verified
                          </>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={handleVerifyProject}
                  disabled={!allDeliverablesVerified || isVerifying}
                >
                  <FileCheck className="mr-2 h-4 w-4" />
                  Confirm Project Completion
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verification Process</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.status === 'in_escrow' ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.status === 'in_escrow' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Client has funded the escrow</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.verification?.developerDelivered ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.verification?.developerDelivered ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Developer submits deliverables</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.verification?.clientVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.verification?.clientVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Client verifies completion</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.verification?.adminVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.verification?.adminVerified ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Admin reviews and approves</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.status === 'released' ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.status === 'released' ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Funds are released to developer</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Escrow Protection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start">
                <Shield className="h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm">
                  Your payment is held in escrow until you verify the project has been completed to your satisfaction.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientVerification;
