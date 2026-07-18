/* MIFTAH — service worker : cache offline */
const CACHE = 'miftah-v4';
const ASSETS = ['index.html','app.js?v=4','data.js?v=3','manifest.webmanifest','icon-192.png','icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  if (new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(caches.match(e.request).then(h => h || fetch(e.request).then(r => {
    const c = r.clone(); caches.open(CACHE).then(x => x.put(e.request, c)).catch(() => {}); return r;
  }).catch(() => caches.match('index.html'))));
});
