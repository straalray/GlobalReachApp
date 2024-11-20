const CACHE_NAME = "globalreach-cache-v1";
const urlsToCache = [
  "/",
  "/straalray.github.io/GlobalReachWebApp/index",
  "/straalray.github.io/GlobalReachWebApp/decommissioning_report.html",
  "/straalray.github.io/GlobalReachWebApp/antenna_installation.html",
  "/straalray.github.io/GlobalReachWebApp/cabinet_container_section.html",
  "/straalray.github.io/GlobalReachWebApp/earthing_bob_section.html",
  "/straalray.github.io/GlobalReachWebApp/end_of_day_report.html",
  "/straalray.github.io/GlobalReachWebApp/ers_decom.html",
  "/straalray.github.io/GlobalReachWebApp/ers_installation.html",
  "/straalray.github.io/GlobalReachWebApp/site_issues_log.html",
  "/straalray.github.io/GlobalReachWebApp/tower_rf_quality_section.html",
  "/straalray.github.io/GlobalReachWebApp/tower_steelwork_section.html",
  "/straalray.github.io/GlobalReachWebApp/complogo_one.png",
  "/straalray.github.io/GlobalReachWebApp/complogo_two.png",


// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch resources
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached resource if available, otherwise fetch from network
      return response || fetch(event.request).catch(() => {
        // If offline and resource not cached, return fallback page
        if (event.request.mode === 'navigate') {
          return caches.match('/GlobalReachApp/index.html');
        }
      });
    })
  );
});

// Activate service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});