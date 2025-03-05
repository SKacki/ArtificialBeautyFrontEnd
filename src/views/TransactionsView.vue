<script setup>
import { ref, onMounted, watch } from "vue";
import { useOperationsStore } from "@/stores/OperationsStore";
import { storeToRefs } from "pinia";

const opStore = useOperationsStore();
const { operations } = storeToRefs(opStore);
const sortDescending = ref(true);

const fetchTransactions = async () => {
  try {
    await opStore.fetchOperations(1);
  } catch (err) {
    console.error("Failed to load transactions:", err);
  }

  const sortArr = () => 
  {
    console.log('click!')
    operations.sort((a, b) => new Date(b.operationDate) - new Date(a.operationDate));
    sortDescending.value = !sortDescending.value
  }
};

onMounted(fetchTransactions);

const formatDate = (dateString) => {
  if (!dateString) return "Invalid Date";
  return dateString.split("T")[0];
};
</script>

<template>
  <div class="transaction-container">
    <h2>User Transactions</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody v-if="operations">
        <tr v-for="(transaction, index) in operations.sort((a, b) => new Date(b.operationDate) - new Date(a.operationDate))" :key="index">
          <td>{{ formatDate(transaction.operationDate) }}</td>
          <td :class="{ 'negative': transaction.amount < 0, 'positive': transaction.amount > 0 }">
            {{ transaction.amount }} 💰
          </td>
          <td>{{ transaction.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.transaction-container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 12px;
  border-bottom: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #ffcc00;
  color: #333;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.negative {
  color: red;
  font-weight: bold;
}

.positive {
  color: green;
  font-weight: bold;
}
</style>