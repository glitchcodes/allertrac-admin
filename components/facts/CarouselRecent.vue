<script setup lang="ts">
  import type { Fact } from "~/types/Fact";

  const facts = ref<Fact[]>([]);

  const { data, error, status } = await useFetch<{ facts: Fact[] }>('/api/facts/recent');

  if (data.value) {
    facts.value = data.value.facts;
  }
</script>

<template>
  <div class="card bg-base-200 shadow-xl">
    <div v-if="status === 'success'" class="card-body">
      <h2 class="card-title mb-3">
        Recent facts
      </h2>
      <div class="carousel w-full">
        <div v-for="fact in facts" :id="'item-' + fact.id" class="carousel-item flex-col lg:flex-row w-full gap-4">
          <img v-if="fact.cover_image" class="w-full lg:w-3/12 rounded-md" :src="fact.cover_image" :alt="fact.title" />
          <div>
            <h1 class="text-xl font-bold mb-3">
              {{ fact.title }}
            </h1>
            <p>
              {{ fact.brief_description }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex w-full justify-center gap-2 py-2">
        <a v-for="(fact, index) in facts" :href="'#item-' + fact.id" class="btn btn-neutral btn-xs">
          {{ index + 1 }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>