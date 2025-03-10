<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  description: String,
  userId:Number,
  userName:String,
});

const router = useRouter();

const redirectToUserProfile = () => {
  router.push(`/user/${props.userId}`);
};

</script>

<template>
    <p v-if="props" class="description">
      {{ description }} by 
      <span class="username" @click="redirectToUserProfile">{{ props.userName }}</span>
    </p>
</template>
  
<style scoped>

.description {
  margin-top: 10px;
  font-size: 16px;
  color: #ccc;
  text-align: center;
  position: relative;
  display: inline-block;
}

.description::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: linear-gradient(to right, #ffcc00, #ff66ff);
  transition: width 0.3s;
}

.description:hover::after {
  width: 100%;
}

.username {
  font-weight: bold;
  color: #ffcc00;
  cursor: pointer;
  transition: color 0.3s ease;
}

.username:hover {
  color: #ff66ff;
  text-decoration: underline;
}
</style>

  