const CACHE='tifinity-ultra-v5';
const ASSETS=[
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();
            caches.open(CACHE)
              .then(cache => cache.put(event.request, copy))
              .catch(() => {});
          }
          return response;
        })
        .catch(() =>
          caches.match('./index.html').then(fallback => {
            const type = event.request.destination;
            return (type === 'document' || type === '')
              ? fallback
              : new Response('', {status: 504, statusText: 'Offline'});
          })
        );
    })
  );
});
