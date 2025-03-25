
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, CheckCircle, AlertTriangle, FileCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { EscrowSummary } from '@/components/payments/EscrowSummary';
import { EscrowService, PaymentDetails } from '@/services/EscrowService';
import { useAuth } from '@/hooks/useAuth';

// Mock project data - in a real app, this would come from your backend
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

// Interface for our deliverable form items
interface DeliverableItem {
  name: string;
  url: string;
}

const ProjectVerification = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project, setProject] = useState<any>(null);
  const [payment, setPayment] = useState<PaymentDetails | null>(null);
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([
    { name: '', url: '' }
  ]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, { name: '', url: '' }]);
  };

  const handleRemoveDeliverable = (index: number) => {
    const newDeliverables = [...deliverables];
    newDeliverables.splice(index, 1);
    setDeliverables(newDeliverables);
  };

  const handleDeliverableChange = (index: number, field: keyof DeliverableItem, value: string) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index][field] = value;
    setDeliverables(newDeliverables);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    const isValid = deliverables.every(d => d.name.trim() && d.url.trim());
    
    if (!isValid) {
      toast({
        title: "Validation Error",
        description: "Please fill in all deliverable fields",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (!payment || !projectId) {
      toast({
        title: "Error",
        description: "Payment information not found",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    // Call API to mark project as delivered
    const success = EscrowService.markAsDelivered(projectId, deliverables);
    
    if (success) {
      toast({
        title: "Project Submitted",
        description: "Your deliverables have been submitted for verification",
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
        title: "Submission Failed",
        description: "There was an issue submitting your deliverables",
        variant: "destructive",
      });
    }
    
    setIsSubmitting(false);
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

  const isDelivered = payment.verification?.developerDelivered;

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
          
          {isDelivered ? (
            <Card>
              <CardHeader>
                <CardTitle>Project Delivered</CardTitle>
                <CardDescription>
                  Your project has been submitted for verification
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert variant="default" className="bg-green-50 text-green-800 border-green-200">
                  <CheckCircle className="h-4 w-4" />
                  <AlertTitle>Deliverables Submitted</AlertTitle>
                  <AlertDescription>
                    The client will review your work and confirm completion.
                  </AlertDescription>
                </Alert>
                
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
                      
                      {deliverable.verified ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-5 w-5 mr-1" />
                          <span>Verified</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-yellow-600">
                          <FileCheck className="h-5 w-5 mr-1" />
                          <span>Pending Verification</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit}>
              <Card>
                <CardHeader>
                  <CardTitle>Submit Project Deliverables</CardTitle>
                  <CardDescription>
                    Provide links to all deliverables for client verification
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {payment.status !== 'in_escrow' ? (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>Payment Required</AlertTitle>
                      <AlertDescription>
                        The client needs to fund the escrow before you can submit deliverables.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {deliverables.map((deliverable, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <Label>Deliverable {index + 1}</Label>
                              {index > 0 && (
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleRemoveDeliverable(index)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              <div>
                                <Label htmlFor={`name-${index}`} className="sr-only">Name</Label>
                                <Input
                                  id={`name-${index}`}
                                  placeholder="Deliverable name (e.g., Source Code)"
                                  value={deliverable.name}
                                  onChange={(e) => handleDeliverableChange(index, 'name', e.target.value)}
                                />
                              </div>
                              <div>
                                <Label htmlFor={`url-${index}`} className="sr-only">URL</Label>
                                <Input
                                  id={`url-${index}`}
                                  placeholder="URL (e.g., GitHub repository, Google Drive, etc.)"
                                  value={deliverable.url}
                                  onChange={(e) => handleDeliverableChange(index, 'url', e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                        
                        <Button 
                          type="button" 
                          variant="outline" 
                          className="w-full" 
                          onClick={handleAddDeliverable}
                        >
                          <Upload className="mr-2 h-4 w-4" />
                          Add Another Deliverable
                        </Button>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <Label htmlFor="notes">Additional Notes</Label>
                        <Textarea
                          id="notes"
                          placeholder="Provide any additional information about your deliverables"
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="mt-1"
                          rows={4}
                        />
                      </div>
                    </>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={payment.status !== 'in_escrow' || isSubmitting}
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Submit Deliverables
                  </Button>
                </CardFooter>
              </Card>
            </form>
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
                    {payment.status === 'in_escrow' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Client has funded the escrow</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${isDelivered ? 'text-green-500' : 'text-gray-400'}`}>
                    {isDelivered ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Developer submits deliverables</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.verification?.clientVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.verification?.clientVerified ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Client verifies completion</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.verification?.adminVerified ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.verification?.adminVerified ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Admin reviews and approves</span>
                </li>
                
                <li className="flex items-start">
                  <div className={`mt-0.5 mr-2 ${payment.status === 'released' ? 'text-green-500' : 'text-gray-400'}`}>
                    {payment.status === 'released' ? <CheckCircle className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                  </div>
                  <span className="text-sm">Funds are released to developer</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectVerification;
