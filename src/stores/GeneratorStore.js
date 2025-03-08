import { defineStore } from "pinia";
import { ref } from "vue";

export const useGeneratorStore = defineStore("generator", () => {

  const generate = async (metadata) => {  
    try {
      const response = await fetch(`https://localhost:44307/api/Generator/GenerateImage`, 
        {      
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(metadata)
        }
      );
      const data = await response.json();
      return {status:response.status,data};
    } catch (error) {
      console.error("API Error:", error);
    }
  }

  const imageInfo = ref(null);
  const fetchImageInfo = async (imageId) => {
    try {
      const response = await fetch(`https://localhost:44307/api/Image/GetImageData?imageId=${imageId}`);
      if (!response.ok) throw new Error("Failed to fetch metadata");
  
      imageInfo.value = await response.json();
      //meta.value = { ...meta.value, ...data.metadata };
    } catch (error) {
      console.error("API Error:", error);
    }
}

const metadata = ref(null);
const fetchMetadata = async (imageId) => {
    try {
       loading.value = true;
       const response = await fetch(`https://localhost:44307/api/Image/GetImageMetaData?imageId=${imageId}`);
       if (!response.ok) throw new Error("Failed to fetch data");
       const data = await response.json();
       metadata.value = data;
     } catch (error) {
        console.error("API Error:", error);
     }
  };

  return { generate,fetchMetadata,metadata,fetchImageInfo,imageInfo };
});