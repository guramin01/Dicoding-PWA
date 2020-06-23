if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
    .then(function(regis) {
        console.log("Service Worker Terdaftar", regis);
    })
    .catch(function(err) {
        console.log("Service Worker Gagal Didaftarkan", err);
    })
}