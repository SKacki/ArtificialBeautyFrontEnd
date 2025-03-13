<script setup>
import { ref, computed } from 'vue';
import baseLink from '@/baseUrl';

const props = defineProps({
  images: { type: Array, default: () => [] },
  user: { type: Object, default: () => ({}) }
});

const currentIndex = ref(0);

const currentImage = computed(() => {
  if (!props.images.length) return null;
  return props.images[currentIndex.value];
});

const nextImage = () => {
  if (currentIndex.value < props.images.length - 1) {
    currentIndex.value++;
  }
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};
</script>

<template>
  <div v-if="props.images.length" class="image-container">
    <div class="image-section">
      <img :src="`${baseLink}/api/Image/GetImageById?imageId=${currentImage.id}`" 
           alt="Generated Image" 
           class="image" />
    </div>

    <div class="navigation-buttons">
      <button @click="prevImage" :disabled="currentIndex === 0">Previous</button>
      <span>{{ currentIndex + 1 }} / {{ props.images.length }}</span>
      <button @click="nextImage" :disabled="currentIndex === props.images.length - 1">Next</button>
    </div>
  </div>

  <p v-else>No images available.</p>
</template>

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-section {
  flex: 1;
  max-width: 100%;
}

.image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}

.navigation-buttons {
  margin-top: 10px;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 12px;
  border: none;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s;
}

button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

button:hover:not(:disabled) {
  background-color: #2980b9;
}
</style>
