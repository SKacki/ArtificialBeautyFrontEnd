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
    {
      path: '/images',
      name: 'images',
      component: () => import('../views/ImagesGalleryView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegistrationView.vue'),
    },
    {
      path: '/model/:modelId',
      name: 'model',
      component: () => import('../views/ModelView.vue'),
    },        
  ],
})

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = !!localStorage.getItem("userId");

//   if (!isAuthenticated && to.name !== "Login"){ //&& to.name !== "Register") {
//     next("/login");
//   } else{
//     next();
//   }
// });

export default router
