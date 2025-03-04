<script setup>
import { ref,onMounted } from "vue";
import {  } from "vue";
import { useViewsStore } from "@/stores/ViewsStore";
import { storeToRefs } from "pinia";

const viewsStore = useViewsStore();
const { imgView } = storeToRefs(viewsStore);
const loading = ref(true);

onMounted(async () => {
  try {
    await viewsStore.fetchImages();
  } catch (err) {
    console.error("Failed to load data:", err);
  } finally {
    loading.value = false;
  }
});

const imgs = ref([
  { src: "https://source.unsplash.com/random/200x200", alt: "Random Image 1" },
  { src: "https://source.unsplash.com/random/201x200", alt: "Random Image 2" },
  { src: "https://source.unsplash.com/random/202x200", alt: "Random Image 3" },
  { src: "https://source.unsplash.com/random/203x200", alt: "Random Image 4" },
]);

const selectedImage = ref(null);

const openImage = (image) => {
  selectedImage.value = image;
};
</script>


<template>
  <p>hey {{imgView}}</p>
  <div class="gallery">
    <div class="grid-container">
      <div
        v-for="(image, index) in imgs"
        :key="index"
        class="image-wrapper"
        @click="openImage(image)"
      >
        <img :src="image.src" :alt="image.alt" class="image" />
      </div>
    </div>

    <div v-if="selectedImage" class="overlay" @click="selectedImage = null">
      <img :src="selectedImage.src" :alt="selectedImage.alt" class="overlay-image" />
    </div>
  </div>
</template>

<style scoped>
.gallery {
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.image-wrapper {
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.image-wrapper:hover {
  transform: scale(1.05);
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

/* Overlay styles */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.overlay-image {
  max-width: 90%;
  max-height: 90%;
  border-radius: 10px;
}
</style>
