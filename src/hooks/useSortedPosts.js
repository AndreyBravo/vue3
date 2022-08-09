import { computed, ref } from "vue";

export  function useSortedPosts(posts) {
  const selectedSort = ref("");

  const sortPosts = computed(() => {
    return [...posts.value].sort((a, b) =>
      a[selectedSort.value]?.localeCompare(b[selectedSort.value])
    );
  });

  return {
    sortPosts,
    selectedSort,
  };
}
