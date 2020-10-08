import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// import {VueMasonryPlugin} from 'vue-masonry';

createApp(App).use(store).use(router).mount('#app')
