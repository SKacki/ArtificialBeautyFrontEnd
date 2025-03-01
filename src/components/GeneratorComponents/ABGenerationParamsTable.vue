<script setup>
import { reactive,ref, computed, onMounted, watch } from "vue";

const props = defineProps({
  metadata: Object,
});

const localMetadata = reactive({ ...props.metadata });
const items = ref([]); 
const isSeedRandom = ref(true);

watch(() => props.metadata, (newMetadata) => {
  Object.assign(localMetadata, props.metadata);
}, { immediate: true });

const fetchItems = async () => {
  try {
    const response = await fetch("https://localhost:44307/api/Model/GetAll");
    if (!response.ok) throw new Error("Failed to fetch data");
    items.value = await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const sendGenerationRequest = async () => {
  try {
    const response = await fetch("https://localhost:44307/api/Generator/GenerateImage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(localMetadata),
    });

    if (!response.ok) throw new Error("Failed to send data");
    console.log("Metadata sent successfully!");
  } catch (error) {
    console.error("API Error:", error);
  }
};

const handleSeed = () => {
  if (isSeedRandom.value) {
    localMetadata.seed = null;
  }
};

const samplers = ref([
  "Euler",
  "Euler_A",
  "Huen",
  "DMP2"
]);
const schedulers = ref([
"Normal",
"Karras",
"SGM_Uniform"
]);

onMounted(fetchItems);

const checkpointModels = computed(() => items.value.filter(item => item.type === "Checkpoint"));
const loraModels = computed(() => items.value.filter(item => item.type !== "Checkpoint"));

</script>

<template>
  <div class="metadata-section">
    <h2>Image Metadata</h2>
    <table class="metadata-table">
      <tr>
        <th>Checkpoint</th>
        <td>
          <select v-model="localMetadata.modelId" class="dark-select">
            <option v-for="(model, index) in checkpointModels" :key="index" :value="model.id">
              {{ model.modelName }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Additional Resource</th>
        <td>
          <select v-model="localMetadata.lora1Id" class="dark-select">
            <option value="" disabled>Select a resource</option>
            <option v-for="(model, index) in loraModels" :key="index" :value="model.id">
              {{ model.modelName }}
            </option>
          </select>
        </td>
      </tr>
      <tr v-if="localMetadata.lora1Id">
        <th>Additional Resource</th>
        <td>
          <select v-model="localMetadata.lora2Id" class="dark-select">
            <option value="" disabled>Select a resource</option>
            <option v-for="(model, index) in loraModels" :key="index" :value="model.id">
              {{ model.modelName }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Prompt</th>
        <td><textarea v-model="localMetadata.promptPoz" class="text-field large-textarea dark-input"></textarea></td>
      </tr>
      <tr>
        <th>Negative Prompt</th>
        <td><textarea v-model="localMetadata.promptNeg" class="text-field large-textarea dark-input"></textarea></td>
      </tr>
      <tr>
        <th>Sampler</th>
        <td>
          <select v-model="localMetadata.sampler" class="dark-select">
            <option v-for="(sampler, index) in samplers" :key="index" :value="sampler">
              {{ sampler }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Scheduler</th>
        <td>
          <select v-model="localMetadata.scheduler" class="dark-select">
            <option v-for="(scheduler, index) in schedulers" :key="index" :value="scheduler">
              {{ scheduler }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Guidance</th>
        <td>
          <div class="slider-container">
            <input type="range" v-model="localMetadata.guidance" min="1" max="10" class="dark-slider"/>
            <span>{{ localMetadata.guidance }}</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>Steps</th>
        <td>
          <div class="slider-container">
            <input type="range" v-model="localMetadata.steps" min="1" max="50" class="dark-slider"/>
            <span>{{ localMetadata.steps }}</span>
          </div>
        </td>
      </tr>
      <tr>
        <th>Seed</th>
        <td>
          <div class="seed-container">
            <input
              type="number"
              v-model="localMetadata.seed"
              :readonly="isSeedRandom"
              :placeholder="isSeedRandom ? '' : 'Enter seed'"
              class="text-field dark-input"
            />
            <input type="checkbox" v-model="isSeedRandom" @change="handleSeed" id="randomSeed" />
            <label for="randomSeed">Random</label>
          </div>
        </td>
      </tr>
    </table>
    <div><button class="create-button" @click="sendGenerationRequest">Make art</button></div>
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
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.large-textarea {
  width: 100%;
  height: 150px;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  overflow-y: auto;
}

.slider-container {
  display: flex;
  align-items: center;
}

.slider-container input {
  margin-right: 10px;
}

.seed-container {
  display: flex;
  align-items: center;
}

.seed-container input[type="checkbox"] {
  margin-left: 10px;
}

/* Dark theme adjustments */
.dark-input {
  background-color: #333;
  color: white;
  border: 1px solid #444;
}

.dark-select {
  background-color: #333;
  color: white;
  border: 1px solid #444;
}

.dark-slider {
  background-color: #444;
  color: white;
}

.dark-slider::-webkit-slider-runnable-track {
  background-color: #444;
}

.dark-slider::-webkit-slider-thumb {
  background-color: #ffcc00;
}

.create-button {
  margin-top: 10px;
  padding: 8px 12px;
  background: #ffcc00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>

      