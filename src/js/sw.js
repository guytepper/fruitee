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
