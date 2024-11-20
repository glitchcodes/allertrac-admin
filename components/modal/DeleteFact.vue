<script setup lang="ts">
  import { VueFinalModal } from "vue-final-modal";
  import type { Fact } from "~/types/Fact";

  const { $toast } = useNuxtApp();

  const props = defineProps<{
    fact: Fact
  }>()

  const emit = defineEmits<{
    (e: 'delete', fact: Fact): void
    (e: 'close'): void
  }>();

  const isDeleting = ref<boolean>(false);

  const handleConfirm = async () => {
    try {
      isDeleting.value = true;

      const { status } = await useAsyncData(`delete-${ props.fact.id }`, () => $fetch(`/api/facts/${ props.fact.id }`, {
        method: 'DELETE'
      }));

      if (status.value === 'success') {
        emit('delete', props.fact)
      }
    } catch (e) {
      $toast.error('Something went wrong while deleting this fact');
      console.error(e)
    } finally {
      isDeleting.value = false;
    }
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
      Delete fact?
    </h1>

    <p class="mb-8">
      This action is irreversible!
    </p>

    <div class="flex gap-3">
      <button class="btn btn-neutral" @click="emit('close')">
        Cancel
      </button>
      <button v-if="!isDeleting" class="btn btn-error" @click="handleConfirm">
        Delete
      </button>
      <button v-else class="btn btn-error">
        <span class="loading loading-spinner" />
        <span class="ml-2">Deleting</span>
      </button>
    </div>
  </VueFinalModal>
</template>

<style scoped>

</style>