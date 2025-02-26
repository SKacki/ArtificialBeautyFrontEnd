<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const loading = ref(false);
const error = ref(null);

onMounted(async () => {
  try {
    loading.value = true
    const response = await fetch("https://localhost:44307/api/Generator/HealthCheck?code=1");
    if (!response.ok) throw new Error("Failed to fetch data");
    users.value = await response.json();
    console.log(users.value)
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div v-if="loading">Loading...</div>
  <ul v-if="!loading" v-for="item in users">
    <li>test {{ item.code }}</li>
    <li>test {{ item.res }}</li>
  </ul>
  <p v-if="!loading">Response{{ users }}{{ users.res }}</p>
  <div v-if="error">{{ error }}</div>
  <!-- <ul v-else>
    <p>code: {{users.Code}}</p>
    <p>Response: {{users.Res}}</p>
  </ul> -->
</template>