<script setup>
import { ref } from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/AuthStore";
import { useUserStore } from "@/stores/UserStore";
import { useRouter } from "vue-router";


const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const userStore = useUserStore();
const email = ref("");
const password = ref("");
const error = authStore.error;

const handleLogin = async () => {
  const result = await authStore.login({ email: email.value, password: password.value });
  if (result.status===200)
    {
      const usr = await userStore.fetchUserByEmail(email.value);
      localStorage.setItem("userId", usr?.value.id);
      toast.success(`Welcome ${usr.value.userName}`);
      router.push({ name: "home" });
    }
    else
    {
      toast.error("Something went wrong. Please try again");
    }
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
.auth-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
  background: #222;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #626060;
}

input {
  display: block;
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  transition: border 0.3s ease-in-out;
  background: #333;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

button {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  border: none;
  background: #ffcc00;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s ease-in-out;
}

button:hover {
  background: #0056b3;
}

.error {
  color: red;
  margin-top: 10px;
  font-weight: bold;
}

p {
  color: #ffffff;
  margin-top: 15px;
  font-size: 14px;
}

router-link {
  color: #007bff;
  text-decoration: none;
}
</style>

  