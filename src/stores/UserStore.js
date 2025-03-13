import { defineStore } from "pinia";
import { ref } from "vue";
import baseLink from "@/baseUrl";

export const useUserStore = defineStore("user", () => {
  const user = ref(null);
  const fetchData = async (id) => {
    try {
      const response = await fetch(`${baseLink}/api/User/GetUser?userId=${id}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch user data");

      user.value = await response.json();
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  const userView = ref(null);
  const fetchView = async (id) => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetUserView?userId=${id}`,{
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`}
      });
      if (!response.ok) throw new Error("Failed to fetch user data");

      userView.value = await response.json();
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  const fetchUserByEmail = async (email) => {
    try {
      const response = await fetch(`${baseLink}/api/User/GetUserByEmail?email=${email}`,{
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error("Failed to fetch user data");

      user.value = await response.json();
      return user;
    } catch (error) {
      console.error("UserStore Error:", error);
    }
  };

  const updateUser = async (newUsr) => {
    try {
      const response = await fetch(`${baseLink}/api/User/UpdateUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`},
        body: JSON.stringify(newUsr),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }} catch (error) {
      console.error("Error updating profile:", error);}
  };

  return { user,userView, fetchData,fetchView,fetchUserByEmail,updateUser };
});