import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export const PWAHandler: React.FC = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Hide splash screen after 2 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);

    // Listen for service worker updates
    const handleServiceWorkerUpdate = (event: MessageEvent) => {
      const { type, version } = event.data || {};
      
      if (type === 'APP_UPDATED') {
        setUpdateAvailable(true);
        toast({
          title: "App Update Available",
          description: `Version ${version} is available. Refresh to update.`,
          action: (
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
              className="bg-primary text-white hover:bg-primary/90"
            >
              Update
            </Button>
          ),
        });
      }
    };

    // Register message listener for service worker
    navigator.serviceWorker?.addEventListener('message', handleServiceWorkerUpdate);

    return () => {
      clearTimeout(timer);
      navigator.serviceWorker?.removeEventListener('message', handleServiceWorkerUpdate);
    };
  }, [toast]);

  if (!showSplash) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      <button 
        onClick={() => setShowSplash(false)}
        className="absolute top-4 right-4 p-2 rounded-full bg-muted text-foreground hover:bg-muted/80"
        aria-label="Close splash screen"
      >
        <X size={20} />
      </button>
      
      <div className="animate-bounce mb-8">
        <img 
          src="/images/favicon-192x192.png" 
          alt="AI-Giggs Logo" 
          className="w-24 h-24 object-contain" 
        />
      </div>
      
      <h1 className="text-2xl font-bold mb-2 animate-fade-in">AI-Giggs</h1>
      <p className="text-muted-foreground mb-4 animate-fade-in">Finding your perfect AI developer</p>
      
      <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-[progress_2s_ease-in-out]" style={{width: '100%'}}></div>
      </div>
    </div>
  );
};

export default PWAHandler;
