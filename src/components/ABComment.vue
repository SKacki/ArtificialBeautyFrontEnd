<script setup>
import { ref } from "vue";

const newComment = ref("");
const comments = ref(["Nice","Meh","It's ok"]);

const addComment = () => {
  if (newComment.value.trim() !== "") {
    comments.value.push(newComment.value);
    newComment.value = "";
  }
};
</script>

<template>
    <div class="comments-section">
      <h3>Comments</h3>
      <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
      <button @click="addComment">Post Comment</button>
  
      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          {{ comment }}
        </li>
      </ul>
    </div>
  </template>
  

  
  <style scoped>
  .comments-section {
    max-width: 700px;
    margin-top: 20px;
    padding: 15px;
    background: #222;
    border-radius: 8px;
    color: white;
  }
  
  textarea {
    max-width: 700px;
    width: 100%;
    padding: 8px;
    background: #333;
    color: white;
    border: 1px solid #555;
    border-radius: 4px;
  }
  
  button {
    margin-top: 10px;
    padding: 8px 12px;
    background: #ffcc00;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  ul {
    margin-top: 10px;
    padding-left: 20px;
  }
  
  li {
    list-style: none;
    background: #333;
    padding: 5px;
    margin-top: 5px;
    border-radius: 4px;
  }
  </style>