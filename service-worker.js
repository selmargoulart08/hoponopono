const CACHE_NAME = 'hoponopono-cache-v1';

// Lista de arquivos para armazenar em cache.
// O PWA Builder analisará essa lista para saber quais arquivos tornar offline.
const urlsToCache = [
  '/hoponopono/',
  '/hoponopono/index.html',
  '/hoponopono/style.css',
  '/hoponopono/script.js',
  '/hoponopono/logo-192.png',
  '/hoponopono/logo-512.png',
  '/hoponopono/lotus.ico',
  '/hoponopono/music.mp3'
];

// Instalação do Service Worker e armazenamento dos arquivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto, adicionando arquivos...');
        return cache.addAll(urlsToCache);
      })
  );
});

// Intercepta as requisições de rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Se o arquivo estiver no cache, ele o retorna
        if (response) {
          return response;
        }

        // Caso contrário, busca na rede
        return fetch(event.request);
      })
  );
});
