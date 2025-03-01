<script setup>
import { watch,ref } from "vue";
import ABCommentRow from "./ABCommentRow.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const props = defineProps({
  imgComments: Array,
});

const newComment = ref("");
const comments = ref([]);

watch(
  () => props.imgComments,
  (newVals) => {
    comments.value = newVals
  },
  { immediate: true }
);


const addComment = () => {
  if (newComment.value.trim() !== "") {
    comments.value.push({
      id:null,
      userId: null,
      imageId: route.params.imageId,
      commentText: newComment.value,
      userName: "GuestUser",
      createdDate: new Date().toLocaleString(),
    });
    newComment.value = "";
  }
};
</script>

<template>
  <div class="comments-section">
    <h3>Comments</h3>
    <textarea v-model="newComment" placeholder="Add a comment..."></textarea>
    <button @click="addComment">Post Comment</button>

    <div class="comments-container">
      <ul>
        <ABCommentRow 
          v-for="(comment, index) in comments" 
          :key="index"
          :comment="comment"
        />
      </ul>
    </div>
  </div>
</template>

<style scoped>
.comments-section {
  max-width: 600px;
  background: #222;
  padding: 15px;
  border-radius: 8px;
  color: white;
}

textarea {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: none;
  resize: none;
}

button {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 10px;
  border: none;
  background: #ffcc00;
  color: black;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s;
}

button:hover {
  background: #e6b800;
}

.comments-container {
  max-height: 200px;
  overflow-y: auto;
  margin-top: 10px;
  padding-right: 5px;
  border-radius: 5px;
  background: #333;
}

.comments-container ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Custom scrollbar */
.comments-container::-webkit-scrollbar {
  width: 6px;
}

.comments-container::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.comments-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}
</style>