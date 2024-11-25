<script setup lang="ts">
  import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";
  import {FetchError} from "ofetch";

  definePageMeta({
    title: 'Forget Password',
    layout: "auth",
    middleware: ['sanctum:guest']
  });

  const { $toast } = useNuxtApp();
  const router = useRouter();

  const isSubmitting = ref(false);

  const form = reactive({
    email: '',
  });

  const inputErrors = ref<any>({});

  const clearErrors = () => {
    inputErrors.value = {};
  }

  const handleSubmitForm = async () => {
    isSubmitting.value = true;

    const formData = new FormData();
    formData.append('email', form.email);

    const { data, error } = await useFetch<{ identifier: string }>('/api/auth/forget-password', {
      method: 'POST',
      body: formData
    });

    if (data.value) {
      // Redirect to OTP page
      await navigateTo({ path: '/verify-otp', query: { i: data.value.identifier } })
    }

    if (error.value) {
      const errorResponse = error.value.data.data;
      const errorCode = errorResponse.code;

      switch (errorCode) {
        case "INPUT_INVALID":
          const errors = errorResponse.errors;

          inputErrors.value = errors;

          $toast.error(errorResponse.message, {
            position: $toast.POSITION.BOTTOM_CENTER
          });
          break;
      }
    }

    isSubmitting.value = false;
  }
</script>

<template>
  <div class="auth-container">
    <div class="card bg-base-200 w-96 shadow-xl">
      <div class="card-body gap-4">
        <NuxtLink to="/login" class="flex items-center gap-2">
          <ArrowLeftIcon class="size-5" />
          <span>Go back to login page</span>
        </NuxtLink>

        <h2 class="text-xl font-bold">
          AllerTrac - Forget Password
        </h2>

        <form class="flex flex-col gap-4" @submit.prevent="handleSubmitForm">
          <div>
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.email }">
              <EnvelopeIcon class="size-4" />
              <input v-model="form.email" type="email" class="grow" placeholder="Email" autocomplete="off" />
            </label>
            <ul v-if="inputErrors.email && inputErrors.email.length > 0" class="mt-2">
              <li v-for="error in inputErrors.email" class="text-sm text-red-600 dark:text-red-500">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="card-actions justify-end mt-4">
            <button v-if="!isSubmitting" type="submit" class="btn btn-primary">
              Submit
            </button>
            <button v-else class="btn btn-primary" disabled>
              <span class="loading loading-spinner loading-md"></span>
            </button>
          </div>
        </form>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>