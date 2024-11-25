<script setup lang="ts">
  definePageMeta({
    title: 'Home',
    middleware: ['sanctum:auth']
  })
</script>

<template>
  <div class="flex gap-4">
    <AllergenChipList class="w-1/2" />
    <FactsCarouselRecent class="w-1/2" />
  </div>

  <AllergenStatistics class="mt-8" />
</template>

<style scoped>

</style>