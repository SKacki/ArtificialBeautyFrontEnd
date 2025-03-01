<script setup>
import { ref,watch, defineProps } from "vue";

const props = defineProps({
  stats: Object,
});

const likesCount = ref(props.stats?.likes ?? 0);
const dislikesCount = ref(props.stats?.dislikes ?? 0);
const tipsCount = ref(props.stats?.tips ?? 0);
const commentsCount = ref(props.stats?.comments ?? 0);

const alreadyVoted = ref(false);

watch(
  () => props.stats,
  (newStats) => {
    if (newStats) {
      likesCount.value = newStats.likes ?? 0;
      dislikesCount.value = newStats.dislikes ?? 0;
      tipsCount.value = newStats.tips ?? 0;
      commentsCount.value = newStats.comments ?? 0;
    }
  },
  { immediate: true }
);

const handleLike = () => {
  if (!alreadyVoted.value) {
    likesCount.value++;
    alreadyVoted.value = true;
  }
};

const handleDislike = () => {
  if (!alreadyVoted.value) {
    dislikesCount.value++;
    alreadyVoted.value = true;
  }
};

const handleTip = () => {
  tipsCount.value += 10;
};

const handleComment = () => {
};
</script>

<template>
  <div class="stats-section">
    <button class="stat-button" @click="handleLike">
      <span class="icon">👍</span>
      <span>{{ likesCount }}</span>
    </button>
    <button class="stat-button" @click="handleDislike">
      <span class="icon">👎</span>
      <span>{{ dislikesCount }}</span>
    </button>
    <button class="stat-button" @click="handleTip">
      <span class="icon">💰</span>
      <span>{{ tipsCount }}</span>
    </button>
    <button class="stat-button" @click="handleComment">
      <span class="icon">💬</span>
      <span>{{ commentsCount }}</span>
    </button>
  </div>
</template>

<style scoped>
.stats-section {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-top: 15px;
  padding: 5px;
  background: #222;
  border-radius: 8px;
  color: white;
}

.stat-button {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.2s;
}

.stat-button:hover {
  background: rgba(255, 255, 255, 0.2);
}

.icon {
  font-size: 20px;
}
</style>
