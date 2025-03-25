import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from '@/components/ui/use-toast';
import { PaymentMethods } from '@/components/payments/PaymentMethods';
import { SecuritySettings } from '@/components/security/SecuritySettings';

const DeveloperSettings = () => {
  const { toast } = useToast();
  
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const handleSaveAvailability = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Availability Updated",
      description: "Your availability settings have been saved.",
    });
  };
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          asChild
        >
          <Link to="/developer-portfolio">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="skills">Skills & Expertise</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and professional details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="https://randomuser.me/api/portraits/women/44.jpg" alt="Profile avatar" />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Upload className="h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input id="fullName" defaultValue="Sarah Chen" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue="Computer Vision Expert" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea 
                        id="bio" 
                        className="min-h-[100px]" 
                        defaultValue="AI researcher and computer vision specialist with 7+ years of experience developing cutting-edge machine learning solutions. I specialize in medical imaging analysis and object detection systems."
                      />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="San Francisco, CA" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" defaultValue="sarahchen.ai" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
                    <Input id="hourlyRate" defaultValue="75" type="number" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input id="email" defaultValue="sarah.chen@example.com" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="availability">
          <Card>
            <CardHeader>
              <CardTitle>Availability & Preferences</CardTitle>
              <CardDescription>Set your availability for new projects and work preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveAvailability} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Available for New Projects</p>
                      <p className="text-sm text-muted-foreground">Show in search results and allow clients to contact you</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Weekly Availability</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minHours">Minimum Hours</Label>
                        <Input id="minHours" type="number" defaultValue="10" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxHours">Maximum Hours</Label>
                        <Input id="maxHours" type="number" defaultValue="30" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <Label>Project Preferences</Label>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Short-term Projects ({"< 1 month"})</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Medium-term Projects (1-3 months)</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Long-term Projects (3+ months)</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Preferences</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Skills & Expertise</CardTitle>
              <CardDescription>Update your technical skills and specialties</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Skills management section under development.</p>
                <Button className="mt-4">Edit Skills</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and payout preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentMethods />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security and authentication options</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DeveloperSettings;
