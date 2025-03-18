<script setup>
import ABGallery from "@/components/CommonComponents/ABGallery.vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { useViewsStore } from "@/stores/ViewsStore";
import { storeToRefs } from "pinia";

const viewsStore = useViewsStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const { featuredImages } = storeToRefs(viewsStore);
const { featuredModels } = storeToRefs(viewsStore);

const error = ref(null);

onMounted(async () => {
   try {
     await userStore.fetchData(localStorage.getItem("userId"));
   } catch (err) {
     console.error("Failed to load user data:", err);
   }
  try {
    await viewsStore.getfeaturedImages();
  } catch (err) {
    error.value = err.message;
  }
  try {
    await viewsStore.getfeaturedModels();
  } catch (err) {
    error.value = err.message;
  }
});
</script>

<template>
  <main>
    <div v-if="featuredImages.images" class="gallery">
      <ABGallery :images="featuredImages.images" :user="user" :header="'Featured Images'" :redirect="'img'" />
  </div>
  <div v-if="featuredModels.images" class="gallery">
      <ABGallery :images="featuredModels.images" :user="user" :header="'Featured Models'" :redirect="'model'" />
  </div>
  </main>
</template>
