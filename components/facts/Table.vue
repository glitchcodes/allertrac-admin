<script setup lang="ts">
import { PencilSquareIcon } from "@heroicons/vue/24/solid";
import type { FactCollection } from "~/types/Fact";

const props = defineProps<{
  facts: FactCollection
}>()
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-sm md:table-md table-auto">
      <!-- head -->
      <thead>
      <tr>
        <th>Name</th>
        <th class="hidden md:table-cell">Brief Description</th>
        <th>Category</th>
        <th>Author</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="fact in facts.data" class="hover">
        <td>
          {{ fact.title }}
        </td>
        <td class="hidden md:table-cell">
          {{ fact.brief_description }}
        </td>
        <td>
          {{ fact.category }}
        </td>
        <td>
          {{ fact.author.full_name }}
        </td>
        <td>
          <NuxtLink :to="`/facts/${ fact.id }`" class="btn btn-sm">
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