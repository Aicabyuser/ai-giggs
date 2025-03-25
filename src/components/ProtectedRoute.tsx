
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('client' | 'developer' | 'admin')[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading...</span>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    // Redirect to sign in page and save the current location they were trying to access
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }
  
  // If specific roles are required, check if the user has the right role
  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    if (user.role === 'client') {
      return <Navigate to="/client-dashboard" replace />;
    } else if (user.role === 'developer') {
      return <Navigate to="/developer-dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
