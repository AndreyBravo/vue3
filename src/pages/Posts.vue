<template>
  <div>
    <h1>Site at posts</h1>
    <my-input v-model="searchQuery" placeholder="Search..." />
    <div class="app__btns">
      <my-button @click="showDialog">Add post</my-button>
      <my-select :options="sortOptions" v-model="selectedSort" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create="submit" />
    </my-dialog>
    <post-list
      v-if="!isPostsLoading"
      @remove="removePost"
      :posts="posts"
    />
    <h1 v-else>Loading posts...</h1>
    <!-- <pagination @change-page="changePage" :page="page" :totalPage="totalPage" /> -->
    <div  ref="observer" class="observer"></div>
  </div>
</template>
<script>
import PostForm from "@/components/PostForm.vue";
import PostList from "@/components/PostList.vue";
import Pagination from "@/components/Pagination.vue";

import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    Pagination,
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      sortOptions: [
        { value: "title", name: "On name" },
        { value: "body", name: "On description" },
      ],
      searchQuery: "",
      page: 1,
      limitPage: 10,
      totalPage: 0,
    };
  },
  methods: {
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
      this.posts = this.posts.filter((item) => item.id !== post.id);
      this.posts.length;
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // async fetchPosts() {
    //   try {
    //     this.isPostsLoading = true;
    //     const response = await axios.get(
    //       "https://jsonplaceholder.typicode.com/posts",
    //       {
    //         params: {
    //           _page: this.page,
    //           _limit: this.limitPage,
    //         },
    //       }
    //     );
    //     this.totalPage = Math.ceil(
    //       response.headers["x-total-count"] / this.limitPage
    //     );
    //     this.posts = response.data;
    //   } catch (error) {
    //     alert(error.message);
    //   } finally {
    //     this.isPostsLoading = false;
    //   }
    // },

    async loadMorePosts() {
      try {
        this.isPostsLoading = true;
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.page,
              _limit: this.limitPage,
            },
          }
        );
        this.totalPage = Math.ceil(
          response.headers["x-total-count"] / this.limitPage
        );
        this.posts = [this.posts, ...response.data];
        this.page += 1;
      } catch (error) {
        alert(error.message);
      } finally {
        this.isPostsLoading = false;
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber;
    // },
  },
  mounted() {
    // this.fetchPosts();
    this.$store.dispatch("GET_POSTS");
  },
  computed: {
    posts() {
      return this.$store.getters.getPosts;
    },

    sortPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      );
    },

    sortedAndSearchedPosts() {
      return this.sortPosts.filter((post) =>
        post.title?.includes(this.searchQuery)
      );
    },


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
