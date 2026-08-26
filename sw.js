const CACHE_NAME = 'tifinity-v3-runtime-hardening';

const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './tifinity-runtime-patch.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function latestHtml(request) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    if (!response.ok) return response;
    const type = response.headers.get('content-type') || '';
    if (!type.includes('text/html')) return response;
    const text = await response.text();
    const marker = 'tifinity-runtime-patch.js';
    const patched = text.includes(marker)
      ? text
      : text.replace(/<\/body>/i, '<script src="./tifinity-runtime-patch.js?v=20260826" defer></script></body>');
    const headers = new Headers(response.headers);
    headers.set('Cache-Control', 'no-store');
    headers.set('X-Tifinity-Runtime', '2026-08-26-runtime-hardening-1');
    return new Response(patched, { status: response.status, statusText: response.statusText, headers });
  } catch (e) {
    return caches.match(request).then(r => r || caches.match('./index.html'));
  }
}

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (event.request.mode === 'navigate' || url.pathname.endsWith('/index.html') || url.pathname === '/') {
    event.respondWith(latestHtml(event.request));
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
      return response;
    }))
  );
});
