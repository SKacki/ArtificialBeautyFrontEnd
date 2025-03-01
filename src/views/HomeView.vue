<script setup>
import ABGallery from "@/components/ABGallery.vue";
import { ref, onMounted } from "vue";

const images = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
   try {
     loading.value = true
     const response = await fetch("https://localhost:44307/api/View/GetfeatureImages");
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     images.value = data.images;
   } catch (err) {
     error.value = err.message;
   } finally {
     loading.value = false;
   }
 });

</script>

<template>
  <main>
    <div class="gallery">
      <ABGallery :images="images" :header="'Featured Images'" />
  </div>
  <div class="gallery">
      <ABGallery :images="images" :header="'Featured Models'" />
  </div>
  </main>
</template>
