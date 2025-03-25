
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, User, MessageSquare, Calendar, FileText, ExternalLink, Briefcase, Clock, Edit } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import DeveloperCard, { Developer } from '@/components/DeveloperCard';
import Header from '@/components/Header';

// Mock project data
const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Recommendation Engine",
    description: "Create a personalized product recommendation system for our e-commerce platform.",
    details: "We're looking to enhance user experience on our e-commerce platform by providing personalized product recommendations. The system should analyze user browsing history, past purchases, and similar user behaviors to suggest relevant products. Our platform has approximately 5,000 products across 20 categories, and we have data from about 50,000 users.",
    requirements: [
      "Machine learning expertise, particularly in recommendation systems",
      "Experience with collaborative filtering and content-based algorithms",
      "Proficiency in Python, TensorFlow or PyTorch",
      "Knowledge of AWS services for deployment",
      "Understanding of A/B testing methodologies"
    ],
    status: "In Progress",
    budget: "$5,000 - $10,000",
    timeline: "2-3 months",
    matchedDevelopers: [
      {
        id: 1,
        name: "Sarah Chen",
        specialty: "Computer Vision Expert",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 4.9,
        skills: ["Computer Vision", "TensorFlow", "PyTorch"],
        projects: 37,
        matchPercentage: 92
      },
      {
        id: 2,
        name: "Alex Johnson",
        specialty: "NLP Specialist",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.8,
        skills: ["NLP", "BERT", "GPT Integration"],
        projects: 42,
        matchPercentage: 87
      }
    ],
    updates: [
      {
        id: 1,
        date: "June 15, 2023",
        title: "Project Initiated",
        description: "Project requirements defined and submitted for developer matching."
      },
      {
        id: 2,
        date: "June 17, 2023",
        title: "Developer Matches",
        description: "Received 4 developer matches based on project requirements."
      },
      {
        id: 3,
        date: "June 20, 2023",
        title: "Developer Selected",
        description: "Selected Sarah Chen as the primary developer for this project."
      },
      {
        id: 4,
        date: "June 25, 2023",
        title: "Kickoff Meeting",
        description: "Conducted project kickoff meeting to align on goals and timeline."
      }
    ]
  },
  {
    id: 2,
    title: "Computer Vision for Quality Control",
    description: "Develop a vision system that can detect defects in manufacturing process.",
    details: "Our manufacturing process requires consistent quality control to identify defects in produced items. We're looking to implement a computer vision system that can automatically detect and flag defects in real-time as products move through our assembly line. The system should be able to identify various types of surface defects with high accuracy.",
    requirements: [
      "Computer vision expertise, particularly in defect detection",
      "Experience with image processing and pattern recognition",
      "Proficiency in Python, OpenCV, and deep learning frameworks",
      "Experience with real-time processing systems",
      "Understanding of manufacturing processes a plus"
    ],
    status: "Matching",
    budget: "$8,000 - $15,000",
    timeline: "3-4 months",
    matchedDevelopers: [
      {
        id: 3,
        name: "Maya Rodriguez",
        specialty: "Machine Learning Engineer",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg",
        rating: 4.7,
        skills: ["Deep Learning", "Data Science", "MLOps"],
        projects: 31,
        matchPercentage: 85
      },
      {
        id: 4,
        name: "David Kim",
        specialty: "AI Ethics & Governance",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg",
        rating: 4.6,
        skills: ["AI Ethics", "Bias Detection", "Responsible AI"],
        projects: 28,
        matchPercentage: 79
      }
    ],
    updates: [
      {
        id: 1,
        date: "July 5, 2023",
        title: "Project Initiated",
        description: "Project requirements defined and submitted for developer matching."
      },
      {
        id: 2,
        date: "July 8, 2023",
        title: "Developer Matches",
        description: "Received 4 developer matches based on project requirements."
      }
    ]
  }
];

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    const projectId = parseInt(id || '0');
    const foundProject = mockProjects.find(p => p.id === projectId);
    
    // Simulate API loading
    setTimeout(() => {
      setProject(foundProject || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleContactDeveloper = (developerId: number) => {
    toast({
      title: "Request Sent!",
      description: "Your connection request has been sent to the developer.",
    });
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center h-[50vh]">
            <div className="flex flex-col items-center gap-4">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
              <p className="text-muted-foreground">Loading project details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center mb-8 pt-8">
            <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Project Not Found
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center mb-8 pt-8">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold mb-2">{project.title}</h1>
              <p className="text-muted-foreground">{project.description}</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <span className={`text-sm px-3 py-1 rounded-full ${
                project.status === "In Progress" 
                  ? "bg-green-500/10 text-green-600" 
                  : "bg-blue-500/10 text-blue-600"
              }`}>
                {project.status}
              </span>
            </div>
          </div>
          
          <Tabs defaultValue="overview">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="developers">Developers ({project.matchedDevelopers.length})</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <span>Project Details</span>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Edit Project",
                              description: "Project editing will be available soon.",
                            });
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{project.details}</p>
                      
                      <h3 className="font-semibold mb-3">Requirements</h3>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-6">
                        {project.requirements.map((req: string, index: number) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="md:col-span-1">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>Project Info</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Budget</h4>
                          <p className="text-muted-foreground">{project.budget}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Timeline</h4>
                          <p className="text-muted-foreground">{project.timeline}</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Matched Developers</h4>
                          <p className="text-muted-foreground">{project.matchedDevelopers.length} developers</p>
                        </div>
                        
                        <div className="pt-4">
                          <Button 
                            variant="outline" 
                            className="w-full flex items-center gap-2"
                            onClick={() => {
                              toast({
                                title: "Find More Developers",
                                description: "Redirecting to find more developers",
                              });
                              setTimeout(() => {
                                window.location.href = "/project-matching";
                              }, 1000);
                            }}
                          >
                            <User className="h-4 w-4" />
                            Find More Developers
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Actions</CardTitle>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <Button 
                          className="w-full flex items-center gap-2"
                          asChild
                        >
                          <Link to="/messages">
                            <MessageSquare className="h-4 w-4" />
                            Messages
                          </Link>
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          className="w-full flex items-center gap-2"
                          onClick={() => {
                            toast({
                              title: "Schedule Meeting",
                              description: "This feature will be available soon.",
                            });
                          }}
                        >
                          <Calendar className="h-4 w-4" />
                          Schedule Meeting
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="developers">
              <div className="space-y-6">
                {project.matchedDevelopers.map((developer: Developer) => (
                  <DeveloperCard 
                    key={developer.id} 
                    developer={developer} 
                    onContact={() => handleContactDeveloper(developer.id)}
                  />
                ))}
                
                {project.matchedDevelopers.length === 0 && (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-medium mb-2">No Developers Matched Yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        You haven't been matched with any developers yet. Start the matching process to find the perfect developer for your project.
                      </p>
                      <Button asChild>
                        <Link to="/project-matching">Find Developers</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>Project Timeline</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="relative">
                    <div className="absolute top-0 bottom-0 left-3 w-0.5 bg-border"></div>
                    
                    <div className="space-y-8">
                      {project.updates.map((update: any, index: number) => (
                        <div key={update.id} className="relative ml-10">
                          <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-primary"></div>
                          </div>
                          
                          <div>
                            <span className="text-sm text-muted-foreground block mb-1">{update.date}</span>
                            <h3 className="font-medium mb-1">{update.title}</h3>
                            <p className="text-muted-foreground">{update.description}</p>
                          </div>
                        </div>
                      ))}
                      
                      {/* Future milestones for in-progress projects */}
                      {project.status === "In Progress" && (
                        <>
                          <div className="relative ml-10">
                            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-secondary"></div>
                            </div>
                            
                            <div>
                              <span className="text-sm text-muted-foreground block mb-1">Planned: July 15, 2023</span>
                              <h3 className="font-medium mb-1">Initial Prototype Delivery</h3>
                              <p className="text-muted-foreground">First version of the recommendation engine with basic functionality.</p>
                            </div>
                          </div>
                          
                          <div className="relative ml-10">
                            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-secondary"></div>
                            </div>
                            
                            <div>
                              <span className="text-sm text-muted-foreground block mb-1">Planned: August 10, 2023</span>
                              <h3 className="font-medium mb-1">Testing Phase</h3>
                              <p className="text-muted-foreground">A/B testing of recommendation algorithm and performance optimization.</p>
                            </div>
                          </div>
                          
                          <div className="relative ml-10">
                            <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full border border-border bg-background flex items-center justify-center">
                              <div className="h-3 w-3 rounded-full bg-secondary"></div>
                            </div>
                            
                            <div>
                              <span className="text-sm text-muted-foreground block mb-1">Planned: September 1, 2023</span>
                              <h3 className="font-medium mb-1">Final Delivery</h3>
                              <p className="text-muted-foreground">Complete implementation with documentation and knowledge transfer.</p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documents">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Project Documents</span>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toast({
                          title: "Upload Document",
                          description: "Document upload will be available soon.",
                        });
                      }}
                    >
                      Upload Document
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  {project.status === "In Progress" ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Project Requirements.pdf</h4>
                            <p className="text-xs text-muted-foreground">Added June 15, 2023</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Download Document",
                              description: "Document download will be available soon.",
                            });
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Proposal from Sarah Chen.pdf</h4>
                            <p className="text-xs text-muted-foreground">Added June 18, 2023</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Download Document",
                              description: "Document download will be available soon.",
                            });
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md hover:bg-secondary/10 transition-colors cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <h4 className="font-medium">Project Contract.pdf</h4>
                            <p className="text-xs text-muted-foreground">Added June 22, 2023</p>
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            toast({
                              title: "Download Document",
                              description: "Document download will be available soon.",
                            });
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No Documents Yet</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        You haven't uploaded any documents for this project yet.
                      </p>
                      <Button 
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: "Upload Document",
                            description: "Document upload will be available soon.",
                          });
                        }}
                      >
                        Upload First Document
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
