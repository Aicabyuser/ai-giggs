import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileForm } from '@/components/profile/ProfileForm';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { ProfileFormData } from '@/types/profile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfileManagement() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getProfile, loading } = useProfile();
  const [profileData, setProfileData] = useState<Partial<ProfileFormData> | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        navigate('/auth/signin');
        return;
      }

      const profile = await getProfile(user.id);
      if (profile) {
        setProfileData({
          full_name: profile.full_name,
          bio: profile.bio,
          location: profile.location,
          website: profile.website,
          email: profile.email,
          phone: profile.phone,
          linkedin: profile.linkedin,
          github: profile.github,
          avatar_url: profile.avatar_url,
        });
      }
    };

    loadProfile();
  }, [user, getProfile, navigate]);

  if (!user) return null;

  return (
    <div className="container max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Profile Management</CardTitle>
          <CardDescription>
            Update your profile information and manage your account settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && !profileData ? (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <Skeleton className="h-10 w-[250px]" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
              <Skeleton className="h-32" />
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
                <Skeleton className="h-10" />
              </div>
            </div>
          ) : (
            <ProfileForm
              initialData={profileData || {
                email: user.email,
                full_name: user.user_metadata?.full_name,
              }}
              onSuccess={() => {
                // Optionally refresh the profile data
                getProfile(user.id).then(profile => {
                  if (profile) {
                    setProfileData({
                      full_name: profile.full_name,
                      bio: profile.bio,
                      location: profile.location,
                      website: profile.website,
                      email: profile.email,
                      phone: profile.phone,
                      linkedin: profile.linkedin,
                      github: profile.github,
                      avatar_url: profile.avatar_url,
                    });
                  }
                });
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
} 