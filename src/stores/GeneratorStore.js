import { defineStore } from "pinia";
import { ref } from "vue";
import baseLink from "@/baseUrl";

export const useGeneratorStore = defineStore("generator", () => {

  const generate = async (metadata) => {  
    try {
      console.log("hey"); console.log(JSON.stringify(metadata.value));
      const response = await fetch(`${baseLink}/api/Generator/GenerateImage`, 
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
      const response = await fetch(`${baseLink}/api/Image/GetImageData?imageId=${imageId}`);
      if (!response.ok) throw new Error("Failed to fetch metadata");
  
      imageInfo.value = await response.json();
    } catch (error) {
      console.error("API Error:", error);
    }
}

const metadata = ref(null);
const fetchMetadata = async (imageId) => {
    try {
       const response = await fetch(`${baseLink}/api/Image/GetImageMetaData?imageId=${imageId}`);
       if (!response.ok) throw new Error("Failed to fetch data");
       metadata.value = await response.json();
     } catch (error) {
        console.error("API Error:", error);
     }
  };

  return { generate,fetchMetadata,metadata,fetchImageInfo,imageInfo };
});