// Fartsteroids offline support. Network first, so a new version shows up as soon as it's published;
// the saved copy is only used when there's no connection.
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request).then(r => {
    if (r.ok || r.type === "opaque") { const copy = r.clone(); caches.open("fartsteroids").then(c => c.put(e.request, copy)) }
    return r;
  }).catch(() => caches.match(e.request)));
});
