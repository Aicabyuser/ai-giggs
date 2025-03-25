
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart2, PlusCircle, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const ClientDashboard = () => {
  // Mock data
  const activeProjects = 3;
  const completedProjects = 8;
  const pendingReviews = 2;
  
  const recentProjects = [
    { id: 1, title: "Machine Learning Data Pipeline", status: "active", bids: 12, budget: "$3,000-5,000" },
    { id: 2, title: "NLP Sentiment Analysis Tool", status: "active", bids: 8, budget: "$2,000-3,500" },
    { id: 3, title: "Computer Vision Object Recognition", status: "pending", bids: 5, budget: "$4,500-6,000" },
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Client Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your AI projects and find top talent</p>
        </div>
        <Button className="mt-4 md:mt-0" asChild>
          <Link to="/post-project">
            <PlusCircle className="mr-2 h-4 w-4" />
            Post New Project
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
            <CardDescription>Pending Reviews</CardDescription>
            <CardTitle className="text-3xl">{pendingReviews}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-orange-500">
              <BarChart2 className="h-4 w-4 mr-1" />
              <span className="text-sm">Awaiting your feedback</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Projects</h2>
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
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-semibold text-lg">{project.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status === 'active' ? 'Active' : 'Pending'}
                      </span>
                      <span className="text-sm text-muted-foreground">{project.bids} bids</span>
                      <span className="text-sm text-muted-foreground">Budget: {project.budget}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/view-bids/${project.id}`}>View Bids</Link>
                    </Button>
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

      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended Developers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* We'll reuse the DeveloperCard component here */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-muted-foreground">Explore AI experts that match your project needs</p>
                <Button className="mt-4" asChild>
                  <Link to="/project-matching">Find Developers</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
