<script setup>
import { useRouter } from 'vue-router';
import ABLoadingSpinner from '../CommonComponents/ABLoadingSpinner.vue';
import { computed } from 'vue';

defineProps({
  metadata: Object,
});

const router = useRouter();

const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";
  return dateString.split("T")[0];
};

const redirectToView = (id) => {
  router.push({ name: "user", params:{userId:id  } });
};

</script>

<template>
  <div v-if="!metadata">
    <ABLoadingSpinner />
  </div>
  <div v-else class="info-section">
    <h2>Model Data</h2>
    <table class="info-table">
      <tr>
        <th>Name</th>
        <td><div class="scrollable">{{ metadata.modelName }}</div></td>
      </tr>
      <tr>
        <th>Type</th>
        <td><div class="scrollable">{{ metadata.type }}</div></td>
      </tr>
      <tr>
        <th>Description</th>
        <td><div class="scrollable description">{{ metadata.description }}</div></td>
      </tr>
      <tr>
        <th>Triggers</th>
        <td><div class="scrollable">{{ metadata.trigger }}</div></td>
      </tr>
      <tr>
        <th>Published</th>
        <td><div class="scrollable">{{ formatDate(metadata.publishedDate) }}</div></td>
      </tr>
      <tr>
        <th>Author</th>
        <td>
          <div class="username" @click="redirectToView(metadata.publisherId)">
            {{ metadata.publisher.userName }}
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.info-section {
  margin-bottom: 0.3rem;
  min-width: 600px;
  max-width: 600px;
  background: #1a1a1a;
  padding: 15px;
  border-radius: 8px;
  color: white;
}

.info-table {
  width: 100%;
  max-width: 600px;
  border-collapse: collapse;
}

.info-table th,
.info-table td {
  border-bottom: 1px solid #444;
  padding: 8px;
  text-align: left;
}

.info-table th {
  color: #ffcc00;
  white-space: nowrap;
}

.info-table tr:last-child td {
  border-bottom: none;
}

.scrollable {
  max-height: 80px;
  max-width: 400px;
  overflow-y: auto;
  word-wrap: break-word;
  white-space: pre-wrap;
  padding-right: 5px;
}

.description {
  max-height: 300px;
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
