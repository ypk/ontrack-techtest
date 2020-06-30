const cacheName = "ontrack-cache-conf-v1";

const staticAssets = [
  "./",
  "./index.html",
  "./static/js/**/*.js",
  "./static/css/**/*.css",
  "./favicon.ico",
  "./robots.txt",
  "./manifest.json",
  "./logo*.png"
];

async function networkFirst(req) {
  const cache = await caches.open(cacheName);
  try {
    const res = await fetch(req);
    cache.put(req, res.clone());
    return res;
  } catch (e) {
    const cachedResponse = await cache.match(req);
    return cachedResponse;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || networkFirst(req);
}

navigator.serviceWorker.addEventListener("install", async (event) => {
  const cache = await caches.open(cacheName);
  cache.addAll(staticAssets);
});

navigator.serviceWorker.addEventListener("fetch", async (event) => {
  console.info("INFO: Fetch event triggered");
  const req = event.request;
  const url = new URL(req.url);

  if (url.origin === window.location.url) {
    event.respondWith(cacheFirst(req));
  } else {
    event.respondWith(networkFirst(req));
  }
});