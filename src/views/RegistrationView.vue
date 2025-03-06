<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";

const authStore = useAuthStore();
const username = ref("");
const email = ref("");
const password = ref("");
const error = authStore.error;

const handleRegister = async () => {
  await authStore.register({ username: username.value, email: email.value, password: password.value });
};
</script>

<template>
    <div class="auth-container">
      <h2>Register</h2>
      <form @submit.prevent="handleRegister">
        <input type="text" v-model="username" placeholder="Username" required />
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </div>
  </template>
    
  <style scoped>
  .auth-container { max-width: 400px; margin: auto; text-align: center; }
  input { display: block; width: 100%; padding: 10px; margin: 10px 0; }
  button { padding: 10px 20px; }
  .error { color: red; }
  </style>