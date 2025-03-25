import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile, Project, Review } from '@/types/profile';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';

export interface ClientProfile extends Profile {
  projects: Project[];
  reviews: Review[];
  project_stats: {
    total: number;
    active: number;
    completed: number;
    cancelled: number;
  };
}

export function useClient() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const getClientProfile = useCallback(async (userId: string): Promise<ClientProfile | null> => {
    try {
      setLoading(true);

      // Get profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (profileError) throw profileError;

      // Get projects
      const { data: projects, error: projectsError } = await supabase
        .from('projects')
        .select(`
          *,
          client:profiles!projects_client_id_fkey(*),
          developer:profiles!projects_developer_id_fkey(*)
        `)
        .eq('client_id', userId);

      if (projectsError) throw projectsError;

      // Get reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviews_reviewer_id_fkey(*),
          project:projects(*)
        `)
        .eq('reviewee_id', userId);

      if (reviewsError) throw reviewsError;

      // Calculate project stats
      const project_stats = {
        total: projects.length,
        active: projects.filter(p => p.status === 'active').length,
        completed: projects.filter(p => p.status === 'completed').length,
        cancelled: projects.filter(p => p.status === 'cancelled').length,
      };

      return {
        ...profile,
        projects,
        reviews,
        project_stats,
      };
    } catch (error) {
      console.error('Error fetching client profile:', error);
      toast({
        title: "Error",
        description: "Failed to load client profile.",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateClientProfile = useCallback(async (userId: string, data: Partial<Profile>): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error updating client profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const createReview = useCallback(async (
    reviewerId: string,
    revieweeId: string,
    projectId: string,
    rating: number,
    comment?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('reviews')
        .insert([
          {
            reviewer_id: reviewerId,
            reviewee_id: revieweeId,
            project_id: projectId,
            rating,
            comment,
          },
        ]);

      if (error) throw error;

      toast({
        title: "Review Created",
        description: "Your review has been submitted successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error creating review:', error);
      toast({
        title: "Error",
        description: "Failed to create review.",
        variant: "destructive",
      });
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    getClientProfile,
    updateClientProfile,
    createReview,
    loading,
  };
} 