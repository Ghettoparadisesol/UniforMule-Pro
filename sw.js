// sw.js
const CACHE_NAME = 'convertitore-pro-v1';
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './convertitore.js',
  './formule.js',
  './formule-fisica.js',
  './formule-matematica.js',
  './formule-finanziaria.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});