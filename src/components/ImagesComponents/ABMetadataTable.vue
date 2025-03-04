<script setup>
defineProps({
  metadata: Object,
});
</script>

<template>
  <div class="metadata-section">
    <h2>Image Metadata</h2>
    <table class="metadata-table">
      <tr>
        <th>Resource Used</th>
        <td><div class="scrollable">{{ metadata?.modelName }}</div></td>
      </tr>
      <tr v-if="metadata?.lora1Name">
        <th>Additional Resources</th>
        <td><div class="scrollable">{{ metadata?.lora1Name }}</div></td>
      </tr>
      <tr v-if="metadata?.lora2Name">
        <th>Additional Resources</th>
        <td><div class="scrollable">{{ metadata?.lora2Name }}</div></td>
      </tr>
      <tr>
        <th>Prompt</th>
        <td><div class="scrollable">{{ metadata?.promptPoz }}</div></td>
      </tr>
      <tr>
        <th>Negative Prompt</th>
        <td><div class="scrollable">{{ metadata?.promptNeg }}</div></td>
      </tr>
      <tr>
        <th>Guidance</th>
        <td><div class="scrollable">{{ metadata?.guidance }}</div></td>
      </tr>
      <tr>
        <th>Steps</th>
        <td><div class="scrollable">{{ metadata?.steps }}</div></td>
      </tr>
      <tr>
        <th>Sampler</th>
        <td><div class="scrollable">{{ metadata?.sampler }}</div></td>
      </tr>
      <tr>
        <th>Scheduler</th>
        <td><div class="scrollable">{{ metadata?.scheduler }}</div></td>
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
  margin-bottom: 0.3rem;
  min-width: 600px;
  max-width: 600px;
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
</style>
