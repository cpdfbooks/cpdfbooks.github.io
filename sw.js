// Service Worker for Steam Price Monitor
const CACHE_NAME = 'pdfbooks-cache-v11';
const OFFLINE_URL = '/offline.html';

// 需要缓存的资源
// 缓存lib/foliate-js
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

function canCache(request) {
  const protocol = new URL(request.url).protocol;
  return protocol === 'http:' || protocol === 'https:';
}

function putInCache(request, response) {
  if (!canCache(request) || !response || !response.ok || response.status === 206) {
    return;
  }
  const responseClone = response.clone();
  caches.open(CACHE_NAME)
    .then((cache) => cache.put(request, responseClone))
    .catch(() => {});
}

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  // 只处理本站的 GET 请求。chrome-extension: 等协议不能写入 Cache
  if (event.request.method !== 'GET' || !canCache(event.request)) {
    return;
  }

  // Range 请求返回 206，无法写入 Cache，直接交给浏览器
  if (event.request.headers.has('range')) {
    return;
  }

  // 阅读页 /epub/、/txt/ 在静态托管上没有对应文件，导航失败时回退到 SPA
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => (response.ok ? response : caches.match('/index.html')))
        .catch(() => caches.match('/index.html'))
    );
    return;
  }

  const requestUrl = new URL(event.request.url);
  const isBookFile = requestUrl.pathname.startsWith('/data/')
    && /\.(txt|epub|pdf|json)$/i.test(requestUrl.pathname);

  // 对于书籍文件，使用网络优先策略
  if (isBookFile) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          putInCache(event.request, response);
          return response;
        })
        .catch(() => {
          // 网络失败时从缓存返回
          return caches.match(event.request);
        })
    );
    return;
  }

  // 仅拦截图片请求
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          // 如果命中缓存，直接返回；否则发起网络请求并存入缓存
          return cachedResponse || fetch(event.request).then((networkResponse) => {
            putInCache(event.request, networkResponse);
            return networkResponse;
          });
        });
      })
    );
  }
  else{  // 对于静态资源，使用缓存优先策略
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          if (response) {
            return response;
          }

          // 如果缓存中没有，从网络获取
          return fetch(event.request)
            .then((response) => {
              putInCache(event.request, response);
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
  }
});
console.log('Service Worker script loaded');