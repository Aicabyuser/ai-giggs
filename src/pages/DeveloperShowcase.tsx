
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Trophy, Star, Code, Brain, Briefcase, Award, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Header from '@/components/Header';

// Mock top AI developers
const topDevelopers = [
  {
    id: 1,
    name: "Sarah Chen",
    specialty: "Computer Vision Expert",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.9,
    skills: ["Computer Vision", "TensorFlow", "PyTorch"],
    projects: 37,
    featured: true,
    achievements: ["Top 1% Developer", "AI Hackathon Winner 2023"],
    description: "Specialized in computer vision algorithms with 7+ years of experience in building real-world applications for autonomous vehicles and medical imaging."
  },
  {
    id: 2,
    name: "Alex Johnson",
    specialty: "NLP Specialist",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.8,
    skills: ["NLP", "BERT", "GPT Integration"],
    projects: 42,
    featured: true,
    achievements: ["Google AI Research Contributor", "5-Star Excellence Award"],
    description: "Expert in natural language processing with experience implementing conversational AI systems for enterprise clients. Published author on language model fine-tuning techniques."
  },
  {
    id: 3,
    name: "Maya Rodriguez",
    specialty: "Machine Learning Engineer",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    rating: 4.7,
    skills: ["Deep Learning", "Data Science", "MLOps"],
    projects: 31,
    featured: true,
    achievements: ["AWS Machine Learning Hero", "Published Researcher"],
    description: "Full-stack machine learning engineer specializing in production ML systems. Experienced in building end-to-end pipelines from data acquisition to model deployment."
  },
  {
    id: 4,
    name: "David Kim",
    specialty: "AI Ethics & Governance",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 4.6,
    skills: ["AI Ethics", "Bias Detection", "Responsible AI"],
    projects: 28,
    featured: false,
    achievements: ["AI Ethics Board Member", "Certified AI Auditor"],
    description: "Specialized in ensuring AI systems are ethically designed and deployed. Consults on bias mitigation strategies and responsible AI governance frameworks."
  },
  {
    id: 5,
    name: "Jasmine Patel",
    specialty: "Reinforcement Learning",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    rating: 4.8,
    skills: ["Reinforcement Learning", "Game AI", "Simulation"],
    projects: 24,
    featured: false,
    achievements: ["Top Kaggle Competitor", "Research Publication in Nature AI"],
    description: "Expert in reinforcement learning algorithms with applications in robotics, game AI, and optimization problems. Previously developed AI systems for autonomous drones."
  },
  {
    id: 6,
    name: "Michael Torres",
    specialty: "AI Infrastructure",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.7,
    skills: ["Kubernetes", "MLOps", "Distributed Training"],
    projects: 34,
    featured: false,
    achievements: ["Google Cloud Certified", "MLOps Community Lead"],
    description: "Specialized in building scalable infrastructure for training and deploying AI models. Expert in optimization and managing large-scale machine learning workloads."
  }
];

// Mock case studies
const caseStudies = [
  {
    id: 1,
    title: "AI-Powered Recommendation Engine for E-commerce",
    developer: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    category: "Recommendation Systems",
    thumbnail: "https://via.placeholder.com/600x400?text=E-commerce+AI",
    results: "42% increase in customer engagement, 28% higher conversion rate",
    description: "Developed a personalized product recommendation system using collaborative filtering and content-based algorithms."
  },
  {
    id: 2,
    title: "Computer Vision System for Manufacturing Quality Control",
    developer: {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    category: "Computer Vision",
    thumbnail: "https://via.placeholder.com/600x400?text=Manufacturing+AI",
    results: "Reduced defect rates by 32%, saved $2.4M annually",
    description: "Implemented an automated visual inspection system that detects manufacturing defects in real-time."
  },
  {
    id: 3,
    title: "Conversational AI for Customer Support",
    developer: {
      id: 2,
      name: "Alex Johnson",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    category: "NLP",
    thumbnail: "https://via.placeholder.com/600x400?text=Conversational+AI",
    results: "Reduced support tickets by 45%, 24/7 customer assistance",
    description: "Created a conversational AI assistant capable of handling customer inquiries with high accuracy."
  }
];

const DeveloperShowcase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter developers based on search
  const filteredDevelopers = topDevelopers.filter(dev => 
    dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dev.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
              World-Class AI Talent
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover top AI developers with proven expertise in machine learning, computer vision, 
              natural language processing, and other specialized fields.
            </p>
          </div>
          
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search by name, specialty, or skill..."
                className="pl-10 py-6 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <Tabs defaultValue="featured" className="mb-12">
            <TabsList className="mb-8">
              <TabsTrigger value="featured">Featured Experts</TabsTrigger>
              <TabsTrigger value="all">All Developers</TabsTrigger>
              <TabsTrigger value="case-studies">Case Studies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="featured">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevelopers
                  .filter(dev => dev.featured)
                  .map(developer => (
                    <Card key={developer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <Avatar className="h-16 w-16 border-2 border-primary/20">
                              <AvatarImage src={developer.avatar} alt={developer.name} />
                              <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              Featured
                            </Badge>
                          </div>
                          
                          <h3 className="font-semibold text-xl mb-1">{developer.name}</h3>
                          <p className="text-muted-foreground text-sm mb-3">{developer.specialty}</p>
                          
                          <div className="flex items-center text-sm mb-4">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                            <span>{developer.rating}/5</span>
                            <span className="mx-2">•</span>
                            <Briefcase className="h-4 w-4 mr-1" />
                            <span>{developer.projects} Projects</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4">
                            {developer.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {developer.skills.map((skill, i) => (
                              <Badge key={i} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                          
                          <div className="border-t pt-4">
                            <h4 className="text-sm font-medium mb-2 flex items-center">
                              <Award className="h-4 w-4 mr-2" /> 
                              Achievements
                            </h4>
                            <ul className="text-sm text-muted-foreground">
                              {developer.achievements.map((achievement, i) => (
                                <li key={i} className="flex items-start mb-1">
                                  <span className="mr-2">•</span>
                                  {achievement}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="bg-muted p-4 flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">
                            Available for hire
                          </span>
                          <Button asChild size="sm">
                            <Link to={`/developer/${developer.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDevelopers.map(developer => (
                  <Card key={developer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Avatar className="h-16 w-16 border-2 border-primary/20">
                            <AvatarImage src={developer.avatar} alt={developer.name} />
                            <AvatarFallback>{developer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {developer.featured && (
                            <Badge variant="secondary" className="flex items-center gap-1">
                              <Trophy className="h-3 w-3" />
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <h3 className="font-semibold text-xl mb-1">{developer.name}</h3>
                        <p className="text-muted-foreground text-sm mb-3">{developer.specialty}</p>
                        
                        <div className="flex items-center text-sm mb-4">
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                          <span>{developer.rating}/5</span>
                          <span className="mx-2">•</span>
                          <Briefcase className="h-4 w-4 mr-1" />
                          <span>{developer.projects} Projects</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {developer.skills.map((skill, i) => (
                            <Badge key={i} variant="outline">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Available for hire
                        </span>
                        <Button asChild size="sm">
                          <Link to={`/developer/${developer.id}`}>
                            View Profile
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="case-studies">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {caseStudies.map(study => (
                  <Card key={study.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={study.thumbnail} 
                          alt={study.title}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4">
                          {study.category}
                        </Badge>
                      </div>
                      
                      <div className="p-6">
                        <div className="flex items-center mb-4">
                          <Avatar className="h-8 w-8 mr-3">
                            <AvatarImage src={study.developer.avatar} alt={study.developer.name} />
                            <AvatarFallback>{study.developer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">By {study.developer.name}</span>
                        </div>
                        
                        <h3 className="font-semibold text-xl mb-3">{study.title}</h3>
                        <p className="text-muted-foreground mb-4">{study.description}</p>
                        
                        <div className="bg-secondary/30 p-4 rounded-lg mb-4">
                          <h4 className="text-sm font-medium mb-1">Results</h4>
                          <p className="text-sm">{study.results}</p>
                        </div>
                        
                        <Button asChild variant="outline" className="w-full">
                          <Link to={`/case-study/${study.id}`}>
                            Read Full Case Study
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
              Need Help Finding the Perfect AI Developer?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Let us match you with AI specialists who have the exact skills and expertise your project needs.
            </p>
            <Button asChild size="lg">
              <Link to="/post-project">
                Post Your Project
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeveloperShowcase;
