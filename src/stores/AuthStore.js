import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const error = ref(null);

  const register = async (credentials) => {
    try {
      const response = await fetch("https://localhost:44307/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Registration failed");
      user.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const login = async (credentials) => {
    try {
        creds = ref(
            {
                email : credentials.email,
                password: credentials.password,
                twoFactorCode: "",
                twoFactorRecoveryCode: "" 
            });
      const response = await fetch("https://localhost:44307/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(creds),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      user.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await fetch("https://localhost:44307/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Invalid credentials");
      user.value = await response.json();
    } catch (err) {
      error.value = err.message;
    }
  };

  return { user, error, register, login, fetchUser };
});