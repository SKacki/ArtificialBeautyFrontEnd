<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import ABmodelInfoTable from "@/components/ModelComponents/ABmodelInfoTable.vue";
import ABGallery from "@/components/CommonComponents/ABGallery.vue";
import { useViewsStore } from "@/stores/ViewsStore";
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";
import ABModelGallery from "@/components/GalleryComponents/ABModelGallery.vue";

const store = useViewsStore();
const userStore = useUserStore();
const { modelView } = storeToRefs(store);
const { user } = storeToRefs(userStore);
const route = useRoute();

onMounted(async () => {
  try {
    await store.getModelView(Number(route.params.modelId));
  } catch (err) {
    console.error("Failed to load model view on mount:", err);
  }
  try {
    await userStore.fetchData(localStorage.getItem("userId"));
  } catch (err) {
    console.error("Failed to load model view on mount:", err);
  }
});

</script>


<template>
  <div class="container">
    <ABModelGallery :images="modelView.examples" :user="user"/>
    <div class="info-section">
      <ABmodelInfoTable :metadata="modelView.model" />
    </div>
  </div>
  <div v-if="modelView.images" class="gallery">
    <ABGallery :images="modelView.images" :user=user :header="'Gallery'" :redirect="'img'" />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
}

.image-section {
  flex: 1;
  max-width: 50%;
}

.image {
  width: 100%;
  border-radius: 8px;
  object-fit: cover;
}
.image-buttons {
    margin-top: 10px;
    margin-right:5px;
    padding: 8px 12px;
    background: #ffcc00;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>