<script setup>
import { watch, ref } from "vue";
import ABCommentRow from "./ABCommentRow.vue";
import { useRoute } from "vue-router";
import { useOperationsStore } from "@/stores/OperationsStore";
import { useToast } from "vue-toastification";

const props = defineProps({
  imgComments: Array,
  user: Object
});

const OperationsStore = useOperationsStore();
const route = useRoute();
const toast = useToast();
const newComment = ref("");
const comments = ref([]);

watch(
  () => props.imgComments,
  (newVals) => {
    comments.value = newVals;
    comments.value = newVals.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
  },
  { immediate: true } //<-this throws errors
);

const addComment = async () => {
  if (newComment.value.trim() !== "") 
  {
    console.log()
    const data =
      {
        userId: props.user.id,
        imageId: parseInt(route.params.imageId),
        commentText: newComment.value,
        userName: props.user.userName,
        createdDate: new Date().toISOString()
      };
      
    const result =  await OperationsStore.postComment(data);

    if(result.status !== 200)
    {
      if(result.status === 290)
        toast.error(result.data.message);
    }
    else
    {
      comments.value.unshift(data);
      newComment.value = "";
    }
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