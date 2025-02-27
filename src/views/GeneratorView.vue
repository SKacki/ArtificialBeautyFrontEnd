<script setup>
import { ref} from "vue";
import ABGenerationParamsTable from "@/components/ABGenerationParamsTable.vue";

const meta = ref({
  sampler: "",
  promptPoz: "",
  promptNeg: "",
  guidance: "",
  steps: "",
  seed: ""
});

//const imageSrc = ref(`https://localhost:44307/api/Image/GetImage?imageId=${imageRef.value}`);
const imageSrc = ref(null);
const handleImageError = (event) => {
  event.target.src = "../src/img/placeholder.png";
};

</script>

<template>
  <div class="container">
    <div class="image-section">
        <img :src="imageSrc" @error="handleImageError" alt="not found" class="image"/>
    </div>
    <div class="info-section">
      <ABGenerationParamsTable :metadata="meta" />
      <button class="remix-button" @click="remix">Remix image</button>
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

.remix-button {
  margin-top: 10px;
  padding: 8px 12px;
  background: #ffcc00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
