import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
const app = createApp(App)
app.component('Toast', Toast);

app.use(Toast, {
    position: "top-right",
    timeout: 3000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    transition: "Vue-Toastification__bounce",
  });

const pinia = createPinia()
app.use(router)

app.use(pinia)
app.mount('#app')
