<script setup lang="ts">
  import { EnvelopeIcon, KeyIcon } from "@heroicons/vue/24/solid";
  import { FetchError } from "ofetch";

  const { login } = useSanctumAuth()
  const { $toast } = useNuxtApp();


  definePageMeta({
    title: 'Login',
    layout: "auth",
    middleware: ['sanctum:guest']
  });

  const isSubmitting = ref(false);

  const form = reactive({
    email: '',
    password: ''
  });

  const inputErrors = ref<any>({});

  const clearErrors = () => {
    inputErrors.value = {};
  }

  const handleSubmitForm = async () => {
    try {
      // Show loading indicator
      isSubmitting.value = true;

      // Clear errors
      clearErrors();

      await login(form);
    } catch (error) {
      if (error instanceof FetchError && error.response !== undefined) {
        const errorCode = error.response._data.code;

        switch (errorCode) {
          case "INVALID_CREDENTIALS":
            $toast.error("Incorrect Email/Password", {
              position: $toast.POSITION.BOTTOM_CENTER
            });
            break;
          case "INPUT_INVALID":
            const errors = error.response._data.errors;

            inputErrors.value = errors;

            $toast.error(error.response._data.message, {
              position: $toast.POSITION.BOTTOM_CENTER
            });
            break;
        }
      }
    } finally {
      isSubmitting.value = false;
    }
  }
</script>

<template>
  <div class="auth-container">
    <div class="card bg-base-200 w-96 shadow-xl">
      <div class="card-body">
        <h2 class="text-xl font-bold">
          AllerTrac - Login
        </h2>
        <form class="flex flex-col gap-4 mt-4" @submit.prevent="handleSubmitForm">
          <div>
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.email }">
              <EnvelopeIcon class="size-4" />
              <input v-model="form.email" type="email" class="grow" placeholder="Email" />
            </label>
            <ul v-if="inputErrors.email && inputErrors.email.length > 0" class="mt-2">
              <li v-for="error in inputErrors.email" class="text-sm text-red-600 dark:text-red-500">
                {{ error }}
              </li>
            </ul>
          </div>

          <div>
            <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.password }">
              <KeyIcon class="size-4" />
              <input v-model="form.password" type="password" class="grow" placeholder="Password" />
            </label>
            <ul v-if="inputErrors.password && inputErrors.password.length > 0" class="mt-2">
              <li v-for="error in inputErrors.password" class="text-sm text-red-600 dark:text-red-500">
                {{ error }}
              </li>
            </ul>
          </div>

          <div class="card-actions justify-end">
            <button v-if="!isSubmitting" type="submit" class="btn btn-primary">
              Login
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