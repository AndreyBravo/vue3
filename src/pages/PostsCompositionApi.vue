<template>
  <div>
    <h1>Site at posts</h1>
    <my-input v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Add post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form />
    </my-dialog>
    <post-list v-if="!isPostsLoading" :posts="sortedAndSearchedPosts" />
    <h1 v-else>Loading posts...</h1>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import Pagination from "@/components/Pagination.vue";

import { usePosts, useSortedPosts, useSortedAndSearchedPosts } from "@/hooks";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "On name" },
        { value: "body", name: "On description" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPage, isPostsLoading } = usePosts(10);
    const { sortPosts, selectedSort } = useSortedPosts(posts);
    const { sortedAndSearchedPosts, searchQuery } =
      useSortedAndSearchedPosts(sortPosts);

    return {
      posts,
      totalPage,
      isPostsLoading,
      sortPosts,
      selectedSort,
      sortedAndSearchedPosts,
      searchQuery,
    };
  },
};
</script>
<style>
.app__btns {
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
}

.observer {
  height: 30px;
  border: 1px solid teal;
}
</style>
