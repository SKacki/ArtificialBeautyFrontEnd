<script setup>
import {ref} from "vue";

const searchTerm = ref("");
const selectedOption = ref('images')
async function xyz() {
  if(selectedOption.value === 'images'){
    const response = await fetch("https://localhost:44307/api/Generator/HealthCheck?code=1");
    if (!response.ok) throw new Error("Failed to fetch data");
    users.value = await response.json();
  } else if(selectedOption.value === 'models') {
    console.log('modelki')
  } else {
    console.log('uzytkownicy')
  }
  console.log(searchTerm.value)
  console.log(selectedOption.value)
}
</script>

<template>
    <div class="input-wrap">
      <select v-model="selectedOption" class="dropdown">
        <option value="models">Models</option>
        <option value="images">Images</option>
        <option value="users">users</option>
      </select>
      
      <input type="text" v-model="searchTerm" class="search-bar">
      
      <button class="search-btn" @click="xyz">Search</button>
    </div>
  </template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;
  margin: 9px;

  &:focus-within {
    box-shadow: 0 -4px 6px -1px rgb(0 0 0 / 0.1),
      0 -2px 4px -2px rgb(0 0 0 / 0.1);
  }

  input {
    width: 100%;
    padding: 8px 6px;
    border: none;

    &:focus {
      outline: none;
    }
  }

  button {
    padding: 8px 16px;
    border: none;
  }
}
</style>