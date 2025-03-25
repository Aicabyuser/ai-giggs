
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from './use-toast';

// Notification types
export type NotificationType = 'message' | 'project' | 'payment' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
  sender?: {
    name: string;
    avatar?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Mock initial notifications
const mockNotifications: Notification[] = [
  {
    id: uuidv4(),
    type: 'message',
    title: 'New message received',
    message: 'Sarah Chen sent you a message about your AI Recommendation Engine project.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    actionUrl: '/messages',
    sender: {
      name: 'Sarah Chen',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    }
  },
  {
    id: uuidv4(),
    type: 'project',
    title: 'Project milestone completed',
    message: 'The first milestone for "Computer Vision System" has been marked as completed.',
    read: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    actionUrl: '/project/2'
  },
  {
    id: uuidv4(),
    type: 'payment',
    title: 'Payment received',
    message: 'You received a payment of $1,500 for completing the first milestone of AI Recommendation Engine.',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    actionUrl: '/payments'
  },
  {
    id: uuidv4(),
    type: 'system',
    title: 'Account verified',
    message: 'Your account has been successfully verified. You now have access to all platform features.',
    read: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  }
];

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const { toast } = useToast();
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: uuidv4(),
      read: false,
      timestamp: new Date()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show a toast for the new notification
    toast({
      title: notification.title,
      description: notification.message
    });
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearAll = () => {
    setNotifications([]);
  };
  
  // Load notifications from local storage on initial load
  useEffect(() => {
    const storedNotifications = localStorage.getItem('notifications');
    if (storedNotifications) {
      try {
        const parsedNotifications = JSON.parse(storedNotifications);
        // Convert string dates back to Date objects
        const notificationsWithDates = parsedNotifications.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        }));
        setNotifications(notificationsWithDates);
      } catch (error) {
        console.error('Failed to parse stored notifications', error);
      }
    }
  }, []);
  
  // Save notifications to local storage when they change
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAsRead,
        markAllAsRead,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
