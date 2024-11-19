<script setup lang="ts">
  definePageMeta({
    title: 'Home',
    middleware: ['sanctum:auth']
  })
</script>

<template>
  <div>
    <p>balling</p>
  </div>
</template>

<style scoped>

</style>