<script setup lang="ts">
  definePageMeta({
    title: 'Home',
    middleware: ['sanctum:auth']
  })
</script>

<template>
  <div class="flex flex-col md:flex-row gap-4">
    <AllergenChipList class="w-full md:w-1/2" />
    <FactsCarouselRecent class="w-full md:w-1/2" />
  </div>

  <AllergenStatistics class="mt-8" />
</template>

<style scoped>

</style>