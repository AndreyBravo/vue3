<template>
  <div>
    <h1>Site at posts</h1>
    <my-input
      :model-value="searchQuery"
      @update:model-value="changeSearchQuery"
      placeholder="Search..."
    />
    <div class="app__btns">
      <my-button @click="showDialog">Add post</my-button>
      <my-select
        :options="sortOptions"
        :model-value="selectedSort"
        @update:model-value="selectedSorted"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="submit" />
    </my-dialog>
    <post-list
      v-if="!isPostsLoading"
      @remove="removePost"
      :posts="sortedAndSearchedPosts"
    />
    <h1 v-else>Loading posts...</h1>
    <!-- <pagination @change-page="changePage" :page="page" :totalPage="totalPage" /> -->
    <div v-intersection='loadMorePosts' class="observer"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import Pagination from "@/components/Pagination.vue";

import { mapGetters, mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters({
      posts: "getPosts",
      sortedAndSearchedPosts: "sortedAndSearchedPosts",
      sortOptions: "getSortOptions",
      isPostsLoading: "getIsPostsLoading",
      searchQuery:'getSearchQuery',
      selectedSort:'getSelectedSort',
    }),
  },
  methods: {
    ...mapActions({
      loadMorePosts: "GET_MOREPOSTS",
      fetchPosts: "GET_POSTS",
    }),
    ...mapMutations({
      deletePost: "SET_POSTS",
      selectedSorted: "SET_SELETEDSORTD",
      changeSearchQuery: "SET_SEARCHQUERY",
    }),
    submit(title, description) {
      this.posts.push({
        id: Date.now(),
        title: title,
        body: description,
      });
      this.title = "";
      this.description = "";
      this.dialogVisible = false;
    },
    removePost(post) {
      this.deletePost(this.posts.filter((item) => item.id !== post.id));
    },
    showDialog() {
      this.dialogVisible = true;
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    // page() {
    //   this.fetchPosts();
    // }
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
