<script setup>
import { ref,} from "vue";
import { useToast } from "vue-toastification";
import { useAuthStore } from "@/stores/AuthStore";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const username = ref("");
const email = ref("");
const password = ref("");

const handleRegister = async () => {
  const result = await authStore.register({ username: username.value, email: email.value, password: password.value });
    if (result.status===200)
    {
      toast.success("Registration was successful");
      router.push({ name: "login" });
    }
    else
    {
      //I don't care anymore. This will have to do.
      console.log(result.data.errors);
      if(result.data.errors?.PasswordRequiresDigit)
        {toast.error(result.data.errors?.PasswordRequiresDigit[0]);}
      if(result.data.errors?.PasswordRequiresNonAlphanumeri)
        {toast.error(result.data.errors?.PasswordRequiresNonAlphanumeri[0]);}
      if(result.data.errors?.PasswordRequiresUpper)
        {toast.error(result.data.errors?.PasswordRequiresUpper[0]);}
      if(result.data.errors?.PasswordTooShort)
        {toast.error(result.data.errors?.PasswordTooShort[0]);}
      if(result.data.errors?.DuplicateUserName)
        {toast.error(result.data.errors?.DuplicateUserName[0]);}
      if(result.data.errors?.PasswordRequiresNonAlphanumeric)
        {toast.error(result.data.errors?.PasswordRequiresNonAlphanumeric[0]);}
    }
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
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
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

p {
  margin-top: 15px;
  font-size: 14px;
}

router-link {
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
