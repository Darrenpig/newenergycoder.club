const CACHE_NAME = 'nec-cache-v1';
const STATIC_CACHE = 'nec-static-v1';
const DYNAMIC_CACHE = 'nec-dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/og-image.svg'
];

const CACHE_STRATEGIES = {
  STATIC: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    maxEntries: 50
  },
  DYNAMIC: {
    maxAge: 24 * 60 * 60 * 1000,
    maxEntries: 100
  },
  API: {
    maxAge: 5 * 60 * 1000,
    maxEntries: 20
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') return;

  if (url.origin === location.origin) {
    if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2|ttf|eot)$/)) {
      event.respondWith(cacheFirst(request, STATIC_CACHE, CACHE_STRATEGIES.STATIC));
    } else if (url.pathname.startsWith('/api/')) {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE, CACHE_STRATEGIES.API));
    } else {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE, CACHE_STRATEGIES.DYNAMIC));
    }
  } else {
    event.respondWith(networkOnly(request));
  }
});

async function cacheFirst(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    await cache.put(request, response.clone());
    await cleanupCache(cacheName, strategy);
  }

  return response;
}

async function networkFirst(request, cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  try {
    const response = await fetch(request);
    if (response.ok) {
      await cache.put(request, response.clone());
      await cleanupCache(cacheName, strategy);
    }
    return response;
  } catch (error) {
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function networkOnly(request) {
  return fetch(request);
}

async function cleanupCache(cacheName, strategy) {
  const cache = await caches.open(cacheName);
  const requests = await cache.keys();
  const now = Date.now();

  for (const request of requests) {
    const response = await cache.match(request);
    if (!response) continue;

    const dateHeader = response.headers.get('date');
    if (dateHeader) {
      const cacheDate = new Date(dateHeader).getTime();
      if (now - cacheDate > strategy.maxAge) {
        await cache.delete(request);
      }
    }
  }

  const updatedRequests = await cache.keys();
  if (updatedRequests.length > strategy.maxEntries) {
    const toDelete = updatedRequests.slice(0, updatedRequests.length - strategy.maxEntries);
    await Promise.all(toDelete.map(req => cache.delete(req)));
  }
}

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});