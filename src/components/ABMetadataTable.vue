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
        <td>{{ metadata.resource }}</td>
      </tr>
      <tr>
        <th>Prompt</th>
        <td>{{ metadata.prompt }}</td>
      </tr>
      <tr>
        <th>Negative Prompt</th>
        <td>{{ metadata.negativePrompt }}</td>
      </tr>
      <tr>
        <th>Guidance</th>
        <td>{{ metadata.guidance }}</td>
      </tr>
      <tr>
        <th>Steps</th>
        <td>{{ metadata.steps }}</td>
      </tr>
      <tr>
        <th>Sampler</th>
        <td>{{ metadata.sampler }}</td>
      </tr>
      <tr>
        <th>Seed</th>
        <td>{{ metadata.seed }}</td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.metadata-section {
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
}

.metadata-table tr:last-child td {
  border-bottom: none;
}
</style>