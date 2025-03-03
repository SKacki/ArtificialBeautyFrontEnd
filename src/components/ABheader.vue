<script setup>
import { RouterLink, useRouter } from 'vue-router';
import ABSearchBar from './ABSearchBar.vue';
import logo from '@/assets/logo.png';
import defaultProfilePic from '@/assets/default-profile.png';

const router = useRouter();
const props = defineProps({
  user: Object,
});

const redirectToView = (view) => {
  router.push({ name: view });
};
</script>

<template>
  <div>
    <header>
      <nav class="container">
        <div class="branding">
          <div class="logo-container">
            <img :src="logo" alt="Logo" @click="redirectToView('home')" />
          </div>
          <h1>Artificial Beauty</h1>
        </div>
        <ABSearchBar />
        <ul class="nav-routes">
          <RouterLink to="/generator/0" class="nav-item">
            <span class="icon">🎨</span> <span>Create</span>
          </RouterLink>
          <RouterLink to="/" class="nav-item">
            <span class="icon">🤖</span> <span>Models</span>
          </RouterLink>
          <RouterLink to="/" class="nav-item">
            <span class="icon">🖼️</span> <span>Images</span>
          </RouterLink>
          <RouterLink to="/transactions/1" class="nav-item">
            <span class="icon">💰</span> <span>{{ props.user.currency ?? 0 }}</span>
          </RouterLink>
        </ul>

        <div class="user-info">
          <RouterLink to="/user/1" class="profile-pic">
            <img :src="props.user.profilePic || defaultProfilePic" alt="Profile Picture" />
          </RouterLink>
        </div>
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
    justify-content: space-between;

    .branding {
      display: flex;
      align-items: center;
      gap: 12px;

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
        cursor: pointer;
      }

      h1 {
        font-size: 24px;
      }
    }

    .nav-routes {
      display: flex;
      flex: 1;
      justify-content: center;
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

    .user-info {
      display: flex;
      align-items: center;
      margin-left: 5px;
      gap: 15px;

      .profile-pic {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid #ffcc00;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
