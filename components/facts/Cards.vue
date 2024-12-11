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
  <section class="grid grid-cols-4 gap-4">
    <div v-for="fact in facts" class="card bg-primary text-white shadow-xl">
      <figure v-if="fact.cover_image"
              class="bg-cover h-60"
              :style="{
                backgroundImage: `url(${fact.cover_image})`
              }" />
      <div class="card-body">
        <h2 class="card-title">
          {{ fact.title }}
        </h2>
        <p>
          {{ fact.brief_description }}
        </p>

        <div class="card-actions mt-4">
          <div class="badge text-nowrap" :class="{ 'badge-info': fact.is_published, 'badge-warning': !fact.is_published }">
            {{ fact.is_published ? 'Published' : 'Not published' }}
          </div>
        </div>

        <div class="card-actions mt-2">
          <NuxtLink :to="`/facts/${ fact.id }`" class="btn btn-accent btn-sm">
            <PencilSquareIcon class="size-5"/>
          </NuxtLink>
          <button class="btn btn-error btn-sm" @click="openDeleteModal(fact)">
            <TrashIcon class="size-5" />
          </button>
        </div>
      </div>
    </div>
  </section>

            <!--  <div class="overflow-x-auto">-->
<!--    <table class="table table-sm md:table-md table-auto">-->
<!--      &lt;!&ndash; head &ndash;&gt;-->
<!--      <thead>-->
<!--      <tr>-->
<!--        <th>Name</th>-->
<!--        <th class="hidden md:table-cell">Brief Description</th>-->
<!--        <th>Category</th>-->
<!--        <th>Author</th>-->
<!--        <th>Status</th>-->
<!--        <th></th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="fact in facts" class="hover">-->
<!--        <td>-->
<!--          {{ fact.title }}-->
<!--        </td>-->
<!--        <td class="hidden md:table-cell">-->
<!--          {{ fact.brief_description }}-->
<!--        </td>-->
<!--        <td>-->
<!--          {{ fact.category }}-->
<!--        </td>-->
<!--        <td>-->
<!--          {{ fact.author.full_name }}-->
<!--        </td>-->
<!--        <td>-->
<!--          <div class="badge text-nowrap" :class="{ 'badge-success': fact.is_published, 'badge-warning': !fact.is_published }">-->
<!--            {{ fact.is_published ? 'Published' : 'Not published' }}-->
<!--          </div>-->
<!--        </td>-->
<!--        <td class="actions flex gap-2">-->
<!--          <NuxtLink :to="`/facts/${ fact.id }`" class="btn btn-accent btn-sm">-->
<!--            <PencilSquareIcon class="size-5"/>-->
<!--          </NuxtLink>-->
<!--          <button class="btn btn-error btn-sm" @click="openDeleteModal(fact)">-->
<!--            <TrashIcon class="size-5" />-->
<!--          </button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->

  <!-- Pagination -->

  <!-- END Pagination -->
</template>

<style scoped>
  .badge.badge-success, .actions a, .actions button {
    color: white;
  }
  figure {

  }
</style>