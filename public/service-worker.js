// Cache name with version
const CACHE_NAME = 'ai-giggs-v1';
const DATA_CACHE_NAME = 'ai-giggs-data-cache-v1';

// App version for update notification
const APP_VERSION = '1.1.0';

// Assets to cache initially
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon.svg',
  '/images/favicon-16x16.png',
  '/images/favicon-32x32.png',
  '/images/favicon-192x192.png',
  '/images/favicon-512x512.png',
  '/images/apple-touch-icon.png',
];

// Install the service worker and cache initial assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Force new service worker to activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activate and clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME, DATA_CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      // Tell clients about the new version
      self.clients.matchAll().then(clients => {
        clients.forEach(client => {
          client.postMessage({ 
            type: 'APP_UPDATED', 
            version: APP_VERSION
          });
        });
      });
    })
  );
  return self.clients.claim();
});

// Network first strategy for API calls
const apiRoutes = ['/api', 'https://api.ai-giggs.com'];

// Intercept fetch requests and serve from cache if available
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip caching for unsupported URL schemes
  if (!['http:', 'https:'].includes(url.protocol)) {
    return;
  }
  
  // Network first for API requests
  if (apiRoutes.some(route => url.href.includes(route))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response and store it in the cache
          const responseToCache = response.clone();
          caches.open(DATA_CACHE_NAME).then(cache => {
            if (event.request.method === 'GET') {
              cache.put(event.request, responseToCache);
            }
          });
          return response;
        })
        .catch(() => {
          // If network request fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Show offline content for API requests that aren't cached
              return caches.match('/offline.html');
            });
        })
    );
  } else {
    // Cache first for non-API requests
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return cached response if found
          if (response) {
            return response;
          }
          
          // Clone the request - it can only be used once
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest)
            .then((response) => {
              // Don't cache if response is not valid
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response as it can only be consumed once
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            })
            .catch(() => {
              // If offline and no cache, serve offline page
              if (event.request.mode === 'navigate') {
                return caches.match('/offline.html');
              }
              // For image requests, serve a placeholder
              if (event.request.destination === 'image') {
                return caches.match('/placeholder.svg');
              }
              return new Response('Network error happened', {
                status: 408,
                headers: { 'Content-Type': 'text/plain' },
              });
            });
        })
    );
  }
});

// Listen for push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data.text(),
    icon: '/images/favicon-192x192.png',
    badge: '/images/favicon-32x32.png',
  };

  event.waitUntil(
    self.registration.showNotification('AI-Giggs', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});

