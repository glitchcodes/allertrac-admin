<script setup lang="ts">
  import { useModal } from "vue-final-modal";
  import RenderlessPagination from 'laravel-vue-pagination/src/RenderlessPagination.vue';
  import { ModalGoToPage } from "#components";

  const props = withDefaults(defineProps<{
    data: any
    limit?: number
    keepLength?: boolean
  }>(), {
    limit: 0,
    keepLength: false
  });

  const emit = defineEmits<{
    (e: 'changePage', page: number): void
  }>();

  // Go-To Modal
  const navigateModal = useModal({
    component: ModalGoToPage,
    attrs: {
      onClose: () => {
        navigateModal.close();
      },
      onChangePage: (e) => {
        selectPage(e)
      }
    }
  })

  // Override page button events
  const pageButtonEvents = (page: string|number) => ({
    click: (e: any) => {
      e.preventDefault()
      selectPage(page)
    }
  });

  const selectPage = (page: string|number) => {
    if (page === props.data.meta.current_page) {
      return;
    }

    if (typeof page === 'number') {
      emit('changePage', page)
    } else {
      if (page === '...') {
        // Show modal
        navigateModal.open();
      } else {
        return
      }
    }
  }
</script>

<template>
  <RenderlessPagination
      v-slot="slotProps"
      :data="props.data"
      :limit="props.limit"
      :keep-length="props.keepLength"
      @pagination-change-page="emit('changePage', $event)"
  >
    <div v-bind="$attrs"
         class="grid grid-cols-6 gap-2 md:join"
         aria-label="Pagination"
         v-if="slotProps.computed.total > slotProps.computed.perPage">

      <button
          class="md:join-item btn"
          :disabled="!slotProps.computed.prevPageUrl"
          v-on="slotProps.prevButtonEvents"
      >
        <slot name="prev-nav">
          &laquo;
        </slot>
      </button>

      <button
          class="md:join-item btn"
          :class="{'btn-active': slotProps.computed.currentPage === page}"
          :aria-current="slotProps.computed.currentPage === page ? 'page' : undefined"
          v-for="(page, key) in slotProps.computed.pageRange"
          :key="key"
          v-on="pageButtonEvents(page)"
      >
        {{ page }}
      </button>

      <button
          class="md:join-item btn"
          :disabled="!slotProps.computed.nextPageUrl"
          v-on="slotProps.nextButtonEvents"
      >
        <slot name="next-nav">
          &raquo;
        </slot>
      </button>
    </div>

  </RenderlessPagination>
</template>

<style scoped>

</style>