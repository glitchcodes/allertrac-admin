<script setup lang="ts">
  import {
    HomeIcon,
    RectangleStackIcon,
    ArrowLeftStartOnRectangleIcon,
    AcademicCapIcon
  } from "@heroicons/vue/24/outline";

  const props = withDefaults(defineProps<{
    open: boolean
  }>(), {
    open: true
  });

  const emit = defineEmits<{
    (e: 'close'): void
  }>()
</script>

<template>
  <section class="flex items-center gap-1 mb-4 px-1 h-[64px]">
    <img src="/images/logo-128x128.png" class="w-[60px]" alt="AllerTrac" />
    <p class="text-md font-bold flex-1">
      AllerTrac
    </p>
    <button class="btn btn-ghost" @click="emit('close')">
      <ArrowLeftStartOnRectangleIcon class="size-5" />
    </button>
  </section>

  <section>
    <ul class="menu menu-md gap-2">
      <li>
        <NuxtLink to="/" active-class="active">
          <HomeIcon class="size-5" />
          <span>Home</span>
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/facts" active-class="active">
          <AcademicCapIcon class="size-5" />
          Facts Database
        </NuxtLink>
      </li>
      <li>
        <NuxtLink to="/meals" active-class="active">
          <RectangleStackIcon class="size-5" />
          Food Database
        </NuxtLink>
      </li>
    </ul>
  </section>

</template>

<style scoped>
  .menu li a, .menu li details summary {
    padding-top: 0.8rem;
    padding-bottom: 0.8rem;
  }
</style>