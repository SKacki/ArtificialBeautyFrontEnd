import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:44307/api/View/GetUserView?userId=${1}`);
      if (!response.ok) throw new Error("Failed to fetch user data");

      user.value = await response.json();
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  return { user, fetchData };
});