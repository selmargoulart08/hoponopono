// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// Lista de arquivos para pré-caching
workbox.core.skipWaiting();
workbox.core.clientsClaim();

const urlsToPrecache = [
  '/',
  'index.html',
  'estilo.css',
  'script.js',
  'music.mp3',
  'lotus.ico',
  'logo-192.png',
  'logo-512.png',
  'manifest.json',
  'offline.html'
];

workbox.precaching.precacheAndRoute(urlsToPrecache);

// Regra de fallback para quando o usuário estiver offline
const offlineFallbackPage = 'offline.html';

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          const cache = await caches.open(workbox.core.cacheNames.precache);
          const cachedResponse = await cache.match(offlineFallbackPage);
          return cachedResponse;
        }
      })()
    );
  }
});
