<script setup>
import { ref,onMounted } from "vue";
import { useViewsStore } from "@/stores/ViewsStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import ABGalleryImageContainer from "@/components/CommonComponents/ABGalleryImageContainer.vue";

const userStore = useUserStore();
const viewsStore = useViewsStore();
const { imgGallery } = storeToRefs(viewsStore);
const { user } = storeToRefs(userStore);
const loading = ref(true);

onMounted(async () => {
  try {
    await viewsStore.fetchImages();
    await userStore.fetchData(1);
  } catch (err) {
    console.error("Failed to load data:", err);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div v-if="!loading" class="gallery">
    <div class="grid-container">
      <ABGalleryImageContainer
        v-for="(image, index) in imgGallery.images"
        :key="index"
        :imageId="image.id"
        :imageRef="image.ref"
        :description="image.description"
        :likes="image.likes"
        :dislikes="image.dislikes"
        :tips="image.tips"
        :comments="image.comments"
        :userId="image.userId"
        :userName="image.userName"
        :user="user"
        :redirect="'img'"
      />
    </div>
  </div>
</template>
<style scoped>
.gallery {
  padding: 20px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 10px; 
  max-width: 100%;
}

@media (min-width: 1000px) {
  .grid-container {
    grid-template-columns: repeat(6, 1fr);
  }
}

.image-container {
  width: 100%;
  overflow: hidden;
}
</style>
