<script setup lang="ts">
  import type { Allergen } from "~/types/Allergen";

  const allergens = ref<Allergen[]>([]);

  const { data, error, status } = await useFetch<{ allergens: Allergen[] }>('/api/allergens');

  if (data.value) {
    allergens.value = data.value.allergens;
  }
</script>

<template>
  <div class="card bg-primary text-white shadow-xl">
    <div v-if="status === 'success'" class="card-body">
      <h2 class="card-title mb-3">
        Allergens
      </h2>
      <div class="flex flex-wrap gap-2">
        <div v-for="allergen in allergens" class="badge badge-white">
          {{ allergen.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>