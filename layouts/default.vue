<script setup lang="ts">
  import { ArrowRightStartOnRectangleIcon } from "@heroicons/vue/24/outline"
  import { useCurrentPage } from "~/composables/useCurrentPage";
  import SidebarComponent from "~/components/SidebarComponent.vue";

  const { currentPage } = useCurrentPage();

  const isSidebarOpen = ref<boolean>(true);
</script>

<template>
  <div class="flex min-h-screen">
    <aside class="w-full max-w-80 bordered hidden md:block sidebar-wrapper" :class="{ '-ml-80': !isSidebarOpen }">
      <SidebarComponent :open="isSidebarOpen" @close="() => isSidebarOpen = !isSidebarOpen" />
    </aside>

    <div class="flex-1">
      <div class="navbar px-4 md:px-8 border-b border-white/10 gap-2">
        <div v-if="!isSidebarOpen" class="flex-none">
          <div class="tooltip tooltip-bottom" data-tip="Open sidebar">
            <button class="btn btn-ghost" @click="() => isSidebarOpen = !isSidebarOpen">
              <ArrowRightStartOnRectangleIcon class="size-5" />
            </button>
          </div>
        </div>
        <div class="flex-1">
          <p class="font-bold">{{ currentPage }}</p>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4 md:p-8 mx-auto">
        <slot />
      </div>
      <!-- END Content -->
    </div>

  </div>
</template>

<style scoped>
  .bordered {
    border-right: 1px solid rgba(255,255,255,0.1);
  }

  .sidebar-wrapper {
    transition: all 0.3s ease-in-out;
  }
</style>