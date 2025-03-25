
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Briefcase, Calendar, MessageSquare, Award, Code, Clock, CheckCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from '@/components/Header';
import type { Developer } from '@/hooks/useAIChat';
import { mockDevelopers } from '@/hooks/useAIChat';

const DeveloperProfile = () => {
  const { id } = useParams();
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, we would fetch from an API
    // For now, we'll use the mock data
    const developerId = parseInt(id || '0');
    const foundDeveloper = mockDevelopers.find(dev => dev.id === developerId);
    
    // Simulate API loading
    setTimeout(() => {
      setDeveloper(foundDeveloper || null);
      setLoading(false);
    }, 500);
  }, [id]);
  
  const handleContactDeveloper = () => {
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the developer.",
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
              <p className="text-muted-foreground">Loading developer profile...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!developer) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center mb-8 pt-8">
            <Link to="/project-matching" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="h-4 w-4" />
              Back to Matches
            </Link>
          </div>
          
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Developer Not Found
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              The developer profile you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/project-matching">Find Developers</Link>
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
          <Link to="/project-matching" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft className="h-4 w-4" />
            Back to Matches
          </Link>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Sidebar */}
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-32 w-32 rounded-full overflow-hidden border border-border mb-4">
                      <img 
                        src={developer?.avatar} 
                        alt={developer?.name} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    
                    <h1 className="font-display text-2xl font-semibold">{developer?.name}</h1>
                    <p className="text-muted-foreground mb-3">{developer?.title}</p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>{developer?.rating}/5 ({Math.floor((developer?.projectsCompleted || 0) * 1.5)} reviews)</span>
                    </div>
                    
                    <Button 
                      className="w-full flex items-center gap-2 mb-4"
                      onClick={handleContactDeveloper}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Contact Developer
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        toast({
                          title: "Coming Soon",
                          description: "This feature will be available soon.",
                        });
                      }}
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule Meeting
                    </Button>
                  </div>
                  
                  <div className="border-t border-border mt-6 pt-6">
                    <h3 className="font-semibold mb-3">Developer Stats</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Briefcase className="h-4 w-4" /> Projects
                        </span>
                        <span className="font-medium">{developer?.projectsCompleted}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Clock className="h-4 w-4" /> Avg. Response
                        </span>
                        <span className="font-medium">2 hours</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" /> Completion Rate
                        </span>
                        <span className="font-medium">98%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground flex items-center gap-2">
                          <Award className="h-4 w-4" /> Member Since
                        </span>
                        <span className="font-medium">Jan 2022</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-border mt-6 pt-6">
                    <h3 className="font-semibold mb-3">Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {developer?.skills.map((skill, i) => (
                        <span 
                          key={i} 
                          className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                        >
                          {skill.name}
                        </span>
                      ))}
                      {/* Add some additional skills */}
                      <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">Python</span>
                      <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">AWS</span>
                      <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">API Design</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Profile Content */}
            <div className="md:col-span-2">
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="font-display text-xl font-semibold mb-4">About {developer?.name}</h2>
                  <p className="text-muted-foreground mb-4">
                    As an experienced {developer?.title}, I've spent the last 5 years building cutting-edge AI solutions 
                    for clients across healthcare, fintech, and e-commerce sectors. My expertise in 
                    {developer?.skills.map(skill => skill.name).join(', ')} allows me to develop robust, scalable AI systems that deliver measurable business impact.
                  </p>
                  <p className="text-muted-foreground">
                    I believe in creating AI that's not just powerful, but also ethical and user-friendly. 
                    Every project I undertake follows rigorous development methodologies, 
                    with clear communication and documentation throughout the process.
                  </p>
                </CardContent>
              </Card>
              
              <Tabs defaultValue="projects">
                <TabsList className="mb-4">
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  <TabsTrigger value="availability">Availability</TabsTrigger>
                </TabsList>
                
                <TabsContent value="projects">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Recent Projects</h3>
                      <div className="space-y-6">
                        {[1, 2, 3].map((index) => (
                          <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">
                                {index === 1 && "AI-Powered Recommendation Engine"}
                                {index === 2 && "Computer Vision for Quality Control"}
                                {index === 3 && "Natural Language Processing Chatbot"}
                              </h4>
                              <span className="text-xs bg-secondary/50 px-2 py-1 rounded-full">
                                {index === 1 && "E-commerce"}
                                {index === 2 && "Manufacturing"}
                                {index === 3 && "Customer Service"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {index === 1 && "Developed a personalized product recommendation system using collaborative filtering and content-based algorithms."}
                              {index === 2 && "Implemented an automated visual inspection system that reduced defect rates by 32%."}
                              {index === 3 && "Created a conversational AI assistant capable of handling customer inquiries with 89% accuracy."}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {index === 1 && (
                                <>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">Recommendation Systems</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">TensorFlow</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">A/B Testing</span>
                                </>
                              )}
                              {index === 2 && (
                                <>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">Computer Vision</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">PyTorch</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">OpenCV</span>
                                </>
                              )}
                              {index === 3 && (
                                <>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">NLP</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">BERT</span>
                                  <span className="bg-secondary/30 px-2 py-1 rounded-full text-xs">RAG</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Client Reviews</h3>
                      <div className="space-y-6">
                        {[1, 2, 3].map((index) => (
                          <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                            <div className="flex items-center mb-3">
                              <div className="flex mr-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className={`h-4 w-4 ${star <= 5-(index-1)/2 ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`} />
                                ))}
                              </div>
                              <span className="text-sm font-medium">
                                {index === 1 && "Excellent work!"}
                                {index === 2 && "Great expertise and communication"}
                                {index === 3 && "Delivered on time and on budget"}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              {index === 1 && "Went above and beyond our expectations. The AI solution dramatically improved our conversion rates and customer retention."}
                              {index === 2 && "Very knowledgeable and kept us updated throughout the project. Made complex concepts easy to understand."}
                              {index === 3 && "Professional and efficient. Would definitely work with them again on future AI projects."}
                            </p>
                            <div className="flex justify-between">
                              <span className="text-xs text-muted-foreground">
                                {index === 1 && "Sarah J., CTO at TechRetail"}
                                {index === 2 && "Michael B., Product Manager"}
                                {index === 3 && "Elena K., Startup Founder"}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {index === 1 && "2 months ago"}
                                {index === 2 && "4 months ago"}
                                {index === 3 && "7 months ago"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="availability">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold mb-4">Current Availability</h3>
                      <div className="space-y-6">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="h-3 w-3 rounded-full bg-green-500"></div>
                          <span className="font-medium">Available for new projects</span>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Earliest start date</span>
                            <span className="font-medium">Immediate</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Preferred project length</span>
                            <span className="font-medium">3-6 months</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Weekly availability</span>
                            <span className="font-medium">30+ hours</span>
                          </div>
                        </div>
                        
                        <div className="pt-6">
                          <Button 
                            className="w-full flex items-center gap-2"
                            onClick={handleContactDeveloper}
                          >
                            <MessageSquare className="h-4 w-4" />
                            Discuss Your Project
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
