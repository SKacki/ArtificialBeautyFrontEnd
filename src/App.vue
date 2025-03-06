<script setup>
import { RouterView } from 'vue-router'
import ABheader from './components/CommonComponents/ABheader.vue';
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/UserStore";

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const loadingUser = ref(true);


onMounted(async () => {
  try {
    await userStore.fetchData(1);
  } catch (err) {
    console.error("Failed to load user data:", err);
  } finally {
    loadingUser.value = false;
  }
});
</script>

<template>
  <div v-if="loadingUser">Loading ...</div>
  <ABheader v-else :user="user" />
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
