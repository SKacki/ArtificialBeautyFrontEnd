<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ABMetadataTable from "@/components/ABMetadataTable.vue";
import ABComment from "@/components/ABComment.vue";
import ABImageStats from "@/components/ABImageStats.vue";

const router = useRouter();
const imageSrc = ref("https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/2f1abb9d-f8cd-4b0c-9304-461c3ee301e8/original=true,quality=90/00240-3601054281.jpeg");
const metadata = ref({
  resource: "Illustrious XL 1.0",
  prompt: "1girl, dark theme, glowing eyes, demon, sword...",
  negativePrompt: "bad anatomy, lowres, multiple views...",
  guidance: 3,
  steps: 28,
  sampler: "DPM++ 2S Ancestral CFG",
  seed: "3601054281",
});

const imageStats = ref({
  likes: 5,
  dislikes: 2,
  tips: 10,
});



const remix = () => {
  router.push({ name: "home" }); //Ma przenosić do widoku generatora
};

</script>

<template>
  <div class="container">
    <div class="image-section">
      <img :src="imageSrc" alt="Generated Image" class="image" />
      <ABImageStats :likes="imageStats.likes" :dislikes="imageStats.dislikes" :tips="imageStats.tips" />
    </div>
    <div class="info-section">
      <ABMetadataTable :metadata="metadata" />
      <ABComment />
      <button class="home-button" @click="remix">Remix image</button>
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