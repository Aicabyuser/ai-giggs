import React from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster, toast } from 'sonner';
import { lazy, Suspense } from 'react'
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from '@/hooks/use-toast';
import './index.css'
import { AuthProvider } from './hooks/useAuth';
import PWAHandler from '@/components/PWAHandler';

// Lazy-load the App component with error handling
const App = lazy(() => import('./App.tsx').catch(error => {
  console.error('Failed to load App component:', error);
  return { default: () => <div>Error loading application. Please refresh the page.</div> };
}));

// Show PWA install prompt when conditions match
let deferredPrompt: any = null;

// Track if the app has registered service worker
let isAppRegistered = false;

// Initialize web push notifications
const initPushNotifications = async () => {
  if (!('Notification' in window) || !navigator.serviceWorker) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const registration = await navigator.serviceWorker.ready;
      
      // Here you would subscribe to push notifications
      // This requires a backend service to implement properly
      console.log('Push notification permission granted. Service worker ready:', registration);
    }
  } catch (error) {
    console.error('Error setting up push notifications:', error);
  }
};

// Register service worker for PWA functionality
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      console.log('Service Worker registered with scope:', registration.scope);
      isAppRegistered = true;
      
      // Check for update on registration
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            toast('App Update Available', {
              description: 'A new version is available. Refresh to update.',
              action: {
                label: 'Update',
                onClick: () => window.location.reload()
              }
            });
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      // Log additional details about the error
      if (error instanceof Error) {
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
      }
      // Don't block app initialization if service worker fails
      return null;
    }
  }
  return null;
};

// Handle beforeinstallprompt event for PWA installation
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  isAppRegistered = true;
  
  // Show install prompt
  toast('Install AI-Giggs', {
    description: 'Install AI-Giggs for a better experience',
    action: {
      label: 'Install',
      onClick: () => {
        deferredPrompt?.prompt();
        deferredPrompt?.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the install prompt');
          } else {
            console.log('User dismissed the install prompt');
          }
        });
      }
    }
  });
});

// Handle appinstalled event
window.addEventListener('appinstalled', () => {
  // Clear the deferredPrompt so it can be garbage collected
  deferredPrompt = null;
  isAppRegistered = true;
  
  // Show success message
  toast('App Installed', {
    description: 'AI-Giggs has been installed successfully',
    duration: 3000
  });
});

// Initialize the app
const initApp = async () => {
  try {
    // Register service worker but don't wait for it
    registerServiceWorker().catch(error => {
      console.error('Service worker registration failed:', error);
    });
    
    // Setup notifications after service worker is ready
    if (isAppRegistered) {
      initPushNotifications().catch(error => {
        console.error('Push notifications setup failed:', error);
      });
    }
    
    // Render the app with a loading fallback
    const rootElement = document.getElementById("root");
    if (!rootElement) {
      throw new Error('Root element not found');
    }

    createRoot(rootElement).render(
      <BrowserRouter>
        <ToastProvider>
          <AuthProvider>
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-screen bg-background">
                <div className="animate-pulse flex flex-col items-center">
                  <img 
                    src="/images/favicon-192x192.png" 
                    alt="Loading" 
                    className="w-16 h-16 mb-4" 
                  />
                  <p className="text-muted-foreground">Loading AI-Giggs...</p>
                </div>
              </div>
            }>
              <App />
            </Suspense>
            <Suspense>
              <PWAHandler />
            </Suspense>
          </AuthProvider>
        </ToastProvider>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('Failed to initialize app:', error);
    // Render error state
    const rootElement = document.getElementById("root");
    if (rootElement) {
      createRoot(rootElement).render(
        <div className="flex items-center justify-center min-h-screen bg-background">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <p className="text-muted-foreground mb-4">Please refresh the page or try again later.</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
  }
};

// Start the app
initApp();
