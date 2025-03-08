<script setup>
import { RouterView } from 'vue-router'
import ABheader from './components/CommonComponents/ABheader.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/UserStore";
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loadingUser = ref(true);

const testStuff = () => {
  console.log(localStorage.getItem("userId"));
};

const isAuthenticated = computed(() => !!localStorage.getItem("userId"));

onMounted(async () => {
  if(!isAuthenticated.value)
  {
    router.push("/login")
  } else {
  try {
    await userStore.fetchData(localStorage.getItem("userId"));
  } catch (err) {
    console.error("Failed to load user data:", err);
  } finally {
    loadingUser.value = false;
  }
}
});
</script>

<template>
  <ABheader v-if="user" :user="user" />
  <button class="test-button" @click="testStuff">
      <span class="icon">Test 🧪</span>
      <span>{{ commentsCount }}</span>
    </button>
  <RouterView />
</template>

<style lang="scss">
 @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap');

 *{
    font-family: "Rubik", sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
 }
 .container
 {
  max-width:1100px;
  margin:0 auto;
 }
</style>
