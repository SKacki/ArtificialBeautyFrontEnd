<script setup>
import { defineProps, ref, computed } from "vue";
import { useRouter } from "vue-router";
import ABImageStats from "../ImagesComponents/ABImageStats.vue";
import ABDescription from "../CommonComponents/ABDescription.vue";

const props = defineProps({
  imageId:Number,
  imageRef: String,
  description: String,
  likes: Number,
  dislikes: Number,
  tips: Number,
  comments: Number,
  modelId:Number,
  userId:Number,
  userName:String,
  user:Object,
  redirect:String
});

const imageStats = ref({
  likes: props.likes,
  dislikes: props.dislikes,
  tips: props.tips,
  comments:props.comments,
});

const imageSrc = computed(() => `https://localhost:44307/api/Image/GetImage?imageId=${props.imageRef}`);
const router = useRouter();

const redirectToView = () => {
  if(props.redirect === 'img')
  {
    router.push({ name: "image", params: { imageId: props.imageId } });
  }
  else
  {
    router.push({ name: "model", params: { modelId: props.modelId } });
  }
};
</script>

<template>
  <div class="image-container">
    <img :src="imageSrc" alt="Image" class="image" @click="redirectToView" />
    <ABDescription :userId="props.userId" :userName="props.userName" :description="props.description" />
    <div class="stats-container">
      <ABImageStats :stats="imageStats" :imageId="imageId" :user="props.user" />
    </div>
  </div>
</template>
  
<style scoped>
.image-container {
  text-align: center;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  color: white;
  max-width: 230px;
  max-height: 520px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease;
}

.image-container:hover {
  transform: scale(1.03);
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 15px rgba(255, 255, 255, 0.2);
}
.username {
  font-weight: bold;
  color: #ffcc00;
  cursor: pointer;
  transition: color 0.3s ease;
}

.username:hover {
  color: #ff66ff;
  text-decoration: underline;
}
</style>

  