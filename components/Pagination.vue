<script setup lang="ts">
  import RenderlessPagination from 'laravel-vue-pagination/src/RenderlessPagination.vue';

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
         class="join"
         aria-label="Pagination"
         v-if="slotProps.computed.total > slotProps.computed.perPage">

      <button
          class="join-item btn"
          :disabled="!slotProps.computed.prevPageUrl"
          v-on="slotProps.prevButtonEvents"
      >
        <slot name="prev-nav">
          &laquo;
        </slot>
      </button>

      <button
          class="join-item btn"
          :class="{'btn-active': slotProps.computed.currentPage === page}"
          :aria-current="slotProps.computed.currentPage === page ? 'page' : undefined"
          v-for="(page, key) in slotProps.computed.pageRange"
          :key="key"
          v-on="slotProps.pageButtonEvents(page)"
      >
        {{ page }}
      </button>

      <button
          class="join-item btn"
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