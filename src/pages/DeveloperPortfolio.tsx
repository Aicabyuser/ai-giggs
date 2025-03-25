
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Edit2, MapPin, Globe, Briefcase, Star, FileCheck, Award, School, Plus, ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';

// Mock developer data
const developerData = {
  id: 1,
  name: "Sarah Chen",
  title: "Computer Vision Expert",
  avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  bio: "AI researcher and computer vision specialist with 7+ years of experience developing cutting-edge machine learning solutions. I specialize in medical imaging analysis and object detection systems.",
  location: "San Francisco, CA",
  website: "sarahchen.ai",
  hourlyRate: "$75/hr",
  rating: 4.9,
  projectsCompleted: 37,
  joinedDate: "2019",
  education: [
    {
      degree: "PhD in Computer Science, AI Focus",
      school: "Stanford University",
      year: "2018"
    },
    {
      degree: "MSc in Machine Learning",
      school: "UC Berkeley",
      year: "2015"
    }
  ],
  skills: [
    "Computer Vision", "TensorFlow", "PyTorch", "Object Detection", "Image Segmentation", 
    "Medical Imaging", "Python", "Deep Learning", "CNN Architecture", "Transfer Learning"
  ],
  certifications: [
    {
      name: "Google Cloud Professional Machine Learning Engineer",
      issuer: "Google Cloud",
      year: "2021"
    },
    {
      name: "TensorFlow Developer Certificate",
      issuer: "Google",
      year: "2020"
    }
  ],
  projects: [
    {
      id: 1,
      title: "Medical Imaging Analysis Platform",
      client: "HealthTech Innovations",
      description: "Developed an AI system for automated analysis of X-rays and MRIs with 93% accuracy, helping radiologists identify abnormalities faster and with greater precision.",
      technologies: ["Computer Vision", "TensorFlow", "Medical Imaging", "Python"],
      image: "/placeholder.svg",
      year: "2022"
    },
    {
      id: 2,
      title: "Retail Product Recognition System",
      client: "Global Retail Solutions",
      description: "Built a real-time object detection system for identifying products on store shelves, enabling automated inventory management and planogram compliance checking.",
      technologies: ["Object Detection", "PyTorch", "Mobile Optimization", "Edge AI"],
      image: "/placeholder.svg",
      year: "2021"
    },
    {
      id: 3,
      title: "Autonomous Drone Navigation",
      client: "AgriTech Innovators",
      description: "Created a vision-based navigation system for agricultural drones, allowing precise crop monitoring and automated field analysis without GPS dependency.",
      technologies: ["Visual SLAM", "Depth Estimation", "Drone Integration", "Python"],
      image: "/placeholder.svg",
      year: "2020"
    }
  ],
  testimonials: [
    {
      id: 1,
      client: "Dr. James Wilson",
      company: "HealthTech Innovations",
      text: "Sarah delivered an exceptional AI solution that exceeded our expectations. Her expertise in medical imaging is outstanding, and she was able to optimize the model to work efficiently even with our limited computing resources.",
      rating: 5
    },
    {
      id: 2,
      client: "Michael Chang",
      company: "Global Retail Solutions",
      text: "Working with Sarah was a pleasure. She understood our business requirements quickly and delivered a highly accurate product recognition system that has significantly improved our inventory management processes.",
      rating: 5
    },
    {
      id: 3,
      client: "Elena Rodriguez",
      company: "AgriTech Innovators",
      text: "Sarah's work on our drone navigation system was excellent. She overcame complex technical challenges and delivered a robust solution that works reliably in diverse field conditions.",
      rating: 4.8
    }
  ]
};

const DeveloperPortfolio = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  
  const handleSavePortfolio = () => {
    setEditMode(false);
    toast({
      title: "Portfolio Updated",
      description: "Your portfolio has been updated successfully.",
    });
  };
  
  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Portfolio</h1>
        <Button onClick={() => setEditMode(!editMode)}>
          <Edit2 className="mr-2 h-4 w-4" />
          {editMode ? "Exit Edit Mode" : "Edit Portfolio"}
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={developerData.avatar} alt={developerData.name} />
                  <AvatarFallback>{developerData.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{developerData.name}</h2>
                <p className="text-primary">{developerData.title}</p>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{developerData.location}</span>
                </div>
                
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-medium">{developerData.rating}/5</span>
                  </div>
                  <div className="flex items-center">
                    <FileCheck className="h-4 w-4 mr-1" />
                    <span className="font-medium">{developerData.projectsCompleted} projects</span>
                  </div>
                </div>
                
                {editMode && (
                  <Button variant="outline" className="w-full mt-6">
                    Change Photo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Me</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{developerData.bio}</p>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Hourly Rate:</span>
                  <span className="font-medium">{developerData.hourlyRate}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Website:</span>
                  <a href={`https://${developerData.website}`} className="font-medium text-primary hover:underline" target="_blank" rel="noopener noreferrer">{developerData.website}</a>
                </div>
              </div>
              
              {editMode && (
                <Button variant="outline" className="w-full mt-2">
                  Edit Bio
                </Button>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Skills</CardTitle>
              {editMode && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {developerData.skills.map((skill, index) => (
                  <span 
                    key={index} 
                    className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Education</CardTitle>
              {editMode && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developerData.education.map((edu, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <School className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.school}, {edu.year}</p>
                      </div>
                    </div>
                    {index !== developerData.education.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certifications</CardTitle>
              {editMode && (
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {developerData.certifications.map((cert, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-start gap-2">
                      <Award className="h-4 w-4 mt-1 text-primary" />
                      <div>
                        <p className="font-medium">{cert.name}</p>
                        <p className="text-sm text-muted-foreground">{cert.issuer}, {cert.year}</p>
                      </div>
                    </div>
                    {index !== developerData.certifications.length - 1 && <Separator className="my-3" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {editMode && (
            <div className="sticky bottom-6">
              <Button className="w-full" onClick={handleSavePortfolio}>
                Save Portfolio Changes
              </Button>
            </div>
          )}
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="mb-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="testimonials">Client Testimonials</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Featured Projects</h2>
                {editMode && (
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {developerData.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} editMode={editMode} />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="testimonials">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Client Testimonials</h2>
                {editMode && (
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Testimonial
                  </Button>
                )}
              </div>
              
              <div className="space-y-6">
                {developerData.testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{testimonial.client}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                          </div>
                          <div className="flex">
                            {Array(5).fill(0).map((_, i) => (
                              <svg 
                                key={i}
                                className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 fill-gray-300'}`}
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                              </svg>
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-sm italic">"{testimonial.text}"</p>
                        
                        {editMode && (
                          <div className="flex justify-end">
                            <Button variant="outline" size="sm">
                              <Edit2 className="mr-2 h-4 w-4" />
                              Edit
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    client: string;
    description: string;
    technologies: string[];
    image: string;
    year: string;
  };
  editMode: boolean;
}

const ProjectCard = ({ project, editMode }: ProjectCardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3">
            <div className="rounded-md overflow-hidden border border-border">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-40 object-cover"
              />
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold text-lg">{project.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Client: {project.client} • {project.year}
                </p>
              </div>
              
              {editMode && (
                <Button variant="ghost" size="sm">
                  <Edit2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <p className="text-sm mt-2">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {project.technologies.map((tech, i) => (
                <span 
                  key={i} 
                  className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {!editMode && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4" variant="outline">
                    View Details <ArrowUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>{project.title}</DialogTitle>
                    <DialogDescription>
                      Client: {project.client} • {project.year}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-56 object-cover rounded-md"
                    />
                    <p>{project.description}</p>
                    <div>
                      <h4 className="font-medium mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span 
                            key={i} 
                            className="bg-secondary/50 px-2 py-1 rounded-full text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DeveloperPortfolio;
