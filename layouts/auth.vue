<script setup lang="ts">

</script>

<template>
  <main class="min-h-screen flex">
    <div class="bg hidden md:flex md:w-1/2 items-center justify-center">
      <img src="/images/logo.png" alt="AllerTrac Logo" />
    </div>
    <div class="bg-[#43727a] w-full md:w-1/2 flex items-center justify-center">
      <slot></slot>
    </div>
  </main>
</template>

<style scoped>
  .bg {
    background-image: url("/images/bg.png");
    background-size: contain;
  }
</style>