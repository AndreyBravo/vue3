import { onMounted,ref } from "vue";
import axios from "axios";

export  function usePosts(limitPage) {
  const posts = ref([]);
  const totalPage = ref(0);
  const isPostsLoading = ref(false);

  const fething = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: {
            _page: 1,
            _limit: limitPage,
          },
        }
      );

      totalPage.value = Math.ceil(
        response.headers["x-total-count"] / limitPage
      );

      posts.value = response.data;
    } catch (error) {
      console.log(error.message);
    } finally {
      isPostsLoading.value = false;
    }
  };

  onMounted(fething);
  return {
    posts,
    totalPage,
    isPostsLoading,
  };
}
