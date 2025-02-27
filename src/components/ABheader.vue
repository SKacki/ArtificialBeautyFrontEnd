<script setup>
import { RouterLink } from 'vue-router';
import ABSearchBar from './ABSearchBar.vue';
</script>
<template>
    <div>
        <header>
            <nav class="container">
                <div class ="branding">
                    <img src ="" alt="">
                    <h1>Artificial Beauty</h1>
                </div>
                <ABSearchBar />
                <ul class="nav-routes">
                    <RouterLink to="/">Generator</RouterLink>
                    <RouterLink to="/about">My profile</RouterLink>
                    <RouterLink to="/generator"><span class="icon">🎨</span>
                      <span>Create</span></RouterLink>
                    <RouterLink to="/about">Models</RouterLink>
                    <RouterLink to="/about">Images</RouterLink>
                    <RouterLink to="/tst">Test View</RouterLink>
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
    padding: 25px 16px;

    .branding {
      display: flex;
      align-items: center;
      gap: 8px;
      img {
        max-width: 50px;
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

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }
}
</style>