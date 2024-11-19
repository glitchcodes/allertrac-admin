<script setup lang="ts">
  const { logout } = useSanctumAuth();

  definePageMeta({
    title: 'Logout',
    layout: 'auth',
    middleware: ['sanctum:auth']
  })

  onMounted(async () => {
    await logout()
  })
</script>

<template>
  <div class="auth-container">
    <div class="card bg-base-200 w-96 shadow-xl">
      <div class="card-body">
        <h2 class="text-xl font-bold mb-2">
          AllerTrac - Logout
        </h2>

        <p>Please wait while we log you out securely...</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>