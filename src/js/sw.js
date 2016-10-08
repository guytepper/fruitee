self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('fruitee-static').then(cache => {
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
