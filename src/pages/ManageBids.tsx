
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, DollarSign, Calendar, XCircle, AlertCircle, ArrowUpRight } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

// Mock data for bids
const bids = [
  {
    id: 1,
    projectId: 101,
    projectTitle: "AI-Driven Medical Image Analysis",
    clientName: "MedTech Innovations",
    bidAmount: "$6,500",
    deliveryTime: "8 weeks",
    status: "pending",
    submittedDate: "Oct 20, 2023",
    message: "I have significant experience with medical imaging AI, having worked on similar systems for radiology departments. I can deliver a high-precision system using state-of-the-art CV techniques optimized for healthcare contexts."
  },
  {
    id: 2,
    projectId: 102,
    projectTitle: "Natural Language Processing for Legal Documents",
    clientName: "LegalEase Solutions",
    bidAmount: "$5,000",
    deliveryTime: "6 weeks",
    status: "accepted",
    submittedDate: "Oct 15, 2023",
    message: "My background in legal tech NLP makes me the ideal candidate for this project. I've built similar systems for contract analysis and can provide a customized solution that exceeds your requirements."
  },
  {
    id: 3,
    projectId: 103,
    projectTitle: "Recommendation Engine for E-commerce",
    clientName: "Global Marketplace Inc.",
    bidAmount: "$7,200",
    deliveryTime: "10 weeks",
    status: "rejected",
    submittedDate: "Oct 10, 2023",
    rejectionReason: "Selected a developer with more e-commerce experience",
    message: "I specialize in large-scale recommendation systems and have implemented similar solutions for retail platforms. My approach will solve your cold-start problem while providing real-time recommendation updates."
  },
  {
    id: 4,
    projectId: 104,
    projectTitle: "Speech Recognition for Customer Service",
    clientName: "ServiceFirst Corp",
    bidAmount: "$6,000",
    deliveryTime: "9 weeks",
    status: "pending",
    submittedDate: "Oct 18, 2023",
    message: "My expertise in audio processing and speech recognition is a perfect fit for your requirements. I can deliver a system that accurately transcribes conversations while identifying industry-specific terminology."
  }
];

const ManageBids = () => {
  const pendingBids = bids.filter(bid => bid.status === "pending");
  const acceptedBids = bids.filter(bid => bid.status === "accepted");
  const rejectedBids = bids.filter(bid => bid.status === "rejected");

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Manage Proposals</h1>
        <p className="text-muted-foreground mt-1">Track and manage your project proposals</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Proposals ({bids.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingBids.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedBids.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedBids.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {bids.map((bid) => (
            <BidCard key={bid.id} bid={bid} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-6">
          {pendingBids.length > 0 ? (
            pendingBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Clock className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You don't have any pending proposals</p>
                <Button asChild>
                  <Link to="/find-projects">Browse Projects</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="accepted" className="space-y-6">
          {acceptedBids.length > 0 ? (
            acceptedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <Check className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You don't have any accepted proposals yet</p>
                <Button asChild>
                  <Link to="/find-projects">Find Projects</Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-6">
          {rejectedBids.length > 0 ? (
            rejectedBids.map((bid) => (
              <BidCard key={bid.id} bid={bid} />
            ))
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <XCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-4">You don't have any rejected proposals</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface BidCardProps {
  bid: {
    id: number;
    projectId: number;
    projectTitle: string;
    clientName: string;
    bidAmount: string;
    deliveryTime: string;
    status: string;
    submittedDate: string;
    message: string;
    rejectionReason?: string;
  };
}

const BidCard = ({ bid }: BidCardProps) => {
  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    accepted: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800"
  };
  
  const statusText = {
    pending: "Pending Review",
    accepted: "Accepted",
    rejected: "Not Selected"
  };
  
  const statusIcons = {
    pending: <Clock className="h-4 w-4 mr-1" />,
    accepted: <Check className="h-4 w-4 mr-1" />,
    rejected: <XCircle className="h-4 w-4 mr-1" />
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="font-semibold text-lg">
                <Link to={`/project/${bid.projectId}`} className="hover:underline">
                  {bid.projectTitle}
                </Link>
              </h3>
              <p className="text-sm text-muted-foreground">Client: {bid.clientName}</p>
            </div>
            <div className="mt-2 md:mt-0">
              <span className={`px-3 py-1 rounded-full text-xs flex items-center inline-flex ${
                statusColors[bid.status as keyof typeof statusColors]
              }`}>
                {statusIcons[bid.status as keyof typeof statusIcons]}
                {statusText[bid.status as keyof typeof statusText]}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Your Proposal</p>
              <p className="font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                {bid.bidAmount}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Delivery Timeline</p>
              <p className="font-medium flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {bid.deliveryTime}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Submitted On</p>
              <p className="font-medium flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {bid.submittedDate}
              </p>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <p className="text-sm font-medium mb-2">Your Message:</p>
            <div className="text-sm bg-secondary/30 p-3 rounded-md">
              {bid.message}
            </div>
          </div>
          
          {bid.status === "rejected" && bid.rejectionReason && (
            <div className="bg-red-50 border border-red-100 rounded-md p-3">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-800">Feedback from client:</p>
                  <p className="text-sm text-red-700">{bid.rejectionReason}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="flex justify-end">
            {bid.status === "accepted" ? (
              <Button asChild>
                <Link to={`/project/${bid.projectId}`}>
                  Go to Project <ArrowUpRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to={`/project/${bid.projectId}`}>
                  View Project
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageBids;
