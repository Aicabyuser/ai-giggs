import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        navigate('/sign-in?error=auth-failed');
        return;
      }

      if (!session) {
        navigate('/sign-in');
        return;
      }

      // Get user role from metadata
      const role = session.user.user_metadata.role;

      // Redirect based on role
      if (role === 'developer') {
        navigate('/developer-dashboard');
      } else if (role === 'client') {
        navigate('/client-dashboard');
      } else {
        navigate('/dashboard');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-muted-foreground">Completing sign in...</p>
      </div>
    </div>
  );
};

export default AuthCallback; 