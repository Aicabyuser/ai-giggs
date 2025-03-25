
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, Search, Clock, CheckCircle, DollarSign, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";

const DeveloperDashboard = () => {
  // Mock data
  const activeProjects = 2;
  const completedProjects = 31;
  const availableProjects = 87;
  const earnings = "$24,750";
  const rating = 4.7;
  
  const recentProjects = [
    { 
      id: 1, 
      title: "Machine Learning Data Pipeline", 
      client: "Acme AI Solutions", 
      status: "active", 
      progress: 70, 
      dueDate: "Dec 20, 2023" 
    },
    { 
      id: 2, 
      title: "NLP Sentiment Analysis Tool", 
      client: "Techwave Inc.", 
      status: "active", 
      progress: 40, 
      dueDate: "Nov 30, 2023" 
    },
    { 
      id: 3, 
      title: "Computer Vision Object Recognition", 
      client: "Visionary Tech", 
      status: "completed", 
      progress: 100, 
      dueDate: "Oct 15, 2023" 
    },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Developer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your projects and find new opportunities</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/find-projects">
            <Search className="mr-2 h-4 w-4" />
            Find Projects
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Projects</CardDescription>
            <CardTitle className="text-3xl">{activeProjects}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-primary">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm">In progress</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Completed Projects</CardDescription>
            <CardTitle className="text-3xl">{completedProjects}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-green-500">
              <CheckCircle className="h-4 w-4 mr-1" />
              <span className="text-sm">Successfully delivered</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Your Rating</CardDescription>
            <CardTitle className="text-3xl">{rating}/5</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-yellow-500">
              <Star className="h-4 w-4 mr-1 fill-yellow-500" />
              <span className="text-sm">From {completedProjects} projects</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Current Projects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/manage-projects" className="flex items-center">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <Card key={project.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">
                          <Link to={`/project/${project.id}`} className="hover:underline">
                            {project.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">Client: {project.client}</p>
                      </div>
                      <div className="mt-2 md:mt-0 flex items-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {project.status === 'active' ? 'Active' : 'Completed'}
                        </span>
                        <span className="ml-3 text-sm text-muted-foreground">Due: {project.dueDate}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button size="sm" asChild>
                        <Link to={`/project/${project.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Earnings Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <span className="text-muted-foreground">Total Earnings</span>
                <span className="text-2xl font-bold">{earnings}</span>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm">This Month:</span>
                  </div>
                  <span className="font-medium">$3,200</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm">Last Month:</span>
                  </div>
                  <span className="font-medium">$4,150</span>
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                    <span className="text-sm">Pending:</span>
                  </div>
                  <span className="font-medium">$2,800</span>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-6" asChild>
                <Link to="/earnings">View Earnings History</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Available Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-4">
                <p className="text-3xl font-bold mb-2">{availableProjects}</p>
                <p className="text-muted-foreground mb-6">projects matching your skills</p>
                
                <Button className="w-full" asChild>
                  <Link to="/find-projects">Browse Projects</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DeveloperDashboard;
