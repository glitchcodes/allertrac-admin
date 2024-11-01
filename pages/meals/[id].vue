<script setup lang="ts">
  import { CheckCircleIcon } from "@heroicons/vue/24/solid";
  import type { Response } from "~/types/Response";
  import type { Meal } from "~/types/Meal";
  import type { Allergen } from "~/types/Allergen";

  definePageMeta({
    title: 'Meal'
  });

  const route = useRoute();

  const allergens = ref<Allergen[]>([]);
  const selectedAllergens = ref<Allergen[]>([]);

  const isFetchingAllergens = ref(true);
  const isSubmittingForm = ref(false);

  const showSuccessToast = ref(false);

  const { data: meal, status, error } = await useLazyFetch<Response<Meal>>(`/api/meals/${route.params.id}`);

  const fetchAllergens = async () => {
    try {
      const { data } = await useFetch<{ allergens: Allergen[] }>('/api/allergens');

      if (data.value) {
        // Populate selected allergens
        selectedAllergens.value = meal.value!.payload.allergens

        // Populate available allergens
        allergens.value = data.value.allergens
      }
    } catch (error) {
      console.error(error)
    } finally {
      isFetchingAllergens.value = false
    }
  }

  onMounted(async () => {
    if (import.meta.client) {
      await fetchAllergens()
    }
  });

  const submitForm = async () => {
    const form = new FormData();

    selectedAllergens.value.forEach((allergen) => {
      form.append('allergens[]', (allergen.id as unknown as string)); // ????
    });

    try {
      isSubmittingForm.value = true;

      const { data } = await useFetch(`/api/meals/${route.params.id}`, {
        method: 'POST',
        body: form
      });

      if (data.value) {
        // Show success toast
        showSuccessToast.value = true;

        // Dismiss toast after 5 seconds
        setTimeout(() => {
          showSuccessToast.value = false;
        }, 5000)
      }

    } catch (error) {
      console.error(error)
    } finally {
      isSubmittingForm.value = false;
    }
  }

</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-3/12 card bg-base-200">
      <div v-if="status === 'success'" class="card-body">
        <h1 class="text-2xl font-bold mb-3">
          {{ meal?.payload.name }}
        </h1>

        <div v-if="showSuccessToast" role="alert" class="alert alert-success mb-3">
          <CheckCircleIcon class="size-6" />
          <span>Updated successfully</span>
        </div>

        <form v-if="!isFetchingAllergens">
          <h5 class="font-bold">
            Allergens:
          </h5>

          <div v-for="allergen in allergens" class="form-control">
            <label class="label cursor-pointer">
            <span class="label-text">
              {{ allergen.name }}
            </span>
            <input type="checkbox" class="checkbox" v-model="selectedAllergens" :value="allergen" />
            </label>
          </div>
        </form>

        <button v-if="!isSubmittingForm" class="btn btn-primary" @click="submitForm">
          <span>Submit</span>
        </button>

        <button v-else class="btn btn-primary" disabled>
          <span class="loading loading-spinner loading-md"></span>
          <span>Submitting...</span>
        </button>
      </div>

      <div v-else class="card-body">
        <div v-if="status === 'pending'">
          <span class="loading loading-spinner loading-lg"></span>
        </div>
        <div v-if="status === 'error'">
          There was a problem fetching data
        </div>
      </div>
    </div>
    <div class="flex-1">

    </div>

  </div>
</template>

<style scoped>

</style>