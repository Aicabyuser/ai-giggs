
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Shield, FileCheck, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EscrowSummary } from '@/components/payments/EscrowSummary';
import { PaymentActions } from '@/components/payments/PaymentActions';
import { EscrowService, PaymentDetails } from '@/services/EscrowService';
import { useToast } from '@/hooks/use-toast';

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
  "2": {
    id: "2",
    title: "NLP Sentiment Analysis Tool",
    description: "Create a sentiment analysis tool using natural language processing",
    client: { id: "client2", name: "Techwave Inc." },
    developer: { id: "dev2", name: "Sarah Parker" },
    budget: 3500,
    status: "active",
  }
};

const EscrowPayment = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState<any>(null);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [userRole, setUserRole] = useState<'client' | 'developer' | 'admin'>('client');

  useEffect(() => {
    // In a real app, this would fetch from API
    if (projectId && mockProjects[projectId as keyof typeof mockProjects]) {
      setProject(mockProjects[projectId as keyof typeof mockProjects]);
      
      // Check for existing payment
      const projectPayments = EscrowService.getProjectPayments(projectId);
      if (projectPayments.length > 0) {
        setPayment(projectPayments[0]);
      } else {
        // Create a new payment entry if none exists
        const paymentId = EscrowService.createEscrow(
          projectId,
          mockProjects[projectId as keyof typeof mockProjects].budget,
          mockProjects[projectId as keyof typeof mockProjects].client.id,
          mockProjects[projectId as keyof typeof mockProjects].developer.id
        );
        
        const newPayment = EscrowService.getPaymentDetails(paymentId);
        setPayment(newPayment);
      }
    }
    
    // In a real app, we'd get the user role from auth context
    // For demo, we'll just set it to client
  }, [projectId]);

  const handlePaymentUpdated = () => {
    if (projectId) {
      const projectPayments = EscrowService.getProjectPayments(projectId);
      if (projectPayments.length > 0) {
        setPayment(projectPayments[0]);
      }
    }
  };

  if (!project || !payment) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-center items-center h-64">
          <p>Loading project details...</p>
        </div>
      </div>
    );
  }

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
        <p className="text-muted-foreground mt-1 mb-4">{project.description}</p>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>Client: {project.client.name}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>Developer: {project.developer.name}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EscrowSummary payment={payment} />
          
          <Card>
            <CardHeader>
              <CardTitle>Project Verification</CardTitle>
              <CardDescription>
                Confirm project completion before funds are released
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <FileCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Verification Process</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Once the developer completes the work, both you and our admin team will verify the deliverables. 
                    After successful verification, funds will be released from escrow.
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-sm">Escrow Protection</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your payment is held securely in escrow. Funds are only released to the developer 
                    after you've approved the completed work.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Payment Actions</CardTitle>
              <CardDescription>
                Manage project payment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentActions 
                payment={payment} 
                userRole={userRole} 
                onPaymentUpdated={handlePaymentUpdated} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EscrowPayment;
