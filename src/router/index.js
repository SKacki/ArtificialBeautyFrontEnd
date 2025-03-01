import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/tst',
      name: 'tst',
      component: () => import('../views/TestingShit.vue'),
    },
    {
      path: '/image/:imageId',
      name: 'image',
      component: () => import('../views/ImageView.vue'),
    },
    {
      path: '/generator/:imageId?',
      name: 'generator',
      component: () => import('../views/GeneratorView.vue'),
    },  
  ],
})

export default router
