<script setup lang="ts">
  import { VueFinalModal } from "vue-final-modal";

  const page = ref();

  const emit = defineEmits<{
    (e: 'changePage', page: number): void
    (e: 'close'): void
  }>();

  const handleChangePage = () => {
    emit('changePage', page.value)
  }
</script>

<template>
  <VueFinalModal class="modal" content-class="modal-box" open>
    <form method="dialog">
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" @click="emit('close')">
        ✕
      </button>
    </form>

    <h1 class="text-xl font-bold mb-8">
      Go to page...?
    </h1>

    <form @submit="handleChangePage">
      <div class="join gap-3">
        <input v-model="page" type="number" placeholder="Page number" class="input input-bordered w-full max-w-xs" />
        <button class="btn btn-primary">
          Go
        </button>
      </div>
    </form>
  </VueFinalModal>
</template>

<style scoped>

</style>