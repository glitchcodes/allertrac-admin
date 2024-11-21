<script setup lang="ts">
  import { AdjustmentsHorizontalIcon, MagnifyingGlassIcon } from "@heroicons/vue/24/solid";
  import type { Fact, FactCategory, FactCollection } from "~/types/Fact";
  import type { Response } from "~/types/Response";

  definePageMeta({
    title: 'Facts Database',
    middleware: ['sanctum:auth']
  });

  const isFetching = ref(false);
  const hasFetchErrors = ref(false);

  const currentPage = ref(1);
  const selectedCategory = ref('all');
  const searchQuery = ref('');

  const facts = ref<Fact[]>([]);
  const pagination = ref();

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

  const fetchFacts = async () => {
    try {
      isFetching.value = true;

      const { data } = await useAsyncData<Response<FactCollection>>(() => $fetch(url.value), {
        server: false
      });

      if (data.value) {
        facts.value = data.value.payload.data;
        pagination.value = data.value.payload;
      }
    } catch (e) {
      console.error(e);

      hasFetchErrors.value = true;
    } finally {
      isFetching.value = false;
    }
  }

  watch(selectedCategory, async () => {
    await fetchFacts();
  })

  const handlePaginationChange = async (e: number) => {
    currentPage.value = e;

    await fetchFacts();
  }

  const handleQueryChange = useDebounceFn(async (e) => {
    searchQuery.value = e.target.value

    await fetchFacts()
  }, 1500);

  onMounted(async () => {
    await nextTick();
    await fetchFacts();
    await fetchCategories();
  })

  // Get fact categories
  type FactCategoryResponse<T> = {
    categories: T
  }

  const isFetchingCategories = ref<boolean>(false);
  const categories = ref<FactCategory[]>([]);

  const fetchCategories = async () => {
    try {
      isFetchingCategories.value = true;

      const { data } = await useFetch<FactCategoryResponse<FactCategory[]>>('/api/facts/categories', {
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

  // Delete Fact
  const handleDeleteFact = (e: Fact) => {
    facts.value = facts.value.filter((i) => i.id !== e.id)
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

            <select v-else v-model="selectedCategory" :disabled="isFetching && !hasFetchErrors" class="select select-bordered">
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

      <NuxtLink to="/facts/new" class="btn btn-primary ml-auto">
        New Fact
      </NuxtLink>
    </div>
    <div v-if="!isFetching && !hasFetchErrors">
      <div v-if="facts && facts.length > 0">
        <div class="md:card md:bg-base-300">
          <div class="md:card-body">
            <FactsTable v-if="facts" :facts="facts" limit="10" @delete-fact="handleDeleteFact"  />
          </div>
        </div>

        <Pagination v-if="facts"
                    class="mt-6"
                    :data="pagination"
                    :limit="10"
                    @change-page="handlePaginationChange"
        />
      </div>
      <div v-if="!isFetching && hasFetchErrors">
        No data was found with the given filters
      </div>
    </div>
    <div v-else>
      <div v-if="isFetching">
        <span class="loading loading-spinner loading-lg"></span>
      </div>
      <div v-if="!isFetching && hasFetchErrors">
        There was a problem fetching data
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>