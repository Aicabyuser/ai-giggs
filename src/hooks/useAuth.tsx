
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export type UserRole = 'client' | 'developer' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  signOut: () => void;
  isAuthenticated: boolean;
  isDeveloper: boolean;
  isClient: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would be fetched from a backend
const MOCK_USERS = [
  {
    id: '1',
    name: 'John Developer',
    email: 'dev@example.com',
    password: 'password',
    role: 'developer' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=John+Developer&background=6E59A5&color=fff'
  },
  {
    id: '2',
    name: 'Jane Client',
    email: 'client@example.com',
    password: 'password',
    role: 'client' as UserRole,
    avatar: 'https://ui-avatars.com/api/?name=Jane+Client&background=9b87f5&color=fff'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved auth token in localStorage
    const savedUser = localStorage.getItem('aigiggs_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('aigiggs_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user in mock data
    const foundUser = MOCK_USERS.find(
      u => u.email === email && u.password === password
    );
    
    if (foundUser) {
      const userData: User = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };
      
      setUser(userData);
      localStorage.setItem('aigiggs_user', JSON.stringify(userData));
      
      toast({
        title: "Welcome back!",
        description: `You're now signed in as ${userData.name}.`,
      });
      
      // Redirect based on user role
      if (userData.role === 'developer') {
        navigate('/developer-dashboard');
      } else if (userData.role === 'client') {
        navigate('/client-dashboard');
      } else {
        navigate('/dashboard');
      }
    } else {
      toast({
        title: "Sign in failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
    
    setLoading(false);
  };

  const signUp = async (
    email: string, 
    password: string, 
    name: string, 
    role: UserRole
  ): Promise<void> => {
    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    if (MOCK_USERS.some(u => u.email === email)) {
      toast({
        title: "Sign up failed",
        description: "This email is already registered. Please sign in instead.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Create new user (in a real app, this would be sent to a backend)
    const newUser: User = {
      id: `${MOCK_USERS.length + 1}`,
      name,
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=9b87f5&color=fff`
    };
    
    setUser(newUser);
    localStorage.setItem('aigiggs_user', JSON.stringify(newUser));
    
    toast({
      title: "Account created!",
      description: `Welcome to AIGiggs, ${name}!`,
    });
    
    // Redirect based on user role
    if (role === 'developer') {
      navigate('/developer-dashboard');
    } else if (role === 'client') {
      navigate('/client-dashboard');
    } else {
      navigate('/dashboard');
    }
    
    setLoading(false);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('aigiggs_user');
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  const isAuthenticated = !!user;
  const isDeveloper = user?.role === 'developer';
  const isClient = user?.role === 'client';
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider 
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        isAuthenticated,
        isDeveloper,
        isClient,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
