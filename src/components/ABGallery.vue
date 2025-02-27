<script setup>
import ABImageContainer from "./ABImageContainer.vue";
import { useImagesStore } from "@/stores/imagesStore";
const store = useImagesStore()

const props = defineProps({
  images: Array,
});
</script>

<template>
    <div class="gallery">
      <ABImageContainer 
        v-for="(image, index) in images"   
        :key="index"
        :imageRef="image.ref" 
        :description="image.description"
        :likes="image.likes"
        :dislikes="image.dislikes"
        :tips="image.tips"
        :comments="image.commentsCount"
        :imgMetadata="image.metadata"
        :imageId="image.id"
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
  