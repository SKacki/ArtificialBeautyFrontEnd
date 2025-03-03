<script setup>
import { useUserStore } from "@/stores/UserStore";
import { computed, onMounted, ref} from "vue";
import defaultProfilePic from "@/assets/default-profile.png";
import { storeToRefs } from "pinia";
import { useToast } from 'vue-toastification';
import { useRoute } from "vue-router";
import ABGallery from "@/components/ABGallery.vue";

const route = useRoute();
const loadingUser = ref(true);
const toast = useToast();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const myProfile = computed(() => {
  route.params.imageId === 1 ? true : false}); //fix this!!!!!

const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";
  return dateString.split("T")[0];
};

onMounted(async () => {
  try {
    await userStore.fetchData();
  } catch (err) {
    console.error("Failed to load user data:", err);
  } finally {
    loadingUser.value = false;
  }
});

</script>


<template>
  <div v-if="loadingUser">Loading ...</div>
    <div v-else class="profile-container">
      <div class="profile-pic">
        <img :src="user.user.profilePic || defaultProfilePic" alt="Profile Picture" />
      </div>
      <div class="profile-details">
        <h2>{{ user.user.userName }}</h2>
        <p class="bio">{{ user.user?.bio }}</p>
        <p><strong>Joined:</strong> {{ formatDate(user.user.joinedDate) }}</p>
  
        <div class="stats">
          <p><strong>Followers:</strong> {{ user.user.followersCount }}</p>
          <p><strong>Following:</strong> {{ user.user.followingCount }}</p>
          <p><strong>Images:</strong> {{ user.user.imagesCount }}</p>
        </div>
        <button v-if="myProfile" class="follow-btn">Follow</button>
      </div>
    </div>
    <div class="gallery">
          <ABGallery :images="user.images" :header="'Gallery'" />
        </div>
  </template>
  
  <style scoped>
    .profile-container {
      max-width: 400px;
      margin: auto;
      padding: 20px;
      background: #222;
      border-radius: 12px;
      box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
      text-align: center;
      color: white;
    }
    
    .profile-pic img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid white;
    }
    
    .profile-details h2 {
      margin: 10px 0 5px;
    }
    
    .email {
      color: #bbb;
      font-size: 14px;
    }
    
    .bio {
      margin: 10px 0;
      font-style: italic;
    }
    
    .stats {
      margin-top: 15px;
      display: flex;
      justify-content: space-around;
    }
    
    .follow-btn {
      background: #ff9800;
      color: white;
      border: none;
      padding: 10px 15px;
      margin-top: 15px;
      border-radius: 8px;
      cursor: pointer;
      font-weight: bold;
    }
    
    .follow-btn:hover {
      background: #e68900;
    }
  </style>
  