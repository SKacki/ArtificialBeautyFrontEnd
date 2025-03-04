<script setup>
import ABGallery from "@/components/ABGallery.vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loadingUser = ref(true);
const loadingImages = ref(false);
const loadingModels = ref(false); 

const images = ref([]);
const models = ref([]);

const error = ref(null);

onMounted(async () => {
  try {
    await userStore.fetchData(1);
  } catch (err) {
    console.error("Failed to load user data:", err);
  } finally {
    loadingUser.value = false;
  }

  try {
    loadingImages.value = true;
    const response = await fetch("https://localhost:44307/api/View/GetfeatureImages");
    if (!response.ok) throw new Error("Failed to fetch images");

    const data = await response.json();
    images.value = data.images;
  } catch (err) {
    error.value = err.message;
  } finally {
    loadingImages.value = false;
  }
  try {
    loadingModels.value = true;
    const response = await fetch("https://localhost:44307/api/View/GetfeatureModels");
    if (!response.ok) throw new Error("Failed to fetch models");

    const data = await response.json();
    models.value = data.images;
  } catch (err) {
    error.value = err.message;
  } finally {
    loadingModels.value = false;
  }
});
</script>

<template>
  <main>
    <div class="gallery">
      <ABGallery :images="images" :user="user" :header="'Featured Images'" />
  </div>
  <div class="gallery">
      <ABGallery :images="models" :user="user" :header="'Featured Models'" />
  </div>
  </main>
</template>
