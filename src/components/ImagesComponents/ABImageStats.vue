<script setup>
import { ref,watch, defineProps } from "vue";
import { useToast } from 'vue-toastification';
import { useRoute } from "vue-router";
import { useOperationsStore } from "@/stores/OperationsStore";

const OperationsStore = useOperationsStore();

const props = defineProps({
  stats: Object,
  imageId:Number,
  user:Object
});

const toast = useToast();
const likesCount = ref(props.stats?.likes ?? 0);
const dislikesCount = ref(props.stats?.dislikes ?? 0);
const tipsCount = ref(props.stats?.tips ?? 0);
const commentsCount = ref(props.stats?.comments ?? 0);
const route = useRoute();

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

const sendReaction = async (reaction) => {
  const data = 
    {
      UserId: props.user.id,
      ImageId: props.imageId,//route.params.imageId,
      Type: reaction 
    }
  return await OperationsStore.sendReaction(data);
}

const sendTip = async () => {
  const data = 
    {
      UserId: props.user.id,
      ImageId: props.imageId,//route.params.imageId,
      Amount: 10 
    }
  return await OperationsStore.sendTip(data);
}

const handleLike = async() => {
  const result = await sendReaction(1);
  if(result.status === 200)
  {
    likesCount.value++;
  }
  if(result.status === 290)
  {
    toast.error(result.data.message);
  }
  if(result.status === 291)
  {
    toast.info(result.data.message);
  }
};

const handleDislike  = async() => {
  const result = await sendReaction(-1);
  if(result.status === 200)
  {
    dislikesCount.value++;
  }
  if(result.status === 290)
  {
    toast.error(result.data.message);
  }
  if(result.status === 291)
  {
    toast.info(result.data.message);
  }
};

const handleTip = async() => {
  const result = await sendTip();
  if(result.status === 200)
  {
    toast.success("tipped 10 💰")
    props.user.currency -=10;
    tipsCount.value += 10;
  }
  if(result.status === 290)
  {
    toast.error(result.data.message);
  }
  if(result.status === 291)
  {
    toast.info(result.data.message);
  }

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
    <button class="stat-button" @click="showToast">
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
