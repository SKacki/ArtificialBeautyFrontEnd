<script setup>
import {ref} from "vue";

const searchTerm = ref("");
</script>

<template>
    <div class="input-wrap">
      <select v-model="selectedOption" class="dropdown">
        <option value="models">Models</option>
        <option value="images">Images</option>
        <option value="users">users</option>
      </select>
      
      <input type="text" v-model="searchTerm" class="search-bar">
      
      <button class="search-btn">Search</button>
    </div>
  </template>

<style lang="scss" scoped>
.input-wrap {
  display: flex;
  transition: 250ms ease;
  border: 2px solid #41b080;

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