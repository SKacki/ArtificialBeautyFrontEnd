<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import ABMetadataTable from "@/components/ImagesComponents/ABMetadataTable.vue";
import ABComment from "@/components/CommentsComponents/ABComment.vue";
import ABImageStats from "@/components/ImagesComponents/ABImageStats.vue";
import { useToast } from 'vue-toastification';
import { useUserStore } from "@/stores/UserStore";
import { useImageStore } from "@/stores/ImageStore";
import { storeToRefs } from "pinia";
import baseLink from "@/baseUrl";

const userStore = useUserStore();
const imageStore = useImageStore();
const { user } = storeToRefs(userStore);

const imgId = ref(null);
const image = ref(null);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const route = useRoute();
const imageRef = ref(null);
const meta = ref(null);
const imgStats = ref(null);
const imgComments = ref(null);
const toast = useToast();

const imageSrc = computed(() => {
  return imageRef.value ? `${baseLink}/api/Image/GetImage?imageId=${imageRef.value}` : null;
});

onMounted(async () => {
   try {
     imgId.value = route.params.imageId;
     const response = await fetch(`${baseLink}/api/Image/GetImageData?imageId=${imgId.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });;
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     image.value = data;
     assignValues(data);
   } catch (err) {
     error.value = err.message;
   }
   try {
     imgId.value = route.params.imageId;
     const response = await fetch(`${baseLink}/api/Image/GetImageMetaData?imageId=${imgId.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     meta.value = data;
   } catch (err) {
     error.value = err.message;
   } 
   try {
     imgId.value = route.params.imageId;
     const response = await fetch(`${baseLink}/api/Image/GetImageComments?imageId=${imgId.value}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}`},
      });
     if (!response.ok) throw new Error("Failed to fetch data");
     const data = await response.json();
     imgComments.value = data;
   } catch (err) {
     error.value = err.message;
   }
   await userStore.fetchData(localStorage.getItem("userId"));
   loading.value = false;
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

const publish = async () => {
  console.log(image);
  const result = await imageStore.publishImage(image.value);
  if(result.value.status === 200)
  {
    toast.success("Your image is public now 🎉");
    toast.success("Award for first post of the day: 20 💰");
    router.push({ name: "home" });
  }
  else if(result.value.status === 291)
  {
    toast.success("Your image is public now 🎉");
    router.push({ name: "home" });
  }
  else
  {
    toast.error("Ups, something went wrong")
  }
};

const discard = async() => {
  const result = await imageStore.deleteImage(imageRef.value);
  if(result.value.status === 200)
  {
    toast.success("Image deleted 🗑️");
    router.push({ name: "home" });
  }
  else
  {
    toast.error("Ups, something went wrong")
  }
};

</script>


<template>
  <div v-if="!loading" class="container">
    <div class="image-section">
      <img :src=imageSrc alt="Generated Image" class="image" />
      <ABImageStats :stats="imgStats" :user="user" :imageId="imgId" />
    </div>
    <div v-if="!loading" class="info-section">
      <ABMetadataTable :metadata="meta" />
      <ABComment :imgComments="imgComments" :user="user"/>
      <div class="button-container">
        <button class="image-button remix-button" @click="remix">Remix image 🛠️</button>
        <button v-if="user.id == image.userId && image.uploadDate == null" class="image-button publish-button" @click="publish">Publish image 🖼️</button>
        <button v-if="user.id == image.userId" class="image-button discard-button" @click="discard">Discard image 🗑️</button>
      </div>
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

.button-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}


.image-button {
  background-color: #ffcc00;
  color: black;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.image-button:hover {
  background-color: #ffaa00;
  transform: scale(1.05);
}

.remix-button {
  background-color: #6a5acd;
}

.publish-button {
  background-color: #28a745;
}

.discard-button {
  background-color: #dc3545;
}

</style>