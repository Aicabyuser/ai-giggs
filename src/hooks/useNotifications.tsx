import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from './useAuth';

export interface NotificationPreferences {
  email_notifications: {
    new_proposals: boolean;
    project_updates: boolean;
    messages: boolean;
    marketing: boolean;
  };
  platform_notifications: {
    desktop: boolean;
  };
}

interface NotificationContextType {
  preferences: NotificationPreferences | null;
  loading: boolean;
  updating: boolean;
  updatePreferences: (newPreferences: Partial<NotificationPreferences>) => Promise<boolean>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (user) {
      loadPreferences();
    }
  }, [user]);

  const loadPreferences = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notification_preferences')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No preferences found, create default preferences
          const { data: newData, error: insertError } = await supabase
            .from('notification_preferences')
            .insert([
              {
                user_id: user.id,
                email_notifications: {
                  new_proposals: true,
                  project_updates: true,
                  messages: true,
                  marketing: false,
                },
                platform_notifications: {
                  desktop: true,
                },
              },
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          setPreferences(newData);
        } else {
          throw error;
        }
      } else {
        setPreferences(data);
      }
    } catch (error) {
      console.error('Error loading notification preferences:', error);
      toast({
        title: "Error",
        description: "Failed to load notification preferences.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (newPreferences: Partial<NotificationPreferences>): Promise<boolean> => {
    if (!user) return false;

    try {
      setUpdating(true);
      const { error } = await supabase
        .from('notification_preferences')
        .update({
          email_notifications: {
            ...preferences?.email_notifications,
            ...newPreferences.email_notifications,
          },
          platform_notifications: {
            ...preferences?.platform_notifications,
            ...newPreferences.platform_notifications,
          },
        })
        .eq('user_id', user.id);

      if (error) throw error;

      // Update local state
      setPreferences((prev) => prev ? {
        ...prev,
        ...newPreferences,
      } : null);

      toast({
        title: "Preferences Updated",
        description: "Your notification preferences have been saved.",
      });

      return true;
    } catch (error) {
      console.error('Error updating notification preferences:', error);
      toast({
        title: "Error",
        description: "Failed to update notification preferences.",
        variant: "destructive",
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const value = {
    preferences,
    loading,
    updating,
    updatePreferences,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
