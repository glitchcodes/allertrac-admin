<script setup lang="ts">
  import { EnvelopeIcon, KeyIcon } from "@heroicons/vue/24/solid";
  import { FetchError } from "ofetch";

  const { login } = useSanctumAuth()
  const { $toast } = useNuxtApp();

  definePageMeta({
    title: 'Reset Password',
    layout: "auth",
    middleware: ['sanctum:guest']
  });

  const route = useRoute();
  const router = useRouter();

  const token = route.query.t;

  const isSubmitting = ref(false);
  const isValidating = ref(false);

  onMounted(async () => {
    if (!token) {
      await router.replace({ path: '/login' });
    }

    isValidating.value = true;

    const { data, error } = useFetch(`/api/auth/verify-ticket/${ token }`, {
      method: 'GET'
    });

    if (data.value) {
      isValidating.value = false;
    }

    if (error.value) {
      console.error(error);
      await navigateTo('/login')
    }
  })

  const form = reactive({
    password: '',
    password_confirmation: ''
  });

  const inputErrors = ref<any>({});

  const clearErrors = () => {
    inputErrors.value = {};
  }

  const handleSubmitForm = async () => {
    // Show loading indicator
    isSubmitting.value = true;

    // Clear errors
    clearErrors();

    const formData = new FormData();
    formData.append('_method', 'PATCH')
    formData.append('token', token as string);
    formData.append('password', form.password);
    formData.append('password_confirmation', form.password_confirmation);

    const { data, error } = await useFetch('/api/auth/reset-password', {
      method: 'PATCH',
      body: formData
    });

    if (data.value) {
      $toast.success('Password reset successful. Please login again', {
        position: $toast.POSITION.BOTTOM_CENTER
      });

      await navigateTo('/login');
    }

    if (error.value) {
      const errorResponse = error.value.data.data;

      $toast.error(errorResponse.message, {
        position: $toast.POSITION.BOTTOM_CENTER
      })
    }

    isSubmitting.value = false;
  }
</script>

<template>
  <div class="auth-container">
    <div class="card bg-[#ecf2f3] md:w-96 shadow-xl">
      <div class="card-body">
        <h2 class="text-2xl font-bold text-center">
          Reset Password
        </h2>
        <form class="flex flex-col gap-4 mt-4" @submit.prevent="handleSubmitForm">
          <div>
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.password }">
              <KeyIcon class="size-4" />
              <input v-model="form.password" type="password" class="grow" placeholder="Password" />
            </label>
          </div>

          <div>
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.password }">
              <KeyIcon class="size-4" />
              <input v-model="form.password_confirmation" type="password" class="grow" placeholder="Confirm Password" />
            </label>
          </div>

          <ul v-if="inputErrors.password && inputErrors.password.length > 0" class="mt-2">
            <li v-for="error in inputErrors.password" class="text-sm text-red-600 dark:text-red-500">
              {{ error }}
            </li>
          </ul>

          <div class="card-actions justify-center">
            <button v-if="!isSubmitting" type="submit" class="btn btn-primary btn-wide rounded-full">
              Submit
            </button>
            <button v-else class="btn btn-primary btn-wide rounded-full" disabled>
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