/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

// importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

if (workbox) {
  console.log(`Boo! Workbox load 😬`);
  workbox.routing.registerRoute(
    ({event}) => event.request.destination === 'script' || event.request.destination==='document',
    new workbox.strategies.NetworkFirst({
      cacheName: 'general-cache',
    })
  );

  // workbox.routing.registerRoute(
  //   /^https:\/\/api.giphy.com\/(.*)/,
  //   new workbox.strategies.NetworkFirst({
  //     cacheName: 'api-cache',
  //     plugins: [
  //       new workbox.cacheableResponse.CacheableResponsePlugin({
  //         statuses: [0, 200],
  //       }),
  //       new workbox.expiration.ExpirationPlugin({
	// 				maxEntries: 5,
	// 				maxAgeSeconds: 2 * 24 * 60 * 60, // 2 Days
	// 				purgeOnQuotaError: true
	// 			})
  //     ]
  //   })
  // );

workbox.routing.registerRoute(
    /^https:\/\/media[0-9].giphy.com\/(.*)/,
    new workbox.strategies.CacheFirst({
      cacheName: 'image-cache',
      plugins: [
        new workbox.cacheableResponse.CacheableResponsePlugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.ExpirationPlugin({
					maxEntries: 200,
					maxAgeSeconds:  24 * 60 * 60, // 1 Day
					purgeOnQuotaError: true
				})
      ]
    })
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

workbox.core.setCacheNameDetails({prefix: "pwa-giphy"});


self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
