import { defineStore } from "pinia";
import { ref } from "vue";

export const useViewsStore = defineStore("view", () => {
  const imgGallery = ref([]);
  const fetchImages = async (searchTerm) => {
    try {
      const response = await fetch(`https://localhost:44307/api/View/GetImageView`);
      if (!response.ok) throw new Error("Failed to fetch data");

      imgGallery.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const imgGalleryFiltered = ref([]);
  const searchImages = async (searchTerm) => {
    try {
      const response = await fetch(`https://localhost:44307/api/View/GetImageView?searchTerm=${searchTerm}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      imgGalleryFiltered.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const featuredImages = ref([]);
  const getfeaturedImages = async () => {
    try {
      const response = await fetch("https://localhost:44307/api/View/GetfeatureImages");
      if (!response.ok) throw new Error("Failed to fetch data");

      featuredImages.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const featuredModels = ref([]);
  const getfeaturedModels = async () => {
    try {
      const response = await fetch("https://localhost:44307/api/View/GetfeatureModels");
      if (!response.ok) throw new Error("Failed to fetch data");

      featuredModels.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  return { imgGallery,imgGalleryFiltered,featuredImages,featuredModels, fetchImages,searchImages,getfeaturedImages,getfeaturedModels };
});