<script setup lang="ts">
  import { EnvelopeIcon, ArrowLeftIcon } from "@heroicons/vue/24/solid";
  import VOtpInput from "vue3-otp-input"

  definePageMeta({
    title: 'OTP Verification',
    layout: "auth",
    middleware: ['sanctum:guest']
  });

  const { $toast } = useNuxtApp();
  const route = useRoute();
  const router = useRouter();

  // Check if an identifier exists on the query params
  // If not, redirect to login page
  onBeforeMount(async () => {
    if (!route.query.i) {
      await router.push('/login');
    }
  });

  const identifier = computed(() => {
    const encoded = route.query.i as string;

    if (!encoded) {
      return { prefix: '', type: '', id: '', full_identifier: '' }
    }

    const decoded = atob(encoded);

    const i = decoded.split(':')

    return {
      prefix: i[0],
      type: i[1],
      id: i[2],
      full_identifier: decoded
    }
  })

  const isSubmitting = ref(false);
  const isResending = ref(false);
  const resendTimer = ref<number>(0);

  const otpInput = ref<InstanceType<typeof VOtpInput> | null>(null);
  const otp = ref("");

  const handleResendCode = async () => {
    isResending.value = true;

    const formData = new FormData();
    formData.append('identifier', identifier.value.full_identifier);

    const { data, error } = await useFetch('/api/auth/resend-otp', {
      method: 'POST',
      body: formData
    });

    if (data.value) {
      resendTimer.value = 30;

      const countdown = setInterval(() => {
        resendTimer.value--;
        if (resendTimer.value === 0) {
          clearInterval(countdown);
        }
      }, 1000);

      $toast.success('OTP code sent', {
        position: $toast.POSITION.BOTTOM_CENTER
      })
    }

    if (error.value) {
      const statusCode = error.value.statusCode;

      if (statusCode === 429) {
        $toast.error('Please wait for the timer before you can resend your verification code', {
          position: $toast.POSITION.BOTTOM_CENTER
        })
      } else {
        console.error(error);

        $toast.error('Something went wrong while trying to resend your verification code', {
          position: $toast.POSITION.BOTTOM_CENTER
        })
      }
    }

    isResending.value = false;
  }

  const handleSubmitForm = async () => {
    isSubmitting.value = true;

    const formData = new FormData();
    formData.append('_method', 'PATCH')
    formData.append('identifier', identifier.value.full_identifier)
    formData.append('code', otp.value);

    const { data, error } = await useFetch<{ ticket: string }>('/api/auth/verify-otp', {
      method: 'PATCH',
      body: formData
    })

    if (data.value) {
      // Redirect to reset password
      await navigateTo({ path: '/reset-password', query: { t: data.value.ticket } })
    }

    if (error.value) {
      const errorResponse = error.value.data.data;

      $toast.error(errorResponse.message, {
        position: $toast.POSITION.BOTTOM_CENTER
      });
    }

    isSubmitting.value = false;
  }
</script>

<template>
  <div class="auth-container">
    <div class="card bg-[#ecf2f3] w-96 shadow-xl">
      <div class="card-body gap-4">
        <h2 class="text-2xl font-bold">
          OTP Verification
        </h2>

        <p>We've sent you a verification code to your email.</p>

        <form class="flex flex-col gap-4" @submit.prevent="handleSubmitForm">

          <div class="contain-content">
            <v-otp-input ref="otpInput"
                         input-classes="w-100 h-14 mx-2 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-slate-400 hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                         input-type="number"
                         :num-inputs="4"
                         v-model:value="otp">
            </v-otp-input>
          </div>

          <div class="flex gap-1 justify-center items-center">
            <p class="w-full">Didn't receive a code?</p>
            <p :class="{ 'text-gray-500': isResending || resendTimer > 0, 'text-primary': !isResending && resendTimer === 0 }"
               class="font-bold hover:underline cursor-pointer"
               @click.prevent="handleResendCode" v-if="resendTimer === 0">
              Resend
            </p>
            <p v-else class="text-gray-500 font-bold">{{ resendTimer }}s</p>
            <span v-if="isResending" class="loading loading-spinner loading-md"></span>
          </div>

          <div class="card-actions justify-center mt-4">
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