<script setup lang="ts">
import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/24/solid";
import type {Fact, FactCollection} from "~/types/Fact";
import {useModal} from "vue-final-modal";
import {ModalDeleteFact} from "#components";

const emit = defineEmits<{
  (e: 'deleteFact', fact: Fact): void
}>()

defineProps<{
  facts: Fact[]
}>();

// Modals
const openDeleteModal = (fact: Fact) => {
  const modal = useModal({
    component: ModalDeleteFact,
    attrs: {
      fact: fact,
      onDelete(fact: Fact) {
        // Remove fact from table
        emit('deleteFact', fact)

        // Close Modal
        modal.close()
      },
      onClose() {
        modal.close();
      }
    }
  })

  modal.open();
}
</script>

<template>
  <div class="overflow-x-auto">
    <table class="table table-sm md:table-md table-auto">
      <!-- head -->
      <thead>
      <tr>
        <th>Name</th>
        <th class="hidden md:table-cell">Brief Description</th>
        <th>Category</th>
        <th>Author</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="fact in facts" class="hover">
        <td>
          {{ fact.title }}
        </td>
        <td class="hidden md:table-cell">
          {{ fact.brief_description }}
        </td>
        <td>
          {{ fact.category }}
        </td>
        <td>
          {{ fact.author.full_name }}
        </td>
        <td class="flex gap-2">
          <NuxtLink :to="`/facts/${ fact.id }`" class="btn btn-accent btn-sm">
            <PencilSquareIcon class="size-5"/>
          </NuxtLink>
          <button class="btn btn-error btn-sm" @click="openDeleteModal(fact)">
            <TrashIcon class="size-5" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->

  <!-- END Pagination -->
</template>

<style scoped>

</style>