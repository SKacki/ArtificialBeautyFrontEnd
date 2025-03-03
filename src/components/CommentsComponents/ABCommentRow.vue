<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  comment: Object,
});

const formattedDate = computed(() => {
  if (!props.comment?.createdDate) return "Unknown date";
  
  const date = new Date(props.comment.createdDate);
  return date.toLocaleDateString("en-GB");
});
</script>

<template>
  <li class="comment-row">
    <div class="comment-header">
      <span class="comment-author">{{ comment.userName }}</span>
      <span class="comment-date">{{ formattedDate }}</span>
    </div>
    <p class="comment-text">{{ comment.commentText }}</p>
  </li>
</template>

<style scoped>
.comment-row {
  padding: 10px;
  border-bottom: 1px solid #444;
}

.comment-row:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #bbb;
  margin-bottom: 4px;
}

.comment-author {
  font-weight: bold;
  color: #ffcc00;
}

.comment-date {
  font-size: 12px;
  color: #888;
}

.comment-text {
  font-size: 16px;
  color: white;
}
</style>