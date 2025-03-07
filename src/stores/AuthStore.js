import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const register = async (credentials) => {
    try {
      const response = await fetch("https://localhost:44307/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if(!response.ok){
            const data = await response.json();
            return {status:response.status, data};
        } else {
            return{status:200,data:null};
        }
    } catch (error) {
      console.error("API Error:", error);
    }
    };


  const login = async (credentials) => {
    try {
      const response = await fetch("https://localhost:44307/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) 
        {
            const data = await response.json();
            return {status:response.status, data};
        }
        else {
            const data = await response.json();
            return{status:200,data};
        }
    } catch (error) {
        console.error("API Error:", error);
    }
  };


  const postUser = async (usr) => {
    try {
      const response = await fetch("https://localhost:44307/api/User/PostUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usr),
      });
      if (!response.ok) throw new Error("Something went wrong :/");
      user.value = await response.json();
    } catch (error) {
        console.error("API Error:", error);
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

  return { user, register, login, fetchUser, postUser };
});