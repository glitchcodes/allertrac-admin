<script setup lang="ts">

</script>

<template>
  <div class="overflow-x-auto">
    <table class="table">
      <!-- head -->
      <thead>
      <tr>
        <th>Name</th>
        <th class="hidden md:table-cell">Allergens</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <!-- row 1 -->
      <tr class="hover">
        <td>Cy Ganderton</td>
        <td class="hidden md:table-cell">Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr class="hover">
        <td>Hart Hagerty</td>
        <td class="hidden md:table-cell">Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr class="hover">
        <td>Brice Swyre</td>
        <td class="hidden md:table-cell">Tax Accountant</td>
        <td>Red</td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="join mt-4">
    <button class="join-item btn">1</button>
    <button class="join-item btn btn-active">2</button>
    <button class="join-item btn">3</button>
    <button class="join-item btn">4</button>
  </div>
  <!-- END Pagination -->
</template>

<style scoped>

</style>