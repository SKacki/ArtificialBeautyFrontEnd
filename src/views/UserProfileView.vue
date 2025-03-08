<script setup>
import { computed, onMounted, ref} from "vue";
import defaultProfilePic from "@/assets/default-profile.png";
import { useToast } from 'vue-toastification';
import { useRoute } from "vue-router";
import ABGallery from "@/components/CommonComponents/ABGallery.vue";
import ABLoadingSpinner from "@/components/CommonComponents/ABLoadingSpinner.vue";
import { useUserStore } from "@/stores/UserStore";
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const loadingUser = ref(true);
const toast = useToast();
const userStore = useUserStore();
const authStore = useAuthStore();
const { userView } = storeToRefs(userStore);

const myProfile = computed(() => {
  return String(route.params.userId) === String(userStore.user?.id);
});

const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";
  return dateString.split("T")[0];
};

onMounted(async () => {
  try {
    await userStore.fetchView(1);
  } catch (err) {
    console.error("Failed to load user data on mount:", err);
  } finally {
    loadingUser.value = false;
    console.log(myProfile);
  }
});

const handleLogout = () => {
  authStore.logout();
  userStore.user = null;
  router.push("/login");
  toast.info("We miss you already") 
};

</script>


<template>
  <div v-if="loadingUser"><ABLoadingSpinner /></div>
  <div v-else class="profile-container">
    <div class="profile-pic">
      <img :src="userView.profilePic || defaultProfilePic" alt="Profile Picture" />
    </div>
    <div class="profile-details">
      <h2>{{ userView.user.userName }}</h2>
      <p class="bio">{{ userView.user.bio }}</p>
      <p><strong>Joined:</strong> {{ formatDate(userView.user.joinedDate) }}</p>

      <div class="stats">
        <p><strong>Followers:</strong> {{ userView.user.followersCount }}</p>
        <p><strong>Following:</strong> {{ userView.user.followingCount }}</p>
        <p><strong>Images:</strong> {{ userView.user.imagesCount }}</p>
      </div>

      <button v-if="!myProfile" class="follow-btn">Follow</button>
      <button v-if="myProfile" @click="handleLogout" class="logout-btn">Logout</button>
    </div>
  </div>

  <div v-if="userView?.images" class="gallery">
    <ABGallery :images="userView.images" :header="'Gallery'" />
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
    .logout-btn {
      margin-top: 10px;
      padding: 10px 15px;
      background-color: #d9534f;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
    }

  .logout-btn:hover {
    background-color: #c9302c;
  }
  </style>
  