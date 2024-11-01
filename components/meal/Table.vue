<script setup lang="ts">
  import { PencilSquareIcon } from "@heroicons/vue/24/solid";
  import type { MealCollection } from "~/types/Meal";

  const props = defineProps<{
    meals: MealCollection
  }>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th>Name</th>
        <th class="hidden md:table-cell">Allergens</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="meal in meals.data" class="hover">
        <td>
          {{ meal.name }}
        </td>
        <td>
          <div class="flex gap-2">
            <div v-for="allergen in meal.allergens" class="badge badge-primary">
              {{ allergen.name }}
            </div>
          </div>
          <div v-if="meal.allergens.length === 0" class="badge badge-error">
            No allergens found
          </div>
        </td>
        <td>
          <NuxtLink :to="`/meals/${ meal.food_id }`" class="btn btn-sm">
            <PencilSquareIcon class="size-5"/>
          </NuxtLink>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->

  <!-- END Pagination -->
</template>

<style scoped>

</style>