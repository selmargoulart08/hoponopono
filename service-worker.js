const CACHE_NAME = 'hooponopono-cache-v1';
const urlsToCache = [
  '/',
  'index.html',
  'estilo.css',
  'script.js',
  'music.mp3',
  'lotus.ico',
  'logo-192.png',
  'logo-512.png',
  'manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
