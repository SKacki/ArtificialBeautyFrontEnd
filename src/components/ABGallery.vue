<script setup>
import { ref, computed } from "vue";
import ABGalleryImageContainer from "./ABGalleryImageContainer.vue";

const props = defineProps({
  images: Array,
  header:String,
});

const currentPage = ref(0);
const imagesPerPage = 5;
const type = computed(() => props.header ==="Featured Images" || props.header ==="Gallery" ? 'img' : 'model'); //this is retarded but i don't have time to do it better

const displayedImages = computed(() => {
  const start = currentPage.value * imagesPerPage;
  return props.images.slice(start, start + imagesPerPage);
});

const nextPage = () => {
  if ((currentPage.value + 1) * imagesPerPage < props.images.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};
</script>

<template>
  <div class="gallery-container">
    <header class="gallery-header">
      <h2>{{ props.header }}</h2>
      <div class="divider"></div>
    </header>

    <div class="gallery" :class="{ 'few-images': displayedImages.length < 5 }">
      <ABGalleryImageContainer 
        v-for="(image, index) in displayedImages"   
        :key="image.id"
        :imageRef="image.ref" 
        :description="image.description"
        :likes="image.likes"
        :dislikes="image.dislikes"
        :tips="image.tips"
        :imageId="image.id"
        :comments="image.commentsCount"
        :modelId="image.exampleOfModel"
        :type ="type"
        :userId="image.userId"
        :userName="image.userName"
      />
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="currentPage === 0">⬅ Previous</button>
      <button @click="nextPage" :disabled="(currentPage + 1) * imagesPerPage >= props.images.length">Next ➡</button>
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gallery-header {
  text-align: center;
  margin-bottom: 20px;
}

.gallery-header h2 {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  margin-bottom: 8px;
}

.divider {
  width: 100%;
  height: 4px;
  background: #ff4081;
  margin: 0 auto;
  border-radius: 2px;
}

.gallery {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
  padding: 16px;
  justify-content: start;
}

.few-images {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  width: 100%;
}

button {
  padding: 10px 15px;
  background: #444;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.2s;
}

button:hover {
  background: #666;
}

button:disabled {
  background: #222;
  cursor: not-allowed;
}
</style>

