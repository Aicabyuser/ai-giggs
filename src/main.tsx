import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import { toast } from '@/hooks/use-toast'
import './index.css'

// Lazy-load the App component
const App = lazy(() => import('./App.tsx'))

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
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('Service Worker registered with scope:', registration.scope);
      isAppRegistered = true;
      
      // Check for update on registration
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New version available
            toast({
              title: "App Update Available",
              description: "A new version is available. Refresh to update.",
              action: (
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-primary text-white px-2 py-1 rounded text-xs"
                >
                  Update
                </button>
              ),
            });
          }
        });
      });
      
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }
  return null;
};

// Handle beforeinstallprompt event for PWA installation
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Update UI to notify the user they can add to home screen
  const installButton = document.createElement('button');
  installButton.id = 'install-button';
  installButton.textContent = 'Install App';
  installButton.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full shadow-lg z-50';
  installButton.style.display = 'none';
  
  document.body.appendChild(installButton);
  
  // Wait a few seconds before showing the install button
  setTimeout(() => {
    installButton.style.display = 'block';
  }, 5000);
  
  installButton.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // We've used the prompt, and can't use it again, throw it away
    deferredPrompt = null;
    
    // Hide the install button
    installButton.style.display = 'none';
  });
});

// Add listener for when the PWA was successfully installed
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  deferredPrompt = null;
  
  // Remove the install button if it exists
  const installButton = document.getElementById('install-button');
  if (installButton) {
    installButton.remove();
  }
  
  // Show a success toast
  toast({
    title: "Installation Complete",
    description: "App has been successfully installed!",
  });
});

// Initialize the app
const initApp = async () => {
  // Register service worker
  await registerServiceWorker();
  
  // Setup notifications after service worker is ready
  if (isAppRegistered) {
    await initPushNotifications();
  }
  
  // Render the app with a loading fallback
  createRoot(document.getElementById("root")!).render(
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
  );
};

// Start the app
initApp();
