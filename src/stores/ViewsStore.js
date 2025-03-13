import { defineStore } from "pinia";
import { ref } from "vue";
import baseLink from "@/baseUrl";

export const useViewsStore = defineStore("view", () => {
  const imgGallery = ref([]);
  const fetchImages = async () => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetImageView`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      imgGallery.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const imgGalleryFiltered = ref([]);
  const searchImages = async (searchTerm) => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetImageView?searchTerm=${searchTerm}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      imgGalleryFiltered.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const featuredImages = ref([]);
  const getfeaturedImages = async () => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetfeatureImages`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      featuredImages.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const featuredModels = ref([]);
  const getfeaturedModels = async () => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetfeatureModels`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      featuredModels.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const modelView = ref([]);
  const getModelView = async (modelId) => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetModelView?modelId=${modelId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      modelView.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  const modelGalleryView = ref([]);
  const getmodelGalleryView = async () => {
    try {
      const response = await fetch(`${baseLink}/api/View/GetAllModels`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
      if (!response.ok) throw new Error("Failed to fetch data");

      modelGalleryView.value = await response.json();
    } catch (error) {
      console.error("viewsStore Error:", error);
    }
  };

  return { 
    imgGallery,imgGalleryFiltered,featuredImages,featuredModels,modelView,modelGalleryView,
    getModelView, fetchImages,searchImages,getfeaturedImages,getfeaturedModels,getmodelGalleryView 
  };
});