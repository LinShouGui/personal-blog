var cacheStorageKey = 'vue-pwa@v1.0.0'
// var assetHostPattern = /\/\/(localhost:8088)/
var assetHostPattern = /\/\/www\.xx\.com/
var cacheList = [
  // './',
  // './index.html',
  // './static/favicon.png'
  './',
  './index.html',
  './static/favicon.png',
  './static/guiicon_48.png',
  './static/guiicon_96.png',
  './static/guiicon_144.png',
  'https://cdn.bootcss.com/element-ui/2.0.7/theme-chalk/index.css',
  'https://cdn.bootcss.com/vue/2.5.9/vue.min.js',
  'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
  'https://cdn.bootcss.com/element-ui/2.0.7/index.js',
  'https://cdn.bootcss.com/three.js/r83/three.min.js',
  'https://www.xx.com/register.simple.js',
  'https://cdn.bootcss.com/eruda/1.4.2/eruda.min.js',
]

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList))
    .then(() => self.skipWaiting())
  )
})

self.addEventListener('fetch', function(e) {
  if (assetHostPattern.test(e.request.url)) {
    e.respondWith(
      caches.match(e.request).then(function(response) {
        if (response != null) {
          return response
        }
        return fetch(e.request.url)
      })
    )
  }
})

self.addEventListener('activate', e => {
  // delete old deprecated caches.
  caches.keys().then(cacheNames => Promise.all(
    cacheNames
      .map(cacheName => caches.delete(cacheName))
  ))
  e.waitUntil(self.clients.claim())
})

self.addEventListener('push', function(e) {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }
  var data = {}
  if (e.data) {
    data = e.data.json()
    data.data = {} // url 只能通过 notificationclick 的 e.notification.data 对象传递
    data.data.url = data.url
  }
  console.log(data)
  e.waitUntil(self.registration.showNotification(data.title, data))
})

self.addEventListener('notificationclick', function (e) {
  let notification = e.notification
  let url = notification.data.url
  if (!url) {
    return notification.close()
  }

  e.waitUntil(
    clients.matchAll({
      type: "window"
    })
    .then(function (clientList) {
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url == '/' && 'focus' in client)
          return client.focus();
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
})
