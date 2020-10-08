import {defineAsyncComponent} from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
// import Gifs from '../views/Gifs.vue'
const Gifs = defineAsyncComponent(()=>import('../views/Gifs.vue'));
const Stickers = defineAsyncComponent(()=>import('../views/Stickers.vue'));
const routes = [
  {
    path: '/',
    name: 'Gifs',
    component: Gifs
  },
  {
    path: '/stickers',
    name: 'Stickers',
    component : Stickers
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Stickers.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
