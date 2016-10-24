const CACHE_NAME = 'fruitee-static-v1';

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
