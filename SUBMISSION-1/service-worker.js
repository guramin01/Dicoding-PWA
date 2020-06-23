const CACHENYA = "PWAIRFAN3";
var urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/makanan.html",
    "/pages/keranjang.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/css/custom.css",
    "/js/materialize.min.js",
    "/js/main.js",
    "/js/regist-sw.js",
    "/image/makanan1.jpg",
    "/image/makanan2.jpg",
    "/image/makanan3.jpg",
    "/icon/rest-512.png",
    "/icon/rest-384.png",
    "/icon/rest-192.png",
    "/icon/rest-96.png",
    '/manifest.json',
];


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHENYA)
    .then(cache => {
      urlsToCache.forEach(url => {
        cache.add(url)
        .catch(err => { 
          console.log('Ada Error Cek Url', err); ;/* Buat Error Handling / optional sih */
        })
      });
    })
  );
    return self.skipWaiting(); /* karena di laptop saya selalu Waiting .*/
});

self.addEventListener('activate', function(event){
    event.waitUntil(
        caches.keys()
        .then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName){
                    if(cacheName != CACHENYA){    
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request, {cacheName:CACHENYA})
        .then(function(response) {
            if(response){
                console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                return response;
            }
            
            console.log("ServiceWorker: Memuat aset dari server: ", event.request.url);
            return fetch(event.request);
        })
    );
});