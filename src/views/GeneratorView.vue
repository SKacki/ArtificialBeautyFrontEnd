<script setup>
import { ref, onMounted,computed } from "vue";
import { useRoute } from "vue-router";
import ABGenerationParamsTable from "@/components/GeneratorComponents/ABGenerationParamsTable.vue";
import placeholder from '@/assets/placeholder.png';
import baseLink from "@/baseUrl";

const route = useRoute();
const imageSrc = computed(() => {
  return route.params.imageId > 0 ? `${baseLink}/api/Image/GetImageById?imageId=${route.params.imageId}` : placeholder;
});
const loading= ref(false);
const generatedImage = ref(null);
const setImage = (imageUrl) => {
  generatedImage.value = imageUrl;
};

const meta = ref({
  modelId: 1,
  lora1Id: null,
  lora2Id: null,
  sampler: "",
  scheduler: "",
  guidance: 1,
  steps: 10,
  seed: 0,
  promptPoz: "",
  promptNeg: "",
  genDate: null
});

//przerzuć do store
const fetchMetadata = async () => {
  const imageId = route.params.imageId;
  if (!imageId) return;

  if(Number(imageId) !==0)
  {
  try {
    const response = await fetch(`${baseLink}/api/Image/GetImageData?imageId=${imageId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
    if (!response.ok) throw new Error("Failed to fetch metadata");

    const data = await response.json();
    meta.value = { ...meta.value, ...data.metadata };
  } catch (error) {
    console.error("API Error:", error);
  }

  try {
     loading.value = true;
     const response = await fetch(`${baseLink}/api/Image/GetImageMetaData?imageId=${imageId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     meta.value = data;
   } catch (err) {
     err.value = err.message;
   } finally {
     loading.value = false;
   }
  }
  loading.value = false;
};

onMounted(fetchMetadata);
</script>

<template>
  <div class="container">
    <div class="image-section">
        <img v-if="!generatedImage" :src="imageSrc" :alt="placeholder" class="image"/>
        <img v-else :src="generatedImage" :alt="placeholder" class="image"/>
    </div>
    <div class="info-section">
      <ABGenerationParamsTable :metadata="meta" @image-generated="setImage" />
    </div>
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
</style>
