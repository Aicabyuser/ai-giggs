import { useCallback, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Profile, ProfileFormData, ProfileUpdateResponse } from '@/types/profile';
import { useAuth } from './useAuth';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';

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

export function useProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const getProfile = useCallback(async (userId: string): Promise<Profile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getProfile:', error);
      return null;
    }
  }, []);

  const updateProfile = async (userId: string, data: ProfileData): Promise<boolean> => {
    try {
      setUpdating(true);

      // Validate data
      const validatedData = profileSchema.parse(data);

      // Update profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update(validatedData)
        .eq('id', userId);

      if (error) throw error;

      // Update user metadata
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          full_name: validatedData.full_name,
          company: validatedData.company,
        },
      });

      if (userError) throw userError;

      toast({
        title: "Profile Updated",
        description: "Your profile information has been updated successfully.",
      });

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Update Failed",
        description: error instanceof Error ? error.message : "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  return {
    getProfile,
    updateProfile,
    loading,
    updating,
  };
} 