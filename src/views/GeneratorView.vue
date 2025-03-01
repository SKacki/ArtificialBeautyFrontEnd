<script setup>
import { ref, onMounted,computed } from "vue";
import { useRoute } from "vue-router";
import ABGenerationParamsTable from "@/components/GeneratorComponents/ABGenerationParamsTable.vue";
import placeholder from '@/assets/placeholder.png';

const route = useRoute();
const imageSrc = computed(() => {
  return route.params.imageId > 0 ? `https://localhost:44307/api/Image/GetImageById?imageId=${route.params.imageId}` : placeholder;
});
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

const fetchMetadata = async () => {
  const imageId = route.params.imageId;
  if (!imageId) return;

  try {
    const response = await fetch(`https://localhost:44307/api/Image/GetImageData?imageId=${imageId}`);
    if (!response.ok) throw new Error("Failed to fetch metadata");

    const data = await response.json();
    meta.value = { ...meta.value, ...data.metadata };
  } catch (error) {
    console.error("API Error:", error);
  }
};

onMounted(fetchMetadata);
</script>

<template>
  <div class="container">
    <div class="image-section">
        <img :src="imageSrc" :alt="placeholder" class="image"/>
    </div>
    <div class="info-section">
      <ABGenerationParamsTable :metadata="meta" />
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
