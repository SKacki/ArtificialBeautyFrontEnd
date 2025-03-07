<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import ABMetadataTable from "@/components/ImagesComponents/ABMetadataTable.vue";
import ABComment from "@/components/CommentsComponents/ABComment.vue";
import ABImageStats from "@/components/ImagesComponents/ABImageStats.vue";
import { useToast } from 'vue-toastification';
import { useUserStore } from "@/stores/UserStore";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);


const imgId = ref(null);
const image = ref(null);
const loading = ref(false);
const error = ref(null);
const router = useRouter();
const route = useRoute();
const imageRef = ref(null);
const meta = ref(null);
const imgStats = ref(null);
const imgComments = ref(null);
const toast = useToast();

const imageSrc = computed(() => {
  return imageRef.value ? `https://localhost:44307/api/Image/GetImage?imageId=${imageRef.value}` : null;
});

onMounted(async () => {
   try {
     imgId.value = route.params.imageId;
     loading.value = true;
     const response = await fetch(`https://localhost:44307/api/Image/GetImageData?imageId=${imgId.value}`);
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     image.value = data;
     assignValues(data);
   } catch (err) {
     error.value = err.message;
   } finally {
     loading.value = false;
   }
   try {
     imgId.value = route.params.imageId;
     loading.value = true;
     const response = await fetch(`https://localhost:44307/api/Image/GetImageMetaData?imageId=${imgId.value}`);
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     meta.value = data;
   } catch (err) {
     error.value = err.message;
   } finally {
     loading.value = false;
   }
   try {
     imgId.value = route.params.imageId;
     loading.value = true;
     const response = await fetch(`https://localhost:44307/api/Image/GetImageComments?imageId=${imgId.value}`);
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     imgComments.value = data;
   } catch (err) {
     error.value = err.message;
   } finally {
     loading.value = false;
   }
   await userStore.fetchData(1);
 });

const assignValues = (data) => {
  meta.value = data.metadata;
  imageRef.value = data.ref;
  imgStats.value = {
    likes: data.likes,
    dislikes: data.dislikes,
    tips: data.tips,
    comments: data.commentsCount,
  };
};

const remix = () => {
  router.push({ name: "generator", params: { imageId: imgId.value }});
};

const publish = () => {
  toast.info("Clicky!")
};

</script>


<template>
  <div class="container">
    <div class="image-section">
      <img :src=imageSrc alt="Generated Image" class="image" />
      <ABImageStats :stats="imgStats" :user="user" :imageId="imgId" />
    </div>
    <div class="info-section">
      <ABMetadataTable :metadata="meta" />
      <ABComment :imgComments="imgComments" :user="user"/>
      <button class="image-buttons" @click="remix">Remix image</button>
      <button class="image-buttons" @click="publish">Publish image</button>
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