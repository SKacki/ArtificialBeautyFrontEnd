<script setup>
import { defineProps, ref, computed } from "vue";
import { useRouter } from "vue-router";
import ABImageStats from "./ABImageStats.vue";
import baseLink from "@/baseUrl";

const props = defineProps({
  imageId:Number,
  imageRef: String,
  description: String,
  likes: Number,
  dislikes: Number,
  tips: Number,
  comments: Number,
});

const imageStats = ref({
  likes: props.likes,
  dislikes: props.dislikes,
  tips: props.tips,
  comments:props.comments,
});

const imageSrc = computed(() => `${baseLink}/api/Image/GetImage?imageId=${props.imageRef}`);
const router = useRouter();

const redirectToImageView = () => {
  router.push({ name: "image", params: { imageId: props.imageId } });
};
</script>

<template>
  <div class="image-container">
    <img :src="imageSrc" alt="Image" class="image" @click="redirectToImageView" />
    <p class="description">{{ description }}</p>
    <div class="stats-container"><ABImageStats :stats="imageStats" /></div>
  </div>
</template>
  
<style scoped>
.image-container {
  text-align: center;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  color: white;
}
.stats-container {
  align-content: flex-start;
  text-align: center;
  align-items: flex-start;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  color: white;
}
.image {
  width: 100%;
  max-width: 500px;
  border-radius: 8px;
  cursor: pointer;
}

.description {
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  text-align: center;
}
</style>
  