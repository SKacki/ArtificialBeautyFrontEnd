<script setup>
import { ref } from "vue";
import ABImageContainer from "./ABImageContainer.vue";

const images = ref([
  { src: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ba3f42b7-a4e8-43a7-8b25-8b50708a85cb/original=true,quality=90/00049-3625896228.jpeg", caption: "Image 1" },
  { src: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ba3f42b7-a4e8-43a7-8b25-8b50708a85cb/original=true,quality=90/00049-3625896228.jpeg", caption: "Image 2" },
  { src: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ba3f42b7-a4e8-43a7-8b25-8b50708a85cb/original=true,quality=90/00049-3625896228.jpeg", caption: "Image 3" },
  { src: "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/ba3f42b7-a4e8-43a7-8b25-8b50708a85cb/original=true,quality=90/00049-3625896228.jpeg", caption: "Image 4" }
]);
</script>

<template>
    <div class="gallery">
      <ABImageContainer 
        v-for="(image, index) in images" 
        :key="index" 
        :imageSrc="image.src" 
        :text="image.caption"
      />
    </div>
  </template>
  
  <style scoped>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 16px;
    padding: 16px;
  }
  </style>
  