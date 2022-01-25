const CACHE_NAME = "fndev-v13";
var urlsToCache = [
  "/",
  "/index.html",
  "/nav.html",
  "/pages/home.html",
  "/pages/portfolio.html",
  "/pages/about.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/icon.png",
  "/img/background/1.jpg",
  "/img/background/2.jpg",
  "/img/background/3.jpg",
  "/img/logo/brand.svg",
  "/img/logo/brush.png",
  "/img/logo/menu.svg",
  "/img/logo/web.png",
  "/img/photo/fuji.jpg",
  "/img/portfolio/1.jpg",
  "/img/portfolio/2.jpg",
  "/img/portfolio/3.jpg",
  "/img/portfolio/4.jpg",
  "/img/portfolio/5.jpg",
  "/img/portfolio/6.jpg",
  "/manifest.json",
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function (response) {
        if (response) {
          console.log("ServiceWorker: Used assets from cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Load assets from server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      ).then(function () {
        return self.clients.claim();
      });
    })
  );
});
