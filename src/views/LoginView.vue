<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();
const email = ref("");
const password = ref("");
const error = authStore.error;

const handleLogin = async () => {
  await authStore.login({ email: email.value, password: password.value });
};
</script>

<template>
    <div class="auth-container">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </div>
  </template>
  
  <style scoped>
  .auth-container { max-width: 400px; margin: auto; text-align: center; }
  input { display: block; width: 100%; padding: 10px; margin: 10px 0; }
  button { padding: 10px 20px; }
  .error { color: red; }
  </style>
  