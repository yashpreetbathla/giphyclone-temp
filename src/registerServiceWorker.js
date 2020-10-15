/* eslint-disable no-console */
// const staticName = 'static-cache';
// const assets = ['/'];
// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

// if (workbox) {
//   console.log(`Boo! Workbox load 😬`);
//   workbox.routing.registerRoute(
//     ({event}) => event.request.destination === 'script' || event.request.destination==='document',
//     new workbox.strategies.NetworkFirst({
//       cacheName: 'general-cache',
//     })
//   );
//   workbox.routing.registerRoute(
//     /^https:\/\/media[0-9].giphy.com\/(.*)/,
//     new workbox.strategies.CacheFirst({
//       cacheName: 'image-cache',
//       plugins: [
//         new workbox.cacheableResponse.CacheableResponsePlugin({
//           statuses: [0, 200],
//         }),
//         new workbox.expiration.ExpirationPlugin({
// 					maxEntries: 100,
// 					maxAgeSeconds: 2 * 24 * 60 * 60, // 2 Days
// 					purgeOnQuotaError: true
// 				})
//       ]
//     })
//   );
// } else {
//   console.log(`Boo! Workbox didn't load 😬`);
// }

import { register } from 'register-service-worker'

  register(`sw.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      // caches.open(staticName).then((cache)=>{
      //   cache.addAll(assets);
      // })
    },
    registered () {
      console.log('Service worker has been registered.')
      // self.addEventListener('fetch', function(event) {
      //   console.log('fetch event',  event);
      // });
    },
    cached () {
     
      // console.log(event);
      console.log('Content has been cached for offline use.')
   
    },
    updatefound () {
      // self.addEventListener('fetch', function(event) {
      //   console.log('fetch event',  event);
      // });
      console.log('New content is downloading.')
      
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })

