// Service Worker for Steam Price Monitor
const CACHE_NAME = 'pdfbooks-cache-v3';
const OFFLINE_URL = '/offline.html';

// 需要缓存的资源
const CACHE_URLS = [
  '/',
  '/index.html',
    '/offline.html'
];

// 安装事件
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching app shell');
        return cache.addAll(CACHE_URLS);
      })
      .then(() => {
        // 强制激活新的Service Worker
        return self.skipWaiting();
      })
  );
});

// 激活事件
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // 立即控制所有客户端
        return self.clients.claim();
      })
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只处理GET请求
  if (event.request.method !== 'GET') {
    return;
  }

  // 对于pdf请求，使用网络优先策略
  if (event.request.url.includes('pdf')|| event.request.url.includes('pdfbooks.youseeyou1daydayde.uk/')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // 缓存成功的API响应
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // 网络失败时从缓存返回
          return caches.match(event.request);
        })
    );
    return;
  }

  // 对于静态资源，使用缓存优先策略
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        // 如果缓存中没有，从网络获取
        return fetch(event.request)
          .then((response) => {
            // 只缓存成功的响应
            if (response.ok && !response.url.includes("chrome-extension")) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // 如果是导航请求且网络失败，返回离线页面
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
            throw new Error('Network failed and no cache available');
          });
      })
  );
});
console.log('Service Worker script loaded');