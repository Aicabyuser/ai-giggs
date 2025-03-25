import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DeveloperProfile, DeveloperSkill, Review, Availability } from '@/types/developer';
import { useAuth } from './useAuth';

export function useDeveloper() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const getDeveloperProfile = useCallback(async (developerId: string): Promise<DeveloperProfile | null> => {
    try {
      // Get basic profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', developerId)
        .single();

      if (profileError) throw profileError;

      // Get skills
      const { data: skills, error: skillsError } = await supabase
        .from('developer_skills')
        .select(`
          *,
          skill:skills(*)
        `)
        .eq('developer_id', developerId);

      if (skillsError) throw skillsError;

      // Get reviews
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles(*),
          project:projects(*)
        `)
        .eq('reviewee_id', developerId);

      if (reviewsError) throw reviewsError;

      // Get availability
      const { data: availability, error: availabilityError } = await supabase
        .from('availability')
        .select('*')
        .eq('developer_id', developerId)
        .single();

      if (availabilityError && availabilityError.code !== 'PGRST116') throw availabilityError;

      // Get project stats
      const { count: completedCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('developer_id', developerId)
        .eq('status', 'completed');

      const { count: activeCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('developer_id', developerId)
        .eq('status', 'in_progress');

      // Calculate average rating
      const averageRating = reviews?.length
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

      return {
        ...profile,
        skills: skills || [],
        reviews: reviews || [],
        availability: availability || {
          developer_id: developerId,
          is_available: true,
          available_hours: 40,
          preferred_work_type: ['full-time'],
          updated_at: new Date().toISOString(),
        },
        average_rating: averageRating,
        total_reviews: reviews?.length || 0,
        completed_projects: completedCount || 0,
        active_projects: activeCount || 0,
      };
    } catch (error) {
      console.error('Error fetching developer profile:', error);
      return null;
    }
  }, []);

  const updateSkills = useCallback(async (
    developerId: string,
    skills: { skill_id: string; proficiency_level: number }[]
  ): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      // Delete existing skills
      const { error: deleteError } = await supabase
        .from('developer_skills')
        .delete()
        .eq('developer_id', developerId);

      if (deleteError) throw deleteError;

      // Insert new skills
      if (skills.length > 0) {
        const { error: insertError } = await supabase
          .from('developer_skills')
          .insert(
            skills.map(skill => ({
              developer_id: developerId,
              ...skill,
            }))
          );

        if (insertError) throw insertError;
      }

      return true;
    } catch (error) {
      console.error('Error updating skills:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateAvailability = useCallback(async (
    developerId: string,
    availability: Omit<Availability, 'developer_id' | 'updated_at'>
  ): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('availability')
        .upsert({
          developer_id: developerId,
          ...availability,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error updating availability:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const createReview = useCallback(async (
    reviewerId: string,
    revieweeId: string,
    projectId: string,
    rating: number,
    comment?: string
  ): Promise<boolean> => {
    if (!user) return false;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          reviewer_id: reviewerId,
          reviewee_id: revieweeId,
          project_id: projectId,
          rating,
          comment,
        });

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error creating review:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [user]);

  return {
    getDeveloperProfile,
    updateSkills,
    updateAvailability,
    createReview,
    loading,
  };
} 