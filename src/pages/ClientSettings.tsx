import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { useAuth } from '@/hooks/useAuth';
import { useClient } from '@/hooks/useClient';
import { useProfile } from '@/hooks/useProfile';
import { useAvatar } from '@/hooks/useAvatar';
import type { ClientProfile } from '@/hooks/useClient';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { useNotifications } from '@/hooks/useNotifications';

const profileSchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().optional(),
  website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  linkedin: z.string().url('Please enter a valid LinkedIn URL').optional().or(z.literal('')),
  github: z.string().url('Please enter a valid GitHub URL').optional().or(z.literal('')),
});

type ProfileData = z.infer<typeof profileSchema>;

const ClientSettings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const { getClientProfile, loading } = useClient();
  const { updateProfile, updating } = useProfile();
  const { uploadAvatar, uploading: avatarUploading } = useAvatar();
  const { preferences, loading: preferencesLoading, updating: preferencesUpdating, updatePreferences } = useNotifications();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      const data = await getClientProfile(user.id);
      setProfile(data);
    };
    loadProfile();
  }, [user, getClientProfile]);
  
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));

    const newAvatarUrl = await uploadAvatar(file, user.id);
    if (newAvatarUrl && profile) {
      setProfile({ ...profile, avatar_url: newAvatarUrl });
    }
  };
  
  const handleSaveProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user || !profile) return;

    const formData = new FormData(e.currentTarget);
    const data: ProfileData = {
      full_name: formData.get('companyName') as string,
      company: formData.get('companyName') as string,
      bio: formData.get('bio') as string,
      location: formData.get('location') as string,
      website: formData.get('website') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      linkedin: formData.get('linkedin') as string,
      github: formData.get('github') as string,
    };

    try {
      // Validate data
      profileSchema.parse(data);
      setFormErrors({});

      const success = await updateProfile(user.id, data);
      if (success) {
        // Refresh profile data
        const updatedProfile = await getClientProfile(user.id);
        setProfile(updatedProfile);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setFormErrors(errors);
      }
    }
  };
  
  const handleSaveNotifications = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!preferences) return;

    const formData = new FormData(e.currentTarget);
    const newPreferences = {
      email_notifications: {
        new_proposals: formData.get('new_proposals') === 'on',
        project_updates: formData.get('project_updates') === 'on',
        messages: formData.get('messages') === 'on',
        marketing: formData.get('marketing') === 'on',
      },
      platform_notifications: {
        desktop: formData.get('desktop') === 'on',
      },
    };

    await updatePreferences(newPreferences);
  };
  
  if (loading || !profile) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <Skeleton className="h-8 w-32 mb-4" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <Button 
          variant="ghost" 
          className="mb-4" 
          asChild
        >
          <Link to="/client-profile">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Profile
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Account Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your profile and preferences</p>
      </div>
      
      <Tabs defaultValue="profile">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your company profile details</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-6">
                <div className="flex flex-col items-center sm:flex-row sm:items-start gap-6 mb-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src={avatarPreview || profile.avatar_url} alt="Company avatar" />
                      <AvatarFallback>{profile.full_name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="relative">
                      <input
                        type="file"
                        id="avatar"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarChange}
                        disabled={avatarUploading}
                      />
                      <Label
                        htmlFor="avatar"
                        className={`cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md hover:bg-accent ${
                          avatarUploading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        <Upload className="h-4 w-4" />
                        {avatarUploading ? 'Uploading...' : 'Upload'}
                      </Label>
                    </div>
                  </div>
                  
                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyName">Company Name</Label>
                        <Input 
                          id="companyName" 
                          name="companyName"
                          defaultValue={profile.full_name}
                          className={formErrors.full_name ? 'border-red-500' : ''}
                        />
                        {formErrors.full_name && (
                          <p className="text-sm text-red-500">{formErrors.full_name}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input 
                          id="industry" 
                          name="industry"
                          defaultValue={profile.company}
                          className={formErrors.company ? 'border-red-500' : ''}
                        />
                        {formErrors.company && (
                          <p className="text-sm text-red-500">{formErrors.company}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Company Bio</Label>
                      <Textarea 
                        id="bio" 
                        name="bio"
                        className={`min-h-[100px] ${formErrors.bio ? 'border-red-500' : ''}`}
                        defaultValue={profile.bio}
                      />
                      {formErrors.bio && (
                        <p className="text-sm text-red-500">{formErrors.bio}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input 
                      id="location" 
                      name="location"
                      defaultValue={profile.location}
                      className={formErrors.location ? 'border-red-500' : ''}
                    />
                    {formErrors.location && (
                      <p className="text-sm text-red-500">{formErrors.location}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      name="website"
                      defaultValue={profile.website}
                      className={formErrors.website ? 'border-red-500' : ''}
                    />
                    {formErrors.website && (
                      <p className="text-sm text-red-500">{formErrors.website}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Contact Email</Label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email"
                      defaultValue={profile.email}
                      className={formErrors.email ? 'border-red-500' : ''}
                    />
                    {formErrors.email && (
                      <p className="text-sm text-red-500">{formErrors.email}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      defaultValue={profile.phone}
                      className={formErrors.phone ? 'border-red-500' : ''}
                    />
                    {formErrors.phone && (
                      <p className="text-sm text-red-500">{formErrors.phone}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                    <Input 
                      id="linkedin" 
                      name="linkedin"
                      defaultValue={profile.linkedin}
                      className={formErrors.linkedin ? 'border-red-500' : ''}
                    />
                    {formErrors.linkedin && (
                      <p className="text-sm text-red-500">{formErrors.linkedin}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub Profile</Label>
                    <Input 
                      id="github" 
                      name="github"
                      defaultValue={profile.github}
                      className={formErrors.github ? 'border-red-500' : ''}
                    />
                    {formErrors.github && (
                      <p className="text-sm text-red-500">{formErrors.github}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit" disabled={updating}>
                    {updating ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Control how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent>
              {preferencesLoading ? (
                <div className="space-y-6">
                  <Skeleton className="h-8 w-48" />
                  <div className="space-y-4">
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                    <Skeleton className="h-16" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSaveNotifications} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Proposals</p>
                        <p className="text-sm text-muted-foreground">Get notified when a developer submits a new proposal</p>
                      </div>
                      <Switch 
                        name="new_proposals"
                        defaultChecked={preferences?.email_notifications.new_proposals}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Project Updates</p>
                        <p className="text-sm text-muted-foreground">Receive updates when milestones are completed</p>
                      </div>
                      <Switch 
                        name="project_updates"
                        defaultChecked={preferences?.email_notifications.project_updates}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Messages</p>
                        <p className="text-sm text-muted-foreground">Get notified about new messages from developers</p>
                      </div>
                      <Switch 
                        name="messages"
                        defaultChecked={preferences?.email_notifications.messages}
                      />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Marketing Updates</p>
                        <p className="text-sm text-muted-foreground">Receive news about new features and offers</p>
                      </div>
                      <Switch 
                        name="marketing"
                        defaultChecked={preferences?.email_notifications.marketing}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Platform Notifications</h3>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Desktop Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                      </div>
                      <Switch 
                        name="desktop"
                        defaultChecked={preferences?.platform_notifications.desktop}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={preferencesUpdating}>
                      {preferencesUpdating ? 'Saving...' : 'Save Preferences'}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-muted-foreground">Billing information section under development.</p>
                <Button className="mt-4">Add Payment Method</Button>
              </div>
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
              <div className="text-center py-8">
                <p className="text-muted-foreground">Security settings section under development.</p>
                <Button className="mt-4">Change Password</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientSettings;
