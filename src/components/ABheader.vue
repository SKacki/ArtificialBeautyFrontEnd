<script setup>
import { RouterLink,useRouter } from 'vue-router';
import ABSearchBar from './ABSearchBar.vue';
import logo from '@/assets/logo.png';

const router = useRouter()
const redirectHome = () => {
  router.push({ name: "home"});
}

</script>

<template>
    <div>
        <header>
            <nav class="container">
                <div class="branding">
                    <div class="logo-container">
                        <img :src="logo" alt="Logo" @click="redirectHome" />
                    </div>
                    <h1>Artificial Beauty</h1>
                </div>
                <ABSearchBar />
                <ul class="nav-routes">
                    <RouterLink to="/about" class="nav-item"><span class="icon">👤</span> <span>My Profile</span></RouterLink>
                    <RouterLink to="/generator/0" class="nav-item"><span class="icon">🎨</span> <span>Create</span></RouterLink>
                    <RouterLink to="/about" class="nav-item"><span class="icon">🤖</span> <span>Models</span></RouterLink>
                    <RouterLink to="/about" class="nav-item"><span class="icon">🖼️</span> <span>Images</span></RouterLink>
                </ul>
            </nav>
        </header>
    </div>
</template>

<style lang="scss" scoped>
header {
  background-color: #f1f1f1;
  nav {
    display: flex;
    align-items: center;
    padding: 20px 16px;

    .branding {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-right: auto; 

      .logo-container {
        width: 80px;
        height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: white;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 5px;
      }

      img {
        width: 80px;
        height: 80px;
        object-fit: cover;
        border-radius: 50%;
      }

      h1 {
        font-size: 24px;
      }
    }

    .nav-routes {
      display: flex;
      flex: 1;
      justify-content: flex-end;
      gap: 12px;
      list-style: none;

      .nav-item {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        transition: 0.3s ease;
        font-weight: bold;
        text-decoration: none;
        color: black;
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

        &:hover {
          background: #ffcc00;
          transform: scale(1.05);
        }

        .icon {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
