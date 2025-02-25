<script setup>
import { ref } from "vue";
import ABGallery from "@/components/ABGallery.vue";

const caption = ref("Test Caption");
</script>

<template>
  <main>
    <div class="gallery">
      <ABGallery />
  </div>
  </main>
</template>
