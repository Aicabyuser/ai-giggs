
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell, 
  MessageSquare, 
  User, 
  Settings, 
  Plus, 
  Calendar, 
  ArrowRight, 
  Clock,
  Briefcase,
  CheckCircle,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNotifications } from '@/hooks/useNotifications';
import { useIsMobile } from '@/hooks/use-mobile';
import Header from '@/components/Header';
import { NotificationCenter } from '@/components/NotificationCenter';

// Mock project data
const mockProjects = [
  {
    id: 1,
    title: "AI-Powered Recommendation Engine",
    description: "Create a personalized product recommendation system for our e-commerce platform.",
    status: "In Progress",
    matchedDevelopers: 3,
    messages: 8,
    lastActivity: "2 hours ago"
  },
  {
    id: 2,
    title: "Computer Vision for Quality Control",
    description: "Develop a vision system that can detect defects in manufacturing process.",
    status: "Matching",
    matchedDevelopers: 4,
    messages: 0,
    lastActivity: "1 day ago"
  }
];

// Mock message data
const mockMessages = [
  {
    id: 1,
    from: "Sarah Chen",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    message: "I've reviewed your project requirements and have some questions about the API integration.",
    time: "2 hours ago",
    unread: true,
    projectId: 1
  },
  {
    id: 2,
    from: "Alex Johnson",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "Here's the initial proposal for your AI recommendation engine as we discussed.",
    time: "Yesterday",
    unread: false,
    projectId: 1
  },
  {
    id: 3,
    from: "Maya Rodriguez",
    avatar: "https://randomuser.me/api/portraits/women/66.jpg",
    message: "I've worked on similar computer vision projects and would be interested in discussing yours.",
    time: "2 days ago",
    unread: false,
    projectId: 2
  }
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const { toast } = useToast();
  const { addNotification } = useNotifications();
  const isMobile = useIsMobile();
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [isVerified, setIsVerified] = useState(false);
  
  // Simulate profile verification
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerified(true);
      addNotification({
        type: 'system',
        title: 'Profile Verified',
        message: 'Congratulations! Your profile has been verified. You now have access to all platform features.'
      });
      toast({
        title: "Profile Verified",
        description: "Your profile has been verified successfully!"
      });
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [addNotification, toast]);
  
  const handleCreateProject = () => {
    toast({
      title: "Create New Project",
      description: "Redirecting to project creation...",
    });
    // In a real app, we would redirect to the project creation page
    setTimeout(() => {
      window.location.href = "/project-matching";
    }, 1000);
  };

  const completeProfileItems = [
    { title: "Add profile picture", completed: true },
    { title: "Verify email address", completed: true },
    { title: "Complete personal info", completed: true },
    { title: "Add payment method", completed: false },
    { title: "Verify identity", completed: isVerified }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
      <Header />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto pt-8">
          {/* Dashboard Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Manage your AI projects and connections</p>
            </div>
            
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <NotificationCenter />
              
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => {
                  toast({
                    title: "Settings",
                    description: "Profile settings will be available soon",
                  });
                }}
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <Button 
                className="flex items-center gap-2" 
                onClick={handleCreateProject}
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </div>
          </div>
          
          {/* Dashboard Content */}
          <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
              <TabsTrigger value="schedule">Schedule</TabsTrigger>
              <TabsTrigger value="profile">My Profile</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockProjects.map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{project.title}</CardTitle>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "In Progress" 
                            ? "bg-green-500/10 text-green-600" 
                            : "bg-blue-500/10 text-blue-600"
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-muted-foreground mb-6">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-y-3 gap-x-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {project.matchedDevelopers} developers
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {project.messages} messages
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            Last activity: {project.lastActivity}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" asChild>
                        <Link to={`/project/${project.id}`}>View Details</Link>
                      </Button>
                      
                      {project.status === "Matching" ? (
                        <Button size="sm" asChild>
                          <Link to="/project-matching">View Matches</Link>
                        </Button>
                      ) : (
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/messages/${project.id}`}>Messages</Link>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
                
                {/* Create New Project Card */}
                <Card className="border-dashed bg-secondary/20">
                  <CardContent className="flex flex-col items-center justify-center h-full py-12">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Plus className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-medium mb-2">Start a New AI Project</h3>
                    <p className="text-muted-foreground text-center mb-6">
                      Create a project and get matched with the perfect AI developer
                    </p>
                    <Button onClick={handleCreateProject}>
                      Create Project
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="messages">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Messages</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    {mockMessages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex gap-4 p-4 rounded-lg transition-colors hover:bg-secondary/20 cursor-pointer ${
                          message.unread ? 'bg-secondary/10' : ''
                        }`}
                        onClick={() => {
                          toast({
                            title: "Message Details",
                            description: "Message details will be available soon",
                          });
                        }}
                      >
                        <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
                          <img 
                            src={message.avatar} 
                            alt={message.from} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium text-sm truncate pr-2">{message.from}</h4>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{message.time}</span>
                          </div>
                          
                          <p className="text-sm text-muted-foreground truncate mb-1">{message.message}</p>
                          
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {mockProjects.find(p => p.id === message.projectId)?.title}
                            </span>
                          </div>
                        </div>
                        
                        {message.unread && (
                          <div className="h-2 w-2 rounded-full bg-primary self-center flex-shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/messages">View All Messages</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="schedule">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Meetings</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">No Upcoming Meetings</h3>
                      <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                        You don't have any scheduled meetings with developers yet.
                      </p>
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Schedule Meeting",
                          description: "This feature is coming soon",
                        });
                      }}>
                        Schedule a Meeting
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="profile">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative">
                        <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-4">
                          <User className="h-12 w-12 text-muted-foreground" />
                        </div>
                        {isVerified && (
                          <div className="absolute bottom-3 right-0 bg-green-500 rounded-full p-1 border-2 border-background">
                            <ShieldCheck className="h-4 w-4 text-white" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <h2 className="font-display text-xl font-semibold">John Smith</h2>
                        {isVerified && (
                          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-6">Project Manager</p>
                      
                      <Button variant="outline" className="w-full mb-3" onClick={() => {
                        toast({
                          title: "Edit Profile",
                          description: "Profile editing will be available soon",
                        });
                      }}>
                        Edit Profile
                      </Button>
                    </div>
                    
                    <div className="border-t border-border mt-6 pt-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold">Profile Completion</h3>
                        <span className="text-sm text-muted-foreground">{profileCompletion}%</span>
                      </div>
                      
                      <Progress value={profileCompletion} className="h-2 mb-4" />
                      
                      <div className="space-y-2">
                        {completeProfileItems.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            {item.completed ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <AlertCircle className="h-4 w-4 text-amber-500" />
                            )}
                            <span className={`text-sm ${item.completed ? 'line-through text-muted-foreground' : ''}`}>
                              {item.title}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {!isVerified && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4"
                          onClick={() => {
                            toast({
                              title: "Verification Started",
                              description: "Verification process initiated. This usually takes 1-2 business days."
                            });
                            
                            // Simulate verification process
                            setTimeout(() => {
                              setIsVerified(true);
                              setProfileCompletion(100);
                              
                              addNotification({
                                type: 'system',
                                title: 'Profile Verified',
                                message: 'Congratulations! Your profile has been verified. You now have access to all platform features.'
                              });
                              
                              toast({
                                title: "Profile Verified",
                                description: "Your profile has been verified successfully!"
                              });
                            }, 3000);
                          }}
                        >
                          Verify Profile
                        </Button>
                      )}
                    </div>
                    
                    <div className="border-t border-border mt-6 pt-6">
                      <h3 className="font-semibold mb-3">Account Details</h3>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Account Type</span>
                          <span className="font-medium">Client</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Member Since</span>
                          <span className="font-medium">April 2023</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Projects</span>
                          <span className="font-medium">{mockProjects.length}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="md:col-span-2">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Account Information</CardTitle>
                      <Badge variant={isVerified ? 'default' : 'outline'} className={`${isVerified ? 'bg-green-500 hover:bg-green-600' : ''}`}>
                        {isVerified ? 'Verified Account' : 'Unverified Account'}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Name</h4>
                          <p className="text-muted-foreground">John Smith</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Email</h4>
                          <p className="text-muted-foreground">john.smith@example.com</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Company</h4>
                          <p className="text-muted-foreground">TechInnovate Inc.</p>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Role</h4>
                          <p className="text-muted-foreground">Project Manager</p>
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold mb-4">Project Preferences</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-medium mb-2">Preferred AI Areas</h4>
                            <div className="flex flex-wrap gap-2">
                              <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">Computer Vision</span>
                              <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">NLP</span>
                              <span className="bg-secondary/50 px-2 py-1 rounded-full text-xs">Recommendation Systems</span>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium mb-2">Industry</h4>
                            <p className="text-muted-foreground">Technology, E-commerce</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-border pt-6">
                        <h3 className="font-semibold mb-4">Verification Details</h3>
                        {isVerified ? (
                          <div className="bg-green-500/10 border border-green-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <ShieldCheck className="h-5 w-5 text-green-500" />
                              <h4 className="font-medium">Verified Account</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                              Your account has been verified. You have full access to all platform features.
                            </p>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>Identity verification completed</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>Email verification completed</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <CheckCircle className="h-3 w-3 text-green-500" />
                                <span>Phone verification completed</span>
                              </li>
                            </ul>
                          </div>
                        ) : (
                          <div className="bg-amber-500/10 border border-amber-200 rounded-lg p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <AlertCircle className="h-5 w-5 text-amber-500" />
                              <h4 className="font-medium">Verification Required</h4>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Verify your account to gain full access to all platform features, including direct messaging with developers and payment processing.
                            </p>
                            <Button
                              onClick={() => {
                                toast({
                                  title: "Verification Started",
                                  description: "Verification process initiated. This usually takes 1-2 business days."
                                });
                                
                                // Simulate verification process
                                setTimeout(() => {
                                  setIsVerified(true);
                                  setProfileCompletion(100);
                                  
                                  addNotification({
                                    type: 'system',
                                    title: 'Profile Verified',
                                    message: 'Congratulations! Your profile has been verified. You now have access to all platform features.'
                                  });
                                  
                                  toast({
                                    title: "Profile Verified",
                                    description: "Your profile has been verified successfully!"
                                  });
                                }, 3000);
                              }}
                            >
                              Start Verification Process
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Account Settings",
                        description: "Account settings will be available soon",
                      });
                    }}>
                      Edit Account Settings
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
