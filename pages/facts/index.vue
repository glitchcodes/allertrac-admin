<script setup lang="ts">
  import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
  import type { FactCategory, FactCollection } from "~/types/Fact";
  import type { Response } from "~/types/Response";

  definePageMeta({
    title: 'Facts Database',
    middleware: ['sanctum:auth']
  });

  onMounted(async () => {
    await nextTick();
    await fetchCategories();
  })

  const currentPage = ref(1);
  const selectedCategory = ref('all');
  const searchQuery = ref('');

  const url = computed(() => {
    let endpoint = `/api/facts?page=${currentPage.value}`;

    if (selectedCategory.value !== 'all') {
      endpoint = endpoint + `&category=${selectedCategory.value}`
    }

    if (searchQuery.value.length > 0) {
      endpoint = endpoint + `&query=${searchQuery.value}`
    }

    return endpoint
  })

  const { data, status, error, refresh } = await useLazyFetch<Response<FactCollection>>(url, {
    pick: ['payload']
  });

  const handlePaginationChange = (e: number) => {
    currentPage.value = e;
  }

  const handleQueryChange = useDebounceFn((e) => {
    searchQuery.value = e.target.value
  }, 1500);

  // Get fact categories
  type FactCategoryResponse<T> = {
    categories: T
  }

  const isFetchingCategories = ref<boolean>(false);
  const categories = ref<FactCategory[]>([]);

  const fetchCategories = async () => {
    try {
      isFetchingCategories.value = true;

      const { data, status, error } = await useFetch<FactCategoryResponse<FactCategory[]>>('/api/facts/categories', {
        pick: ['categories']
      });

      if (data.value) {
        categories.value = data.value.categories
      }
    } catch (e) {
      console.error(e)
    } finally {
      isFetchingCategories.value = false;
    }
  }
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
                Category
              </span>
            </div>

            <span v-if="isFetchingCategories" class="loading loading-spinner loading-lg"></span>

            <select v-else v-model="selectedCategory" :disabled="status !== 'success'" class="select select-bordered">
              <option value="all">
                All
              </option>
              <option v-for="category in categories" :value="category.id">
                {{ category.name }}
              </option>
            </select>

          </label>
        </div>
      </details>

    </div>
    <div v-if="status === 'success'">
      <div v-if="data && data.payload.data.length > 0">
        <div class="md:card md:bg-base-300">
          <div class="md:card-body">
            <FactsTable v-if="data" :facts="data.payload" limit="10"  />
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