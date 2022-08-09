import { ref,computed } from "vue";

export  function useSortedAndSearchedPosts(sorted) {
  const searchQuery = ref("");

  const sortedAndSearchedPosts = computed(() => {
    return sorted.value.filter((post) => post.title?.includes(searchQuery.value));
  });

  return {
    sortedAndSearchedPosts,
    searchQuery,
  };
}
