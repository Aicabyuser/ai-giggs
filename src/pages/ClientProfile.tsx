
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Building, MapPin, Globe, Edit2, Settings, Mail, Calendar } from 'lucide-react';

// Mock client data
const clientData = {
  name: "Acme AI Solutions",
  avatar: "/placeholder.svg",
  bio: "We're a tech company focused on integrating AI solutions into enterprise workflows. Looking for skilled AI developers to help with various projects.",
  location: "San Francisco, CA",
  website: "acmeaisolutions.com",
  industry: "Technology / SaaS",
  founded: "2018",
  email: "projects@acmeaisolutions.com",
  projects: [
    {
      id: 1,
      title: "Machine Learning Data Pipeline",
      status: "active",
      developer: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      },
      date: "Oct 15, 2023"
    },
    {
      id: 2,
      title: "NLP Sentiment Analysis Tool",
      status: "active",
      developer: {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      date: "Oct 18, 2023"
    },
    {
      id: 4,
      title: "AI Chatbot with GPT Integration",
      status: "completed",
      developer: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
      },
      date: "Sep 5, 2023"
    },
    {
      id: 5,
      title: "Recommendation Engine",
      status: "completed",
      developer: {
        name: "Maya Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg"
      },
      date: "Aug 22, 2023"
    }
  ],
  reviews: [
    {
      id: 1,
      developer: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/75.jpg"
      },
      rating: 5,
      comment: "Great client to work with! Clear requirements and prompt feedback throughout the project.",
      date: "Oct 5, 2023",
      project: "AI Chatbot with GPT Integration"
    },
    {
      id: 2,
      developer: {
        name: "Maya Rodriguez",
        avatar: "https://randomuser.me/api/portraits/women/66.jpg"
      },
      rating: 4,
      comment: "Professional client with a well-defined project scope. Communication was excellent.",
      date: "Sep 2, 2023",
      project: "Recommendation Engine"
    }
  ]
};

const ClientProfile = () => {
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={clientData.avatar} alt={clientData.name} />
                  <AvatarFallback>{clientData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{clientData.name}</h2>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{clientData.location}</span>
                </div>
                
                <div className="mt-6 w-full">
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/client-settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{clientData.bio}</p>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Industry:</span>
                  <span className="font-medium">{clientData.industry}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Founded:</span>
                  <span className="font-medium">{clientData.founded}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Website:</span>
                  <a href={`https://${clientData.website}`} className="font-medium text-primary hover:underline" target="_blank" rel="noopener noreferrer">{clientData.website}</a>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-medium">{clientData.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="mb-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects ({clientData.projects.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clientData.projects.map((project) => (
                      <div key={project.id} className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={project.developer.avatar} alt={project.developer.name} />
                          <AvatarFallback>{project.developer.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">
                                <Link to={`/project/${project.id}`} className="hover:underline">
                                  {project.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Developer: {project.developer.name}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {project.status === 'active' ? 'Active' : 'Completed'}
                              </span>
                              <p className="text-xs text-muted-foreground mt-1">{project.date}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews from Developers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {clientData.reviews.map((review) => (
                      <div key={review.id} className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.developer.avatar} alt={review.developer.name} />
                            <AvatarFallback>{review.developer.name.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{review.developer.name}</h3>
                                <div className="flex items-center mt-1">
                                  {Array(5).fill(0).map((_, i) => (
                                    <svg 
                                      key={i}
                                      className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`}
                                      xmlns="http://www.w3.org/2000/svg" 
                                      viewBox="0 0 24 24"
                                    >
                                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                                    </svg>
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">{review.date}</p>
                            </div>
                            <p className="text-sm mt-2">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Project: {review.project}
                            </p>
                          </div>
                        </div>
                        {review.id !== clientData.reviews.length && <Separator />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
