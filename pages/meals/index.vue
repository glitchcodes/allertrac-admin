<script setup lang="ts">
  import type { Response } from "~/types/Response"
  import type { MealCollection } from "~/types/Meal"

  definePageMeta({
    title: 'Food Database'
  });

  const currentPage = ref(1);
  const selectedFilter = ref('all');

  const url = computed(() => {
    let endpoint = `/api/meals?page=${currentPage.value}`;

    if (selectedFilter.value !== 'all') {
      endpoint = endpoint + `&filter=${selectedFilter.value}`
    }

    return endpoint
  })

  const { data, status, error, refresh } = await useLazyFetch<Response<MealCollection>>(url, {
    pick: ['payload']
  });


  watch(selectedFilter, async () => {
    await refresh();
  });

  const handlePaginationChange = (e: number) => {
    currentPage.value = e;
  }

</script>

<template>
  <div>
    <select v-model="selectedFilter" :disabled="status !== 'success'" class="select select-bordered w-full max-w-xs mb-5">
      <option value="all">
        All
      </option>
      <option value="good">
        With Allergens
      </option>
      <option value="bad">
        Without Allergens
      </option>
    </select>

    <div v-if="status === 'success'">
      <div v-if="data && data.payload.data.length > 0">
        <div class="md:card md:bg-base-300">
          <div class="md:card-body">
            <MealTable v-if="data" :meals="data.payload" limit="10"  />
          </div>
        </div>

        <Pagination v-if="data"
                    class="mt-6"
                    :data="data.payload"
                    :limit="10"
                    @change-page="handlePaginationChange"
        />
      </div>
      <div v-else>
        No data was found with the given filters
      </div>
    </div>
    <div v-else>
      <div v-if="status === 'pending'">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      <div v-if="status === 'error'">
        There was a problem fetching data
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>