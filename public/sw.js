const CACHE = 'riddle-grid-v5';
const CORE = ['/', '/?demo=1', '/demo', '/privacy', '/terms', '/favicon.svg', '/art/field-desk-640.webp', '/art/field-desk.webp'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    const cacheFresh = async (path) => {
      const url = new URL(path, self.location.origin);
      url.searchParams.set('precache', '5');
      const response = await fetch(url, { cache: 'no-store' });
      if (response.ok) await cache.put(path, response);
    };
    await Promise.all(CORE.map(cacheFresh));
    const html = await (await cache.match('/')).text();
    const assets = [...html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g)].map((match) => match[1]);
    await Promise.all(assets.map(cacheFresh));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith((async () => {
    if (event.request.mode === 'navigate') {
      try {
        const response = await fetch(event.request);
        if (response.ok) (await caches.open(CACHE)).put(new URL(event.request.url).pathname, response.clone());
        return response;
      } catch {
        return (await caches.match(new URL(event.request.url).pathname)) || (await caches.match('/'));
      }
    }
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response.ok) (await caches.open(CACHE)).put(event.request, response.clone());
      return response;
    } catch {
      throw new Error('Offline resource unavailable');
    }
  })());
});
