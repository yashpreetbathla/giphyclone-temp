/* eslint-disable no-console */
const staticName = 'static-cache';
const assets = ['/'];
import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log(
        'App is being served from cache by a service worker.\n' +
        'For more details, visit https://goo.gl/AFskqB'
      )
      caches.open(staticName).then((cache)=>{
        cache.addAll(assets);
      })
      self.addEventListener('fetch', function(event) {
        console.log('fetch event',  event);
      });
    },
    registered () {
      console.log('Service worker has been registered.')
      self.addEventListener('fetch', function(event) {
        console.log('fetch event',  event);
      });
    },
    cached () {
      console.log('Content has been cached for offline use.')
   
    },
    updatefound () {
      self.addEventListener('fetch', function(event) {
        console.log('fetch event',  event);
      });
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
}
