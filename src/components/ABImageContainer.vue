<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  author: String,
  imageSrc: String,
  title: String,  
  likes: Number,
  dislikes: Number,
  tips: Number
});

const router = useRouter();

const redirectToImageView = () => {
  router.push({ name: "image" });
};
</script>

<template>
    <div class="image-container">
      <img :src="imageSrc" alt="Image" class="image" @click="redirectToImageView" />
      <input :value="text" type="text" readonly class="text-input" />
    </div>
  </template>
  
  <style scoped>
  .image-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    max-width: 200px;
  }
  
  .image {
    width: 100%;
    border-radius: 8px;
    object-fit: cover;
    cursor: pointer;
    transition: opacity 0.3s;
  }
  
  .image:hover {
    opacity: 0.8;
  }
  
  .text-input {
    width: 100%;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    background-color: #f5f5f5;
    text-align: center;
    cursor: default;
  }
  </style>
  