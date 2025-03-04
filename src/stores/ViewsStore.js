import { defineStore } from "pinia";
import { ref } from "vue";

export const useViewsStore = defineStore("views", () => {
  const imgGallery = ref(null);
  const fetchImages = async (searchTerm) => {
    try {
      const response = await fetch(`https://localhost:44307/api/View/GetImageView`);
      if (!response.ok) throw new Error("Failed to fetch data");

      imgGallery.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  return { imgGallery, fetchImages };
});