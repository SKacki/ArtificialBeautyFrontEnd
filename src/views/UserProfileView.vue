<script setup>
import { computed, onMounted, ref,reactive} from "vue";
import defaultProfilePic from "@/assets/default-profile.png";
import { useToast } from 'vue-toastification';
import { useRoute } from "vue-router";
import ABGallery from "@/components/CommonComponents/ABGallery.vue";
import ABLoadingSpinner from "@/components/CommonComponents/ABLoadingSpinner.vue";
import { useUserStore } from "@/stores/UserStore";
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import baseLink from "@/baseUrl";

const route = useRoute();
const router = useRouter();
const loadingUser = ref(true);
const editing = ref(false);
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

const handleLogout = () => {
  authStore.logout();
  userStore.user = null;
  router.push("/login");
  toast.info("We miss you already") 
};

const editedUser = reactive({
  userName: "",
  bio: "",
  profilePic: "",
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  localStorage.setItem("profilePic",file);
};

const saveProfile = async () => {
  const newUser =(
  {
    id: userView.value.user.id,
    userName: editedUser.userName,
    email: userView.value.user.email,
    joinedDate: userView.value.user.joinedDate,
    bio: editedUser.bio,
    followersCount: userView.value.user.followersCount,
    followingCount: userView.value.user.followingCount,
    imagesCount: userView.value.user.imagesCount,
    currency: userView.value.user.currency,
    profilePic: userView.value.user.profilePic,
  });
  await userStore.updateUser(newUser);

  const profilePic = localStorage.getItem("profilePic");
  if(profilePic != null){
    const formData = new FormData();
    formData.append("profilePic", profilePic);
    await userStore.uploadProfilePic(formData);
  }
  await userStore.fetchView(Number(route.params.userId))
  editing.value = false;
};

const cancelEdit = () => {
  editing.value = false;
  editedUser.userName = props.userView.user.userName;
  editedUser.bio = props.userView.user.bio;
  editedUser.profilePic = props.userView.profilePic;
};

const follow = async () => {
  try {
    const dto = { FollowerId: Number(localStorage.getItem("userId")), FollowingId: Number(route.params.userId) };
    await userStore.follow(dto);
  } catch (err) {
    console.error("Operation failed:", err);
  } finally {
    loadingUser.value = false;
  }
};

onMounted(async () => {
  try {
    await userStore.fetchView(Number(route.params.userId));
  } catch (err) {
    console.error("Failed to load user data on mount:", err);
  } finally {
    loadingUser.value = false;
    console.log(localStorage.getItem('userId'));
  }
});
</script>


<template>
  <div v-if="loadingUser"><ABLoadingSpinner /></div>
  <div v-else class="profile-container">
    <div class="profile-pic">
      <img :src="`${baseLink}/api/Image/GetProfilePic?imageId=${userView.user.profilePic}`" alt="Profile Picture" />
      <input v-if="editing" type="file" @change="handleFileUpload" accept="image/*" />
    </div>

    <div class="profile-details">
      <h2 v-if="!editing">{{ userView.user.userName }}</h2>
      <input v-else v-model="editedUser.userName" placeholder="Username" />

      <p class="bio" v-if="!editing">{{ userView.user.bio }}</p>
      <textarea v-else v-model="editedUser.bio" placeholder="Bio"></textarea>

      <p><strong>Joined:</strong> {{ formatDate(userView.user.joinedDate) }}</p>

      <div class="stats">
        <p><strong>Followers:</strong> {{ userView.user.followersCount }}</p>
        <p><strong>Following:</strong> {{ userView.user.followingCount }}</p>
        <p><strong>Images:</strong> {{ userView.user.imagesCount }}</p>
      </div>

      <button v-if="!myProfile" @click="follow" class="btn follow-btn">Follow</button>
      <button v-if="myProfile && !editing" @click="editing = true" class="btn edit-btn">Edit Profile</button>
      <button v-if="myProfile && editing" @click="saveProfile" class="btn save-btn">Save</button>
      <button v-if="myProfile && editing" @click="cancelEdit" class="btn cancel-btn">Cancel</button>
      <button v-if="myProfile && !editing" @click="handleLogout" class="btn logout-btn">Logout</button>
    </div>
  </div>

  <div v-if="userView?.images" class="gallery">
    <ABGallery :images="userView.images" :user="userView.user" :header="'Gallery'" :redirect="'img'" />
    <div v-if="myProfile">
      <ABGallery :images="userView.unpublishedImages" :user="userView.user" :header="'Unpublished'" :redirect="'img'" />
    </div>
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

    .btn {
      margin-top: 10px;
      padding: 10px 15px;
      color: white;
      background: #524f4f;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: 0.3s;
      font-weight: bold;
    }

    .follow-btn:hover { background: #e68900; }
    .edit-btn:hover { background: #1976d2; }
    .save-btn:hover { background: #388e3c; }
    .cancel-btn:hover { background: #d32f2f; }
    .logout-btn:hover { background: #c9302c; }
</style>
  