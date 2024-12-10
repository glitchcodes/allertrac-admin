<script setup lang="ts">
  import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
  import type { Response } from "~/types/Response"
  import type { MealCollection } from "~/types/Meal"

  definePageMeta({
    title: 'Food Database',
    middleware: ['sanctum:auth']
  });

  const currentPage = ref(1);
  const selectedFilter = ref('all');
  const searchQuery = ref('');

  const url = computed(() => {
    let endpoint = `/api/meals?page=${currentPage.value}`;

    if (selectedFilter.value !== 'all') {
      endpoint = endpoint + `&filter=${selectedFilter.value}`
    }

    if (searchQuery.value.length > 0) {
      endpoint = endpoint + `&query=${searchQuery.value}`
    }

    return endpoint
  })

  const { data, status, error, refresh } = await useLazyFetch<Response<MealCollection>>(url, {
    pick: ['payload']
  });

  const handlePaginationChange = (e: number) => {
    currentPage.value = e;
  }

  const handleQueryChange = useDebounceFn((e) => {
    searchQuery.value = e.target.value
  }, 1500);

</script>

<template>
  <div>
    <div class="flex gap-3 mb-5">
      <label class="input input-bordered flex items-center w-full md:w-auto gap-2">
        <input type="text" class="grow" placeholder="Search" :value="searchQuery" @input="handleQueryChange" />
        <MagnifyingGlassIcon class="size-4" />
      </label>

      <details class="dropdown dropdown-end">
        <summary class="btn">
          <AdjustmentsHorizontalIcon class="size-5" />
        </summary>
        <div class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 mt-3 p-4 pt-2 shadow border border-base-200">
          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">
                Filter
              </span>
            </div>
            <select v-model="selectedFilter" :disabled="status !== 'success'" class="select select-bordered">
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
          </label>
        </div>
      </details>

    </div>
    <div v-if="status === 'success'">
      <div v-if="data && data.payload.data.length > 0">
        <MealTable v-if="data" :meals="data.payload" limit="10"  />

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