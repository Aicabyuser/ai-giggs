
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Filter, Search, MoreHorizontal, Calendar, Users, Check, Clock, DollarSign } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Mock project data
const projects = [
  { 
    id: 1, 
    title: "Machine Learning Data Pipeline", 
    status: "active", 
    bids: 12, 
    budget: "$3,000-5,000",
    postedDate: "2023-10-15",
    dueDate: "2023-12-20",
    developers: 5,
  },
  { 
    id: 2, 
    title: "NLP Sentiment Analysis Tool", 
    status: "active", 
    bids: 8, 
    budget: "$2,000-3,500",
    postedDate: "2023-10-18",
    dueDate: "2023-11-30",
    developers: 3,
  },
  { 
    id: 3, 
    title: "Computer Vision Object Recognition", 
    status: "pending", 
    bids: 5, 
    budget: "$4,500-6,000",
    postedDate: "2023-10-10",
    dueDate: "2024-01-15",
    developers: 2,
  },
  { 
    id: 4, 
    title: "AI Chatbot with GPT Integration", 
    status: "completed", 
    bids: 15, 
    budget: "$3,500-4,500",
    postedDate: "2023-09-05",
    dueDate: "2023-10-20",
    developers: 1,
  },
  { 
    id: 5, 
    title: "Recommendation Engine", 
    status: "completed", 
    bids: 9, 
    budget: "$5,000-7,000",
    postedDate: "2023-08-22",
    dueDate: "2023-10-01",
    developers: 1,
  },
];

const ManageProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter projects based on search term
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Count projects by status
  const activeCount = projects.filter(p => p.status === "active").length;
  const pendingCount = projects.filter(p => p.status === "pending").length;
  const completedCount = projects.filter(p => p.status === "completed").length;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Manage Projects</h1>
          <p className="text-muted-foreground mt-1">View and manage all your AI projects</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/post-project">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Project
          </Link>
        </Button>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filter Projects</h4>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Budget</h5>
                {/* Filter UI would go here */}
              </div>
              <div className="space-y-2">
                <h5 className="text-sm font-medium">Timeline</h5>
                {/* Filter UI would go here */}
              </div>
              <div className="flex justify-end">
                <Button size="sm">Apply Filters</Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({projects.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeCount})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCount})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {filteredProjects.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6">
                <p className="text-center text-muted-foreground mb-4">No projects found</p>
                <Button asChild>
                  <Link to="/post-project">Post New Project</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))
          )}
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          {filteredProjects.filter(p => p.status === "active").map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        
        <TabsContent value="pending" className="space-y-4">
          {filteredProjects.filter(p => p.status === "pending").map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          {filteredProjects.filter(p => p.status === "completed").map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    status: string;
    bids: number;
    budget: string;
    postedDate: string;
    dueDate: string;
    developers: number;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800"
  };
  
  const statusIcons = {
    active: <Clock className="h-4 w-4 mr-1" />,
    pending: <Clock className="h-4 w-4 mr-1" />,
    completed: <Check className="h-4 w-4 mr-1" />
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="font-semibold text-lg">{project.title}</h3>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className={`px-2 py-1 rounded-full text-xs flex items-center ${
                statusColors[project.status as keyof typeof statusColors]
              }`}>
                {statusIcons[project.status as keyof typeof statusIcons]}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {project.bids} bids
              </span>
              <span className="text-sm text-muted-foreground">Budget: {project.budget}</span>
              <span className="text-sm text-muted-foreground flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                Due: {new Date(project.dueDate).toLocaleDateString()}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="outline" asChild>
              <Link to={`/view-bids/${project.id}`}>
                View Bids
              </Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/project/${project.id}`}>
                Manage
              </Link>
            </Button>
            {project.status === "active" && (
              <Button size="sm" variant="outline" className="bg-blue-50" asChild>
                <Link to={`/project/${project.id}/payment`}>
                  <DollarSign className="h-4 w-4 mr-1" />
                  Payment
                </Link>
              </Button>
            )}
            <Popover>
              <PopoverTrigger asChild>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56" align="end">
                <div className="grid gap-1">
                  <Button variant="ghost" className="justify-start" size="sm">
                    Edit Project
                  </Button>
                  <Button variant="ghost" className="justify-start" size="sm">
                    Duplicate Project
                  </Button>
                  <Button variant="ghost" className="justify-start text-red-500" size="sm">
                    Cancel Project
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ManageProjects;
