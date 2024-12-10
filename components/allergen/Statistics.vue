<script setup lang="ts">
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import type { AllergenStatistics } from "~/types/Allergen";

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

  const statistics = ref<AllergenStatistics[]>([]);

  const { data, error, status } = await useFetch<{ statistics: AllergenStatistics[] }>('/api/allergens/statistics', {
    method: 'GET'
  });

  if (data.value) {
    statistics.value = data.value.statistics;
  }

  const chartOptions = computed(() => {
    return {
      data: {
        labels: statistics.value.map(s => s.allergen),
        datasets: [
          {
            label: 'Users',
            data: statistics.value.map(s => s.user_count),
            backgroundColor: '#336267',
            borderColor: 'rgba(75, 192, 192, 1)'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  })
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div v-if="status === 'success'" class="card-body">
      <h2 class="card-title mb-3">
        Allergen Statistics
      </h2>

      <div class="chart-container">
        <Bar id="my-chart-id"
             :options="chartOptions.options"
             :data="chartOptions.data"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
  .chart-container {
    position: relative;
    height: 20rem;
  }
</style>