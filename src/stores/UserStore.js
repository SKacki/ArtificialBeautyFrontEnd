import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const fetchData = async (id) => {
    try {
      const response = await fetch(`https://localhost:44307/api/User/GetUser?userId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      user.value = await response.json();
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  const userView = ref(null);
  const fetchView = async (id) => {
    try {
      const response = await fetch(`https://localhost:44307/api/View/GetUserView?userId=${id}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      userView.value = await response.json();
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  return { user,userView, fetchData,fetchView };
});