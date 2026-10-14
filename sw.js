// Service worker "Coup d'Envoi" — mode hors connexion
// ---------------------------------------------------
// - Quand il y a du réseau : l'app charge toujours la dernière version publiée.
// - Sans réseau : l'app s'ouvre quand même, à partir de la copie enregistrée.
// - Les données de matchs (serveur Render) sont gérées par l'app elle-même.
// Change VERSION à chaque mise à jour pour renouveler la copie.

const VERSION = 'v114';
const SHELL = 'ce-shell-' + VERSION;
const RUNTIME = 'ce-runtime';
const PRECACHE = ['./', 'index.html', 'i18n.js', 'bg-header.jpg', 'manifest.json', 'privacy.html', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png', 'apple-touch-icon.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL)
      .then(cache => Promise.all(PRECACHE.map(u => cache.add(u).catch(() => {}))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('ce-shell-') && k !== SHELL).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Les données (serveur Render) : gérées par l'app, le service worker ne s'en mêle pas
  if (url.hostname.endsWith('onrender.com')) return;

  // Pages : toujours essayer le réseau d'abord (dernière version), sinon la copie enregistrée
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req, { cache: 'no-cache' })
        .then(res => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(SHELL).then(c => c.put('index.html', copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match('index.html').then(r => r || caches.match('./')))
    );
    return;
  }

  // Fichiers de l'app et polices : copie d'abord, mise à jour en arrière-plan
  const okHost = url.origin === self.location.origin ||
    url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!okHost) return;

  event.respondWith(
    caches.open(RUNTIME).then(cache =>
      cache.match(req).then(hit => {
        const net = fetch(req)
          .then(res => {
            if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(() => {});
            return res;
          })
          .catch(() => null);
        event.waitUntil(net);
        return hit || net.then(res => res || new Response('', { status: 504 }));
      })
    )
  );
});

// Notifications push (buts, coup d'envoi, fin de match)
self.addEventListener('push', event => {
  let d = {};
  try { d = event.data ? event.data.json() : {}; } catch (e) { d = { title: "Coup d'Envoi", body: event.data ? event.data.text() : '' }; }
  event.waitUntil(self.registration.showNotification(d.title || "Coup d'Envoi", {
    body: d.body || '', tag: d.tag || undefined, icon: 'icon-192.png', badge: 'icon-192.png', data: { url: d.url || './' }
  }));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  event.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    for (const c of list) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow((event.notification.data && event.notification.data.url) || './');
  }));
});
