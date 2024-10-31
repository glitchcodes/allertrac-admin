import { computed, watch } from "vue";

export const useCurrentPage = () => {
  const router = useRouter();
  const pageName = useState('current-page');

  // Format the page name
  // Remove dashes and capitalize
  const currentPage = computed(() =>
    (pageName.value as string)
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  )

  const updatePageName = () => {
    pageName.value = router.currentRoute.value.name || 'Home';
  }

  // Initialize page name
  updatePageName();

  // Watch for route changes
  watch(router.currentRoute, updatePageName);

  return { currentPage };
}