<script setup>
import { ref,onMounted } from "vue";
import { useViewsStore } from "@/stores/ViewsStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import ABGalleryImageContainer from "@/components/CommonComponents/ABGalleryImageContainer.vue";
import { useRoute } from "vue-router";

const userStore = useUserStore();
const viewsStore = useViewsStore();
const { imgGallery } = storeToRefs(viewsStore);
const { imgGalleryFiltered } = storeToRefs(viewsStore);
const { user } = storeToRefs(userStore);
const loading = ref(true);
const route = useRoute();
const filter = ref(false);


onMounted(async () => {
  console.log(route.params.query.length);
  try {
    if(route.params.query.length > 0){
      await viewsStore.searchImages(route.params.query);
      filter.value = true;
    }
    else{
    await viewsStore.fetchImages();
    }
    await userStore.fetchData(localStorage.getItem("userId"));
  } catch (err) {
    console.error("Failed to load data:", err);
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <div v-if="!loading" class="gallery">
    <div v-if="filter" class="grid-container">
      <ABGalleryImageContainer
        v-for="(image, index) in imgGalleryFiltered.images"
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
    <div v-else class="grid-container">
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
