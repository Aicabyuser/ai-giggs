
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, MessageSquare, Calendar, Clock, DollarSign, FileCheck } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import { useToast } from '@/hooks/use-toast';

// Mock data
const projectDetails = {
  id: 1,
  title: "Machine Learning Data Pipeline",
  description: "Create an end-to-end ML pipeline for processing financial data, including ETL processes, feature engineering, and model deployment infrastructure.",
  budget: "$3,000-5,000",
  timeline: "6 weeks",
  postedDate: "Oct 15, 2023",
  status: "active",
  category: "Machine Learning",
  skills: ["Python", "TensorFlow", "AWS", "Data Engineering"]
};

const bids = [
  {
    id: 1,
    developer: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4.9,
      completedProjects: 37,
      hourlyRate: "$75",
      skills: ["Machine Learning", "TensorFlow", "Python"],
    },
    bid: "$4,200",
    deliveryTime: "5 weeks",
    message: "I have extensive experience creating ML data pipelines for financial institutions. I've worked on similar projects and can deliver a robust, scalable solution ahead of schedule.",
    status: "pending"
  },
  {
    id: 2,
    developer: {
      id: 2,
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 4.8,
      completedProjects: 42,
      hourlyRate: "$85",
      skills: ["Data Engineering", "AWS", "Python"],
    },
    bid: "$4,800",
    deliveryTime: "6 weeks",
    message: "My background in financial data engineering makes me the ideal candidate for this project. I'll create a highly optimized pipeline with comprehensive documentation.",
    status: "pending"
  },
  {
    id: 3,
    developer: {
      id: 3,
      name: "Maya Rodriguez",
      avatar: "https://randomuser.me/api/portraits/women/66.jpg",
      rating: 4.7,
      completedProjects: 31,
      hourlyRate: "$70",
      skills: ["TensorFlow", "Data Science", "MLOps"],
    },
    bid: "$3,900",
    deliveryTime: "6 weeks",
    message: "I specialize in building production-ready ML pipelines that are maintainable and scalable. Happy to provide references from similar projects.",
    status: "pending"
  }
];

const ViewBids = () => {
  const { id } = useParams();
  const { toast } = useToast();
  
  const handleAcceptBid = (bidId: number, developerName: string) => {
    // Here we would normally call an API to accept the bid
    toast({
      title: "Bid Accepted",
      description: `You've accepted ${developerName}'s proposal. They have been notified.`,
    });
  };
  
  const handleMessageDeveloper = (developerId: number) => {
    // Here we would normally open a messaging interface or redirect
    window.location.href = `/messages?developer=${developerId}`;
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <Button 
        variant="ghost" 
        className="mb-6" 
        asChild
      >
        <Link to="/manage-projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">{projectDetails.title}</h2>
                <Badge className="mt-2" variant="outline">{projectDetails.category}</Badge>
              </div>
              
              <p className="text-sm">{projectDetails.description}</p>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Budget:</span>
                  </div>
                  <span className="text-sm font-medium">{projectDetails.budget}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Timeline:</span>
                  </div>
                  <span className="text-sm font-medium">{projectDetails.timeline}</span>
                </div>
                
                <div className="flex justify-between">
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    <span>Posted:</span>
                  </div>
                  <span className="text-sm font-medium">{projectDetails.postedDate}</span>
                </div>
              </div>
              
              <Separator />
              
              <div>
                <p className="text-sm font-medium mb-2">Required Skills:</p>
                <div className="flex flex-wrap gap-2">
                  {projectDetails.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">{skill}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Developer Proposals ({bids.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All Proposals</TabsTrigger>
                  <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all" className="space-y-6">
                  {bids.map((bid) => (
                    <Card key={bid.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex items-start gap-4">
                            <div className="h-16 w-16 rounded-full overflow-hidden border border-border flex-shrink-0">
                              <img 
                                src={bid.developer.avatar} 
                                alt={bid.developer.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            
                            <div>
                              <h3 className="font-display text-xl font-semibold">
                                <Link to={`/developer/${bid.developer.id}`} className="hover:underline">
                                  {bid.developer.name}
                                </Link>
                              </h3>
                              <div className="flex gap-4 mt-1">
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                  <span>{bid.developer.rating}/5</span>
                                </div>
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <FileCheck className="h-4 w-4" />
                                  <span>{bid.developer.completedProjects} projects</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2 mt-2">
                                {bid.developer.skills.map((skill, i) => (
                                  <span 
                                    key={i} 
                                    className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="mt-3 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-xs text-muted-foreground">Bid Amount</p>
                                  <p className="font-medium">{bid.bid}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-muted-foreground">Delivery Time</p>
                                  <p className="font-medium">{bid.deliveryTime}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="md:ml-auto">
                            <p className="text-sm mb-4">{bid.message}</p>
                            <div className="flex gap-3">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMessageDeveloper(bid.developer.id)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleAcceptBid(bid.id, bid.developer.name)}
                              >
                                Accept Proposal
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="shortlisted">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't shortlisted any proposals yet.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewBids;
