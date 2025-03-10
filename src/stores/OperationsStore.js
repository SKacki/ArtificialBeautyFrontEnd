import { defineStore } from "pinia";
import { ref } from "vue";

export const useOperationsStore = defineStore("operations", () => {

  const sendReaction = async (reaction) => {  
    try {
      const response = await fetch(`https://localhost:44307/api/Image/PostReaction`, 
        {      
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(reaction)
        }
      );
      const data = await response.json();
      return {status:response.status,data};
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const sendTip = async (tip) => {  
    try {
      const response = await fetch(`https://localhost:44307/api/Image/TipCreator`, 
        {      
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tip)
        }
      );
      const data = await response.json();
      return {status:response.status,data};
    } catch (error) {
      console.error("API Error:", error);
    }
  }
  const postComment = async (comment) => {  
    try {
      console.log(comment);
      const response = await fetch(`https://localhost:44307/api/Image/PostComment`, 
        {      
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(comment)
        }
      );
      const data = await response.json();
      return {status:response.status,data};
    } catch (error) {
      console.error("API Error:", error);
    }
  }

    const operations = ref(null);
    const fetchOperations = async (userId) => {
      try {
        const response = await fetch(`https://localhost:44307/api/User/GetOperationHistory?userId=${userId}`);
        if (!response.ok) throw new Error("Failed to fetch data");
  
        operations.value = await response.json();
      } catch (error) {
        console.error("operationStore Error:", error);
      }
    };

  return { sendReaction,sendTip,postComment,operations,fetchOperations};
});