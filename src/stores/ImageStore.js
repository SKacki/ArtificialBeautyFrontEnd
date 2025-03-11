import { defineStore } from "pinia";
import { ref } from "vue";

export const useImageStore = defineStore("images", () => {
  const result = ref(null);
  const publishImage = async (image) => {  
    try {
      const response = await fetch(`https://localhost:44307/api/Image/PublishImage`, 
        {      
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(image)
        }
      );
      const data = await response.json();
      result.value = {status:response.status,data};
      return result;
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const deleteImage = async (imageRef) => {  
    try {
      const response = await fetch(`https://localhost:44307/api/Image/Remove?imageId=${imageRef}`, 
        {      
          method: "DELETE",
          headers: { "Content-Type": "application/json" }
        }
      );
      const data = await response.json();
      result.value = {status:response.status,data};
      return result;
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  return { publishImage, deleteImage, result };
});