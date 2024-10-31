import { computed, watch } from "vue";

export const useCurrentPage = () => {
  const route = useRoute();
  const currentPage = useState('current-page');

  const updatePageName = () => {
    currentPage.value = route.meta.title || 'Home';
  }

  // Initialize page name
  updatePageName();

  // Watch for route changes
  watch(() => route.path, updatePageName);

  return { currentPage };
}