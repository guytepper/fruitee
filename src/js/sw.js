const CACHE_NAME = 'fruitee-static-v3';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll([
        '/',
        '/js/app.js',
        '/css/style.css',
        '/css/fruits.css',
        '/images/bubble.svg',
      ]);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) return response;
      return fetch(event.request);
    })
  );
});


self.addEventListener('activate', event => {
  // When a new service worker activates, delete the old caches
  event.waitUntil(
    deleteCaches()
  );
});

function deleteCaches() {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(name => {
      if (name != CACHE_NAME) {
        caches.delete(name);
      }
    });
  });
}
