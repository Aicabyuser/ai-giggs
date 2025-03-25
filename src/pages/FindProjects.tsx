import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, DollarSign, Tag, Search, Filter, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import ProjectSearch from '@/components/ProjectSearch';
import { Separator } from '@/components/ui/separator';
import { SearchService, ProjectSearchParams } from '@/services/SearchService';

// Mock data for available projects
const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Recommendation Engine",
    description: "Seeking a developer to build a personalized product recommendation system for our e-commerce platform using machine learning algorithms.",
    category: "Machine Learning",
    budget: "$3,000 - $5,000",
    duration: "4-6 weeks",
    postedDate: "2 days ago",
    clientName: "TechRetail Inc.",
    clientAvatar: "https://randomuser.me/api/portraits/men/43.jpg",
    clientRating: 4.7,
    skills: ["Python", "TensorFlow", "Recommendation Systems", "API Integration"],
    proposals: 8,
    status: "Open"
  },
  {
    id: 2,
    title: "Computer Vision for Quality Control",
    description: "Looking for expertise in developing a vision system that can detect defects in our manufacturing process using image recognition.",
    category: "Computer Vision",
    budget: "$7,000 - $10,000",
    duration: "2-3 months",
    postedDate: "1 week ago",
    clientName: "Industrial Systems Ltd.",
    clientAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    clientRating: 4.9,
    skills: ["OpenCV", "TensorFlow", "Image Processing", "Object Detection"],
    proposals: 12,
    status: "Open"
  },
  {
    id: 3,
    title: "Natural Language Processing Chatbot",
    description: "Need a developer to create an advanced customer service chatbot with natural language understanding capabilities for our financial services platform.",
    category: "NLP",
    budget: "$5,000 - $8,000",
    duration: "6-8 weeks",
    postedDate: "3 days ago",
    clientName: "FinTech Solutions",
    clientAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    clientRating: 4.5,
    skills: ["NLP", "Python", "BERT", "API Integration", "Dialogue Systems"],
    proposals: 15,
    status: "Open"
  },
  {
    id: 4,
    title: "Predictive Maintenance System",
    description: "Looking for an AI specialist to develop a system that can predict equipment failures before they occur based on sensor data from our industrial machinery.",
    category: "Predictive Analytics",
    budget: "$8,000 - $12,000",
    duration: "3-4 months",
    postedDate: "5 days ago",
    clientName: "Industrial Innovations",
    clientAvatar: "https://randomuser.me/api/portraits/women/64.jpg",
    clientRating: 4.8,
    skills: ["Python", "Time Series Analysis", "Anomaly Detection", "Machine Learning", "IoT"],
    proposals: 10,
    status: "Open"
  },
  {
    id: 5,
    title: "AI-Driven Customer Segmentation",
    description: "Seeking expertise to develop a sophisticated customer segmentation system using clustering algorithms and behavior analysis for targeted marketing campaigns.",
    category: "Data Science",
    budget: "$4,000 - $6,000",
    duration: "6-8 weeks",
    postedDate: "1 day ago",
    clientName: "MarketPro Agency",
    clientAvatar: "https://randomuser.me/api/portraits/men/54.jpg",
    clientRating: 4.6,
    skills: ["Clustering", "Customer Analytics", "Python", "Data Visualization"],
    proposals: 6,
    status: "Open"
  },
  {
    id: 6,
    title: "Emotion Recognition System",
    description: "Develop a facial emotion recognition system to analyze customer satisfaction in retail environments using camera feeds.",
    category: "Computer Vision",
    budget: "$6,000 - $9,000",
    duration: "2-3 months",
    postedDate: "4 days ago",
    clientName: "RetailAnalytics Co.",
    clientAvatar: "https://randomuser.me/api/portraits/women/33.jpg",
    clientRating: 4.4,
    skills: ["OpenCV", "Facial Recognition", "Emotion Analysis", "Real-time Processing"],
    proposals: 9,
    status: "Open"
  }
];

// Categories for filtering
const categories = [
  "All Categories",
  "Machine Learning",
  "Computer Vision",
  "NLP",
  "Predictive Analytics",
  "Data Science",
  "AI Integration"
];

// Budget ranges for filtering
const budgetRanges = [
  "Any Budget",
  "Under $1,000",
  "$1,000 - $5,000",
  "$5,000 - $10,000",
  "Over $10,000"
];

// Duration options for filtering
const durationOptions = [
  "Any Duration",
  "Less than 1 month",
  "1-3 months",
  "3-6 months",
  "Over 6 months"
];

const FindProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedBudget, setSelectedBudget] = useState("Any Budget");
  const [selectedDuration, setSelectedDuration] = useState("Any Duration");
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  
  useEffect(() => {
    // Filter projects based on search term and filters
    const filtered = mockProjects.filter(project => {
      // Text search
      const matchesText = searchTerm ? 
        (project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
         project.description.toLowerCase().includes(searchTerm.toLowerCase())) : 
        true;
      
      // Category filter
      const matchesCategory = selectedCategory !== "All Categories" ? 
        project.category === selectedCategory : 
        true;
      
      // Budget filter - simple implementation for mock data
      const matchesBudget = selectedBudget !== "Any Budget" ? 
        project.budget.includes(selectedBudget.replace("Under", "<").replace("Over", ">")) : 
        true;
      
      // Duration filter
      const matchesDuration = selectedDuration !== "Any Duration" ? 
        project.duration.includes(selectedDuration.replace("Less than", "<").replace("Over", ">")) : 
        true;
      
      return matchesText && matchesCategory && matchesBudget && matchesDuration;
    });
    
    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedBudget, selectedDuration]);
  
  // Convert the filter change handler to match ProjectSearch component expectations
  const handleFilterChange = (filters: ProjectSearchParams) => {
    if (filters.searchTerm !== undefined) {
      setSearchTerm(filters.searchTerm);
    }
    
    // Update category if needed
    if (filters.skills && filters.skills.length > 0) {
      const skill = filters.skills[0];
      const matchingCategory = categories.find(cat => cat.includes(skill));
      if (matchingCategory) {
        setSelectedCategory(matchingCategory);
      }
    }
    
    // Update budget if needed
    if (filters.budget) {
      const [min, max] = filters.budget;
      let budgetRangeLabel = "Any Budget";
      
      if (min === 0 && max < 1000) {
        budgetRangeLabel = "Under $1,000";
      } else if (min >= 1000 && max <= 5000) {
        budgetRangeLabel = "$1,000 - $5,000";
      } else if (min > 5000 && max <= 10000) {
        budgetRangeLabel = "$5,000 - $10,000";
      } else if (min > 10000) {
        budgetRangeLabel = "Over $10,000";
      }
      
      setSelectedBudget(budgetRangeLabel);
    }
    
    // Update duration if needed
    if (filters.duration && filters.duration.length > 0) {
      setSelectedDuration(filters.duration[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">Find AI Projects</h1>
              <p className="text-muted-foreground">Discover projects that match your skills and expertise</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar with filters */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Category</h3>
                    <div className="space-y-2">
                      {categories.map((category, index) => (
                        <div key={index} className="flex items-center">
                          <button
                            className={`text-sm py-1 w-full text-left ${
                              selectedCategory === category
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => {
                              setSelectedCategory(category);
                            }}
                          >
                            {category}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Budget</h3>
                    <div className="space-y-2">
                      {budgetRanges.map((budget, index) => (
                        <div key={index} className="flex items-center">
                          <button
                            className={`text-sm py-1 w-full text-left ${
                              selectedBudget === budget
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => {
                              setSelectedBudget(budget);
                            }}
                          >
                            {budget}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-3">Duration</h3>
                    <div className="space-y-2">
                      {durationOptions.map((duration, index) => (
                        <div key={index} className="flex items-center">
                          <button
                            className={`text-sm py-1 w-full text-left ${
                              selectedDuration === duration
                                ? "text-primary font-medium"
                                : "text-muted-foreground"
                            }`}
                            onClick={() => {
                              setSelectedDuration(duration);
                            }}
                          >
                            {duration}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Project listings */}
            <div className="md:col-span-3">
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <ProjectSearch 
                    onSearch={setSearchTerm} 
                    onFilterChange={handleFilterChange}
                  />
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-xl hover:text-primary transition-colors">
                              <Link to={`/project/${project.id}`}>{project.title}</Link>
                            </CardTitle>
                            <CardDescription className="flex items-center gap-2 mt-1">
                              <span className="flex items-center">
                                <Calendar className="h-3.5 w-3.5 mr-1" />
                                Posted {project.postedDate}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-3.5 w-3.5 mr-1" />
                                {project.budget}
                              </span>
                              <span className="flex items-center">
                                <Clock className="h-3.5 w-3.5 mr-1" />
                                {project.duration}
                              </span>
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="font-normal">
                            {project.proposals} proposals
                          </Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.skills.map((skill, index) => (
                            <Badge key={index} variant="secondary" className="font-normal">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={project.clientAvatar} alt={project.clientName} />
                            <AvatarFallback>{project.clientName.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{project.clientName}</p>
                            <div className="flex items-center text-amber-500">
                              {'★'.repeat(Math.floor(project.clientRating))}
                              <span className="text-xs ml-1 text-muted-foreground">
                                ({project.clientRating.toFixed(1)})
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 font-normal">
                          {project.category}
                        </Badge>
                        <Button size="sm" asChild>
                          <Link to={`/project/${project.id}`}>
                            View Project
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <Card className="p-12 text-center">
                    <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No matching projects found</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Try adjusting your search criteria or filters to find more projects that match your skills.
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All Categories");
                        setSelectedBudget("Any Budget");
                        setSelectedDuration("Any Duration");
                      }}
                    >
                      Clear All Filters
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindProjects;
