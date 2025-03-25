
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-6 max-w-lg animate-fade-in">
        <div className="mb-8">
          <div className="relative w-16 h-16 mx-auto overflow-hidden rounded-xl bg-primary/10 flex items-center justify-center mb-6">
            <span className="text-primary font-display text-4xl font-bold">404</span>
          </div>
          <h1 className="text-4xl font-display font-bold mb-4">Page Not Found</h1>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved to another URL.
          </p>
        </div>
        <Button 
          className="flex items-center gap-2" 
          size="lg"
          onClick={() => window.location.href = '/'}
        >
          <ArrowLeft className="h-4 w-4" /> Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
