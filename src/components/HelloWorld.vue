<script setup>
import { api } from '@/services/api.js'
import { onMounted, ref } from 'vue'

const tasks = ref([])

onMounted(async () => {
    const response = await api.getTasks()
    tasks.value = response.data
})
</script>

<template>
  <h1>Task Manager</h1>
  <table v-if="tasks.length">
    <thead>
      <tr>
        <th>ID</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="task in tasks" :key="task.id">
        <td>{{ task.id }}</td>
        <td>{{ task.description }}</td>
        <td>{{ task.completed ? 'Completed' : 'Pending' }}</td>
      </tr>
    </tbody>
  </table>
  <p v-else>No tasks available</p>
</template>
