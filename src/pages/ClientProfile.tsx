import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Building, MapPin, Globe, Edit2, Settings, Mail, Calendar, Star } from 'lucide-react';
import { useClient } from '@/hooks/useClient';
import type { ClientProfile } from '@/hooks/useClient';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const ClientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { getClientProfile, loading } = useClient();
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const isOwnProfile = user?.id === id;

  useEffect(() => {
    const loadProfile = async () => {
      if (!id) return;
      const data = await getClientProfile(id);
      setProfile(data);
    };
    loadProfile();
  }, [id, getClientProfile]);

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="h-4 w-4 text-gray-300" />);
      }
    }
    return stars;
  };

  if (loading || !profile) {
    return (
      <div className="container mx-auto p-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Skeleton className="h-24 w-24 rounded-full mb-4" />
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Skeleton className="h-32 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src={profile.avatar_url} alt={profile.full_name} />
                  <AvatarFallback>{profile.full_name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold">{profile.full_name}</h2>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{profile.location}</span>
                </div>
                
                <div className="flex items-center mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center mr-2">
                    {renderRating(profile.average_rating)}
                  </div>
                  <span>({profile.total_reviews} reviews)</span>
                </div>
                
                {isOwnProfile && (
                  <div className="mt-6 w-full">
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/client-settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm">{profile.bio}</p>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Company:</span>
                  <span className="font-medium">{profile.company}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Member Since:</span>
                  <span className="font-medium">
                    {new Date(profile.created_at).toLocaleDateString()}
                  </span>
                </div>
                
                {profile.website && (
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Website:</span>
                    <a 
                      href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`}
                      className="font-medium text-primary hover:underline" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      {profile.website}
                    </a>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-medium">{profile.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Tabs defaultValue="projects">
            <TabsList className="mb-6">
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="projects">
              <Card>
                <CardHeader>
                  <CardTitle>Projects ({profile.total_projects})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.projects.map((project) => (
                      <div key={project.id} className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={project.developer?.avatar_url} alt={project.developer?.full_name} />
                          <AvatarFallback>{project.developer?.full_name?.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <div>
                              <h3 className="font-medium">
                                <Link to={`/project/${project.id}`} className="hover:underline">
                                  {project.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                Developer: {project.developer?.full_name}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                project.status === 'in_progress' ? 'bg-green-100 text-green-800' : 
                                project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                                project.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                'bg-yellow-100 text-yellow-800'
                              }`}>
                                {project.status.charAt(0).toUpperCase() + project.status.slice(1).replace('_', ' ')}
                              </span>
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(project.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
                        </div>
                      </div>
                    ))}
                    {profile.projects.length === 0 && (
                      <p className="text-center text-muted-foreground">No projects yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews from Developers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {profile.reviews.map((review) => (
                      <div key={review.id} className="space-y-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.reviewer?.avatar_url} alt={review.reviewer?.full_name} />
                            <AvatarFallback>{review.reviewer?.full_name?.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="font-medium">{review.reviewer?.full_name}</h3>
                                <div className="flex items-center mt-1">
                                  {renderRating(review.rating)}
                                </div>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString()}
                              </p>
                            </div>
                            <p className="text-sm mt-2">{review.comment}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Project: {review.project?.title}
                            </p>
                          </div>
                        </div>
                        {review.id !== profile.reviews[profile.reviews.length - 1].id && <Separator />}
                      </div>
                    ))}
                    {profile.reviews.length === 0 && (
                      <p className="text-center text-muted-foreground">No reviews yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
