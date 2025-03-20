self.addEventListener('install', (event) => {
  event.waitUntil(
      caches.open('tic-tac-toe-cache').then((cache) => {
          return cache.addAll([
              '/',
              '/index.html',
              '/style.css',
              '/script.js',
              '/manifest.json',
              '/icons/tic-tac-toe-icon.png',
          ]);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
          return cachedResponse || fetch(event.request);
      })
  );
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/tiktekOffline/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered:', registration);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}
