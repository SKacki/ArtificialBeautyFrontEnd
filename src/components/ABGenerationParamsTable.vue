<script setup>
import { ref } from "vue";

defineProps({
  metadata: Object,
});

const samplers = ref(
    [
        "Euler",
        "Euler_A",
        "Karras",
        "Huen",
        "DMP2"
    ]);

</script>

<template>
  <div class="metadata-section">
    <h2>Image Metadata</h2>
    <table class="metadata-table">
      <tr>
        <th>Resource Used</th>
        <td>
          <select v-model="metadata.sampler">
            <option v-for="sampler in samplers" :key="sampler" :value="sampler">{{ sampler }}</option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Prompt</th>
        <td><input type="text" v-model="metadata.promptPoz" class="text-field" /></td>
      </tr>
      <tr>
        <th>Negative Prompt</th>
        <td><input type="text" v-model="metadata.promptNeg" class="text-field" /></td>
      </tr>
      <tr>
        <th>Guidance</th>
        <td><input type="range" v-model="metadata.guidance" min="0" max="100" /></td>
      </tr>
      <tr>
        <th>Steps</th>
        <td><input type="range" v-model="metadata.steps" min="0" max="100" /></td>
      </tr>
      <tr>
        <th>Seed</th>
        <td><div class="scrollable">{{ metadata?.seed }}</div></td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.metadata-section {
  min-width: 600px;
  max-width: 700px;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 8px;
  color: white;
}

.metadata-table {
  width: 100%;
  border-collapse: collapse;
}

.metadata-table th,
.metadata-table td {
  border-bottom: 1px solid #444;
  padding: 8px;
  text-align: left;
}

.metadata-table th {
  color: #ffcc00;
  white-space: nowrap;
}

.metadata-table tr:last-child td {
  border-bottom: none;
}

.scrollable {
  max-height: 80px;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-right: 5px;
}

.scrollable::-webkit-scrollbar {
  width: 6px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.scrollable::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
}

.text-field {
  width: 100%;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
