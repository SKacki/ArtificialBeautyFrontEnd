<script setup>
defineProps({
  likes: Number,
  dislikes: Number,
  tips: Number,
});
</script>

<template>
    <div class="stats-section">
      <div class="stat">
        <span class="icon">👍</span>
        <span>{{ likes }}</span>
      </div>
      <div class="stat">
        <span class="icon">👎</span>
        <span>{{ dislikes }}</span>
      </div>
      <div class="stat">
        <span class="icon">💰</span>
        <span>{{ tips }}</span>
      </div>
    </div>
  </template>
  
  <style scoped>
  .stats-section {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 15px;
    padding: 10px;
    background: #222;
    border-radius: 8px;
    color: white;
  }
  
  .stat {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 18px;
  }
  
  .icon {
    font-size: 20px;
  }
  </style>