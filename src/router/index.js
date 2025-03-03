import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: () => import('../views/UserProfileView.vue'),
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
    {
      path: '/transactions/:userId?',
      name: 'transactions',
      component: () => import('../views/TransactionsView.vue'),
    },  
  ],
})

export default router
