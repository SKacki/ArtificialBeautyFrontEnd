import { defineStore } from "pinia";
import { ref } from "vue";
import baseLink from "@/baseUrl";
//import jwtDecode from "jwt-decode";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);

  const register = async (credentials) => {
    try {
      const response = await fetch(`${baseLink}/register`, {
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
      const response = await fetch(`${baseLink}/login`, {
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
            //setLocalStorage(data.accessToken);
            return{status:200,data};
        }
    } catch (error) {
        console.error("API Error:", error);
    }
  };

  const fetchUser = async (id) => {
    try {
      const response = await fetch(`${baseLink}/api/auth/login`, {
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

  const logout = async() => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
  };

  // const setLocalStorage = async (token) =>
  //   {
  //     if(checkToken(token) === 0){
  //       localStorage.setItem("token", jwtDecode(token))
  //     } else {
  //       logout();
  //     }
  //   };



  // const checkToken = async(token) => {
  //   const decodedToken = jwtDecode(token);
  //   const expiry = decodedToken.exp * 1000;
    
  //   if (Date.now() >= expiry) {return -1;}
  //   else {return 0}
  //   }

  return { user, register, login, fetchUser,logout };
});