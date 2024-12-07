<script setup lang="ts">
  import { BookOpenIcon, TagIcon, ChatBubbleBottomCenterIcon } from "@heroicons/vue/24/solid";
  import { QuillEditor } from '@vueup/vue-quill'
  import { FetchError } from "ofetch";
  import type { Fact, FactCategory } from "~/types/Fact";

  definePageMeta({
    title: 'Edit Fact',
    middleware: ['sanctum:auth']
  });

  const { $toast } = useNuxtApp();
  const route = useRoute();

  // Fact Response
  type FactResponse<T> ={
    fact: T
  }

  const isFetching = ref<boolean>(false);
  const fact = ref<Fact>(<Fact>{});

  const fetchFact = async () => {
    try {
      isFetching.value = true;

      const { data } = await useFetch<FactResponse<Fact>>(`/api/facts/${route.params.id}`);

      if (data.value) {
        fact.value = data.value.fact
      }
    } catch (e) {
      console.error(e)
    } finally {
      isFetching.value = false;
    }
  }

  onMounted(async () => {
    if (import.meta.client) {
      await fetchFact()
    }
  });

  await fetchFact();

  // Get fact categories
  type FactCategoryResponse<T> = {
    categories: T
  }

  const isFetchingCategories = ref<boolean>(false);
  const categories = ref<FactCategory[]>([]);

  const fetchCategories = async () => {
    try {
      isFetchingCategories.value = true;

      const { data } = await useAsyncData<FactCategoryResponse<FactCategory[]>>('', () => $fetch('/api/facts/categories'));

      if (data.value) {
        categories.value = data.value.categories
      }
    } catch (e) {
      console.error(e)
    } finally {
      isFetchingCategories.value = false;
    }
  }

  onMounted(async () => {
    await nextTick();
    await fetchCategories()
  })

  const isSubmittingForm = ref<boolean>(false);
  const isPublishing = ref<boolean>(false);

  const form = reactive({
    title: fact.value.title || '',
    brief_description: fact.value.brief_description || '',
    category: fact.value.category_id || '',
    cover_image: [] as File[],
    description: fact.value.description || '',
    is_published: fact.value.is_published || false
  });

  // Cover Image URL
  const imageURL = ref<string>(fact.value.cover_image || '');

  const inputErrors = ref<any>({
    cover_image: []
  })

  // Update is_published status whenever the toggle is clicked
  watch(() => form.is_published, async () => {
    if (isPublishing.value) return;

    await handleUpdatePublishStatus();
  })

  const handleSubmitForm = async () => {
    const formData = new FormData();
    formData.append('_method', 'PATCH')
    formData.append('title', form.title)
    formData.append('brief_description', form.brief_description)
    formData.append('category_id', form.category)
    formData.append('description', form.description)

    if (form.cover_image.length > 0) {
      formData.append('cover_image', form.cover_image[0])
    }

    try {
      const { data } = await useFetch(`/api/facts/${route.params.id}`, {
        method: 'PATCH',
        body: formData
      });

      if (data.value) {
        $toast.success("Fact edited", {
          position: $toast.POSITION.BOTTOM_CENTER
        });
      }
    } catch (e) {
      if (e instanceof FetchError) {
        console.error(e);
      }
    }
  }

  const handleUpdatePublishStatus = async () => {
    try {
      isPublishing.value = true;

      const { data } = await useFetch(`/api/facts/${route.params.id}/publish`, {
        method: 'PATCH',
        body: {
          is_published: form.is_published
        }
      });

      if (data.value) {
        fact.value.is_published = data.value.fact.is_published
      }
    } catch (e) {
      if (e instanceof FetchError) {
        console.error(e);
      }
    } finally {
      isPublishing.value = false;
    }
  }

  const handleImageUpload = async (files: FileList) => {
    // Create fake url for image preview
    imageURL.value = URL.createObjectURL(files[0]);

    // Push the file into the form
    form.cover_image = [files[0]];
  }
</script>

<template>
  <section>
    <span v-if="isFetching" class="loading loading-spinner loading-lg" />

    <div v-else class="flex flex-col md:flex-row gap-4">
      <div class="w-full card bg-base-200">
        <div class="card-body gap-6">

          <div class="flex items-center">
            <h1 class="text-2xl font-bold flex-1">
              Edit Fact
            </h1>

            <button v-if="!isSubmittingForm" class="btn btn-primary" @click="handleSubmitForm">
              <span>Submit</span>
            </button>
            <button v-else class="btn btn-primary" disabled>
              <span class="loading loading-spinner loading-md"></span>
              <span>Submitting...</span>
            </button>
          </div>

          <form class="flex flex-col gap-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.title }">
                  <BookOpenIcon class="size-4" />
                  <input v-model="form.title" type="text" class="grow" placeholder="Title" />
                </label>
                <ul v-if="inputErrors.title && inputErrors.title.length > 0" class="mt-2">
                  <li v-for="error in inputErrors.title" class="text-sm text-red-600 dark:text-red-500">
                    {{ error }}
                  </li>
                </ul>
              </div>

              <div class="relative">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4">
                <TagIcon class="size-4" />
              </span>
                <select v-model="form.category" class="select select-bordered pl-10 w-full">
                  <option value="" selected disabled>
                    Select Category
                  </option>
                  <option v-for="category in categories" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label class="input input-bordered flex items-center gap-2" :class="{ 'input-error': inputErrors.brief_description }">
                <ChatBubbleBottomCenterIcon class="size-4" />
                <input v-model="form.brief_description" type="text" class="grow" placeholder="Brief Description" />
              </label>
              <ul v-if="inputErrors.brief_description && inputErrors.brief_description.length > 0" class="mt-2">
                <li v-for="error in inputErrors.brief_description" class="text-sm text-red-600 dark:text-red-500">
                  {{ error }}
                </li>
              </ul>
            </div>

            <div>
              <h1 class="text-lg font-bold mb-4">
                Cover Image
              </h1>

              <LazyUploadBox :errors="inputErrors.cover_image" @input-changed="inputErrors.cover_image = []" @image-uploaded="handleImageUpload" />
            </div>

            <div>
              <h1 class="text-lg font-bold mb-4">
                Content
              </h1>

              <div class="flex flex-col rounded-lg">
                <client-only>
                  <QuillEditor v-model:content="form.description" content-type="html" theme="snow" style="height: 250px" />
                </client-only>
              </div>
            </div>

          </form>

        </div>
      </div>
      <div class="w-full card bg-base-200">
        <div class="card-body gap-6">

          <div class="flex items-center">
            <h1 class="text-2xl font-bold flex-1">
              Preview
            </h1>
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text mr-4">
                  {{ fact.is_published ? 'Published' : 'Not published' }}
                </span>
                <input v-model="form.is_published" type="checkbox" class="toggle" :class="{ 'toggle-success': fact.is_published }" :disabled="isPublishing" :checked="form.is_published" />
              </label>
            </div>
          </div>

          <div class="card bg-base-100">
            <figure v-if="imageURL.length > 0">
              <img
                  :src="imageURL"
                  alt="Cover Image" />
            </figure>
            <div class="card-body gap-4">
              <h1 class="text-2xl font-bold">
                {{ form.title || 'Title' }}
              </h1>
              <div v-html="form.description"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>